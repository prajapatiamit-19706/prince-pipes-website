'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function QualityFramework({ data }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      }
    });

    tl.fromTo('.fw-header', 
      { y: 15, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
    );
    
    tl.fromTo('.fw-item',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
      '-=0.2'
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-6 md:py-10 lg:py-16 lg:py-10 md:py-6 md:py-10 lg:py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="fw-header max-w-2xl mb-12 sm:mb-6 md:mb-10 lg:mb-16">
          <span className="block text-[11px] font-bold tracking-widest text-primary-600 uppercase mb-4">
            {data.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-[1.2] tracking-tight mb-4">
            {data.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Framework Grid (Technical/Minimal layout matching engineering specs) */}
        {/* We use grid to create a seamless border layout (no gaps, overlapping borders) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 bg-white border-t border-l border-slate-200 shadow-sm">
          {data.items.map((item, index) => (
            <div key={index} className="fw-item p-6 sm:p-8 border-b border-r border-slate-200 hover:bg-slate-50 transition-colors duration-300 group flex flex-col h-full">
              <div className="flex flex-row sm:flex-col items-center sm:items-start justify-between sm:justify-start mb-4">
                 <span className="text-[10px] font-mono font-bold text-slate-400 tracking-widest group-hover:text-primary-500 transition-colors sm:mb-4">STEP {item.number}</span>
                 <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide sm:mb-3 ml-4 sm:ml-0">{item.title}</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mt-2 sm:mt-0">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
