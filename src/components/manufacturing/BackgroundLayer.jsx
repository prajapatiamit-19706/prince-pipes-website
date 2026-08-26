"use client";
import React from 'react';

const ENGINEERING_BLUE = "#202020";
const MUTED_GREEN = "#4D7A58";

export function BackgroundLayer() {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-multiply"
        style={{
          backgroundImage: `linear-gradient(${ENGINEERING_BLUE} 1px, transparent 1px), linear-gradient(90deg, ${ENGINEERING_BLUE} 1px, transparent 1px)`,
          backgroundSize: "4rem 4rem",
        }}
      />
      <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vh] h-[60vh] rounded-full border-[1px] border-primary/10 pointer-events-none z-0" />
      <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vh] h-[90vh] rounded-full border-[1px] border-primary/5 pointer-events-none z-0" />
      <div aria-hidden="true" className="hidden md:flex absolute left-6 top-0 bottom-0 flex-col justify-between py-10 md:py-6 md:py-10 lg:py-16 lg:py-24 pointer-events-none z-0 opacity-[0.03]">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-2 h-px" style={{ background: MUTED_GREEN }} />
            <span className="font-mono text-[9px]" style={{ color: MUTED_GREEN }}>{String(i * 10).padStart(3, '0')}</span>
          </div>
        ))}
      </div>
    </>
  );
}
