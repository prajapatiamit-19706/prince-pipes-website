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
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        stagger: 0.05,
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
    <section ref={container} className="py-16 md:py-24 bg-slate-50 border-t border-slate-100">
      <div className="container-wide">
        <h2 className="text-2xl font-bold text-slate-900 mb-12 uppercase">
          TYPICAL APPLICATIONS
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {material.applications.map((app, index) => {
            const Icon = iconMap[app] || Settings;
            return (
              <div key={index} className="app-card flex flex-col items-center justify-center p-8 bg-white rounded-2xl border border-slate-100 text-center shadow-sm hover:shadow-md transition-shadow">
                <Icon className="w-8 h-8 text-blue-800 mb-4" strokeWidth={1.5} />
                <span className="font-medium text-slate-900">{app}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
