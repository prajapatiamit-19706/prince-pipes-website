"use client";
import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import whyChooseData from '@/data/whyChoose.json';
import { Cpu, ShieldCheck, Layers, Globe, Microscope, Truck, HelpCircle, ArrowUpRight } from 'lucide-react';

const IconMap = { Cpu, ShieldCheck, Layers, Globe, Microscope, Truck, HelpCircle, ArrowUpRight };

gsap.registerPlugin(ScrollTrigger);

// ---------------------------------------------------------------------------
// Verified, source-of-record facts only. Do NOT add claims here (years in
// business, certifications, client counts) that aren't confirmed by the
// client -- see company.json / catalogue extraction notes.
// ---------------------------------------------------------------------------
const CREDENTIALS = [
  { value: 2022, label: "Established", isYear: true },
  { value: 5, label: "Product Categories", suffix: "" },
  { value: 25, label: "Catalogue Products", suffix: "+" },
];

const REGISTRATIONS = ["Make in India", "MSME Registered"];

// TEMPORARY PLACEHOLDER IMAGE -- not the client's real facility.
// Replace with actual Prince Pipes & Fittings factory photography before
// this section ships to production. Do not caption/alt-text this as a real
// facility photo until it's swapped for a genuine image.
const PLACEHOLDER_FACTORY_IMAGE =
  "/images/why-choose/indian-factory-real.webp";

// Grid line color is NOT in the supplied @theme token file (no purple token
// exists there -- only primary/secondary/accent/neutrals/status). Using an
// arbitrary value here as a placeholder. If you want this as a real reusable
// token, add e.g. `--color-grid-line: #7C3AED;` to @theme and swap the
// arbitrary hex below for `bg-grid-line` / `text-grid-line`.
const GRID_LINE_COLOR = "#7C3AED";

function StatCounter({ value, suffix = "", isYear = false }) {
  const ref = useRef(null);

  useGSAP(() => {
    const el = ref.current;
    const obj = { val: isYear ? value - 6 : 0 };
    gsap.to(obj, {
      val: value,
      duration: 1.4,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 85%" },
      onUpdate: () => {
        el.textContent = Math.round(obj.val) + suffix;
      },
    });
  }, { scope: ref });

  return <span ref={ref} className="font-mono tabular-nums">0{suffix}</span>;
}

