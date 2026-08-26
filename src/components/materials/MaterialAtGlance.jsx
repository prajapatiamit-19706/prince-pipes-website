"use client";

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
    <section ref={container} className="py-8 md:py-6 md:py-10 lg:py-16 lg:py-10 md:py-6 md:py-10 lg:py-16 lg:py-24 bg-white border-b border-slate-100">
      <div className="container-wide">
        <h2 className="text-2xl font-bold text-slate-900 mb-12">AT A GLANCE</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {cards.map((card, index) => (
            <div key={index} className="glance-card flex flex-col p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-semibold text-slate-500 tracking-wider uppercase mb-2">
                {card.title}
              </span>
              <span className="text-lg font-medium text-slate-900">
                {card.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
