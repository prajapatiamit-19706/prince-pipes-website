'use client';
import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function QualityTesting({ data }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      }
    });

    tl.fromTo('.test-header', 
      { y: 15, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
    );
    
    tl.fromTo('.test-item',
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' },
      '-=0.3'
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-16 lg:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Left Column - Intro */}
          <div className="w-full lg:w-5/12 test-header">
            <span className="block text-[11px] font-bold tracking-widest text-primary-600 uppercase mb-4">
              {data.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-[1.2] tracking-tight mb-6">
              {data.title}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-lg">
              {data.description}
            </p>
          </div>

          {/* Right Column - Spec List */}
          <div className="w-full lg:w-7/12">
            <div className="border-t border-slate-200 flex flex-col">
              {data.tests.map((test) => (
                <div 
                  key={test.id} 
                  className="test-item group flex flex-col sm:flex-row sm:items-center justify-between py-5 border-b border-slate-200 hover:bg-slate-50 transition-colors duration-300 px-4 -mx-4 sm:mx-0 sm:px-4 cursor-default"
                >
                  <div className="flex flex-col sm:w-1/3 mb-2 sm:mb-0">
                    <span className="text-sm font-bold text-slate-900 group-hover:text-primary-700 transition-colors group-hover:translate-x-1 duration-300">
                      {test.title}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mt-1">
                      {test.availability}
                    </span>
                  </div>
                  
                  <div className="sm:w-2/3 flex items-center justify-between">
                     <p className="text-sm text-slate-500 leading-relaxed pr-6 sm:pr-8">
                       {test.description}
                     </p>
                     <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary-600 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
