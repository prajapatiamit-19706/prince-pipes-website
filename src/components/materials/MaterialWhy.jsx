"use client";

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function MaterialWhy({ material }) {
  const container = useRef(null);

  useGSAP(() => {
    gsap.fromTo(".why-item",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        }
      }
    );
  }, { scope: container });

  if (!material.keyProperties || material.keyProperties.length === 0) return null;

  return (
    <section ref={container} className="py-8 md:py-6 md:py-10 lg:py-16 lg:py-10 md:py-6 md:py-10 lg:py-16 lg:py-24 bg-slate-50">
      <div className="container-wide">
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            WHY {material.name.toUpperCase()}?
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Short explanation of why {material.name} is selected for industrial applications. It is engineered to perform reliably under demanding conditions.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {material.keyProperties.map((prop, index) => (
            <div key={index} className="why-item flex flex-col p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
              <CheckCircle2 className="w-8 h-8 text-blue-800 mb-4" strokeWidth={1.5} />
              <h3 className="font-semibold text-slate-900">{prop}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
