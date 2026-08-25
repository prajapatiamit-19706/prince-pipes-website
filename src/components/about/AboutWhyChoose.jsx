'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutWhyChoose({ data }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.why-anim', 
      { y: 15, opacity: 0 }, 
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.5, 
        stagger: 0.05, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        }
      }
    );
  }, { scope: containerRef });

  if (!data) return null;

  return (
    <section ref={containerRef} className="py-20 md:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12">
          <span className="why-anim text-[11px] font-bold tracking-widest text-primary-700 uppercase mb-4 block">
            WHY CHOOSE PPF
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-0 border-t border-slate-200">
          {data.map((item, index) => (
            <div 
              key={index} 
              className="why-anim group flex flex-col justify-center py-6 min-h-[90px] border-b border-slate-200 hover:border-primary-500 transition-colors duration-300 cursor-default"
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-primary-600 transition-colors mt-1">
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-primary-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1 max-w-[280px]">
                      {item.description}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-primary-600 transition-all duration-300 mt-1" />
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
