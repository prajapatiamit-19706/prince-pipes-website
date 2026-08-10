"use client";
import React, { useRef, useState, useLayoutEffect } from 'react';
import manufacturingData from '@/data/manufacturing.json';

import { StickyViewport } from './StickyViewport';
import { HorizontalTrack } from './HorizontalTrack';
import { JourneyPanel } from './JourneyPanel';
import { BackgroundLayer } from './BackgroundLayer';
import { ProgressTimeline } from './ProgressTimeline';
import { MobileJourney } from './MobileJourney';
import { useManufacturingScroll } from './useManufacturingScroll';

export function ManufacturingJourney() {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  
  const [shouldUseFallback, setShouldUseFallback] = useState(false);
  const steps = [...manufacturingData].sort((a, b) => a.order - b.order);

  useLayoutEffect(() => {
    // Determine if we should use the mobile/reduced-motion fallback
    const checkFallback = () => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isMobile = window.matchMedia("(max-width: 1024px)").matches;
      setShouldUseFallback(reducedMotion || isMobile);
    };

    checkFallback();
    window.addEventListener("resize", checkFallback);
    return () => window.removeEventListener("resize", checkFallback);
  }, []);

  // Initialize the complex GSAP ScrollTrigger
  useManufacturingScroll(viewportRef, trackRef, steps, shouldUseFallback);

  if (shouldUseFallback) {
    return <MobileJourney steps={steps} />;
  }

  return (
    <div className="w-full manufacturing-journey-wrapper relative">
      <StickyViewport ref={viewportRef}>
        <BackgroundLayer />
        
        {/* Absolute positioning header for the whole section */}
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
