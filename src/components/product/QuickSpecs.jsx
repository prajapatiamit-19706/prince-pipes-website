"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export function QuickSpecs({ specifications }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".quick-spec-card",
      { opacity: 0, y: 20 },
      {
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.1, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        }
      }
    );
  }, { scope: containerRef });

  if (!specifications || Object.keys(specifications).length === 0) return null;

  // Extract key quick specs from the full technical specs
  let quickSpecs = [
    { label: 'MATERIAL', value: specifications.material },
    { label: 'GRADE', value: specifications.grades?.join(' / ') || specifications.specifications?.join(' / ') },
    { label: 'SIZE RANGE', value: specifications.sizeRange },
    { label: 'STANDARD', value: specifications.standards?.join(' / ') },
    { label: 'CONNECTION', value: specifications.connection?.[0] || specifications.ends?.[0] || specifications.threads },
    { label: 'PRESSURE RATING', value: specifications.pressureRating?.join(' / ') || specifications.pressureClass }
  ].filter(spec => spec.value); // Remove empty specs

  // If we couldn't find many hardcoded ones, just grab the first few keys that are strings or arrays of strings
  if (quickSpecs.length < 3) {
    const backupSpecs = [];
    Object.entries(specifications).forEach(([key, val]) => {
      if (backupSpecs.length >= 4) return;
      if (quickSpecs.some(q => q.label.toLowerCase() === key.toLowerCase())) return;
      
      const label = key.replace(/([A-Z])/g, " $1").toUpperCase();
      let value = null;
      if (typeof val === 'string' || typeof val === 'number') {
        value = val;
      } else if (Array.isArray(val) && typeof val[0] === 'string') {
        value = val.join(' / ');
      }
      
      if (value) {
        backupSpecs.push({ label, value });
      }
    });
    quickSpecs = [...quickSpecs, ...backupSpecs].slice(0, 6);
  }

  if (quickSpecs.length === 0) return null;

  return (
    <div ref={containerRef} className="mt-6 md:mt-10 lg:mt-16 pt-12 border-t border-neutral-200">
      <h3 className="text-xs font-bold tracking-[0.2em] text-neutral-400 uppercase mb-8">
        QUICK SPECIFICATIONS
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {quickSpecs.map((spec, idx) => (
          <div key={idx} className="quick-spec-card">
            <div className="text-xs font-semibold tracking-wider text-neutral-500 mb-2">
              {spec.label}
            </div>
            <div className="text-lg font-medium text-neutral-900 leading-tight">
              {spec.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
