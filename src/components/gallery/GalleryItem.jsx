"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";

export const GalleryItem = ({ item, onClick }) => {
  return (
    <motion.div
      initial={{ 
        opacity: 0.1, 
        y: 100, 
        scale: 0.8, 
        rotateX: 30,
        perspective: 1000
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        rotateX: 0 
      }}
      viewport={{ once: true, margin: "50px 0px" }}
      transition={{ 
        duration: 0.85,
        ease: [0.21, 0.47, 0.32, 0.98] // Smooth Apple-like easing
      }}
      style={{ transformOrigin: "top center" }}
      className="group relative mb-4 md:mb-6 rounded-xl overflow-hidden cursor-pointer bg-surface/50 break-inside-avoid shadow-sm hover:shadow-md transition-shadow"
      onClick={() => onClick(item)}
    >
      {/* 
        Using intrinsic width/height ratio fallback and 100% width.
        Next Image with sizes helps browser load the right size. 
      */}
      <div className="relative w-full h-auto">
        <Image
          src={item.src}
          alt={item.alt}
          width={800}
          height={800}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full h-auto object-cover transform transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/40 transition-colors duration-500 ease-in-out flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full p-4 flex flex-col items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <Maximize2 className="w-6 h-6" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
