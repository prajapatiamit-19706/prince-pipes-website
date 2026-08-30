"use client";

import { Send, CornerDownLeft } from "lucide-react";
import { useEffect, useRef } from "react";

export default function ChatInput({
  input = "",
  setInput,
  handleSubmit,
  isLoading
}) {
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if ((input || "").trim() && !isLoading) {
        handleSubmit(e);
      }
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const isSubmitDisabled = !(input || "").trim() || isLoading;

  return (
    <div className="p-3 border-t border-border bg-white rounded-b-xl md:rounded-b-2xl">
      <form
        onSubmit={handleSubmit}
        className="flex items-end gap-2 bg-surface border border-border focus-within:border-primary focus-within:ring-1 focus-within:ring-primary rounded-xl p-2 transition-all"
      >
        <textarea
          ref={textareaRef}
          value={input || ""}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          placeholder="Ask about our products..."
          className="flex-1 max-h-[120px] bg-transparent resize-none outline-none text-sm p-1.5 scrollbar-thin scrollbar-thumb-border"
          rows={1}
          aria-label="Message input"
        />
        <button
          type="submit"
          disabled={isSubmitDisabled}
          aria-label="Send message"
          className={`p-2 rounded-lg flex-shrink-0 transition-colors ${
            isSubmitDisabled
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-primary text-white hover:bg-primary-600"
          }`}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </form>
      <div className="text-center mt-2">
        <span className="text-[10px] text-text-muted flex items-center justify-center gap-1">
          Press <CornerDownLeft className="w-3 h-3" /> to send, Shift + Enter for new line
        </span>
      </div>
    </div>
  );
}
