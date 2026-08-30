"use client";

import { MessageCircleQuestion } from "lucide-react";

export default function SuggestedQuestions({ onSelect }) {
  const questions = [
    "What sizes are available for SS nipple?",
    "Tell me about your manufacturing process.",
    "What grades are available for flanges?",
    "What standards do you follow?"
  ];

  return (
    <div className="flex flex-col gap-2 mt-4 mb-2">
      <p className="text-xs text-text-muted px-1 flex items-center gap-1.5">
        <MessageCircleQuestion className="w-3.5 h-3.5" /> Suggested questions
      </p>
      <div className="flex flex-wrap gap-2">
        {questions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(q)}
            className="text-left text-[13px] bg-white border border-border text-primary hover:border-primary-400 hover:bg-primary-50 px-3 py-1.5 rounded-full transition-colors"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
