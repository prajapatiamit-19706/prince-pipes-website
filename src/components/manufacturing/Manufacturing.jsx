"use client";
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import manufacturingData from '@/data/manufacturing.json';
import * as Icons from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const GRID_LINE_COLOR = "#7C3AED"; // Based on the previous section

export function Manufacturing() {
  const containerRef = useRef(null);
  const showcaseRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const steps = [...manufacturingData].sort((a, b) => a.order - b.order);
  const activeStep = steps[activeIndex];
  const ActiveIcon = Icons[activeStep.icon] || Icons.Settings;

  useGSAP(() => {
    // Reveal animation for the section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      }
    });

    tl.fromTo(".mfg-header", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
      .fromTo(".mfg-showcase", { opacity: 0, scale: 0.98, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
      .fromTo(".mfg-timeline", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
      .fromTo(".mfg-stats", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.2");

  }, { scope: containerRef });

  // Handle crossfade transitions when activeIndex changes
  useEffect(() => {
    if (!showcaseRef.current) return;

    // We animate the inner content of the showcase
    const elements = showcaseRef.current.querySelectorAll('.mfg-anim-element');
    const bgImage = showcaseRef.current.querySelector('.mfg-anim-image');

    gsap.fromTo(elements,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power2.out", overwrite: true }
    );

    gsap.fromTo(bgImage,
      { opacity: 0, scale: 1.05 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out", overwrite: true }
    );

  }, [activeIndex]);

  return (
    <section ref={containerRef} className="relative w-full bg-surface-2 overflow-hidden py-24 md:py-32 border-t border-border/40">

      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${GRID_LINE_COLOR} 1px, transparent 1px), linear-gradient(90deg, ${GRID_LINE_COLOR} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container-wide relative z-10 w-full px-4 md:px-8 mx-auto flex flex-col gap-12 md:gap-16">

        {/* Section Header */}
        <div className="mfg-header flex flex-col max-w-3xl opacity-0">
          <span className="text-sm font-semibold tracking-[0.2em] uppercase mb-4 flex items-center gap-3 text-primary">
            <span className="w-8 h-[1px] bg-primary" />
            Manufacturing Excellence
          </span>
          <h2 className="font-heading font-bold text-4xl md:text-5xl tracking-tight leading-tight mb-6 text-text-primary">
            From Raw Material to Precision Engineering
          </h2>
          <p className="text-lg leading-relaxed text-text-secondary">
            Every component is manufactured through a carefully controlled engineering process to ensure maximum quality and reliability.
          </p>
        </div>

        {/* Showcase Area */}
        <div className="mfg-showcase w-full opacity-0 rounded-3xl border border-border/50 bg-surface shadow-xl overflow-hidden flex flex-col lg:flex-row">

          {/* Left: Image area */}
          <div className="relative w-full lg:w-3/5 aspect-video lg:aspect-auto lg:h-[600px] overflow-hidden bg-black">
            <div ref={showcaseRef} className="absolute inset-0 w-full h-full">
              <Image
                key={`img-${activeStep.id}`}
                src={activeStep.image}
                alt={activeStep.title}
                fill
                className="mfg-anim-image object-cover opacity-80 mix-blend-screen"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/40 to-transparent lg:block hidden" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent lg:hidden block" />
            </div>

            {/* Blueprint overly on image */}
            <div className="absolute inset-0 bg-[url('/images/blueprint-pattern.png')] bg-repeat opacity-10 mix-blend-overlay pointer-events-none" />
          </div>

          {/* Right: Content area */}
          <div className="w-full lg:w-2/5 p-8 md:p-12 flex flex-col justify-center bg-surface relative z-10 lg:-ml-10">
            <div ref={showcaseRef} className="relative z-10 w-full">

              <div className="mfg-anim-element flex items-center gap-4 mb-6">
                <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary font-mono font-bold text-xl">
                  {String(activeStep.order).padStart(2, '0')}
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-wider uppercase">
                  <Icons.ShieldCheck className="w-3 h-3" />
                  {activeStep.certification}
                </span>
              </div>

              <h3 className="mfg-anim-element font-heading font-bold text-3xl md:text-4xl text-text-primary mb-6 leading-tight">
                {activeStep.title}
              </h3>

              <p className="mfg-anim-element text-text-secondary leading-relaxed text-base md:text-lg mb-8">
                {activeStep.description}
              </p>

              <div className="mfg-anim-element flex items-center gap-3 text-text-muted">
                <ActiveIcon className="w-6 h-6 opacity-50" />
                <span className="text-sm font-mono tracking-widest uppercase">System Phase {activeStep.order}</span>
              </div>

            </div>
          </div>
        </div>

        {/* Interactive Timeline */}
        <div className="mfg-timeline opacity-0 w-full">
          <div className="relative flex w-full overflow-x-auto pb-6 pt-2 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-border -translate-y-1/2 z-0 hidden md:block" />

            {/* Progress Line */}
            <div
              className="absolute top-1/2 left-0 h-[2px] bg-primary -translate-y-1/2 z-0 transition-all duration-500 ease-out hidden md:block"
              style={{ width: `${((activeIndex) / (steps.length - 1)) * 100}%` }}
            />

            <div className="flex justify-between w-full min-w-max md:min-w-0 gap-4 md:gap-0 relative z-10 px-2 md:px-0">
              {steps.map((step, index) => {
                const isActive = index === activeIndex;
                const isCompleted = index < activeIndex;
                const StepIcon = Icons[step.icon] || Icons.Settings;

                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveIndex(index)}
                    className={`group flex flex-col items-center gap-4 focus:outline-none snap-center transition-all duration-300 w-32 md:w-auto ${isActive ? 'scale-110' : 'hover:scale-105'} cursor-pointer`}
                    aria-label={`Go to step ${step.order}: ${step.title}`}
                    aria-current={isActive ? 'step' : undefined}
                  >
                    {/* Node */}
                    <div className={`relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-500 border-2
                      ${isActive ? 'bg-primary border-primary text-white shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]' :
                        isCompleted ? 'bg-surface border-primary text-primary' :
                          'bg-surface-2 border-border text-text-muted group-hover:border-primary/50 group-hover:text-primary'
                      }
                    `}>
                      <StepIcon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={isActive ? 2 : 1.5} />

                      {/* Blueprint circle on hover for inactive */}
                      {!isActive && (
                        <div className="absolute inset-0 rounded-full bg-[url('/images/blueprint-pattern.png')] bg-repeat opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                      )}
                    </div>

                    {/* Label */}
                    <div className="text-center w-full">
                      <div className="font-mono text-[10px] md:text-xs text-text-muted mb-1 tracking-widest uppercase">
                        Step {String(step.order).padStart(2, '0')}
                      </div>
                      <div className={`font-semibold text-xs md:text-sm line-clamp-2 transition-colors duration-300
                        ${isActive ? 'text-primary' : 'text-text-secondary group-hover:text-primary'}
                      `}>
                        {step.title}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Manufacturing Statistics */}
        <div className="mfg-stats opacity-0 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-8 border-t border-border">
          {[
            { label: "Manufacturing Capacity", value: "300K+", suffix: " MT" },
            { label: "Years of Experience", value: "30+", suffix: "" },
            { label: "Quality Inspection", value: "100%", suffix: " Tested" },
            { label: "Countries Served", value: "20+", suffix: "" }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="font-heading font-bold text-3xl md:text-4xl text-text-primary">
                {stat.value}<span className="text-xl md:text-2xl text-primary">{stat.suffix}</span>
              </div>
              <div className="text-sm font-medium text-text-secondary uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
