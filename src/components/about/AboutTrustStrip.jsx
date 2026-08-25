'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutTrustStrip({ data }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.trust-item', 
      { y: 15, opacity: 0 }, 
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.5, 
        stagger: 0.1, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 90%',
        }
      }
    );
  }, { scope: containerRef });

  if (!data || data.length === 0) return null;

  return (
    <div ref={containerRef} className="w-full border-b border-slate-200 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 py-8 lg:py-10">
          {data.map((item, index) => (
            <div 
              key={index} 
              className={`trust-item flex flex-col justify-center px-4 md:px-8 py-3 lg:py-0 
                ${index % 2 === 0 ? 'border-r border-slate-200' : ''} 
                ${index < 2 ? 'border-b lg:border-b-0 border-slate-200' : ''} 
                ${index === 1 ? 'lg:border-r lg:border-slate-200' : ''}
                ${index === 2 ? 'lg:border-r lg:border-slate-200' : ''}
              `}
            >
              <span className="text-xl md:text-2xl font-bold text-slate-900 mb-1">{item.value}</span>
              <span className="text-[11px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
