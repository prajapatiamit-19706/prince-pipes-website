'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function QualityIntro({ data }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      }
    });

    tl.fromTo('.intro-text', 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
    );
    
    tl.fromTo('.highlight-item',
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
      '-=0.2'
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-6 md:py-10 lg:py-16 lg:py-10 md:py-6 md:py-10 lg:py-16 lg:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 md:gap-6 md:gap-12 lg:gap-20">
          
          {/* Left Column - Title */}
          <div className="w-full lg:w-1/3">
            <span className="intro-text block text-[11px] font-bold tracking-widest text-primary-600 uppercase mb-4">
              {data.eyebrow}
            </span>
            <h2 className="intro-text text-3xl sm:text-4xl font-bold text-slate-900 leading-[1.2] tracking-tight">
              {data.title}
            </h2>
          </div>

          {/* Right Column - Content */}
          <div className="w-full lg:w-2/3">
            <p className="intro-text text-lg text-slate-600 leading-relaxed mb-12 max-w-3xl">
              {data.description}
            </p>

            {/* Compact text-based highlights instead of large cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 border-t border-slate-100 pt-8">
              {data.highlights.map((highlight, index) => (
                <div key={index} className="highlight-item flex flex-col">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-xs font-mono font-bold text-slate-400">{highlight.number}</span>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">{highlight.title}</h3>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed pl-7">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
