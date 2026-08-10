"use client";
import { Logo } from './Logo';
import { Menu, Search } from 'lucide-react';
import { useHeaderContext } from '@/context/HeaderContext';
import { useSearchContext } from '@/context/SearchContext';
import { HEADER_LAYOUT } from '@/constants/layout';
import { motion } from 'framer-motion';

export const MobileHeader = () => {
  const { isAtTop, toggleMobileMenu } = useHeaderContext();
  const { openSearch } = useSearchContext();

  return (
    <motion.div
      animate={{ 
        height: isAtTop ? HEADER_LAYOUT.BRAND_HEADER_HEIGHT : HEADER_LAYOUT.PRIMARY_NAV_HEIGHT_SCROLLED 
      }}
      initial={false}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`bg-white md:hidden flex items-center justify-between px-4 w-full relative z-20 ${!isAtTop ? 'border-b border-border' : ''}`}
    >
      <div className="flex-1">
        <Logo variant={isAtTop ? 'full' : 'icon'} className={isAtTop ? '' : 'scale-90 origin-left'} />
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={openSearch}
          aria-label="Search"
          className="p-2 text-text-secondary hover:text-primary transition-colors"
        >
          <Search className="w-5 h-5" />
        </button>
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
