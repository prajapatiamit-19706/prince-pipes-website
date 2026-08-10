"use client";

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, HelpCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// Mock relationships based on the spec
const identificationMap = [
  {
    question: "Need a male-to-male threaded connection?",
    productName: "CNC THREADED NIPPLE",
    slug: "stainless-steel-nipple"
  },
  {
    question: "Looking for a hex-shaped connection?",
    productName: "HEX NIPPLE",
    slug: "stainless-steel-hex-nipple"
  },
  {
    question: "Need to close a threaded pipe end?",
    productName: "PLUG",
    slug: "stainless-steel-plug"
  },
  {
    question: "Need to join two threaded pipe sections?",
    productName: "SOCKET",
    slug: "stainless-steel-socket"
  }
];

export function ProductIdentification({ currentProductType }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".identification-card",
      { opacity: 0, x: -10 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-white border border-neutral-200 p-8 md:p-12">
      <div className="flex items-center gap-3 mb-8">
        <HelpCircle className="w-5 h-5 text-primary" />
        <h2 className="text-sm font-bold tracking-[0.2em] text-neutral-900 uppercase">
          IS THIS THE RIGHT FITTING?
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {identificationMap.map((item, index) => (
          <div key={index} className="identification-card flex flex-col h-full">
            <p className="text-neutral-600 text-sm mb-4 min-h-[40px]">
              {item.question}
            </p>
            <div className="text-center text-neutral-300 mb-2">↓</div>
            <Link 
              href={`/products/${item.slug}`}
              className="mt-auto block bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 px-4 py-3 text-center transition-colors group"
            >
              <span className="text-sm font-semibold tracking-wider text-neutral-900 group-hover:text-primary transition-colors">
                {item.productName}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
