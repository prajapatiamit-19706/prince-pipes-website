'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import { ProductBreadcrumb } from '../product/ProductBreadcrumb';

export default function AboutHero({ data }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo('.hero-anim', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' });

    // Continuous "live" animations for the technical visual
    gsap.to('.spin-slow', { rotation: 360, duration: 25, repeat: -1, ease: 'linear' });
    gsap.to('.spin-slow-reverse', { rotation: -360, duration: 35, repeat: -1, ease: 'linear' });
    gsap.to('.pulse-dot', { scale: 1.6, opacity: 0.3, duration: 1.5, repeat: -1, yoyo: true, ease: 'power1.inOut' });
    gsap.to('.float-element', { y: -8, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative md:py-0 w-full border-b border-slate-200 bg-white overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col lg:flex-row items-center justify-between py-12 lg:py-0 lg:min-h-[480px]">

          {/* Left Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center pr-0 lg:pr-12 xl:pr-20 z-10 py-0 lg:py-12">
            <div className="hero-anim mb-4">
              <ProductBreadcrumb
                breadcrumbs={[
                  // { name: 'Company', path: null },
                  { name: 'About Us', path: '/about' }
                ]}
              />
            </div>

            <div className="hero-anim inline-block mb-4 mt-2">
              <span className="text-[11px] font-bold tracking-widest text-primary-700 uppercase bg-slate-50 px-3 py-1 border border-slate-200 rounded-sm">
                {data.eyebrow}
              </span>
            </div>

            <h1 className="hero-anim text-3xl sm:text-4xl lg:text-[42px] leading-[1.2] font-bold text-slate-900 tracking-normal mb-5">
              {data.title}
            </h1>

            <p className="hero-anim text-base sm:text-lg text-slate-600 mb-8 max-w-xl leading-relaxed">
              {data.description}
            </p>

            <div className="hero-anim flex flex-wrap gap-4">
              <Link href={data.cta.primary.path} className="inline-flex items-center justify-center px-6 py-3 bg-primary-700 text-white font-medium text-sm transition-colors hover:bg-primary-800 rounded-sm shadow-sm">
                {data.cta.primary.label} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href={data.cta.secondary.path} className="inline-flex items-center justify-center px-6 py-3 bg-white text-slate-800 border border-slate-300 font-medium text-sm transition-colors hover:bg-slate-50 hover:border-slate-400 rounded-sm">
                {data.cta.secondary.label}
              </Link>
            </div>
          </div>

          {/* Industrial / Technical Product Visual */}
          <div className="w-full lg:w-1/2 h-[320px] sm:h-[400px] lg:h-[480px] relative mt-8 lg:mt-0 bg-slate-50/50 overflow-hidden border-l border-slate-200 rounded-bl-3xl lg:rounded-bl-none">
            {/* Subtle Blueprint Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#33415512_1px,transparent_1px),linear-gradient(to_bottom,#33415512_1px,transparent_1px)] bg-[size:32px_32px]"></div>

            {/* Animated Flange / Pipe Schematic */}
            <div className="absolute inset-0 flex items-center justify-center float-element">

              {/* Flange Body */}
              <div className="relative w-48 h-48 sm:w-72 sm:h-72 rounded-full border-[8px] sm:border-[12px] border-slate-200 shadow-xl bg-white flex items-center justify-center spin-slow-reverse">

                {/* Bolt Holes */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                  <div key={i} className="absolute inset-0 flex items-center justify-center" style={{ transform: `rotate(${deg}deg)` }}>
                    <div className="w-3 h-3 sm:w-5 sm:h-5 bg-slate-100 border border-slate-300 rounded-full shadow-inner -translate-y-20 sm:-translate-y-28"></div>
                  </div>
                ))}

                {/* Inner Bore & Bevel */}
                <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-full border-[4px] border-slate-300 bg-slate-100 flex items-center justify-center shadow-inner">
                  {/* The Pipe Opening */}
                  <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full border border-slate-400 bg-slate-800 flex items-center justify-center shadow-[inset_0_10px_20px_rgba(0,0,0,0.5)] pulse-dot">
                    {/* Deep Darkness inside pipe */}
                    <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-slate-900 blur-[2px]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Spec Cards (Matching real materials like SS 316L) */}
            <div className="float-element absolute top-6 right-6 sm:top-10 sm:right-10 bg-white/90 backdrop-blur-md p-4 rounded-xl border border-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.06)] flex flex-col min-w-[150px] z-20">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wider">SS 316L Specs</span>
              </div>
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Yield (MPa)</span>
                  <span className="font-mono font-bold text-slate-700">205+</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Tensile (MPa)</span>
                  <span className="font-mono font-bold text-slate-700">515+</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1">
                  <div className="h-full bg-primary-500 w-[90%] rounded-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Manufacturing Standards Card */}
            <div className="float-element absolute bottom-6 left-6 sm:bottom-10 sm:left-10 bg-white/90 backdrop-blur-md p-4 rounded-xl border border-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.06)] z-20" style={{ animationDelay: '0.8s' }}>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-mono font-bold mb-1 uppercase tracking-widest flex items-center">
                  <svg className="w-3 h-3 mr-1 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Tolerances
                </span>
                <span className="text-lg font-black text-slate-800 font-mono tracking-tighter">ASTM / ASME</span>
                <span className="text-[10px] text-slate-500 font-mono mt-1 font-semibold">B16.9 • B16.11</span>
              </div>
            </div>

            {/* Technical Sub-labels matching core supply */}
            <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-10 opacity-70 flex flex-col items-end z-10">
              <span className="text-[10px] font-mono font-bold text-slate-500 tracking-widest uppercase">CNC Machined</span>
              <span className="text-[9px] font-mono text-slate-400 mt-1 uppercase">Threaded / Buttweld / Flanges</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
