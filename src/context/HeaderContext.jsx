"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getHeadingForRoute } from '@/data/headerHeadings';
import { HEADER_LAYOUT } from '@/constants/layout';

const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const pathname = usePathname();
  
  const activeRoute = pathname;
  const dynamicHeading = getHeadingForRoute(pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > HEADER_LAYOUT.SCROLL_THRESHOLD);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <HeaderContext.Provider
      value={{
        isScrolled,
        mobileMenuOpen,
        toggleMobileMenu,
        closeMobileMenu,
        activeRoute,
        dynamicHeading,
        activeDropdown,
        setActiveDropdown
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeaderContext = () => {
  const context = useContext(HeaderContext);
  if (context === undefined) {
    throw new Error('useHeaderContext must be used within a HeaderProvider');
  }
  return context;
};
