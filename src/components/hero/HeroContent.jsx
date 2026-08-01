"use client";

import React, { useState, useEffect } from "react";
import { HeroBadge } from "./HeroBadge";
import { HeroButtons } from "./HeroButtons";
import { HeroStats } from "./HeroStats";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const HEADLINES = [
  "Engineering Excellence in Every Pipe",
  "Precision Crafted for Industrial Performance",
  "Reliability Built into Every Connection",
  "Innovative Solutions for Extreme Conditions"
];

const HIGHLIGHT_WORDS = ["Excellence", "Performance", "Reliability", "Innovative"];

export function HeroContent({ data }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Initial mount animations
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Badge fades in
    tl.to(".hero-badge-anim", { opacity: 1, y: 0, duration: 0.8 });

    // Headline reveals letter-by-letter (typing effect)
    tl.to(
      ".hero-headline-char",
      { opacity: 1, x: 0, duration: 0.05, stagger: 0.03 },
      "-=0.4"
    );

    // Description fades in
    tl.to(
      ".hero-desc-anim",
      { opacity: 1, x: 0, duration: 0.8 },
      "-=0.2" // start slightly before headline finishes
    );

    // CTA buttons slide up
    tl.to(
      ".hero-btn-anim",
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.6"
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Backspace current characters (right to left)
      gsap.to(".hero-headline-char", {
        opacity: 0,
        x: -5,
        duration: 0.02,
        stagger: {
          each: 0.02,
          from: "end"
        },
        ease: "power2.in",
        onComplete: () => {
          // 2. Change text
          setCurrentIndex((prev) => (prev + 1) % HEADLINES.length);
          
          // 3. Type new characters in (left to right)
          setTimeout(() => {
            gsap.fromTo(".hero-headline-char", 
              { opacity: 0, x: 10 },
              { opacity: 1, x: 0, duration: 0.05, stagger: 0.03, ease: "power2.out" }
            );
          }, 50);
        }
      });
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, []);

  if (!data) return null;

  const currentWords = HEADLINES[currentIndex].split(" ");

  return (
    <div className="w-full flex flex-col justify-center h-full relative z-10 py-12 lg:py-0">
      <div className="hero-badge-anim opacity-0 -translate-y-4">
        <HeroBadge text={data.trustBadge} />
      </div>

      <h1 className="text-5xl md:text-6xl lg:text-[4rem] font-bold text-text leading-[1.1] tracking-tight mb-6 max-w-2xl flex flex-wrap gap-x-4 min-h-[140px] md:min-h-[160px] lg:min-h-[190px]">
        {currentWords.map((word, i) => (
          <div key={`${currentIndex}-${i}`} className="flex overflow-hidden pb-2">
            {word.split("").map((char, j) => (
              <span 
                key={j}
                className={`hero-headline-char block opacity-0 ${HIGHLIGHT_WORDS.includes(word) ? 'text-[#c29b62]' : 'text-primary'}`}
              >
                {char}
              </span>
            ))}
          </div>
        ))}
      </h1>

      <p className="hero-desc-anim opacity-0 -translate-x-8 text-lg text-text-secondary max-w-xl leading-relaxed">
        {data.description}
      </p>

      <div className="hero-btn-anim opacity-0 translate-y-8 mt-6">
        <HeroButtons buttons={data.buttons} />
      </div>

      <div className="hero-stat-anim mt-12">
        <HeroStats statistics={data.statistics} />
      </div>
    </div>
  );
}
