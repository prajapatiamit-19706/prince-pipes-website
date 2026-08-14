"use client";
import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
}

export const SmoothScroll = ({ children }) => {
  const pathname = usePathname();
  const [lenisInstance, setLenisInstance] = useState(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });
    
    setLenisInstance(lenis);

    lenis.on('scroll', ScrollTrigger.update);

    const rafCallback = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  useEffect(() => {
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenisInstance]);

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
