'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutQuality({ data }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      }
    });

    tl.fromTo('.quality-anim', 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
    );
  }, { scope: containerRef });

  if (!data) return null;

  return (
    <section ref={containerRef} className="py-10 md:py-6 md:py-10 lg:py-16 lg:py-12 md:py-8 md:py-12 lg:py-20 lg:py-28 bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-10 md:gap-16 lg:gap-24 mb-6 md:mb-10 lg:mb-16">
          
          {/* Left Column */}
          <div className="w-full lg:w-5/12 flex flex-col items-start">
            <ShieldCheck className="quality-anim w-10 h-10 text-primary-400 mb-6" strokeWidth={1.5} />
            <h2 className="quality-anim text-3xl md:text-4xl font-bold text-white leading-[1.2]">
              {data.title}
            </h2>
          </div>
          
          {/* Right Column */}
          <div className="w-full lg:w-7/12 flex flex-col justify-center">
            <p className="quality-anim text-lg text-slate-300 leading-relaxed max-w-2xl">
              {data.description}
            </p>
          </div>
          
        </div>

        {/* Horizontal Technical List */}
        <div className="quality-anim border-t border-slate-800 pt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {data.principles.map((principle, index) => (
              <div key={index} className="flex flex-col">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-xs font-mono font-bold text-primary-500">
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                  <div className="flex-1 h-[1px] bg-slate-800"></div>
                </div>
                <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wide">
                  {principle}
                </h4>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
