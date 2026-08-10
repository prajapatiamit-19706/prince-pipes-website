"use client";
import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import manufacturingData from '@/data/manufacturing.json';
import * as Icons from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Not in the current @theme token file (which only defines primary/secondary/
// accent/neutrals/status) -- hardcoded here the same way the existing code
// already hardcodes GRID_LINE_COLOR. Add these as real tokens
// (--color-engineering-blue, --color-muted-green) if they should be reusable
// site-wide rather than local to this section.
const ENGINEERING_BLUE = "#5D7EA8";
const MUTED_GREEN = "#4D7A58";

export function Manufacturing() {
  const containerRef = useRef(null);
  // Default to the animated experience; only flip to the fallback if
  // matchMedia confirms reduced motion, and do it in a layout effect (runs
  // before paint) so there's no visible flash and -- more importantly -- no
  // post-paint height change that would desync ScrollTrigger's measurements
  // for this section or anything else on the page.
  const [reducedMotion, setReducedMotion] = useState(false);
  const steps = [...manufacturingData].sort((a, b) => a.order - b.order);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Safety net: if anything else on the page (images, fonts, other lazy
  // sections) shifts document height after this section's ScrollTrigger was
  // first measured, recalculate. Cheap and idempotent -- fine to call once
  // everything has settled.
  useEffect(() => {
    if (document.readyState === "complete") {
      ScrollTrigger.refresh();
    } else {
      window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
    }
  }, []);

  useGSAP(() => {
    if (reducedMotion) return; // fallback branch below handles this case, no ScrollTrigger needed

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${(steps.length - 1) * 100}%`,
        pin: true,
        scrub: 1,
        // Uncomment while debugging pin start/end positions:
        markers: true,
        invalidateOnRefresh: true,
      },
    });

    steps.forEach((step, i) => {
      if (i === 0) return;
      const prevStep = steps[i - 1];

      tl.addLabel(`step-${i}`, i - 1);

      tl.to(`.mfg-img-${prevStep.id}`, { opacity: 0, scale: 1.05, duration: 1, ease: "power2.inOut" }, `step-${i}`);
      tl.fromTo(
        `.mfg-img-${step.id}`,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.inOut" },
        `step-${i}`
      );

      tl.to(`.mfg-text-${prevStep.id}`, { opacity: 0, y: -40, duration: 0.5, ease: "power2.in" }, `step-${i}`);
      tl.fromTo(
        `.mfg-text-${step.id}`,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        `step-${i}+=0.5`
      );

      tl.to(".mfg-progress-fill", { width: `${(i / (steps.length - 1)) * 100}%`, duration: 1, ease: "none" }, `step-${i}`);

      tl.to(`.mfg-node-inactive-${prevStep.id}`, { opacity: 1, duration: 0.1 }, `step-${i}`);
      tl.to(`.mfg-node-active-${prevStep.id}`, { opacity: 0, duration: 0.1 }, `step-${i}`);
      tl.to(`.mfg-node-text-${prevStep.id}`, { opacity: 0.3, duration: 0.1 }, `step-${i}`);

      tl.to(`.mfg-node-inactive-${step.id}`, { opacity: 0, duration: 0.1 }, `step-${i}+=0.9`);
      tl.to(`.mfg-node-active-${step.id}`, { opacity: 1, duration: 0.1 }, `step-${i}+=0.9`);
      tl.to(`.mfg-node-text-${step.id}`, { opacity: 1, duration: 0.1 }, `step-${i}+=0.9`,);

      // Keep aria-current in sync with the visually active stage for screen readers.
      tl.call(() => {
        document.querySelectorAll('[data-mfg-node]').forEach((node) => {
          node.removeAttribute('aria-current');
        });
        document.querySelector(`[data-mfg-node="${step.id}"]`)?.setAttribute('aria-current', 'step');
      }, [], `step-${i}+=0.9`);
    });
  }, { scope: containerRef, dependencies: [reducedMotion] });

  // ---- Reduced-motion fallback: same content, no pin/scrub, normal stacked flow ----
  if (reducedMotion) {
    return (
      <section className="relative w-full bg-surface py-20 md:py-28 border-t border-border/40">
        <h2 className="sr-only">Our Manufacturing Process</h2>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase mb-12 flex items-center gap-3 text-primary">
            <span className="w-8 h-[1px] bg-primary" />
            Manufacturing Journey
          </span>
          <ol className="flex flex-col gap-16 md:gap-24">
            {steps.map((step) => {
              const StepIcon = Icons[step.icon] || Icons.Settings;
              return (
                <li key={step.id} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                    <Image src={step.image} alt={`${step.title} — Prince Pipes & Fittings manufacturing stage`} fill className="object-cover" loading="lazy" />
                  </div>
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-surface border border-border/50 text-primary font-mono font-bold text-xl">
                        {String(step.order).padStart(2, '0')}
                      </span>
                      <h3 className="font-heading font-bold text-2xl md:text-3xl text-text-primary">{step.title}</h3>
                    </div>
                    <p className="text-base text-text-secondary leading-relaxed mb-6">{step.description}</p>
                    <div className="inline-flex items-center gap-2 text-sm font-medium text-text-primary bg-surface-2/80 border border-border/50 rounded-lg px-3 py-2">
                      <StepIcon className="w-4 h-4 text-primary opacity-80" />
                      {step.qualityFocus}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    );
  }

  // ---- Full pinned/scrubbed cinematic experience ----
  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100dvh] bg-surface overflow-hidden border-t border-border/40"
      aria-label="Our manufacturing process"
    >
      <h2 className="sr-only">Our Manufacturing Process</h2>

      {/* Background CAD Grid Layer */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-multiply"
        style={{
          backgroundImage: `linear-gradient(${ENGINEERING_BLUE} 1px, transparent 1px), linear-gradient(90deg, ${ENGINEERING_BLUE} 1px, transparent 1px)`,
          backgroundSize: "4rem 4rem",
        }}
      />

      {/* Engineering Reference Circles */}
      <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vh] h-[60vh] rounded-full border-[1px] border-primary/10 pointer-events-none z-0" />
      <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vh] h-[90vh] rounded-full border-[1px] border-primary/5 pointer-events-none z-0" />

      {/* Coordinate tick marks along the left edge -- nod to "coordinate lines" in the brief */}
      <div aria-hidden="true" className="hidden md:flex absolute left-6 top-0 bottom-0 flex-col justify-between py-24 pointer-events-none z-0 opacity-[0.025]">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-2 h-px" style={{ background: MUTED_GREEN }} />
            <span className="font-mono text-[9px]" style={{ color: MUTED_GREEN }}>{String(i * 10).padStart(3, '0')}</span>
          </div>
        ))}
      </div>

      {/* Images Layer */}
      <div className="absolute inset-0 z-0 bg-surface">
        {steps.map((step, i) => (
          <div key={step.id} className={`absolute inset-0 mfg-img-${step.id} ${i === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <Image
              src={step.image}
              alt={`${step.title} — Prince Pipes & Fittings manufacturing stage`}
              fill
              className="object-cover md:object-right mix-blend-screen opacity-80"
              priority={i === 0}
              loading={i === 0 ? undefined : "lazy"}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/90 to-transparent hidden md:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/90 to-transparent md:hidden" />
          </div>
        ))}
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col pt-20 pb-12 md:py-24">
        <div className="flex flex-col max-w-3xl mb-auto">
          <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase mb-4 flex items-center gap-3 text-primary">
            <span className="w-8 h-[1px] bg-primary" />
            Manufacturing Journey
          </span>
        </div>

        <div className="relative flex-grow flex items-end md:items-center w-full md:w-3/5 lg:w-1/2 mb-16 md:mb-24">
          {steps.map((step, i) => {
            const StepIcon = Icons[step.icon] || Icons.Settings;
            return (
              <div key={step.id} className={`absolute w-full mfg-text-${step.id} ${i === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="flex items-center gap-4 mb-6 md:mb-8">
                  <span className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl bg-surface border border-border/50 shadow-[0_8px_30px_rgba(15,39,71,0.08)] text-primary font-mono font-bold text-2xl md:text-3xl">
                    {String(step.order).padStart(2, '0')}
                  </span>
                  <h3 className="font-heading font-bold text-3xl md:text-5xl text-text-primary leading-tight">
                    {step.title}
                  </h3>
                </div>

                <p className="text-base md:text-xl text-text-secondary leading-relaxed mb-8 md:mb-10 max-w-xl">
                  {step.description}
                </p>

                <div className="grid grid-cols-2 gap-4 max-w-md">
                  <div className="flex flex-col p-4 bg-surface-2/80 border border-border/50 rounded-lg backdrop-blur-sm">
                    <span className="text-[10px] md:text-xs font-semibold tracking-wider text-text-muted uppercase mb-1">Process Phase</span>
                    <span className="text-sm md:text-base font-medium text-text-primary flex items-center gap-2">
                      <StepIcon className="w-4 h-4 text-primary opacity-80" />
                      Phase {String(step.order).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flex flex-col p-4 bg-surface-2/80 border border-border/50 rounded-lg backdrop-blur-sm">
                    <span className="text-[10px] md:text-xs font-semibold tracking-wider text-text-muted uppercase mb-1">Quality Focus</span>
                    <span className="text-sm md:text-base font-medium text-text-primary flex items-center gap-2">
                      <Icons.ShieldCheck className="w-4 h-4 text-primary opacity-80" />
                      {step.qualityFocus}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Line */}
        <nav aria-label="Manufacturing stage progress" className="w-full mt-auto">
          <ol className="relative w-full h-[2px] bg-border/60 flex items-center justify-between">
            <div className="absolute top-0 left-0 h-full bg-primary mfg-progress-fill origin-left" style={{ width: '0%' }} aria-hidden="true" />

            {steps.map((step, i) => (
              <li
                key={step.id}
                data-mfg-node={step.id}
                aria-current={i === 0 ? 'step' : undefined}
                className="relative z-10 flex flex-col items-center"
              >
                <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-border bg-surface absolute -translate-y-1/2 mfg-node-inactive-${step.id} ${i === 0 ? 'opacity-0' : 'opacity-100'}`} aria-hidden="true" />
                <div
                  className={`w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-primary bg-primary absolute -translate-y-1/2 mfg-node-active-${step.id} ${i === 0 ? 'opacity-100' : 'opacity-0'}`}
                  style={{ boxShadow: `0 0 15px ${ENGINEERING_BLUE}66` }}
                  aria-hidden="true"
                />
                <div
                  className={`absolute top-4 md:top-6 whitespace-nowrap text-[10px] md:text-xs font-semibold tracking-widest uppercase mfg-node-text-${step.id} text-text-primary`}
                  style={{ opacity: i === 0 ? 1 : 0.3 }}
                >
                  <span className="hidden md:inline">{step.title}</span>
                  <span className="md:hidden">{step.title.split(' ')[0]}</span>
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}