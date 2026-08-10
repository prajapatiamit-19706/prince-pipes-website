"use client";
import React from 'react';

const ENGINEERING_BLUE = "#5D7EA8";

export function ProgressTimeline({ steps }) {
  return (
    <div className="absolute bottom-12 left-0 w-full px-6 md:px-12 z-20 pointer-events-none">
      <nav aria-label="Manufacturing stage progress" className="w-full max-w-7xl mx-auto">
        <ol className="relative w-full h-[2px] bg-border/60 flex items-center justify-between">
          <div className="absolute top-0 left-0 h-full bg-primary mfg-progress-fill origin-left" style={{ width: '0%' }} aria-hidden="true" />
          {steps.map((step, i) => (
            <li
              key={step.id}
              data-mfg-node={step.id}
              aria-current={i === 0 ? 'step' : undefined}
              className="relative z-10 flex flex-col items-center"
            >
              <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-border bg-surface absolute -translate-y-1/2 mfg-node-inactive-${step.id}`} aria-hidden="true" />
              <div
                className={`w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-primary bg-primary absolute -translate-y-1/2 ${i === 0 ? 'opacity-100' : 'opacity-0'} mfg-node-active-${step.id}`}
                style={{ boxShadow: `0 0 15px ${ENGINEERING_BLUE}66` }}
                aria-hidden="true"
              />
              <div
                className={`absolute top-4 md:top-6 whitespace-nowrap text-[10px] md:text-xs font-semibold tracking-widest uppercase text-text-primary ${i === 0 ? 'opacity-100' : 'opacity-30'} mfg-node-text-${step.id}`}
              >
                <span className="hidden md:inline">{step.title}</span>
                <span className="md:hidden">{step.title.split(' ')[0]}</span>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
