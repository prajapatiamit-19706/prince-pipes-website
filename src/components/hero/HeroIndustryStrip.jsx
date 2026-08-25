"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  Droplets,
  Factory,
  FlaskConical,
  Zap,
  Pill,
  Ship,
  Utensils,
  HardHat,
  ArrowRight
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const IconMap = {
  Droplets,
  Factory,
  FlaskConical,
  Zap,
  Pill,
  Ship,
  Utensils,
  HardHat
};

export function HeroIndustryStrip({ industries }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.to(".industry-card", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out"
    });
  }, { scope: containerRef });

  if (!industries || industries.length === 0) return null;

  return (
    <div ref={containerRef} className="w-full bg-background py-20 border-t border-border/50 relative overflow-hidden">

      {/* Background Section with faint CAD elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-blueprint bg-[length:30px_30px]" />
        <div className="absolute top-1/2 left-1/4 w-96 h-96 border-[0.5px] border-primary/20 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 border-[0.5px] border-primary/20 rounded-full translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-2">Industries We Serve</h2>
            <p className="text-3xl md:text-4xl font-bold text-text tracking-tight">Engineered for Every Sector</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry) => {
            const IconComponent = IconMap[industry.icon];

            return (
              <div
                key={industry.id}
                className="industry-card opacity-0 translate-y-8 group flex flex-col h-full p-6 rounded-xl border border-border bg-background transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] hover:border-primary/40 relative overflow-hidden"
              >
                {/* Subtle blueprint background fade in on hover */}
                <div className="absolute inset-0 bg-blueprint bg-[length:20px_20px] opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none" />

                {/* CAD construction circles on hover */}
                <div className="absolute -top-10 -right-10 w-40 h-40 border border-primary/10 rounded-full opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-700 ease-out pointer-events-none" />
                <div className="absolute -top-4 -right-4 w-28 h-28 border border-primary/20 rounded-full opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500 delay-75 ease-out pointer-events-none" />

                {/* Icon Section */}
                <div className="mb-6 flex items-center justify-start relative z-10 transition-transform duration-500 ease-out group-hover:-translate-y-1">
                  <div className="p-3 bg-surface-2 rounded-lg border border-border/50 text-primary">
                    {IconComponent && <IconComponent size={28} strokeWidth={1.5} />}
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col flex-grow relative z-10">
                  <h3 className="text-xl font-bold text-text mb-2 group-hover:text-[#c29b62] transition-colors duration-300">
                    {industry.name}
                  </h3>

                  <p className="text-sm text-text-secondary leading-relaxed mb-6 flex-grow">
                    {industry.description}
                  </p>

                  {/* Application Chips */}
                  {industry.applications && (
                    <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                      {industry.applications.map((app, idx) => (
                        <span key={idx} className="px-2 py-1 text-[10px] font-mono font-bold tracking-wider text-text-secondary bg-surface border border-border rounded transition-colors duration-300 group-hover:border-primary/20">
                          {app}
                        </span>
                      ))}
                    </div>
                  )}


                </div>
                </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
