"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ChevronRight } from 'lucide-react';

import { ProductBreadcrumb } from '@/components/product/ProductBreadcrumb';

export default function MaterialHero({ material }) {
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(".hero-element",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );
  }, { scope: container });

  return (
    <section ref={container} className="relative pt-6 md:pt-10 lg:pt-16 pb-4 md:pb-8 overflow-hidden bg-white">
      <div className="container-wide">
        <div className="max-w-4xl">
          {/* Clean Breadcrumb */}
          <div className="hero-element mb-6 -mt-2">
            <ProductBreadcrumb breadcrumbs={[
              { name: 'Materials', path: null },
              { name: material.name, path: `/materials/${material.slug || material.id}` }
            ]} />
          </div>

          <div className="space-y-6 mb-12">
            <h1 className="hero-element text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-primary uppercase leading-tight">
              {material.heroTitle || material.name}
            </h1>

            <p className="hero-element text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl">
              {material.heroDescription}
            </p>
          </div>

          {/* Properties as Clean Badges */}
          {material.keyProperties && material.keyProperties.length > 0 && (
            <div className="hero-element flex flex-wrap gap-3">
              {material.keyProperties.map((prop, idx) => (
                <div 
                  key={idx} 
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-medium text-sm transition-colors hover:bg-slate-100"
                >
                  <div className="w-2 h-2 rounded-full bg-secondary mr-3" />
                  {prop}
                </div>
              ))}
            </div>
          )}
          
        </div>
      </div>
    </section>
  );
}
