'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutProductLinks({ categories }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.prod-link-anim', 
      { y: 15, opacity: 0 }, 
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.5, 
        stagger: 0.05, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        }
      }
    );
  }, { scope: containerRef });

  if (!categories || categories.length === 0) return null;

  return (
    <section ref={containerRef} className="py-10 md:py-6 md:py-10 lg:py-16 lg:py-10 md:py-6 md:py-10 lg:py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-6 md:mb-10 lg:mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="prod-link-anim text-3xl md:text-4xl font-bold text-slate-900 leading-[1.2]">
              Built Around a Broad Industrial Fitting Range
            </h2>
          </div>
          <div className="prod-link-anim pb-1">
            <Link href="/products" className="inline-flex items-center text-sm font-bold text-primary-700 hover:text-primary-800 transition-colors uppercase tracking-wider">
              View Full Catalogue <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
          {categories.map((category, index) => (
            <Link 
              href={`/products/${category.slug}`} 
              key={category.id || index}
              className="prod-link-anim group block py-5 border-b border-slate-200 hover:border-primary-500 transition-colors duration-300"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary-700 transition-colors">
                  {category.name}
                </h3>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all duration-300" />
              </div>
              <p className="text-sm text-slate-500 line-clamp-2">
                {category.description || `Explore our range of ${category.name.toLowerCase()} for industrial applications.`}
              </p>
            </Link>
          ))}
        </div>
        
      </div>
    </section>
  );
}
