"use client";
import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const SmoothScroll = ({ children }) => {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',        // renamed from `direction` in Lenis 1.x
      gestureOrientation: 'vertical', // renamed from `gestureDirection` in Lenis 1.x
      // `smooth` was removed in 1.x -- smooth scrolling is on by default now.
      // `smoothTouch` was removed -- `syncTouch` is the current equivalent;
      // left off (defaults to false) to match the original smoothTouch:false intent.
      wheelMultiplier: 1,   // this is the real option name -- `mouseMultiplier` doesn't exist
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    // Store the exact function reference so it can actually be removed later.
    // gsap.ticker.remove() requires reference equality -- passing a fresh
    // arrow function to .remove() (as in the original) never matches what
    // was added, so the old callback keeps running after "cleanup," and a
    // second one gets added on every remount. Multiple competing raf loops
    // driving ScrollTrigger.update() is what was desyncing the pinned
    // Manufacturing section's timing.
    const rafCallback = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};


// "use client";
// import React, { useEffect } from 'react';
// import Lenis from 'lenis';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// // Register ScrollTrigger globally once
// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// export const SmoothScroll = ({ children }) => {
//   useEffect(() => {
//     // Only initialize if the user hasn't requested reduced motion
//     const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
//     if (prefersReducedMotion) return;

//     // Initialize Lenis
//     const lenis = new Lenis({
//       duration: 0.8,
//       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard easing
//       direction: 'vertical', // vertical, horizontal
//       gestureDirection: 'vertical', // vertical, horizontal, both
//       smooth: true,
//       mouseMultiplier: 1,
//       smoothTouch: false,
//       touchMultiplier: 2,
//       infinite: false,
//     });

//     // Synchronize Lenis scrolling with GSAP's ScrollTrigger
//     lenis.on('scroll', ScrollTrigger.update);

//     // Add Lenis's requestAnimationFrame (raf) to GSAP's ticker
//     gsap.ticker.add((time) => {
//       lenis.raf(time * 1000);
//     });

//     // Turn off GSAP's lag smoothing to prevent visual jumps with Lenis
//     gsap.ticker.lagSmoothing(0);

//     // Cleanup on unmount
//     return () => {
//       lenis.destroy();
//       gsap.ticker.remove((time) => lenis.raf(time * 1000));
//     };
//   }, []);

//   return <>{children}</>;
// };
