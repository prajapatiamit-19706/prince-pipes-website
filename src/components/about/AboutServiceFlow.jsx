'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutServiceFlow({ data }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      }
    });

    tl.fromTo('.flow-title-anim', 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
    );

    // Animate line
    tl.to('.flow-line', { scaleX: 1, scaleY: 1, duration: 1, ease: 'power2.inOut' }, '-=0.2');

    // Animate steps
    tl.fromTo('.flow-step-anim', 
      { y: 15, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.2, ease: 'power2.out' },
      '-=0.8'
    );
  }, { scope: containerRef });

  if (!data) return null;

  return (
    <section ref={containerRef} className="py-10 md:py-6 md:py-10 lg:py-16 lg:py-12 md:py-8 md:py-12 lg:py-20 lg:py-28 bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-8 md:mb-12 lg:mb-20">
          <h2 className="flow-title-anim text-3xl md:text-4xl font-bold text-slate-900">
            {data.title}
          </h2>
        </div>

        <div className="relative">
          {/* Horizontal Line for Desktop */}
          <div className="hidden md:block absolute top-[24px] left-[10%] right-[10%] h-[2px] bg-slate-100">
            <div className="flow-line w-full h-full bg-primary-600 origin-left transform scale-x-0"></div>
          </div>
          
          {/* Vertical Line for Mobile */}
          <div className="md:hidden absolute top-0 bottom-0 left-[23px] w-[2px] bg-slate-100">
             <div className="flow-line w-full h-full bg-primary-600 origin-top transform scale-y-0"></div>
          </div>

          <div className="flex flex-col md:flex-row justify-between relative gap-y-12">
            {data.customerJourney.map((step, index) => (
              <div key={index} className="flow-step-anim relative flex flex-row md:flex-col items-center md:items-center w-full md:w-1/4">
                
                {/* Mobile: Node Dot on the left line */}
                <div className="md:hidden absolute left-[18px] top-2 w-3 h-3 bg-white border-2 border-primary-600 rounded-full z-10"></div>
                
                {/* Desktop: Node Dot with numbers */}
                <div className="hidden md:flex relative z-10 w-12 h-12 bg-white border-2 border-primary-600 rounded-full items-center justify-center mb-6">
                  <span className="text-sm font-bold text-primary-700">
                    {(step.step).toString().padStart(2, '0')}
                  </span>
                </div>
                
                <div className="ml-16 md:ml-0 text-left md:text-center">
                   <h3 className="text-base font-bold text-slate-900 tracking-wide">
                     {step.title}
                   </h3>
                   {/* We display the step number on mobile alongside the title */}
                   <span className="md:hidden text-xs font-mono text-primary-600 mt-1 block">
                     STEP {(step.step).toString().padStart(2, '0')}
                   </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
