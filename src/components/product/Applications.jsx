"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export function Applications({ applications }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".app-item",
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        }
      }
    );
  }, { scope: containerRef });

  if (!applications || applications.length === 0) return null;

  return (
    <section ref={containerRef}>
      <h2 className="text-sm font-bold tracking-[0.2em] text-neutral-400 uppercase mb-8">
        APPLICATIONS
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
        {applications.map((app, index) => {
          const number = (index + 1).toString().padStart(2, '0');
          return (
            <div key={index} className="app-item flex items-center gap-4 py-3 border-b border-neutral-100">
              <span className="text-neutral-300 font-mono text-sm">{number}</span>
              <span className="text-sm font-medium tracking-wide text-neutral-800 uppercase">{app}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
