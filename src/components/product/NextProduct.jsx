"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export function NextProduct({ product }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });

    tl.fromTo(
      ".next-label",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    )
    .fromTo(
      ".next-title",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.3"
    )
    .fromTo(
      ".next-meta",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo(
      ".next-image",
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    );
  }, { scope: containerRef });

  if (!product) return null;

  return (
    <section ref={containerRef} className="py-24 group cursor-pointer relative overflow-hidden bg-neutral-900 text-white">
      <Link href={`/products/${product.slug}`} className="absolute inset-0 z-20" aria-label={`View next product: ${product.name}`} />
      
      {/* Background Hover Effect */}
      <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-700" />
      
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="flex flex-col">
            <h2 className="next-label text-sm font-bold tracking-[0.2em] text-neutral-400 uppercase mb-6">
              NEXT PRODUCT
            </h2>
            
            <h3 className="next-title text-4xl md:text-5xl lg:text-6xl font-display font-medium mb-6 group-hover:text-primary transition-colors duration-500">
              {product.name}
            </h3>
            
            <div className="next-meta flex flex-col gap-2 text-neutral-400 mb-10">
              {product.technicalSpecifications?.material && (
                <span className="text-lg">{product.technicalSpecifications.material}</span>
              )}
              {product.type && (
                <span className="text-lg">{product.type}</span>
              )}
            </div>
            
            <div className="flex items-center text-sm font-bold tracking-[0.2em] uppercase text-white group-hover:text-primary transition-colors">
              VIEW PRODUCT
              <ArrowRight className="w-5 h-5 ml-4 transform group-hover:translate-x-2 transition-transform duration-500" />
            </div>
          </div>
          
          <div className="next-image relative w-full aspect-[4/3] bg-neutral-800 rounded-xl overflow-hidden border border-neutral-700">
            {product.media?.primaryImage ? (
              <Image 
                src={product.media.primaryImage} 
                alt={product.name} 
                fill 
                className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-500 text-sm font-medium">
                No Image
              </div>
            )}
          </div>
          
        </div>
      </div>
    </section>
  );
}
