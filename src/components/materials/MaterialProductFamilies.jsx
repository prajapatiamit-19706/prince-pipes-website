"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function MaterialProductFamilies({ material, productFamilies }) {
  const container = useRef(null);

  useGSAP(() => {
    gsap.fromTo(".family-card",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        }
      }
    );
  }, { scope: container });

  if (!productFamilies || productFamilies.length === 0) {
    return (
      <section className="py-8 md:py-6 md:py-10 lg:py-16 lg:py-10 md:py-6 md:py-10 lg:py-16 lg:py-24 bg-slate-50 border-t border-slate-100">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            WHAT CAN BE MADE FROM THIS MATERIAL?
          </h2>
          <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-slate-600 text-lg">
              Product information for this material is currently being updated.
              Contact us for availability.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={container} className="py-8 md:py-6 md:py-10 lg:py-16 lg:py-10 md:py-6 md:py-10 lg:py-16 lg:py-24 bg-slate-50 border-t border-slate-100">
      <div className="container-wide">
        <div className="max-w-4xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 uppercase">
            WHAT CAN BE MADE FROM THIS MATERIAL?
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Explore products manufactured in {material.name}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {productFamilies.map((family, index) => (
            <Link key={index} href={family.href} className="family-card group flex flex-col p-8 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">

              <div className="flex flex-col flex-grow relative z-10">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 uppercase tracking-tight group-hover:text-primary-500 transition-colors">
                  {family.name}
                </h3>

                <p className="text-slate-600 leading-relaxed mb-8 flex-grow">
                  {family.products.join(' · ')}
                </p>

                <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100">
                  <span className="text-slate-500 font-medium">
                    {family.count} Products
                  </span>

                  <div className="flex items-center space-x-2 text-primary-500 font-semibold">
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Subtle hover effect background */}
              <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
