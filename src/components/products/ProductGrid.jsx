"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ProductCard } from './ProductCard';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ProductGrid({ products }) {
  const gridRef = useRef(null);

  useGSAP(() => {
    // Respect user motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set('.product-card-anim', { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const cards = gsap.utils.toArray('.product-card-anim', gridRef.current);
    
    // Fallback if no cards found
    if (!cards.length) return;
    
    // We set initial state via GSAP instead of CSS to avoid flash if JS fails/is disabled
    gsap.set(cards, { opacity: 0, y: 30, scale: 0.98 });

    ScrollTrigger.batch(cards, {
      onEnter: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.08,
          overwrite: true
        });
      },
      once: true
    });
  }, { scope: gridRef, dependencies: [products] });

  if (!products || products.length === 0) {
    return (
      <div className="py-12 text-center text-neutral-500 bg-neutral-50 rounded-sm border border-neutral-100">
        <p className="text-lg">No products found for this category.</p>
      </div>
    );
  }

  // Ensure consistent card height by styling in ProductCard
  return (
    <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id || product.slug} className="product-card-anim opacity-0">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
