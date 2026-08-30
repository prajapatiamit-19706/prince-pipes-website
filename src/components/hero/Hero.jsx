"use client";

import React, { useRef } from "react";
import { HeroContent } from "./HeroContent";
import { HeroScene } from "./HeroScene";
import { HeroBackground } from "./HeroBackground";
import { HeroIndustryStrip } from "./HeroIndustryStrip";
import { HeroCategories } from "./HeroCategories";
import { ScrollIndicator } from "./ScrollIndicator";

import homepageData from "@/data/homepage.json";
import industriesData from "@/data/industries.json";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Hero() {
  const { hero, featuredCategories } = homepageData;
  const containerRef = useRef(null);

  useGSAP(() => {
    // 1. Entrance Timeline
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    // Background fade in
    tl.to(".hero-bg-anim", {
      opacity: 0.1, // blueprint opacity
      scale: 1,
      duration: 1.5,
    });

    // 3D Scene and callouts appear
    tl.to(
      ".hero-anim",
      { opacity: 1, y: 0, duration: 1, stagger: 0.1 },
      "-=0.8"
    );

    // Statistics reveal left-to-right
    tl.to(
      ".hero-stat-item",
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.1 },
      "-=0.5"
    );

    // 2. Scroll Animations (ScrollTrigger)
    // Scene parallax
    gsap.to(".hero-scene-parallax", {
      y: -50,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Background parallax
    gsap.to(".hero-bg-parallax", {
      y: 50,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Category cards fade in as you scroll down to them
    gsap.to(".hero-category-card", {
      scrollTrigger: {
        trigger: ".hero-categories-trigger",
        start: "top 80%",
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
    });
  }, { scope: containerRef });

  if (!hero) {
    return null;
  }

  return (
    <section ref={containerRef} className="relative w-full bg-background flex flex-col pt-0 md:pt-2 xl:pt-10 overflow-hidden">
      <div className="hero-bg-parallax absolute inset-0 pointer-events-none">
        <HeroBackground />
      </div>

      <div className="flex-grow flex flex-col justify-start min-h-[calc(100vh-6rem)] pt-2">
        <div className="max-w-[1440px] mx-auto w-full px-6 pt-0 md:px-12 grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 lg:gap-6 md:gap-10 lg:gap-16 items-center">
          {/* Left Column (45%) */}
          <div className="w-full relative z-10">
            <HeroContent data={hero} />
          </div>

          {/* Right Column (55%) */}
          <div className="w-full relative z-10 h-full flex items-center justify-center hero-scene-parallax">
            <HeroScene callouts={hero.callouts} />
          </div>
        </div>
      </div>



      <div className="hidden lg:block relative h-0">
        <ScrollIndicator />
      </div>

      <div className="hero-categories-trigger relative z-10 w-full mt-12">
        <HeroCategories />
      </div>

      <div className="hero-industry-trigger relative z-10 w-full">
        <HeroIndustryStrip industries={industriesData} />
      </div>
    </section>
  );
}
