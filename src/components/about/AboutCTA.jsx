'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutCTA({ data }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.cta-anim',
      { y: 15, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
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
    <section ref={containerRef} className="w-full bg-white py-12 lg:py-8 md:py-12 lg:py-20 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative bg-slate-900 rounded-lg shadow-2xl overflow-hidden flex flex-col lg:flex-row items-center justify-between py-12 px-8 lg:px-16 lg:min-h-[260px] gap-8">
          
          {/* Subtle grid texture overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#33415540_1px,transparent_1px),linear-gradient(to_bottom,#33415540_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

          {/* Left Text */}
          <div className="w-full lg:w-3/5 relative z-10">
            <h2 className="cta-anim text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight tracking-tight">
              {data.title}
            </h2>
            <p className="cta-anim text-slate-300 text-sm md:text-base max-w-xl leading-relaxed">
              {data.description}
            </p>
          </div>

          {/* Right Buttons */}
          <div className="cta-anim w-full lg:w-2/5 flex flex-wrap gap-4 lg:justify-end relative z-10">
            <Link
              href={data.primary.path}
              className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-medium text-sm transition-colors hover:bg-primary-500 rounded-sm shadow-sm"
            >
              {data.primary.label} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href={data.secondary.path}
              className="inline-flex items-center justify-center px-6 py-3 bg-transparent text-white border border-slate-600 font-medium text-sm transition-colors hover:bg-slate-800 hover:border-slate-500 rounded-sm"
            >
              {data.secondary.label}
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
