"use client";
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const FooterCTA = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Only animate if the user hasn't requested reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const elements = gsap.utils.toArray('.gsap-reveal');
    
    gsap.fromTo(elements, 
      {
        y: 30,
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%', // start when the top of the container hits 80% down the viewport
          toggleActions: 'play none none none',
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-primary text-white py-16 md:py-24 relative overflow-hidden">
      {/* Optional: subtle background texture or glow could go here */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent pointer-events-none" />
      
      <div className="container-wide relative z-10 flex flex-col items-center text-center">
        <h2 className="gsap-reveal text-3xl md:text-5xl font-heading font-bold mb-6 max-w-3xl opacity-0">
          Ready to Start Your Next Engineering Project?
        </h2>
        
        <p className="gsap-reveal text-primary-100 text-lg md:text-xl max-w-2xl mb-10 opacity-0">
          Partner with us for world-class piping systems and fittings engineered for excellence, durability, and performance.
        </p>
        
        <div className="gsap-reveal flex flex-col sm:flex-row gap-4 opacity-0">
          <Button 
            variant="secondary" 
            size="lg" 
            className="text-primary bg-white hover:bg-surface border-white min-w-[200px]"
          >
            Request Quote
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="text-white border-white hover:bg-white/10 min-w-[200px]"
          >
            Contact Sales
          </Button>
        </div>
      </div>
    </div>
  );
};
