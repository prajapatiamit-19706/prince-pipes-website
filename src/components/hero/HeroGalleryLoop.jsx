"use client";

import React from "react";
import Image from "next/image";
import { galleryItems } from "@/data/gallery";

export const HeroGalleryLoop = () => {
  // Duplicate items to ensure smooth infinite loop
  const loopItems = [...galleryItems, ...galleryItems];

  return (
    <div className="w-full overflow-hidden pt-6 pb-16 bg-background relative border-y border-border/10">
      <div className="absolute inset-0 pointer-events-none z-10 flex justify-between">
        <div className="w-24 md:w-48 bg-gradient-to-r from-background to-transparent h-full"></div>
        <div className="w-24 md:w-48 bg-gradient-to-l from-background to-transparent h-full"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 mb-8 relative z-20">
        <h3 className="text-2xl md:text-3xl font-light text-text/80 text-center tracking-tight">
          Precision Engineered <span className="font-semibold text-text">Product Portfolio</span>
        </h3>
      </div>

      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {loopItems.map((item, idx) => (
          <div 
            key={`${item.id}-${idx}`} 
            className="mx-3 md:mx-4 shrink-0 flex items-center justify-center group"
          >
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-xl overflow-hidden shadow-sm md:shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-border/5 bg-surface/50 transform-gpu">
              <Image 
                src={item.src} 
                alt={item.alt}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 192px, 256px"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-sm font-medium tracking-wide drop-shadow-md translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  {item.alt}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
