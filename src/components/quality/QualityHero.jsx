'use client';
import React, { useRef } from 'react';
import { ProductBreadcrumb } from '@/components/product/ProductBreadcrumb';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function QualityHero({ data }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo('.hero-anim',
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
    );

    gsap.fromTo('.technical-line',
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: 'power3.inOut', delay: 0.3 }
    );

    // Continuous "live" animations for the technical visual
    gsap.to('.spin-slow', { rotation: 360, duration: 25, repeat: -1, ease: 'linear' });
    gsap.to('.spin-slow-reverse', { rotation: -360, duration: 35, repeat: -1, ease: 'linear' });
    gsap.fromTo('.scanner-line',
      { yPercent: -100 },
      { yPercent: 100, duration: 2.5, repeat: -1, ease: 'linear', yoyo: true }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full border-b border-slate-200 bg-white overflow-hidden pt-4 md:pt-6 pb-8 md:pb-12 lg:pb-20">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-60"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-start justify-between">

          {/* Left Content */}
          <div className="w-full lg:w-2/3 max-w-3xl">
            <div className="hero-anim mb-6">
              <ProductBreadcrumb breadcrumbs={data.breadcrumb.map(b => ({ name: b.label || b.name, path: b.href || b.path }))} />
            </div>

            <div className="hero-anim inline-flex items-center space-x-3 mb-4 mt-2">
              <div className="w-8 h-[1px] bg-primary-600 technical-line origin-left"></div>
              <span className="text-[11px] font-bold tracking-widest text-primary-700 uppercase">
                {data.eyebrow}
              </span>
            </div>

            <h1 className="hero-anim text-3xl sm:text-4xl lg:text-[42px] leading-[1.2] font-bold text-slate-900 tracking-tight mb-5">
              {data.title}
            </h1>

            <p className="hero-anim text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              {data.description}
            </p>

            <ul className="hero-anim mt-8 flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm font-semibold text-slate-700">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                100% Traceability
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                Zero Defect Policy
              </li>
            </ul>

            <div className="hero-anim mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white px-7 py-3 rounded-[6px] font-medium tracking-wide transition-colors"
              >
                Explore Products
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-quote-modal'))}
                className="inline-flex items-center justify-center bg-white border border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700 px-7 py-3 rounded-[6px] font-medium tracking-wide transition-all"
              >
                Request a Quote
              </button>
            </div>
          </div>

          {/* Right Visual Accent / Technical Detail */}
          <div className="w-full lg:w-1/2 lg:pl-10 mt-12 lg:mt-16 flex justify-center lg:justify-end relative">

            {/* The Main Scanner Graphic Container */}
            <div className="relative w-full max-w-[360px] aspect-square rounded-full border border-slate-200/60 bg-slate-50/50 flex items-center justify-center p-6">

              {/* Decorative Rings */}
              <div className="absolute inset-0 rounded-full border-[1px] border-dashed border-slate-300 spin-slow opacity-60"></div>
              <div className="absolute inset-4 rounded-full border-[1px] border-slate-200 spin-slow-reverse opacity-70"></div>

              {/* Center Target/Crosshair */}
              <div className="hero-anim relative w-full h-full rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center overflow-hidden">
                {/* Grid inside target */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:16px_16px] opacity-60"></div>

                {/* Center "Fitting" shape (geometric abstraction) */}
                <div className="w-28 h-28 sm:w-36 sm:h-36 border-4 border-slate-800 rounded-sm relative z-10 flex items-center justify-center bg-slate-50">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-slate-800 rounded-full relative overflow-hidden flex items-center justify-center">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-800 rounded-full"></div>
                    {/* Scanner Line */}
                    <div className="absolute inset-0 scanner-line">
                      <div className="w-full h-0.5 sm:h-1 bg-primary-500 shadow-[0_0_8px_rgba(37,99,235,0.8)]"></div>
                      <div className="w-full h-full bg-primary-500/10"></div>
                    </div>
                  </div>
                </div>

                {/* Crosshairs */}
                <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-slate-300"></div>
                <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-slate-300"></div>
              </div>

              {/* Floating Data Badge 1 */}
              <div className="hero-anim absolute -right-4 sm:-right-8 top-12 bg-white border border-slate-200 p-3 rounded-sm shadow-lg flex flex-col z-20 min-w-[130px]">
                <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1.5">PMI Analysis</span>
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-600">Ni (%)</span>
                  <span className="text-emerald-600 font-bold">10.2 PASS</span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono mt-1">
                  <span className="text-slate-600">Cr (%)</span>
                  <span className="text-emerald-600 font-bold">16.4 PASS</span>
                </div>
              </div>

              {/* Floating Data Badge 2 */}
              <div className="hero-anim absolute -left-4 sm:-left-12 bottom-16 bg-white border border-slate-200 p-3 rounded-sm shadow-lg flex flex-col z-20">
                <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-2">Dimensional</span>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                    <span className="text-[10px] font-mono font-bold text-slate-800">±0.1</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wide">Tolerance</span>
                    <span className="text-[9px] text-emerald-500 font-mono font-bold mt-0.5 tracking-wider">VERIFIED</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
