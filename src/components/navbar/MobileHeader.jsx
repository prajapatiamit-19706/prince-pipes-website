"use client";
import { Logo } from './Logo';
import { Menu } from 'lucide-react';
import { useHeaderContext } from '@/context/HeaderContext';
import { HEADER_LAYOUT } from '@/constants/layout';
import { motion } from 'framer-motion';

export const MobileHeader = () => {
  const { isScrolled, toggleMobileMenu } = useHeaderContext();

  return (
    <motion.div
      animate={{ 
        height: isScrolled ? HEADER_LAYOUT.PRIMARY_NAV_HEIGHT_SCROLLED : HEADER_LAYOUT.BRAND_HEADER_HEIGHT 
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="bg-white border-b border-border md:hidden flex items-center justify-between px-4 w-full"
    >
      <Logo variant="icon" className="w-10 h-10" />
      
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleMobileMenu}
          aria-label="Open Mobile Menu"
          className="p-2 -mr-2 text-text-primary hover:text-primary transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </motion.div>
  );
};
