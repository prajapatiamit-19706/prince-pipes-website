'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutCapabilities({ data }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.capability-anim', 
      { y: 20, opacity: 0 }, 
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6, 
        stagger: 0.1, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    );
  }, { scope: containerRef });

  if (!data) return null;

  return (
    <section ref={containerRef} className="py-10 md:py-6 md:py-10 lg:py-16 lg:py-12 md:py-8 md:py-12 lg:py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start mb-6 md:mb-10 lg:mb-16">
          <h2 className="capability-anim text-3xl md:text-4xl font-bold text-slate-900 leading-[1.2] max-w-2xl">
            {data.title}
          </h2>
          {data.description && (
            <p className="capability-anim text-base text-slate-600 mt-6 max-w-2xl leading-relaxed">
              {data.description}
            </p>
          )}
        </div>

        {/* 4 Item Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 lg:gap-y-0">
          {data.capabilities.map((item, index) => (
            <div 
              key={index} 
              className="capability-anim group relative flex flex-col pt-6 border-t border-slate-200 hover:border-primary-600 transition-colors duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-primary-600 transition-colors">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary-600 group-hover:translate-x-1 transition-all duration-300" />
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-primary-700 transition-colors">
                {item.title}
              </h3>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {item.keywords.map((kw, i) => (
                  <span key={i} className="text-[11px] text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded-sm">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
