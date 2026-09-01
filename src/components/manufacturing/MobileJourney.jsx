"use client";
import React from 'react';
import Image from 'next/image';
import { Microscope, Factory, Scissors, ShieldCheck, Settings } from 'lucide-react';

const IconMap = { Microscope, Factory, Scissors, ShieldCheck };

export function MobileJourney({ steps }) {
  return (
    <section className="relative w-full bg-surface py-8 md:py-12 lg:py-20 border-t border-border/40 block lg:hidden">
      <h2 className="sr-only">Our Manufacturing Process</h2>
      <div className="px-6">
        <span className="text-xs font-semibold tracking-[0.2em] uppercase mb-12 flex items-center gap-3 text-primary">
          <span className="w-8 h-[1px] bg-primary" />
          Manufacturing Journey
        </span>
        <ol className="flex flex-col gap-6 md:gap-10 lg:gap-16">
          {steps.map((step) => {
            const StepIcon = IconMap[step.icon] || Settings;
            return (
              <li key={step.id} className="flex flex-col gap-6">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-border/20">
                  <Image 
                    src={step.image} 
                    alt={`${step.title} — Prince Pipes & Fittings manufacturing stage`} 
                    fill 
                    className="object-cover" 
                    loading="lazy" 
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-[#0F2747]/10" />
                </div>
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-surface border border-border/50 text-primary font-mono font-bold text-xl shadow-sm">
                      {String(step.order).padStart(2, '0')}
                    </span>
                    <h3 className="font-heading font-bold text-2xl text-text-primary">{step.title}</h3>
                  </div>
                  <p className="text-base text-text-secondary leading-relaxed mb-6">{step.description}</p>
                  <div className="inline-flex items-center gap-2 text-sm font-medium text-text-primary bg-surface-2/80 border border-border/50 rounded-lg px-4 py-3 w-full">
                    <StepIcon className="w-5 h-5 text-primary opacity-80" />
                    <span>{step.qualityFocus}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
