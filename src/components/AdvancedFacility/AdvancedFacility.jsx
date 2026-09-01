"use client";
import React, { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import machinesData from '@/data/machines.json';
import { Flame, Hammer, Settings, Cog, Zap, Wrench, Factory, ShieldCheck, Microscope, ScanSearch, Gauge, ScanEye, Activity, Droplets } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const GRID_LINE_COLOR = "#7C3AED"; // Brand accent grid color

const IconMap = { Flame, Hammer, Settings, Cog, Zap, Wrench, Factory, ShieldCheck, Microscope, ScanSearch, Gauge, ScanEye, Activity, Droplets };

function EquipmentPanel({ title, iconName, machines }) {
  const panelRef = useRef(null);
  const infoRef = useRef(null);
  const timerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const sortedMachines = [...machines].sort((a, b) => a.order - b.order);
  const activeMachine = sortedMachines[activeIndex];
  const PanelIcon = IconMap[iconName] || Settings;

  // Handle crossfade
  useEffect(() => {
    if (!infoRef.current) return;
    const elements = infoRef.current.querySelectorAll('.machine-anim-element');
    gsap.fromTo(elements,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out", overwrite: true }
    );
  }, [activeIndex]);

  // Handle auto-rotation
  const nextMachine = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % sortedMachines.length);
  }, [sortedMachines.length]);

  useEffect(() => {
    let intervalId;
    let isIntersecting = false;

    const observer = new IntersectionObserver((entries) => {
      isIntersecting = entries[0].isIntersecting;
    }, { threshold: 0.1 });

    if (panelRef.current) {
      observer.observe(panelRef.current);
    }

    if (!isHovering && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      intervalId = setInterval(() => {
        if (isIntersecting) {
          nextMachine();
        }
      }, 4500);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      observer.disconnect();
    };
  }, [isHovering, nextMachine]);

  return (
    <div
      ref={panelRef}
      className="flex flex-col bg-surface rounded-3xl border border-border/50 shadow-[0_8px_30px_rgba(15,39,71,0.04)] overflow-hidden h-full transition-shadow duration-500 hover:shadow-[0_8px_30px_rgba(15,39,71,0.08)] hover:border-border"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Panel Header */}
      <div className="flex items-center gap-4 p-6 border-b border-border/50 bg-surface-2/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-50" />
        <div className="relative z-10 w-12 h-12 rounded-xl bg-primary text-white shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)] flex items-center justify-center">
          <PanelIcon className="w-6 h-6" />
        </div>
        <h3 className="relative z-10 font-heading font-bold text-2xl text-text-primary tracking-tight">{title}</h3>
      </div>

      <div className="flex flex-col md:flex-row flex-grow">
        {/* Left: Shared Info Panel */}
        <div className="w-full md:w-5/12 p-6 md:p-8 border-b md:border-b-0 md:border-r border-border/50 bg-surface relative">
          <div className="absolute inset-0 bg-[url('/images/blueprint-pattern.webp')] bg-repeat opacity-5 pointer-events-none" />
          <div ref={infoRef} className="relative z-10 flex flex-col h-full justify-center min-h-[160px]">
            <span className="machine-anim-element font-mono text-[10px] md:text-xs tracking-widest uppercase text-primary mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Module // {String(activeMachine.order).padStart(2, '0')}
            </span>
            <h4 className="machine-anim-element font-heading font-semibold text-xl md:text-2xl text-text-primary mb-3">
              {activeMachine.name}
            </h4>
            <p className="machine-anim-element text-sm text-text-secondary leading-relaxed">
              {activeMachine.purpose}
            </p>
          </div>
        </div>

        {/* Right: Chip Grid */}
        <div className="w-full md:w-7/12 p-6 md:p-8 bg-surface-2/30">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sortedMachines.map((machine, idx) => {
              const isActive = idx === activeIndex;
              const MachineIcon = IconMap[machine.icon] || Settings;

              return (
                <button
                  key={machine.id}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => setActiveIndex(idx)}
                  className={`
                    relative group flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-300 transform-gpu
                    ${isActive
                      ? 'bg-primary border-primary shadow-[0_4px_20px_rgba(var(--primary-rgb),0.25)] scale-[1.02]'
                      : 'bg-surface border-border hover:border-primary/30 hover:bg-surface-2'
                    }
                  `}
                >
                  <div className={`
                    flex items-center justify-center w-8 h-8 rounded-lg transition-colors duration-300
                    ${isActive ? 'bg-white/20 text-white' : 'bg-surface-2 text-text-muted group-hover:text-primary'}
                  `}>
                    <MachineIcon className={`w-4 h-4 transition-transform duration-500 ${isActive ? 'rotate-12 scale-110' : ''}`} />
                  </div>
                  <span className={`
                    font-medium text-sm transition-colors duration-300 line-clamp-1
                    ${isActive ? 'text-white' : 'text-text-secondary group-hover:text-text-primary'}
                  `}>
                    {machine.name}
                  </span>

                  {/* Active Indicator Strip */}
                  <div className={`
                    absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-white rounded-r-full transition-all duration-300 transform-gpu
                    ${isActive ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}
                  `} />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdvancedFacility() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });

    tl.fromTo(".adv-header", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
      .fromTo(".adv-panel", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out" }, "-=0.4");
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full bg-background overflow-hidden py-8 md:py-6 md:py-10 lg:py-16 lg:py-10 md:py-6 md:py-10 lg:py-16 lg:py-24">

      {/* Blueprint Grid Backdrop */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${GRID_LINE_COLOR} 1px, transparent 1px), linear-gradient(90deg, ${GRID_LINE_COLOR} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container-wide relative z-10 w-full px-4 md:px-8 mx-auto">

        {/* Section Header */}
        <div className="adv-header flex flex-col items-center text-center max-w-3xl mx-auto mb-6 md:mb-10 lg:mb-16 opacity-0">
          <span className="text-sm font-semibold tracking-[0.2em] uppercase mb-4 flex items-center justify-center gap-3 text-primary">
            <span className="w-8 h-[1px] bg-primary" />
            Advanced Manufacturing Facility
            <span className="w-8 h-[1px] bg-primary" />
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight mb-6 text-text-primary">
            Modern Equipment. <br className="hidden sm:block" /> Precision Manufacturing.
          </h2>
          <p className="text-lg leading-relaxed text-text-secondary">
            State-of-the-art production and inspection equipment ensuring consistent engineering quality across our entire product range.
          </p>
        </div>

        {/* Equipment Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          <div className="adv-panel opacity-0 h-full">
            <EquipmentPanel
              title="Manufacturing Equipment"
              iconName="Factory"
              machines={machinesData.manufacturing}
            />
          </div>
          <div className="adv-panel opacity-0 h-full">
            <EquipmentPanel
              title="Testing Equipment"
              iconName="Microscope"
              machines={machinesData.testing}
            />
          </div>
        </div>

      </div>
    </section>
  );
}

