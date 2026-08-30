"use client";

import { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import SuggestedQuestions from "./SuggestedQuestions";
import TypingIndicator from "./TypingIndicator";

export default function ChatMessages({
  messages,
  isLoading,
  append,
  error
}) {
  const scrollRef = useRef(null);
  const [userHasScrolled, setUserHasScrolled] = useState(false);

  // Auto-scroll logic
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Only auto scroll if the user hasn't manually scrolled up
    if (!userHasScrolled) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, isLoading, userHasScrolled]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    // Check if we are near the bottom
    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 50;
    
    if (isNearBottom) {
      setUserHasScrolled(false);
    } else {
      setUserHasScrolled(true);
    }
  };

  return (
    <div 
      ref={scrollRef}
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface scrollbar-thin scrollbar-thumb-border-dark scrollbar-track-transparent"
    >
      {/* Welcome Message */}
      {messages.length === 0 && (
        <div className="flex w-full justify-start">
          <div className="max-w-[85%] rounded-2xl px-4 py-3 text-sm bg-surface-2 text-text border border-border-dark rounded-tl-sm">
            <p className="mb-2">Hello! 👋</p>
            <p className="mb-2">
              I can help you find Prince Pipes & Fittings products, specifications, sizes, standards, applications, and company information.
            </p>
            <p>What would you like to know?</p>
          </div>
        </div>
      )}

      {/* Message List */}
      {messages.filter(m => {
        const text = typeof m.content === 'string' ? m.content : (typeof m.text === 'string' ? m.text : (Array.isArray(m.content) ? m.content.map(p => p.text || '').join('') : ''));
        return !text.startsWith("[SYSTEM");
      }).map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}

      {/* Loading Indicator */}
      {isLoading && <TypingIndicator />}

      {/* Error Message */}
      {error && (
        <div className="flex w-full justify-center my-2">
          <div className="bg-red-50 text-red-600 text-xs px-3 py-2 rounded-lg border border-red-200">
            Sorry, I couldn&apos;t process that request right now. Please try again.
          </div>
        </div>
      )}

      {/* Suggested Questions (only when empty) */}
      {messages.length === 0 && (
        <SuggestedQuestions 
          onSelect={(q) => append({ role: "user", content: q })} 
        />
      )}
    </div>
  );
}
