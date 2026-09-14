"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatMessage({ message, isGenerating }) {
  const isUser = message.role === "user";
  
  // Vercel AI SDK v4 uses `parts` instead of `content` for messages
  const messageText = message.parts 
    ? message.parts.filter(p => p.type === 'text').map(p => p.text).join('')
    : (message.content || message.text || "");

  let displayText = messageText;

  if (!isUser) {
    if (!displayText.trim()) {
      if (isGenerating) {
        return null; // hide completely while waiting for the background tools to stream the response
      }
      // Check if tools are still running
      const toolInvocations = message.toolInvocations || [];
      const partsTools = (message.parts || []).filter(p => p.type === 'tool-invocation' || p.type === 'tool-call');
      
      const hasTools = toolInvocations.length > 0 || partsTools.length > 0;
      const isToolRunning = 
        (toolInvocations.length > 0 && toolInvocations.some(t => t.state !== 'result')) ||
        (partsTools.length > 0 && partsTools.some(t => !t.result && t.state !== 'result'));
      
      if (isToolRunning) {
        displayText = "Retrieving information...";
      } else if (hasTools) {
        // Tools finished but no text was generated (silent failure/stream aborted)
        displayText = "I'm sorry, an error occurred while retrieving that data. Please try again.";
      } else {
        // Completely empty message (silent failure)
        displayText = "I'm sorry, I couldn't process that request right now. You can ask me about our products, materials, or technical information.";
      }
    }
  }

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
          isUser
            ? "bg-primary text-white rounded-tr-sm"
            : "bg-surface-2 text-text border border-border-dark rounded-tl-sm"
        }`}
      >
        {isUser ? (
          <div className="whitespace-pre-wrap">{displayText}</div>
        ) : (
          <div className="prose prose-sm prose-slate max-w-none dark:prose-invert prose-p:leading-relaxed prose-pre:bg-gray-800 prose-pre:text-gray-100 prose-a:text-primary-500">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {displayText}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
