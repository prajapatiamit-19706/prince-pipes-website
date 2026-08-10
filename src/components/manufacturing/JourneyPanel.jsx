"use client";
import React from 'react';
import Image from 'next/image';
import * as Icons from 'lucide-react';

export function JourneyPanel({ step, index }) {
  const StepIcon = Icons[step.icon] || Icons.Settings;
  const isEven = index % 2 === 0;

  return (
    <div className="w-[100vw] h-full flex-shrink-0 relative overflow-hidden flex items-center justify-center p-6 md:p-12 xl:p-24 mfg-panel" data-panel-id={step.id}>
      <div className={`absolute inset-0 z-0 mfg-panel-bg-${step.id}`}>
        <Image
          src={step.image}
          alt={`${step.title} — Prince Pipes & Fittings manufacturing stage`}
          fill
          className="object-cover opacity-80 mix-blend-screen mfg-panel-img"
          loading={index === 0 ? undefined : "lazy"}
          priority={index === 0}
          sizes="100vw"
        />
        <div className={`absolute inset-0 bg-gradient-to-${isEven ? 'r' : 'l'} from-surface via-surface/80 to-transparent`} />
        <div className="absolute inset-0 bg-surface/20" />
      </div>

      <div className={`relative z-10 w-full h-full max-w-7xl mx-auto flex flex-col justify-center ${isEven ? 'items-start text-left' : 'items-end text-right'}`}>
        <div className={`flex items-center gap-4 mb-6 mfg-panel-header-${step.id}`}>
          {!isEven && <h3 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-text-primary leading-tight">{step.title}</h3>}
          <span className="flex flex-shrink-0 items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-surface border border-border/50 shadow-xl text-primary font-mono font-bold text-3xl md:text-4xl">
            {String(step.order).padStart(2, '0')}
          </span>
          {isEven && <h3 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-text-primary leading-tight">{step.title}</h3>}
        </div>

        <p className={`text-lg md:text-xl lg:text-2xl text-text-secondary leading-relaxed mb-10 max-w-2xl mfg-panel-desc-${step.id}`}>
          {step.description}
        </p>

        <div className={`grid grid-cols-2 gap-4 max-w-xl mfg-panel-stats-${step.id}`}>
          <div className="flex flex-col p-5 bg-surface-2/90 border border-border/50 rounded-xl backdrop-blur-md shadow-sm text-left">
            <span className="text-[10px] md:text-xs font-semibold tracking-wider text-text-muted uppercase mb-2">Process Phase</span>
            <span className="text-sm md:text-lg font-medium text-text-primary flex items-center gap-3">
              <StepIcon className="w-5 h-5 text-primary opacity-80" />
              Phase {String(step.order).padStart(2, '0')}
            </span>
          </div>
          <div className="flex flex-col p-5 bg-surface-2/90 border border-border/50 rounded-xl backdrop-blur-md shadow-sm text-left">
            <span className="text-[10px] md:text-xs font-semibold tracking-wider text-text-muted uppercase mb-2">Quality Focus</span>
            <span className="text-sm md:text-lg font-medium text-text-primary flex items-center gap-3">
              <Icons.ShieldCheck className="w-5 h-5 text-primary opacity-80" />
              {step.qualityFocus}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
