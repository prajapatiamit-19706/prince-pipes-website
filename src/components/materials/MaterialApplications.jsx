"use client";

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Droplets, Zap, Shield, Factory, Anchor, FlaskConical, Wrench, Settings
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  "Oil & Gas": Droplets,
  "Petrochemical": Factory,
  "Chemical Processing": FlaskConical,
  "Marine": Anchor,
  "Power Generation": Zap,
  "Food & Beverage": Shield,
  "Pharmaceutical": FlaskConical,
  "Construction & Architecture": Wrench,
};

export default function MaterialApplications({ material }) {
  const container = useRef(null);

  useGSAP(() => {
    gsap.fromTo(".app-card",
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
        }
      }
    );
  }, { scope: container });

  if (!material.applications || material.applications.length === 0) return null;

  return (
    <section ref={container} className="py-10 md:py-16 bg-white border-t border-slate-100">
      <div className="container-wide">
        
        {/* Title area */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-tight flex items-center">
             <span className="w-8 h-1 bg-secondary mr-4"></span>
             Typical Applications
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {material.applications.map((app, index) => {
            const Icon = iconMap[app] || Settings;
            return (
              <div 
                key={index} 
                className="app-card group relative flex items-center p-5 bg-slate-50 border border-slate-200 rounded-xl hover:border-primary/40 hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                {/* Left accent border on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-slate-200 group-hover:bg-primary transition-colors" />
                
                {/* Icon Box */}
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-lg shadow-sm border border-slate-100 flex items-center justify-center mr-4 group-hover:shadow group-hover:border-primary/20 transition-all">
                  <Icon className="w-6 h-6 text-slate-500 group-hover:text-primary transition-colors" strokeWidth={1.5} />
                </div>
                
                {/* Application Name */}
                <span className="font-semibold text-slate-800 text-sm md:text-base leading-tight group-hover:text-primary transition-colors">
                  {app}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
