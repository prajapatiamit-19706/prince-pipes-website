"use client";

import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { getHeadingForRoute } from '@/data/headerHeadings';
import { HEADER_LAYOUT } from '@/constants/layout';

const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [scrollDirection, setScrollDirection] = useState('none');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const pathname = usePathname();
  
  const activeRoute = pathname;
  const dynamicHeading = getHeadingForRoute(pathname);

  // Use refs to keep track of mutable values for the scroll handler without triggering re-renders
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const updateScrollState = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if at top (using a small threshold for smoother UX)
      const currentIsAtTop = currentScrollY <= 50;
      
      // Determine scroll direction
      let currentDirection = 'none';
      if (currentScrollY > lastScrollY.current + 5) {
        currentDirection = 'down';
      } else if (currentScrollY < lastScrollY.current - 5) {
        currentDirection = 'up';
      }

      // Update state if changed
      setIsAtTop((prev) => {
        if (prev !== currentIsAtTop) return currentIsAtTop;
        return prev;
      });

      setIsScrolled((prev) => {
        const scrolled = currentScrollY > HEADER_LAYOUT.SCROLL_THRESHOLD;
        if (prev !== scrolled) return scrolled;
        return prev;
      });

      setScrollDirection((prev) => {
        if (currentDirection !== 'none' && prev !== currentDirection) {
          return currentDirection;
        }
        return prev;
      });

      lastScrollY.current = currentScrollY;
      ticking.current = false;
    };

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateScrollState);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initialize

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
        isAtTop,
        scrollDirection,
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
