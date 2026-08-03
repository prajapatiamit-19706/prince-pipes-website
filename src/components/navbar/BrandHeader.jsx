"use client";
import { Logo } from './Logo';
import { DynamicHeading } from './DynamicHeading';
import { Button } from '@/components/ui/button';
import { Search, Menu } from 'lucide-react';
import { useHeaderContext } from '@/context/HeaderContext';
import { useSearchContext } from '@/context/SearchContext';
import { HEADER_LAYOUT } from '@/constants/layout';
import { motion } from 'framer-motion';

export const BrandHeader = () => {
  const { isScrolled, toggleMobileMenu } = useHeaderContext();
  const { openSearch } = useSearchContext();

  return (
    <motion.div
      animate={{
        height: isScrolled ? HEADER_LAYOUT.BRAND_HEADER_HEIGHT_SCROLLED : HEADER_LAYOUT.BRAND_HEADER_HEIGHT
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="bg-white hidden md:flex items-center overflow-hidden z-20 relative shadow-[0_4px_20px_rgba(15,39,71,0.03)]"
    >
      <div className="container-wide w-full flex items-center justify-between">
        <div className="flex-1 flex justify-start items-center">
          <Logo />
        </div>

        <div className="flex-[2] flex justify-center items-center">
          <DynamicHeading />
        </div>

        <div className="flex-1 flex justify-end items-center gap-6">
          <button
            onClick={openSearch}
            aria-label="Search"
            className="text-text-secondary cursor-pointer hover:scale-110 hover:text-primary transition-colors p-2"
          >
            <Search className="w-5 h-5 xl:w-6 xl:h-6" />
          </button>
          <button 
            onClick={toggleMobileMenu}
            aria-label="Open Mobile Menu"
            className="flex xl:hidden p-2 -mr-2 text-text-primary hover:text-primary transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Button variant="primary" className="hidden xl:flex px-6 tracking-wide">
            Request Quote
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
