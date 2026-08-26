'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function QualityStandards({ data }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      }
    });

    tl.fromTo('.std-header', 
      { y: 15, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
    );
    
    tl.fromTo('.std-item',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' },
      '-=0.2'
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-6 md:py-10 lg:py-16 lg:py-10 md:py-6 md:py-10 lg:py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="std-header text-center max-w-3xl mx-auto mb-6 md:mb-10 lg:mb-16">
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

        {/* Compact Specification Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {data.standards.map((std, index) => (
            <div key={index} className="std-item bg-white border border-slate-200 p-5 rounded-sm hover:border-primary-200 hover:shadow-[0_4px_20px_rgba(37,99,235,0.05)] transition-all duration-300">
               <div className="flex flex-col mb-3">
                 <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">
                   {std.category}
                 </span>
                 <span className="text-base font-black text-slate-900 tracking-tight">{std.code}</span>
               </div>
               <p className="text-xs text-slate-500 leading-relaxed pr-2">
                 {std.name}
               </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
