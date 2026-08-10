"use client";

import { ZoomIn, Download, Maximize } from 'lucide-react';
import Image from 'next/image';

export function TechnicalDrawing({ media }) {
  const drawingUrl = media?.dimensionDrawing || media?.technicalDrawing;
  
  if (!drawingUrl) return null;

  return (
    <section>
      <h2 className="text-sm font-bold tracking-[0.2em] text-neutral-400 uppercase mb-6">
        TECHNICAL DRAWING
      </h2>
      
      <div className="relative border border-neutral-200 bg-white p-8 group overflow-hidden">
        <div className="aspect-[16/9] relative w-full flex items-center justify-center">
          <Image 
            src={drawingUrl} 
            alt="Technical Drawing" 
            fill 
            className="object-contain"
          />
        </div>
        
        <div className="absolute inset-0 bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
          <button className="flex flex-col items-center gap-2 text-neutral-700 hover:text-primary transition-colors">
            <div className="p-3 bg-white rounded-full shadow-sm border border-neutral-100">
              <ZoomIn size={20} />
            </div>
            <span className="text-xs font-semibold tracking-widest uppercase">Zoom</span>
          </button>
          
          <button className="flex flex-col items-center gap-2 text-neutral-700 hover:text-primary transition-colors">
            <div className="p-3 bg-white rounded-full shadow-sm border border-neutral-100">
              <Maximize size={20} />
            </div>
            <span className="text-xs font-semibold tracking-widest uppercase">Fullscreen</span>
          </button>
          
          <button className="flex flex-col items-center gap-2 text-neutral-700 hover:text-primary transition-colors">
            <div className="p-3 bg-white rounded-full shadow-sm border border-neutral-100">
              <Download size={20} />
            </div>
            <span className="text-xs font-semibold tracking-widest uppercase">Download</span>
          </button>
        </div>
      </div>
    </section>
  );
}
