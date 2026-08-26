"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MaterialCTA({ material }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(".cta-element", { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo(".cta-element",
      { opacity: 0, y: 15 },
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

  return (
    <section className="py-12 md:py-6 md:py-10 lg:py-16">
      <div className="container-wide">
        <div
          ref={containerRef}
          className="relative overflow-hidden bg-linear-to-r from-primary-600 to-primary-900 border border-primary-500/50 rounded-2xl shadow-xl"
        >
          {/* Engineering grid texture */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-screen"
            style={{
              backgroundImage: 'linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          {/* Subtle steel-blue lighting */}
          <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-blue-900/10 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

          {/* Content Container */}
          <div className="relative z-10 px-6 py-10 md:px-12 md:py-0 md:h-[300px] flex flex-col md:flex-row items-center justify-between gap-8 md:gap-6 md:gap-8 lg:gap-12">

            {/* Left Content */}
            <div className="flex-1 w-full max-w-3xl flex flex-col items-center text-center md:items-start md:text-left">
              {/* Eyebrow */}
              <div className="cta-element flex items-center space-x-3 mb-4">
                <span className="w-8 h-[1px] bg-slate-500/50 hidden md:block" />
                <span className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
                  MATERIAL EXPERTISE
                </span>
              </div>

              {/* Heading */}
              <h2 className="cta-element text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
                NEED A SPECIFIC MATERIAL?
              </h2>

              {/* Description */}
              <p className="cta-element text-base md:text-lg text-slate-400 font-light leading-relaxed max-w-xl">
                Tell us your required grade, size, standard or application for <span className="text-slate-200 font-medium">{material?.name || 'your project'}</span>.
              </p>
            </div>

            {/* Right Content */}
            <div className="cta-element flex-shrink-0 w-full md:w-auto">
              <Link
                href="/contact"
                className="group relative flex items-center justify-center w-full md:w-auto px-8 py-4 bg-white text-slate-900 hover:bg-slate-100 font-semibold text-sm tracking-wide transition-all duration-300 rounded-lg overflow-hidden border border-transparent"
              >
                <span className="relative z-10">REQUEST A QUOTE</span>
                <ArrowRight className="relative z-10 w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
