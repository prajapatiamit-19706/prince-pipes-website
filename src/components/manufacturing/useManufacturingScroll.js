"use client";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function useManufacturingScroll(viewportRef, trackRef, steps) {
  useGSAP(() => {
    if (!viewportRef.current || !trackRef.current) return;

    if (document.readyState === "complete") {
      ScrollTrigger.refresh();
    } else {
      window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
    }

    const viewport = viewportRef.current;
    const track = trackRef.current;
    const totalPanels = steps.length;
    
    // Use GSAP matchMedia to ONLY create the timeline on desktop screens (>1024px)
    let mm = gsap.matchMedia();

    mm.add("(min-width: 1025px)", () => {
      // Create the master timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: viewport,
          start: "top top",
          end: () => `+=${window.innerWidth * (totalPanels - 1)}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });

      // The main horizontal track translation spans the entire timeline (duration 1)
      tl.to(track, {
        xPercent: -100 * (totalPanels - 1) / totalPanels,
        ease: "none",
        duration: 1
      }, 0);

      // Animate progress and panel details
      steps.forEach((step, i) => {
        const stepDuration = 1 / (totalPanels - 1);
        const stepStartTime = (i - 1) * stepDuration;
        const stepEndTime = i * stepDuration;
        
        // Update the progress line fill linearly
        if (i > 0) {
          tl.to(".mfg-progress-fill", { 
            width: `${(i / (totalPanels - 1)) * 100}%`,
            ease: "none",
            duration: stepDuration
          }, stepStartTime);
        }

        // Node styling changes right when we reach a step
        if (i > 0) {
          const prevStep = steps[i - 1];
          tl.to(`.mfg-node-inactive-${prevStep.id}`, { opacity: 1, duration: 0.02 }, stepEndTime - 0.02);
          tl.to(`.mfg-node-active-${prevStep.id}`, { opacity: 0, duration: 0.02 }, stepEndTime - 0.02);
          tl.to(`.mfg-node-text-${prevStep.id}`, { opacity: 0.3, duration: 0.02 }, stepEndTime - 0.02);
        }
        
        tl.to(`.mfg-node-inactive-${step.id}`, { opacity: 0, duration: 0.02 }, stepEndTime);
        tl.to(`.mfg-node-active-${step.id}`, { opacity: 1, duration: 0.02 }, stepEndTime);
        tl.to(`.mfg-node-text-${step.id}`, { opacity: 1, duration: 0.02 }, stepEndTime);
        
        // Panel Entry Animations
        if (i > 0) {
          tl.fromTo(`.mfg-panel-header-${step.id}`, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.05, ease: "power2.out" }, stepEndTime - 0.05);
          tl.fromTo(`.mfg-panel-desc-${step.id}`, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.05, ease: "power2.out" }, stepEndTime - 0.04);
          tl.fromTo(`.mfg-panel-stats-${step.id}`, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.05, ease: "power2.out" }, stepEndTime - 0.03);
        }
        
        // Accessibility current attribute update
        tl.call(() => {
          document.querySelectorAll('[data-mfg-node]').forEach((node) => {
            node.removeAttribute('aria-current');
          });
          document.querySelector(`[data-mfg-node="${step.id}"]`)?.setAttribute('aria-current', 'step');
        }, [], stepEndTime);
      });
    }); // Close mm.add

  }, { dependencies: [steps.length], scope: viewportRef });
}
