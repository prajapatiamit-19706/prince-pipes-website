'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutStory({ data }) {
  const containerRef = useRef(null);
  
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      }
    });
    
    tl.fromTo('.story-anim', 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
    );
    
    tl.to('.timeline-line', { scaleY: 1, duration: 0.8, ease: 'power2.inOut' }, '-=0.2');
    
    tl.fromTo('.timeline-item', 
      { x: 15, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 0.4, stagger: 0.15, ease: 'power2.out' },
      '-=0.4'
    );
  }, { scope: containerRef });
  
  if (!data) return null;

  return (
    <section ref={containerRef} className="py-20 md:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Left Column */}
          <div className="w-full lg:w-5/12 flex flex-col items-start">
            <span className="story-anim text-[11px] font-bold tracking-widest text-primary-700 uppercase bg-slate-50 px-3 py-1 border border-slate-200 rounded-sm mb-6">
              {data.sectionLabel}
            </span>
            <h2 className="story-anim text-3xl md:text-4xl font-bold text-slate-900 leading-[1.2]">
              {data.title}
            </h2>
          </div>
          
          {/* Right Column */}
          <div className="w-full lg:w-7/12">
            <div className="flex flex-col space-y-6 mb-16">
              {data.paragraphs.map((p, i) => (
                <p key={i} className="story-anim text-base text-slate-600 leading-relaxed max-w-2xl">
                  {p}
                </p>
              ))}
            </div>
            
            {/* Timeline */}
            <div className="relative border-l border-slate-200 pl-8 md:pl-10 py-2">
              {/* Animated Line overlay */}
              <div className="timeline-line absolute top-0 bottom-0 left-[-1px] w-[2px] bg-primary-600 origin-top transform scale-y-0"></div>
              
              <div className="flex flex-col space-y-10">
                {data.timeline.map((item, i) => (
                  <div key={i} className="timeline-item relative">
                    {/* Node Dot */}
                    <div className="absolute -left-[39px] md:-left-[47px] top-1.5 w-3.5 h-3.5 bg-white border-2 border-primary-600 rounded-full z-10"></div>
                    
                    <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8">
                      <div className="flex items-center gap-2">
                         <span className="text-sm font-bold text-slate-900 min-w-[65px]">{item.year}</span>
                         <span className="text-primary-600 md:hidden">→</span>
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-slate-800 tracking-wide">{item.title}</h4>
                        <p className="text-sm text-slate-500 mt-1.5 max-w-md leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
