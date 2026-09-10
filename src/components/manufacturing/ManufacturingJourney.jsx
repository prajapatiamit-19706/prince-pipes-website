"use client";
import React, { useRef, useState, useEffect } from 'react';
import manufacturingData from '@/data/manufacturing.json';

import { StickyViewport } from './StickyViewport';
import { HorizontalTrack } from './HorizontalTrack';
import { JourneyPanel } from './JourneyPanel';
import { BackgroundLayer } from './BackgroundLayer';
import { ProgressTimeline } from './ProgressTimeline';
import { MobileJourney } from './MobileJourney';
import { useManufacturingScroll } from './useManufacturingScroll';

function DesktopJourney({ steps }) {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);

  // Initialize the complex GSAP ScrollTrigger ONLY when desktop is mounted
  useManufacturingScroll(viewportRef, trackRef, steps, false);

  return (
    <div className="w-full manufacturing-journey-wrapper relative">
      <StickyViewport ref={viewportRef}>
        <BackgroundLayer />
        
        <div className="absolute top-12 md:top-24 left-6 md:left-12 z-20 pointer-events-none">
          <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase flex items-center gap-3 text-primary bg-surface/50 p-2 rounded-lg backdrop-blur-md shadow-sm">
            <span className="w-8 h-[1px] bg-primary" />
            Manufacturing Journey
          </span>
        </div>

        <HorizontalTrack ref={trackRef} style={{ width: `${steps.length * 100}vw` }}>
          {steps.map((step, i) => (
            <JourneyPanel key={step.id} step={step} index={i} />
          ))}
        </HorizontalTrack>
        
        <ProgressTimeline steps={steps} />
      </StickyViewport>
    </div>
  );
}

export function ManufacturingJourney() {
  const steps = [...manufacturingData].sort((a, b) => a.order - b.order);
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const mql = window.matchMedia('(min-width: 1024px)');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDesktop(mql.matches);
    
    const handler = (e) => setIsDesktop(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // During SSR and before hydration completes, render both (hidden via CSS)
  // to avoid hydration mismatch errors and layout shifts.
  if (!mounted) {
    return (
      <>
        <div className="hidden lg:block">
          <DesktopJourney steps={steps} />
        </div>
        <div className="block lg:hidden">
          <MobileJourney steps={steps} />
        </div>
      </>
    );
  }

  // After hydration, throw away the duplicate DOM completely!
  return isDesktop ? (
    <div className="hidden lg:block">
      <DesktopJourney steps={steps} />
    </div>
  ) : (
    <div className="block lg:hidden">
      <MobileJourney steps={steps} />
    </div>
  );
}
