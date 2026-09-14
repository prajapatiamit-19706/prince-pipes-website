"use client";

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layers, FileText, Factory, Package } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ICONS = {
  "MATERIAL FAMILY": Layers,
  "COMMON GRADES": FileText,
  "PRIMARY USE": Factory,
  "PRODUCT FORMS": Package
};

export default function MaterialAtGlance({ material }) {
  const container = useRef(null);

  useGSAP(() => {
    gsap.fromTo(".glance-card", 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.1, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
        }
      }
    );
  }, { scope: container });

  const getCommonGrades = () => {
    if (material.grades && material.grades.length > 0) {
      return material.grades.slice(0, 4).map(g => typeof g === 'object' ? g.grade : g).join(" / ");
    }
    return null;
  };

  const getPrimaryUse = () => {
    if (material.applications && material.applications.length > 0) {
      return material.applications[0];
    }
    return null;
  };

  const getForms = () => {
    if (material.productForms && material.productForms.length > 0) {
      return material.productForms.slice(0, 2).join(" / ");
    }
    return null;
  };

  const cards = [
    { title: "MATERIAL FAMILY", value: material.materialTypes?.[0] || material.name },
    { title: "COMMON GRADES", value: getCommonGrades() },
    { title: "PRIMARY USE", value: getPrimaryUse() },
    { title: "PRODUCT FORMS", value: getForms() }
  ].filter(card => card.value);

  return (
    <section ref={container} className="py-8 md:py-12 bg-white border-b border-slate-100">
      <div className="container-wide">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-8 uppercase tracking-tight">At A Glance</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => {
            const Icon = ICONS[card.title] || Layers;
            return (
              <div 
                key={index} 
                className="glance-card group relative flex flex-col p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 overflow-hidden"
              >
                {/* Accent line on hover */}
                <div className="absolute top-0 left-0 w-full h-1 bg-slate-200 group-hover:bg-primary transition-colors duration-300" />
                
                <div className="flex items-center space-x-4 mb-5">
                  <div className="p-2.5 bg-slate-50 rounded-xl text-primary group-hover:bg-primary/10 transition-colors duration-300">
                    <Icon className="w-5 h-5" strokeWidth={2.5} />
                  </div>
                  <span className="text-xs font-bold text-slate-500 tracking-wider uppercase">
                    {card.title}
                  </span>
                </div>
                
                <span className="text-lg font-bold text-slate-900 leading-snug">
                  {card.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
