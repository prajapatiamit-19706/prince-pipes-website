"use client";

import React, { useRef } from "react";
import { cn } from "@/components/ui/button/buttonVariants";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const positionClasses = {
  "top-left": "top-[12%] left-[2%] sm:left-[5%] md:top-[15%] md:left-[10%] flex-row-reverse md:flex-row text-right md:text-left",
  "top-right": "top-[12%] right-[2%] sm:right-[5%] md:top-[15%] md:right-[10%] flex-row md:flex-row-reverse text-left md:text-right",
  "bottom-left": "bottom-[15%] left-[2%] sm:left-[5%] md:bottom-[20%] md:left-[10%] flex-row-reverse md:flex-row text-right md:text-left",
  "bottom-right": "bottom-[15%] right-[2%] sm:right-[5%] md:bottom-[20%] md:right-[10%] flex-row md:flex-row-reverse text-left md:text-right",
};

export function HeroCallouts({ callouts }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 1.5 });
    
    tl.to(".callout-anim", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
    });

    tl.fromTo(".connector-line",
      { scaleX: 0 },
      { scaleX: 1, duration: 0.6, stagger: 0.2, ease: "power2.out", transformOrigin: "center" },
      "-=1.0"
    );
  }, { scope: containerRef });

  if (!callouts) return null;

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-20">
      {callouts.map((callout) => (
        <div 
          key={callout.id}
          className={cn(
            "callout-anim opacity-0 translate-y-4 absolute flex items-center gap-1.5 sm:gap-2 md:gap-4 max-w-[45vw] sm:max-w-[200px] md:max-w-none",
            positionClasses[callout.position]
          )}
        >
          {/* Connector Line */}
          <div className="relative flex items-center justify-center shrink-0">
            <span className="connector-line w-6 sm:w-10 md:w-20 h-px bg-[#c29b62]/70" />
            <div className={cn(
              "absolute w-1 h-1 rounded-full bg-[#c29b62]",
              callout.position.includes("left") ? "right-0 md:right-auto" : "left-0 md:left-auto"
            )} />
          </div>
          
          {/* Content Box */}
          <div className="bg-white/70 md:bg-white/40 backdrop-blur-sm px-1.5 py-1 md:px-2 md:py-1 rounded min-w-0">
            <span className="block text-[9px] sm:text-[10px] md:text-[11px] font-bold text-primary uppercase tracking-widest leading-tight truncate md:whitespace-normal">
              {callout.title}
            </span>
            <span className="block text-[8px] sm:text-[9px] md:text-[10px] font-medium text-text-secondary leading-tight mt-0.5 line-clamp-2 md:line-clamp-none">
              {callout.description}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
