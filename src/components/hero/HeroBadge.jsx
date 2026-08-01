import React from "react";
import { ShieldCheck } from "lucide-react";

export function HeroBadge({ text }) {
  if (!text) return null;

  return (
    <div className="hero-anim opacity-0 translate-y-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-100 mb-6">
      <ShieldCheck className="w-4 h-4 text-primary" />
      <span className="text-sm font-medium text-primary tracking-wide uppercase">
        {text}
      </span>
    </div>
  );
}
