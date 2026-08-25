"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ChevronRight, Home } from 'lucide-react';

export default function MaterialHero({ material, imagePath }) {
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(".hero-element",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );
  }, { scope: container });

  return (
    <section ref={container} className="relative pt-12 pb-16 md:pt-18 md:pb-24 overflow-hidden">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Content */}
          <div className="flex flex-col space-y-8">
            {/* Breadcrumb */}
            <div className="hero-element flex items-center text-sm font-medium text-slate-500 uppercase tracking-wider">
              <Link href="/" className="hover:text-blue-600 transition-colors flex items-center" aria-label="Home">
                <Home className="w-4 h-4" />
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-slate-500">Materials</span>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-slate-900">{material.name}</span>
            </div>

            <div className="space-y-6">
              <h1 className="hero-element text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900">
                {material.heroTitle || material.name}
              </h1>

              <p className="hero-element text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl">
                {material.heroDescription}
              </p>
            </div>

            {/* Highlights */}
            {material.keyProperties && material.keyProperties.slice(0, 3).map((prop, idx) => (
              <div key={idx} className="hero-element flex items-center space-x-3 text-slate-700">
                <div className="w-2 h-2 rounded-full bg-primary-700" />
                <span className="font-medium">{prop}</span>
              </div>
            ))}
          </div>

          {/* Visual */}
          <div className="hero-element relative w-full aspect-square md:aspect-[4/3] lg:aspect-[5/4] bg-slate-100 rounded-3xl overflow-hidden">
            <Image
              src={imagePath || "/placeholder.jpg"}
              alt={`${material.name} - ${material.heroTitle}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
