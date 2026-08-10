"use client";

import { Check } from 'lucide-react';

export function TestingQuality({ testing }) {
  if (!testing || testing.length === 0) return null;

  return (
    <section>
      <h2 className="text-sm font-bold tracking-[0.2em] text-neutral-400 uppercase mb-6">
        TESTING & QUALITY
      </h2>
      
      <div className="bg-neutral-50 border border-neutral-200 p-8">
        <ul className="space-y-4">
          {testing.map((test, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="mt-0.5 text-primary flex-shrink-0">
                <Check size={18} strokeWidth={2.5} />
              </div>
              <span className="text-neutral-700 font-medium">{test}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
