"use client";
import React, { forwardRef } from 'react';

export const StickyViewport = forwardRef(({ children }, ref) => {
  return (
    <section 
      ref={ref} 
      className="relative w-full h-[100dvh] overflow-hidden border-t border-border/40 bg-surface"
      aria-label="Our manufacturing process"
    >
      <h2 className="sr-only">Our Manufacturing Process</h2>
      {children}
    </section>
  );
});
StickyViewport.displayName = 'StickyViewport';
