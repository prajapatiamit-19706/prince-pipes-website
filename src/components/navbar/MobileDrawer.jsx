"use client";
import React, { useRef, useEffect } from 'react';
import { useHeaderContext } from '@/context/HeaderContext';
import { useSearchContext } from '@/context/SearchContext';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { NavigationItem } from './NavigationItem';
import navigationData from '@/data/navigation.json';
import { Button } from '@/components/ui/button';
import { X, Search, Phone, Mail } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const NAVIGATION = navigationData.primary;

export const MobileDrawer = () => {
  const { mobileMenuOpen, closeMobileMenu } = useHeaderContext();
  const { openSearch } = useSearchContext();
  const containerRef = useRef(null);
  const tlRef = useRef(null);
  
  useLockBodyScroll(mobileMenuOpen);

  const handleSearchClick = () => {
    closeMobileMenu();
    openSearch();
  };

  useGSAP(() => {
    tlRef.current = gsap.timeline({
      paused: true,
      defaults: { ease: "power3.inOut" }
    });
    
    // Backdrop fade
    tlRef.current.to(".drawer-backdrop", { autoAlpha: 1, duration: 0.4 }, 0);
    
    // Drawer slide in
    tlRef.current.to(".drawer-panel", { x: "0%", duration: 0.5 }, 0);
    
    // Stagger navigation items
    tlRef.current.fromTo(".nav-item-anim", 
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" },
      "-=0.2"
    );
    
    // Contact info fade in
    tlRef.current.fromTo(".contact-info-anim", 
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" },
      "-=0.2"
    );
  }, { scope: containerRef });

  useEffect(() => {
    if (mobileMenuOpen) {
      tlRef.current?.play();
    } else {
      tlRef.current?.reverse();
    }
  }, [mobileMenuOpen]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[1000] xl:hidden pointer-events-none">
      {/* Backdrop */}
      <div 
        onClick={closeMobileMenu}
        className="drawer-backdrop absolute inset-0 bg-primary/60 backdrop-blur-sm pointer-events-auto invisible opacity-0 touch-none"
        aria-hidden="true"
      />
      
      {/* Drawer Panel */}
      <div 
        className="drawer-panel absolute top-0 right-0 w-[85vw] max-w-[400px] h-full bg-white shadow-2xl flex flex-col overflow-hidden pointer-events-auto translate-x-full"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between p-4 border-b border-border h-20 shrink-0">
          <span className="font-heading font-bold text-lg text-primary tracking-tight">MENU</span>
          <button 
            onClick={closeMobileMenu}
            aria-label="Close Mobile Menu"
            className="p-2 -mr-2 text-text-primary hover:text-primary transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto px-6 py-2 flex flex-col">
          <button 
            onClick={handleSearchClick}
            className="nav-item-anim shrink-0 flex items-center gap-3 w-full py-3 px-4 mb-2 bg-surface hover:bg-surface-2 transition-colors rounded-lg text-text-secondary border border-border"
          >
            <Search className="w-5 h-5 text-primary" />
            <span className="font-medium">Search Products...</span>
          </button>
          
          <nav className="flex flex-col mb-2 shrink-0">
            {NAVIGATION.map((item) => (
              <div key={item.id} className="nav-item-anim">
                <NavigationItem item={item} isMobile />
              </div>
            ))}
          </nav>
          
          <div className="mt-auto pt-4 pb-8 border-t border-border flex flex-col gap-6 shrink-0">
            <div className="contact-info-anim">
              <Button variant="primary" className="w-full">
                Request Quote
              </Button>
            </div>
            
            <div className="contact-info-anim flex flex-col gap-4 px-2">
              <a href="tel:+18001234567" className="flex items-center gap-3 text-[15px] font-medium text-text-secondary hover:text-primary transition-colors">
                <Phone className="w-5 h-5 text-primary" />
                <span>1800-123-4567</span>
              </a>
              <a href="mailto:info@princepipes.com" className="flex items-center gap-3 text-[15px] font-medium text-text-secondary hover:text-primary transition-colors">
                <Mail className="w-5 h-5 text-primary" />
                <span>info@princepipes.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
