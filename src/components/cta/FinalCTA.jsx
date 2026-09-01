"use client";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CTABlueprint } from "./CTABlueprint";
import { CTADrawing } from "./CTADrawing";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function FinalCTA() {
  const containerRef = useRef(null);
  const router = useRouter();

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    let mm = gsap.matchMedia();

    mm.add("(min-width: 1025px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power2.out" },
      }).timeScale(2.5);

      const drawElements = (selector, duration = 0.8, overlap = "-=0.4") => {
        gsap.set(selector, { strokeDasharray: 2000, strokeDashoffset: 2000, opacity: 1 });
        tl.to(selector, { strokeDashoffset: 0, duration, stagger: 0.05 }, overlap);
      };

      gsap.set(".workflow-ui", { opacity: 1 });
      gsap.set(".wf-dot-1", { fill: "transparent" });

      // Step 1: Background & Blueprint grid
      tl.to(".cta-blueprint-bg", { opacity: 1, duration: 0.8 });

      // Step 2: Workflow 1 + Centerlines
      tl.to(".wf-dot-1", { fill: "#5D7EA8", duration: 0.2 }, "-=0.4");
      tl.to(".wf-text-1", { opacity: 1, fill: "#142E57", duration: 0.2 }, "-=0.4");
      tl.to(".cta-bg-grid", { opacity: 1, duration: 0.8 }, "-=0.4");
      tl.to(".draw-centerlines", { opacity: 1, duration: 0.5 }, "-=0.4");
      drawElements(".draw-construction-lines line, .draw-construction-lines rect", 0.8, "-=0.4");
      drawElements(".draw-ref-circles circle", 0.6, "-=0.4");

      // Step 3: Main profiles & threads
      drawElements(".draw-external path", 1.0, "-=0.2");
      tl.to(".draw-internal", { opacity: 1, duration: 0.5 }, "-=0.4");
      drawElements(".draw-threads path", 0.8, "-=0.2");

      // Step 4: QA Stage + Hatching & Dimensions
      tl.to(".wf-dot-2", { fill: "#4E6D95", duration: 0.2 }, "-=0.2");
      tl.to(".wf-text-2", { opacity: 1, fill: "#142E57", duration: 0.2 }, "-=0.2");
      tl.to(".draw-hidden", { opacity: 1, duration: 0.5 }, "-=0.2");
      tl.to(".draw-dim-arrows", { opacity: 1, duration: 0.5 }, "-=0.2");
      tl.to(".draw-dim-text text", { opacity: 1, duration: 0.4, stagger: 0.08 }, "-=0.2");

      // Step 5: Notes & Title block
      tl.to(".draw-notes", { opacity: 1, duration: 0.5 }, "-=0.2");
      tl.to(".draw-titleblock", { opacity: 1, duration: 0.7 }, "-=0.2");

      // Step 6: Ready for Manufacturing (#4D7A58 Muted Green)
      tl.to(".wf-dot-3", { fill: "#4D7A58", duration: 0.2 }, "-=0.2");
      tl.to(".wf-text-3", { opacity: 1, fill: "#142E57", duration: 0.2 }, "-=0.2");
      tl.to(".mfg-status", { opacity: 0, duration: 0.2 }, "+=0.1");
      tl.add(() => {
        const el = document.querySelector(".mfg-status");
        if (el) {
          el.textContent = "RELEASED FOR MANUFACTURING";
          el.style.fill = "#4D7A58";
        }
      });
      tl.to(".mfg-status", { opacity: 1, duration: 0.4 });

      // Step 8: Sequential Content Reveal
      tl.fromTo(".cta-headline", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "+=0.6");
      tl.fromTo(".cta-description", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4");
      tl.fromTo(".cta-buttons", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4");
      tl.fromTo(".cta-trust", { opacity: 0 }, { opacity: 1, duration: 0.8 }, "-=0.2");
    }); // Close mm.add

    // On mobile, just set everything to visible immediately
    mm.add("(max-width: 1024px)", () => {
      gsap.set(".workflow-ui", { opacity: 1 });
      gsap.set(".wf-dot-1", { fill: "#5D7EA8" });
      gsap.set(".wf-text-1", { opacity: 1, fill: "#142E57" });
      gsap.set(".wf-dot-2", { fill: "#4E6D95" });
      gsap.set(".wf-text-2", { opacity: 1, fill: "#142E57" });
      gsap.set(".wf-dot-3", { fill: "#4D7A58" });
      gsap.set(".wf-text-3", { opacity: 1, fill: "#142E57" });
      
      const el = document.querySelector(".mfg-status");
      if (el) {
        el.textContent = "RELEASED FOR MANUFACTURING";
        el.style.fill = "#4D7A58";
      }
      gsap.set(".mfg-status", { opacity: 1 });

      gsap.set(".cta-blueprint-bg, .cta-bg-grid, .draw-centerlines, .draw-construction-lines line, .draw-construction-lines rect, .draw-ref-circles circle, .draw-external path, .draw-internal, .draw-threads path, .draw-hidden, .draw-dim-arrows, .draw-dim-text text, .draw-notes, .draw-titleblock", { opacity: 1, strokeDashoffset: 0, strokeDasharray: "none" });
      
      gsap.set(".cta-headline, .cta-description, .cta-buttons, .cta-trust", { opacity: 1, y: 0 });
    });

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      aria-label="Engineering Quote Call to Action"
      className="relative w-full bg-[#FCFCFA] overflow-hidden py-8 md:py-6 lg:py-12  border-t border-[#E7EDF5]"
    >

      {/* Background blueprint paper texture & grid */}
      <div className="cta-blueprint-bg opacity-0 absolute inset-0 z-0">
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
            <h2 className="cta-headline text-3xl sm:text-4xl lg:text-5xl font-bold text-[#142E57] tracking-tight leading-[1.15] mb-4 md:mb-6 opacity-0">
              From Blueprint<br className="hidden sm:inline" />
              <span className="text-[#5D7EA8]"> To Precision Manufacturing.</span>
            </h2>

            {/* Description */}
            <div className="cta-description text-base sm:text-lg text-[#5B6B80] leading-relaxed mb-6 md:mb-8 max-w-prose mx-auto lg:mx-0 opacity-0 space-y-2">
              <p>
                Every high-integrity stainless steel fitting begins with precision engineering drawings and strict standard compliance.
              </p>
              <p className="text-[#7E8EA5] text-sm md:text-base">
                Our manufacturing team is equipped to deliver SS 304/316L threaded barrel nipples to exact ASME B1.20.1 & B16.11 specifications.
              </p>
            </div>

            {/* CTA Buttons: Vertical stack on mobile, Side-by-side on desktop */}
            <div className="cta-buttons flex flex-col sm:flex-row gap-4 mb-8 w-full max-w-xl mx-auto lg:mx-0 opacity-0">
              <Button
                onClick={() => window.open('https://wa.me/7045140314', '_blank', 'noopener,noreferrer')}
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
            <div className="cta-trust flex items-center justify-center lg:justify-start gap-2.5 opacity-0 pt-4 border-t border-[#E7EDF5] max-w-md mx-auto lg:mx-0">
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