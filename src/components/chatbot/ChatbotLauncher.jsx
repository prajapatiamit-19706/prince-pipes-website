"use client";

import { MessageSquare, X } from "lucide-react";

export default function ChatbotLauncher({ isOpen, toggle }) {
  return (
    <button
      onClick={toggle}
      aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:bg-primary-700 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary-300 transition-all duration-300 ease-out"
    >
      {isOpen ? (
        <X className="w-6 h-6" />
      ) : (
        <MessageSquare className="w-6 h-6" />
      )}
    </button>
  );
}
