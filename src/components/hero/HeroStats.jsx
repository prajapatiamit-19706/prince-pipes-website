"use client";

import React, { useRef } from "react";
import { Award, Globe2, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const getStatIcon = (index) => {
  switch (index) {
    case 0: return <Award className="w-12 h-12 text-[#c29b62]" strokeWidth={1.5} />;
    case 1: return <Globe2 className="w-12 h-12 text-[#c29b62]" strokeWidth={1.5} />;
    case 2: return <ShieldCheck className="w-12 h-12 text-[#c29b62]" strokeWidth={1.5} />;
    default: return null;
  }
};

export function HeroStats({ statistics }) {
  const containerRef = useRef();

  useGSAP(() => {
    gsap.utils.toArray(".hero-stat-number").forEach((el) => {
      gsap.fromTo(
        el,
        { textContent: 0 },
        {
          textContent: parseInt(el.dataset.val, 10),
          duration: 2,
          snap: { textContent: 1 },
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%", // Trigger when element is 90% down the viewport
            toggleActions: "play none none none"
          }
        }
      );
    });
  }, { scope: containerRef });

  if (!statistics || statistics.length === 0) return null;

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
      {statistics.slice(0, 3).map((stat, index) => {
        const numMatch = stat.value.match(/(\d+)/);
        const targetNum = numMatch ? parseInt(numMatch[0], 10) : 0;
        const suffix = stat.value.replace(/\d+/g, "");

        return (
          <div key={index} className="hero-stat-item flex items-center gap-4 opacity-0 -translate-x-4">
            {getStatIcon(index)}
            <div className="flex flex-col text-left">
              <span className="text-3xl md:text-4xl font-black text-text tracking-tight mb-1 flex items-baseline">
                <span className="hero-stat-number" data-val={targetNum}>0</span>
                <span>{suffix}</span>
              </span>
              <span className="text-xs font-bold text-text-secondary uppercase tracking-wider leading-tight max-w-[100px]">
                {stat.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
