"use client";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CTABlueprint } from "./CTABlueprint";
import { CTADrawing } from "./CTADrawing";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function FinalCTA() {
  const containerRef = useRef(null);
  const router = useRouter();

  return (
    <section
      ref={containerRef}
      aria-label="Engineering Quote Call to Action"
      className="relative w-full bg-[#FCFCFA] overflow-hidden py-8 md:py-6 lg:py-12  border-t border-[#E7EDF5]"
    >

      {/* Background blueprint paper texture & grid */}
      <div className="cta-blueprint-bg  absolute inset-0 z-0">
        <CTABlueprint />
      </div>

      <div className="container-wide relative z-10 mx-auto px-4 sm:px-6 md:px-12 max-w-7xl">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-6 md:gap-8 lg:gap-12 items-center">

          {/* 1. Blueprint Hero Container (Order 1 on Mobile, Right Column on Desktop) */}
          <div className="w-full lg:col-span-7 order-1 lg:order-2 flex items-center justify-center my-2 sm:my-0 max-sm:scale-[1.25] max-sm:mb-8 md:mb-12 lg:mb-20 transform origin-top">
            <CTADrawing />
          </div>

          {/* 2-6. Engineering Content Column (Order 2 on Mobile, Left Column on Desktop) */}
          <div className="w-full lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center text-center lg:text-left mt-6 sm:mt-0">

            {/* Headline */}
            <h2 className="cta-headline text-3xl sm:text-4xl lg:text-5xl font-bold text-[#142E57] tracking-tight leading-[1.15] mb-4 md:mb-6 ">
              From Blueprint<br className="hidden sm:inline" />
              <span className="text-[#5D7EA8]"> To Precision Manufacturing.</span>
            </h2>

            {/* Description */}
            <div className="cta-description text-base sm:text-lg text-[#5B6B80] leading-relaxed mb-6 md:mb-8 max-w-prose mx-auto lg:mx-0  space-y-2">
              <p>
                Every high-integrity stainless steel fitting begins with precision engineering drawings and strict standard compliance.
              </p>
              <p className="text-[#7E8EA5] text-sm md:text-base">
                Our manufacturing team is equipped to deliver SS 304/316L threaded barrel nipples to exact ASME B1.20.1 & B16.11 specifications.
              </p>
            </div>

            {/* CTA Buttons: Vertical stack on mobile, Side-by-side on desktop */}
            <div className="cta-buttons flex flex-col sm:flex-row gap-4 mb-8 w-full max-w-xl mx-auto lg:mx-0 ">
              <Button
                onClick={() => window.open('https://wa.me/919137379188', '_blank', 'noopener,noreferrer')}
                className="group bg-[#142E57] hover:bg-[#1D4377] text-white text-[14px] sm:text-[15px] font-semibold tracking-wide h-12 px-6 sm:px-8 w-full sm:w-auto min-w-fit whitespace-nowrap transition-all duration-300 shadow-[0_6px_20px_rgba(20,46,87,0.15)] hover:shadow-[0_8px_25px_rgba(20,46,87,0.2)] hover:-translate-y-1 rounded-md"
              >
                Request Engineering Quote
                <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 shrink-0" />
              </Button>
              <Button
                onClick={() => router.push('/resources/catalogue')}
                variant="outline"
                className="group border border-[#142E57]/20 bg-white hover:bg-[#EEF4FB] text-[#142E57] text-[14px] sm:text-[15px] font-semibold tracking-wide h-12 px-6 sm:px-8 w-full sm:w-auto min-w-fit whitespace-nowrap transition-all duration-300 hover:border-[#142E57]/40 hover:-translate-y-1 rounded-md"
              >
                View Product Catalogue
              </Button>
            </div>

            {/* Trust Statement */}
            <div className="cta-trust flex items-center justify-center lg:justify-start gap-2.5  pt-4 border-t border-[#E7EDF5] max-w-md mx-auto lg:mx-0">
              <CheckCircle2 className="w-4 h-4 text-[#4D7A58] shrink-0" />
              <p className="text-xs sm:text-sm text-[#7E8EA5] font-mono text-center lg:text-left">
                Compliant with ASME, DIN & ISO standards. Full EN 10204 3.1 MTR provided.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
