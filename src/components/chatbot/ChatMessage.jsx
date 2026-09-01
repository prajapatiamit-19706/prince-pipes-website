"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatMessage({ message }) {
  const isUser = message.role === "user";
  
  // Vercel AI SDK v4 uses `parts` instead of `content` for messages
  const messageText = message.parts 
    ? message.parts.filter(p => p.type === 'text').map(p => p.text).join('')
    : (message.content || message.text || "");

  if (!isUser) {
    if (!messageText.trim()) return null;
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
          <div className="whitespace-pre-wrap">{messageText}</div>
        ) : (
          <div className="prose prose-sm prose-slate max-w-none dark:prose-invert prose-p:leading-relaxed prose-pre:bg-gray-800 prose-pre:text-gray-100 prose-a:text-primary-500">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {messageText}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
