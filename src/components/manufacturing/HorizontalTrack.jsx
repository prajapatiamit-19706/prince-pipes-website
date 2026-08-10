"use client";
import React, { forwardRef } from 'react';

export const HorizontalTrack = forwardRef(({ children, style }, ref) => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <div ref={ref} className="h-full flex will-change-transform" style={style}>
        {children}
      </div>
    </div>
  );
});
HorizontalTrack.displayName = 'HorizontalTrack';