function InspectionRow({ item, index }) {
  const Icon = IconMap[item.icon] || HelpCircle;

  return (
    <div className="inspection-row group relative py-8 md:py-10 border-b border-border last:border-b-0">
      <div className="flex items-start gap-6 md:gap-10">
        {/* Bracket-marked icon target */}
        <div className="relative shrink-0 w-16 h-16 md:w-20 md:h-20">
          <span className="absolute -top-0.5 -left-0.5 w-3 h-3 border-t-2 border-l-2 border-secondary opacity-0 -translate-x-1 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 border-t-2 border-r-2 border-secondary opacity-0 translate-x-1 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
          <span className="absolute -bottom-0.5 -left-0.5 w-3 h-3 border-b-2 border-l-2 border-secondary opacity-0 -translate-x-1 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 border-b-2 border-r-2 border-secondary opacity-0 translate-x-1 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />

          <div className="w-full h-full rounded-lg bg-surface-2 border border-border flex items-center justify-center text-text-secondary transition-colors duration-300 group-hover:text-secondary group-hover:border-secondary/40 overflow-hidden">
            <Icon className="w-7 h-7 md:w-8 md:h-8" strokeWidth={1.5} />
            {/* Scan-line sweep */}
            <span className="absolute inset-x-0 top-0 h-[2px] bg-secondary/80 -translate-y-full group-hover:translate-y-[400%] transition-transform duration-700 ease-in-out" />
          </div>
        </div>

        <div className="flex-1 min-w-0 pt-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-xs text-accent tracking-widest">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="font-heading font-semibold text-lg md:text-xl text-text transition-colors duration-300 group-hover:text-secondary">
              {item.title}
            </h3>
          </div>
          <p className="text-text-secondary leading-relaxed text-sm md:text-base max-w-xl">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function WhyChoose({ catalogStats }) {
  const containerRef = useRef(null);

  // Use dynamic stats if provided, otherwise fallback to defaults
  const dynamicCredentials = [
    { value: 2022, label: "Established", isYear: true },
    { value: catalogStats?.totalCategories || 5, label: "Product Categories", suffix: "" },
    { value: catalogStats?.totalProducts || 25, label: "Catalogue Products", suffix: "+" },
  ];

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
    });

    tl.fromTo(".wc-hero-content", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
      .fromTo(".wc-panel", { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
      .fromTo(".inspection-row", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" }, "-=0.5");
  }, { scope: containerRef });

  const items = [...whyChooseData].sort((a, b) => a.order - b.order);

  return (
    <section ref={containerRef} className="relative w-full bg-background overflow-hidden">
      {/* Purple checked grid backdrop -- covers the whole section (white areas only;
          the hero image below is opaque and simply sits on top of it) */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${GRID_LINE_COLOR} 1px, transparent 1px), linear-gradient(90deg, ${GRID_LINE_COLOR} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* ---- Full-bleed hero image band (edge-to-edge, no side margin) ---- */}
      <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
        <div className="relative w-full aspect-[16/7] md:aspect-[21/8] min-h-[420px]">
          <Image
            src={PLACEHOLDER_FACTORY_IMAGE}
            alt="Placeholder factory image — temporary, replace with real facility photography"
            fill
            className="object-cover"
            sizes="100vw"
          />
          {/* Subtle neutral overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: `linear-gradient(${GRID_LINE_COLOR} 1px, transparent 1px), linear-gradient(90deg, ${GRID_LINE_COLOR} 1px, transparent 1px)`,
              backgroundSize: "48px 48px",
            }}
          />

          {/* Heading content, container-constrained inside the full-bleed band */}
          <div className="absolute inset-0 flex items-center">
            <div className="container-wide w-full px-4 md:px-8 mx-auto">
              <div className="wc-hero-content max-w-2xl opacity-0">
                <span className="text-sm font-semibold tracking-[0.2em] uppercase mb-4 flex items-center gap-3 text-accent">
                  <span className="w-8 h-[1px] bg-accent" />
                  Built To Spec
                </span>
                <h2 className="font-heading font-bold text-4xl md:text-5xl tracking-tight leading-tight mb-6 text-text-white">
                  Why Choose Prince Pipes & Fittings
                </h2>
                <p className="text-lg leading-relaxed text-text-white/80">
                  A Mumbai-based fittings manufacturer built on getting the fundamentals
                  right — accurate specs, consistent supply, and a catalogue you can
                  actually verify against source standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---- Rest of section: white + purple grid backdrop ---- */}
      <div className="container-wide relative z-10 w-full px-4 md:px-8 mx-auto py-8 md:py-6 md:py-10 lg:py-16 lg:py-10 md:py-6 md:py-10 lg:py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 md:gap-10 lg:gap-16">
          {/* Left: Company Record card -- same position as before, re-themed light */}
          <div className="wc-panel lg:col-span-4 opacity-0">
            <div className="sticky top-24 rounded-2xl border border-border bg-surface p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-8">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="font-mono text-xs tracking-widest uppercase text-text-secondary">
                  Company Record
                </span>
              </div>

              <div className="space-y-6 mb-8">
                {dynamicCredentials.map((c) => (
                  <div key={c.label}>
                    <div className="font-heading font-bold text-3xl md:text-4xl text-text">
                      <StatCounter value={c.value} suffix={c.suffix || ""} isYear={c.isYear} />
                    </div>
                    <div className="text-sm mt-1 text-text-secondary">{c.label}</div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-border mb-6">
                <div className="flex flex-wrap gap-2">
                  {REGISTRATIONS.map((r) => (
                    <span
                      key={r}
                      className="font-mono text-xs px-3 py-1.5 rounded-full border border-secondary/35 bg-secondary/5 text-secondary"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              {/* Functional CTA -- ties into the gated Technical Resources /
                  Downloads pattern already defined in navigation.json, rather
                  than adding decorative-only filler. */}
              <a
                href="technical-resources/dimension-charts"
                className="group flex items-center justify-between w-full rounded-lg border border-border bg-surface-2 px-4 py-3.5 transition-colors duration-300 hover:border-secondary/50 hover:bg-secondary/5"
              >
                <span className="text-sm font-medium text-text">
                  Request Technical Data Sheet
                </span>
                <ArrowUpRight className="w-4 h-4 text-text-secondary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-secondary" />
              </a>
            </div>

            {/* Decorative blueprint line illustration -- fills the remaining
                sticky-column height below the card as the page scrolls past
                it, instead of leaving bare grid background. Abstract
                engineering-drawing style, no fabricated dimensions labeled. */}
            <div className="hidden lg:block mt-8 rounded-2xl border border-border/60 bg-surface/40 p-8">
              <svg viewBox="0 0 280 200" className="w-full h-auto" fill="none">
                {/* center line */}
                <line x1="20" y1="100" x2="260" y2="100" stroke={GRID_LINE_COLOR} strokeOpacity="0.25" strokeDasharray="6 4" strokeWidth="1" />

                {/* pipe body */}
                <rect x="40" y="78" width="200" height="44" rx="2" stroke="#0f2747" strokeOpacity="0.35" strokeWidth="1.5" />

                {/* thread hatching, left end */}
                {Array.from({ length: 7 }).map((_, i) => (
                  <line key={`l-${i}`} x1={44 + i * 5} y1="78" x2={44 + i * 5 - 6} y2="122" stroke="#0f2747" strokeOpacity="0.25" strokeWidth="1" />
                ))}
                {/* thread hatching, right end */}
                {Array.from({ length: 7 }).map((_, i) => (
                  <line key={`r-${i}`} x1={236 - i * 5} y1="78" x2={236 - i * 5 + 6} y2="122" stroke="#0f2747" strokeOpacity="0.25" strokeWidth="1" />
                ))}

                {/* dimension line: length */}
                <line x1="40" y1="150" x2="240" y2="150" stroke={GRID_LINE_COLOR} strokeOpacity="0.5" strokeWidth="1" />
                <line x1="40" y1="144" x2="40" y2="156" stroke={GRID_LINE_COLOR} strokeOpacity="0.5" strokeWidth="1" />
                <line x1="240" y1="144" x2="240" y2="156" stroke={GRID_LINE_COLOR} strokeOpacity="0.5" strokeWidth="1" />
                <text x="140" y="168" textAnchor="middle" className="font-mono" fontSize="10" fill={GRID_LINE_COLOR} fillOpacity="0.6">L</text>

                {/* dimension line: diameter */}
                <line x1="16" y1="78" x2="16" y2="122" stroke={GRID_LINE_COLOR} strokeOpacity="0.5" strokeWidth="1" />
                <line x1="10" y1="78" x2="22" y2="78" stroke={GRID_LINE_COLOR} strokeOpacity="0.5" strokeWidth="1" />
                <line x1="10" y1="122" x2="22" y2="122" stroke={GRID_LINE_COLOR} strokeOpacity="0.5" strokeWidth="1" />
                <text x="16" y="42" textAnchor="middle" className="font-mono" fontSize="10" fill={GRID_LINE_COLOR} fillOpacity="0.6">D</text>
              </svg>
              <p className="font-mono text-[11px] tracking-widest uppercase text-text-muted mt-4 text-center">
                Dimensions available on request
              </p>
            </div>
          </div>

          {/* Right: capability list as inspection line items */}
          <div className="lg:col-span-8">
            {items.map((item, i) => (
              <InspectionRow key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}