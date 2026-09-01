"use client";
import React from 'react';
import Image from 'next/image';
import { Microscope, Factory, Scissors, ShieldCheck, Settings } from 'lucide-react';

const IconMap = { Microscope, Factory, Scissors, ShieldCheck };

export function JourneyPanel({ step, index }) {
  const StepIcon = IconMap[step.icon] || Settings;
  const isEven = index % 2 === 0;

  return (
    <div className="w-[100vw] h-full flex-shrink-0 relative overflow-hidden flex items-center justify-center p-6 md:p-12 xl:p-24 mfg-panel" data-panel-id={step.id}>
      <div className={`absolute inset-0 z-0 mfg-panel-bg-${step.id}`}>
        <Image
          src={step.image}
          alt={`${step.title} — Prince Pipes & Fittings manufacturing stage`}
          fill
          className="object-cover opacity-100 mfg-panel-img"
          loading={index === 0 ? undefined : "lazy"}
          priority={index === 0}
          sizes="100vw"
        />
        <div className={`absolute inset-0 bg-gradient-to-${isEven ? 'r' : 'l'} from-black/70 via-black/20 to-transparent`} />
      </div>

      <div className={`relative z-10 w-full h-full max-w-7xl mx-auto flex flex-col justify-center ${isEven ? 'items-start text-left' : 'items-end text-right'}`}>
        <div className={`flex items-center gap-4 mb-6 mfg-panel-header-${step.id}`}>
          {!isEven && <h3 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight">{step.title}</h3>}
          <span className="flex flex-shrink-0 items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-black/50 backdrop-blur-md border border-white/20 shadow-xl text-white font-mono font-bold text-3xl md:text-4xl">
            {String(step.order).padStart(2, '0')}
          </span>
          {isEven && <h3 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight">{step.title}</h3>}
        </div>

        <p className={`text-lg md:text-xl lg:text-2xl text-slate-300 leading-relaxed mb-10 max-w-2xl mfg-panel-desc-${step.id}`}>
          {step.description}
        </p>

        <div className={`grid grid-cols-2 gap-4 max-w-xl mfg-panel-stats-${step.id}`}>
          <div className="flex flex-col p-5 bg-black/60 border border-white/10 rounded-xl backdrop-blur-md shadow-sm text-left">
            <span className="text-[10px] md:text-xs font-semibold tracking-wider text-slate-400 uppercase mb-2">Process Phase</span>
            <span className="text-sm md:text-lg font-medium text-white flex items-center gap-3">
              <StepIcon className="w-5 h-5 text-white opacity-80" />
              Phase {String(step.order).padStart(2, '0')}
            </span>
          </div>
          <div className="flex flex-col p-5 bg-black/60 border border-white/10 rounded-xl backdrop-blur-md shadow-sm text-left">
            <span className="text-[10px] md:text-xs font-semibold tracking-wider text-slate-400 uppercase mb-2">Quality Focus</span>
            <span className="text-sm md:text-lg font-medium text-white flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-white opacity-80" />
              {step.qualityFocus}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
