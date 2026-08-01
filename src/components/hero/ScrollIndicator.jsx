import React from "react";
import { ArrowDown } from "lucide-react";

export function ScrollIndicator() {
  return (
    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-secondary writing-vertical-rl">
        Scroll
      </span>
      <div className="w-px h-12 bg-border relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-primary animate-scroll-indicator" />
      </div>
      <ArrowDown className="w-3 h-3 text-text-secondary mt-1" />
    </div>
  );
}
