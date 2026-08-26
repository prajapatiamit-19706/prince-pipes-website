"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export function TechnicalSpecifications({ specifications }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".spec-row",
      { opacity: 0, x: -10 },
      {
        opacity: 1,
        x: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        }
      }
    );
  }, { scope: containerRef });

  if (!specifications || Object.keys(specifications).length === 0) return null;

  // Format camelCase keys to Title Case for display
  const formatLabel = (key) => {
    const result = key.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  // Format array values to slash-separated strings
  const formatValue = (value) => {
    if (Array.isArray(value)) {
      return value.join(" / ");
    }
    if (value && typeof value === 'object') {
      return Object.entries(value)
        .map(([k, v]) => `${formatLabel(k)}: ${v}`)
        .join(" | ");
    }
    return value;
  };

  return (
    <section id="technical-specifications" ref={containerRef} className="scroll-mt-10 md:mt-6 md:mt-10 lg:mt-16 lg:mt-24">
      <h2 className="text-sm font-bold tracking-[0.2em] text-neutral-400 uppercase mb-8">
        COMPLETE TECHNICAL SPECIFICATIONS
      </h2>
      
      <div className="border-t border-neutral-200">
        <div className="hidden md:grid grid-cols-12 py-4 border-b border-neutral-200">
          <div className="col-span-4 font-semibold text-neutral-900 tracking-wide text-sm">Property</div>
          <div className="col-span-8 font-semibold text-neutral-900 tracking-wide text-sm">Specification</div>
        </div>
        
        {Object.entries(specifications).map(([key, value]) => {
          // Skip empty arrays or null/undefined values
          if (!value || (Array.isArray(value) && value.length === 0)) return null;

          return (
            <div key={key} className="spec-row flex flex-col md:grid md:grid-cols-12 gap-1 md:gap-0 py-4 border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
              <div className="md:col-span-4 text-xs md:text-sm font-semibold md:font-medium text-neutral-400 md:text-neutral-500 pr-4 uppercase md:normal-case tracking-wider md:tracking-normal">
                {formatLabel(key)}
              </div>
              <div className="md:col-span-8 text-sm text-neutral-800 leading-relaxed break-words">
                {formatValue(value)}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
