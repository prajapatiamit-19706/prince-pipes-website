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
  return (
    <div className="hero-anim opacity-0 translate-y-4 relative w-full h-[500px] lg:h-[700px] flex items-center justify-center mt-12 lg:mt-0">
      
      {/* Intricate CAD Blueprint Layer */}
      <HeroBlueprint />

      {/* 3D Canvas Container */}
      <div className="absolute inset-0 z-10">
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
      </div>

      {/* Technical Callouts Layer */}
      <HeroCallouts callouts={callouts} />
    </div>
  );
}
