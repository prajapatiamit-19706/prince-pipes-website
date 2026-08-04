import React from "react";

export function CTABlueprint() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#FCFCFA]">

      {/* 1-2% Blueprint paper texture */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
        <filter id="cta-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#cta-noise)" />
      </svg>

      {/* Step 2: Muted Grid (< 3% Opacity) */}
      <div className="cta-bg-grid opacity-0 absolute inset-0">
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <pattern id="cta-blueprint-grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#142E57" strokeWidth="0.75" />
            </pattern>
            <pattern id="cta-blueprint-grid-large" width="150" height="150" patternUnits="userSpaceOnUse">
              <rect width="150" height="150" fill="url(#cta-blueprint-grid)" />
              <path d="M 150 0 L 0 0 0 150" fill="none" stroke="#142E57" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-blueprint-grid-large)" />

          <g stroke="#142E57" strokeWidth="1" fill="none" className="font-mono text-[9px] md:text-[10px]">
            {/* Coordinates */}
            <text x="12.5%" y="18" fill="#142E57" stroke="none" textAnchor="middle">1</text>
            <text x="37.5%" y="18" fill="#142E57" stroke="none" textAnchor="middle">2</text>
            <text x="62.5%" y="18" fill="#142E57" stroke="none" textAnchor="middle">3</text>
            <text x="87.5%" y="18" fill="#142E57" stroke="none" textAnchor="middle">4</text>
            
            <text x="18" y="12.5%" fill="#142E57" stroke="none" dominantBaseline="middle">A</text>
            <text x="18" y="37.5%" fill="#142E57" stroke="none" dominantBaseline="middle">B</text>
            <text x="18" y="62.5%" fill="#142E57" stroke="none" dominantBaseline="middle">C</text>
            <text x="18" y="87.5%" fill="#142E57" stroke="none" dominantBaseline="middle">D</text>

            <line x1="30" y1="0" x2="30" y2="100%" strokeDasharray="2 4" strokeWidth="0.5" />
            <line x1="0" y1="30" x2="100%" y2="30" strokeDasharray="2 4" strokeWidth="0.5" />
          </g>
        </svg>
      </div>

      {/* Radial soft lighting */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,_rgba(255,255,255,0.95)_0%,_transparent_75%)] opacity-80" />

    </div>
  );
}