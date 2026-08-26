'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { CheckCircle2 } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function QualityAssurance({ data }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      }
    });

    tl.fromTo('.qa-header', 
      { y: 15, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
    );
    
    tl.fromTo('.qa-step',
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' },
      '-=0.3'
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-6 md:py-10 lg:py-16 lg:py-10 md:py-6 md:py-10 lg:py-16 lg:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-8 md:gap-6 md:gap-12 lg:gap-20">
           {/* Header / Intro */}
           <div className="w-full lg:w-1/3 qa-header">
             <span className="block text-[11px] font-bold tracking-widest text-primary-600 uppercase mb-4">
               {data.eyebrow}
             </span>
             <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-[1.2] tracking-tight mb-4">
               {data.title}
             </h2>
             <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
               {data.description}
             </p>
             
             {/* Small trust point matching Prompt's request for trust focus */}
             <div className="flex items-center space-x-2 text-sm text-slate-700 font-bold bg-slate-50 border border-slate-200 px-4 py-3 rounded-sm inline-flex shadow-sm">
               <CheckCircle2 className="w-4 h-4 text-emerald-500" />
               <span>Specification Compliant Manufacturing</span>
             </div>
           </div>

           {/* Technical Path / Steps */}
           <div className="w-full lg:w-2/3">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8 lg:gap-y-10 border-t sm:border-t-0 sm:border-l border-slate-200 pt-8 sm:pt-0 sm:pl-12">
               {data.steps.map((step, index) => (
                 <div key={index} className="qa-step flex items-start space-x-4">
                   <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mt-0.5">
                     <span className="text-[10px] font-mono font-bold text-slate-400">{step.number}</span>
                   </div>
                   <div className="flex flex-col">
                     <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-1.5">
                       {step.title}
                     </h3>
                     <p className="text-sm text-slate-500 leading-relaxed">
                       {step.description}
                     </p>
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
