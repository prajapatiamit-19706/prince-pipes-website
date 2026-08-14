"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { HeroCallouts } from "./HeroCallouts";

// Dynamically import Scene3D with SSR disabled to avoid hydration mismatch and save initial bundle size
const Scene3D = dynamic(() => import("./3d/Scene3D"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin opacity-50 mb-4" />
      <span className="text-sm font-medium text-text-muted">Loading 3D Product...</span>
    </div>
  ),
});

import { HeroBlueprint } from "./HeroBlueprint";

export function HeroScene({ callouts }) {
  const [shouldLoad3D, setShouldLoad3D] = React.useState(false);

  React.useEffect(() => {
    let idleCallbackId;
    let fallbackTimeoutId;

    const init3D = () => {
      // Check if component is still mounted and tab is visible
      if (document.visibilityState === 'visible') {
        setShouldLoad3D(true);
      } else {
        // If tab is hidden, wait until it becomes visible
        document.addEventListener('visibilitychange', function onVisibilityChange() {
          if (document.visibilityState === 'visible') {
            setShouldLoad3D(true);
            document.removeEventListener('visibilitychange', onVisibilityChange);
          }
        });
      }
    };
    
    // Genuine deferral: wait for the browser to be completely idle
    // No short timeout fallback that forces execution during hydration
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      idleCallbackId = window.requestIdleCallback(init3D);
    } else {
      // Very safe fallback for browsers without requestIdleCallback (e.g. Safari)
      // 5 seconds guarantees hydration and initial GSAP animations are finished
      fallbackTimeoutId = setTimeout(init3D, 5000);
    }

    return () => {
      if (idleCallbackId && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleCallbackId);
      }
      if (fallbackTimeoutId) {
        clearTimeout(fallbackTimeoutId);
      }
    };
  }, []);

  return (
    <div className="hero-anim opacity-0 translate-y-4 relative w-full h-[500px] lg:h-[700px] flex items-center justify-center mt-12 lg:mt-0">
      
      {/* Intricate CAD Blueprint Layer */}
      <HeroBlueprint />

      {/* 3D Canvas Container */}
      <div className="absolute inset-0 z-10">
        {shouldLoad3D ? (
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        ) : (
          <div className="flex flex-col items-center justify-center h-full w-full">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin opacity-50 mb-4" />
            <span className="text-sm font-medium text-text-muted">Loading 3D Product...</span>
          </div>
        )}
      </div>

      {/* Technical Callouts Layer */}
      <HeroCallouts callouts={callouts} />
    </div>
  );
}
