"use client";
import React, { useRef } from 'react';
import Image from 'next/image';

export function CTADrawing() {
  const svgRef = useRef(null);

  return (
    <div className="relative w-full flex items-center justify-center group cursor-crosshair px-2 sm:px-0 max-w-[1200px] mx-auto">
      {/* Optimized Next.js Image extracted from SVG */}
      <div className="absolute top-[20%] left-[10%] w-[80%] h-[55.5%] z-0 pointer-events-none">
        <Image 
          src="/images/CTA/finalCTA.png"
          alt="Threaded Barrel Nipple Engineering Drawing"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 960px"
        />
      </div>

      <svg
        ref={svgRef}
        viewBox="0 0 1200 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full h-auto transition-all duration-500 pointer-events-auto"
      >
        <g stroke="#142E57" strokeLinecap="round" strokeLinejoin="round" className="font-mono text-[20px]">

          {/* Main Drawing Title */}
          <g className="draw-notes transition-opacity duration-700 max-sm:translate-x-[60px]">
            <text x="80" y="90" className="font-bold text-[20px] fill-[#142E57] uppercase tracking-widest" stroke="none">Engineering Drawing</text>
            <text x="80" y="140" className="font-bold text-[45px] tracking-wide fill-[#142E57]" stroke="none">THREADED BARREL NIPPLE</text>
          </g>

          {/* The static image replacement has been moved outside the SVG to utilize Next.js Image optimization */}
          
          {/* Title Block (Border: #22406B, Text: #142E57) */}
          <g className="draw-titleblock transition-opacity duration-500 group-hover:opacity-100 max-sm:-translate-x-[150px] max-sm:translate-y-[20px]" strokeWidth="0.75" stroke="#22406B" fill="none">
            <rect x="680" y="700" width="480" height="180" fill="#FFFFFF" />

            <line x1="680" y1="730" x2="1160" y2="730" />
            <line x1="680" y1="760" x2="1160" y2="760" />
            <line x1="680" y1="790" x2="1160" y2="790" />
            <line x1="680" y1="820" x2="1160" y2="820" />
            <line x1="680" y1="850" x2="1160" y2="850" />

            <line x1="810" y1="700" x2="810" y2="850" />
            <line x1="1000" y1="820" x2="1000" y2="880" />

            <g fill="#142E57" stroke="none" className="text-[16px]">
              <text x="690" y="722" className="fill-[#142E57]">DRAWING NO</text>
              <text x="820" y="722" className="font-bold text-[20px]">PPF-BN-001</text>

              <text x="690" y="752" className="fill-[#142E57]">PART NAME</text>
              <text x="820" y="752" className="font-bold text-[20px]">THREADED BARREL NIPPLE</text>

              <text x="690" y="782" className="fill-[#142E57]">MATERIAL</text>
              <text x="820" y="782" className="font-bold text-[20px]">ASTM A182 F316</text>

              <text x="690" y="812" className="fill-[#142E57]">STATUS</text>
              <text x="820" y="812" className="font-bold text-[20px] mfg-status fill-[#142E57]">DRAFTING IN PROGRESS</text>

              <text x="690" y="842" className="fill-[#142E57]">REVISION</text>
              <text x="820" y="842" className="font-bold">A</text>
              <text x="1010" y="842">SCALE: NTS</text>

              <text x="690" y="872" className="fill-[#142E57]">STANDARD</text>
              <text x="820" y="872">ASME B1.20.1</text>
              <text x="1010" y="872">TOL: ±0.10 mm</text>
            </g>
          </g>

          {/* Workflow Indicator (#4D7A58 Muted Green) */}
          <g className="workflow-ui text-[19px] font-mono max-sm:translate-x-[90px] max-sm:translate-y-[800px]" transform="translate(0, 760)" fill="#142E57" stroke="none">
            <text x="0" y="0" className="font-bold tracking-widest text-[18px] fill-[#142E57]">ENGINEERING WORKFLOW</text>

            <circle cx="5" cy="28" r="4.5" className="wf-dot-1" fill="transparent" stroke="#142E57" strokeWidth="1.2" />
            <text x="18" y="32" className="wf-text-1 opacity-50 fill-[#142E57]">Engineering Design</text>

            <circle cx="5" cy="56" r="4.5" className="wf-dot-2" fill="transparent" stroke="#142E57" strokeWidth="1.2" />
            <text x="18" y="60" className="wf-text-2 opacity-50 fill-[#4E6D95]">Quality Assurance</text>

            <circle cx="5" cy="84" r="4.5" className="wf-dot-3" fill="transparent" stroke="#142E57" strokeWidth="1.2" />
            <text x="18" y="88" className="wf-text-3 opacity-50 fill-[#5B6B80]">Ready For Manufacturing</text>
            <circle cx="5" cy="84" r="11" className="mfg-pulse opacity-0" fill="transparent" stroke="#4D7A58" strokeWidth="1" />
          </g>

        </g>
      </svg>
    </div>
  );
}
