"use client";

import { X, Minus, Trash2 } from "lucide-react";

export default function ChatHeader({ onClose, onClear }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-primary text-white border-b border-primary-700 rounded-t-xl md:rounded-t-2xl">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-primary font-bold">
            P
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-primary rounded-full"></span>
        </div>
        <div>
          <h3 className="font-semibold text-sm leading-tight">Prince Pipes & Fittings AI</h3>
          <span className="text-[10px] text-primary-200">AI Product Assistant</span>
        </div>
      </div>
      <div className="flex items-center gap-1 text-primary-200">
        <button
          onClick={onClear}
          aria-label="Clear chat"
          title="Clear chat"
          className="p-1.5 hover:bg-primary-600 hover:text-white rounded-md transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
        <button
          onClick={onClose}
          aria-label="Minimize AI assistant"
          title="Minimize"
          className="p-1.5 hover:bg-primary-600 hover:text-white rounded-md transition-colors hidden md:block"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          onClick={onClose}
          aria-label="Close AI assistant"
          title="Close"
          className="p-1.5 hover:bg-primary-600 hover:text-white rounded-md transition-colors block md:hidden"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
