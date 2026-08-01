"use client";

import React, { useRef } from "react";
import { cn } from "@/components/ui/button/buttonVariants";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const positionClasses = {
  "top-left": "top-[15%] left-[5%] md:left-[10%]",
  "top-right": "top-[15%] right-[5%] md:right-[10%] flex-row-reverse text-right",
  "bottom-left": "bottom-[20%] left-[5%] md:left-[10%]",
  "bottom-right": "bottom-[20%] right-[5%] md:right-[10%] flex-row-reverse text-right",
};

export function HeroCallouts({ callouts }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.to(".callout-anim", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      delay: 1.5,
    });
  }, { scope: containerRef });

  if (!callouts) return null;

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-20">
      {callouts.map((callout) => (
        <div 
          key={callout.id}
          className={cn(
            "callout-anim opacity-0 translate-y-4 absolute flex items-center gap-4",
            positionClasses[callout.position]
          )}
        >
          {/* Connector Line */}
          <div className="relative flex items-center justify-center">
            <span className="w-20 h-px bg-[#c29b62]/70" />
            <div className="absolute w-1 h-1 rounded-full bg-[#c29b62]" />
          </div>
          
          {/* Content Box */}
          <div className="bg-white/40 backdrop-blur-sm px-2 py-1 rounded">
            <span className="block text-[11px] font-bold text-primary uppercase tracking-widest leading-tight">
              {callout.title}
            </span>
            <span className="block text-[10px] font-medium text-text-secondary leading-tight mt-0.5">
              {callout.description}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
