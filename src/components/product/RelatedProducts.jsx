"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export function RelatedProducts({ products }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".related-product-card",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );
  }, { scope: containerRef });

  if (!products || products.length === 0) return null;

  return (
    <section ref={containerRef}>
      <h2 className="text-sm font-bold tracking-[0.2em] text-neutral-900 uppercase mb-8">
        YOU MAY ALSO NEED
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link 
            href={`/products/${product.slug}`} 
            key={product.id}
            className="related-product-card group block border border-neutral-200 bg-white hover:border-primary/50 hover:shadow-lg transition-all duration-300"
          >
            <div className="aspect-[4/3] relative bg-neutral-50 overflow-hidden border-b border-neutral-100">
              {product.media?.primaryImage ? (
                <Image 
                  src={product.media.primaryImage} 
                  alt={product.name} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-neutral-400 text-sm font-medium">
                  No Image
                </div>
              )}
            </div>
            
            <div className="p-6">
              <h3 className="font-semibold text-neutral-900 mb-4 line-clamp-2 min-h-[48px]">
                {product.name}
              </h3>
              
              <div className="flex items-center text-sm font-bold tracking-widest text-primary uppercase group-hover:text-primary-dark transition-colors">
                View Product 
                <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
