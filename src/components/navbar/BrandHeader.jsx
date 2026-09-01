"use client";
import { Logo } from './Logo';
import { DynamicHeading } from './DynamicHeading';
import { Button } from '@/components/ui/button';
import { Search, Menu } from 'lucide-react';
import { useHeaderContext } from '@/context/HeaderContext';
import { useSearchContext } from '@/context/SearchContext';
import { HEADER_LAYOUT } from '@/constants/layout';
import { motion } from 'framer-motion';
import navigationData from '@/data/navigation.json';
import companyData from '@/data/company.json';

export const BrandHeader = () => {
  const { isAtTop, toggleMobileMenu } = useHeaderContext();
  const { openSearch } = useSearchContext();

  const searchUtility = navigationData.utility?.find(item => item.id === 'search') || {};
  const searchPlaceholder = searchUtility.placeholder || "Search products, fittings, flanges...";

  return (
    <motion.div
      animate={{
        height: isAtTop ? HEADER_LAYOUT.BRAND_HEADER_HEIGHT : 0,
        opacity: isAtTop ? 1 : 0
      }}
      initial={false}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="bg-white hidden md:flex items-center overflow-hidden z-20 relative"
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
            suppressHydrationWarning
            className="group flex items-center gap-3 border border-border bg-surface rounded-lg py-1 pl-3 pr-1 text-text-secondary cursor-pointer hover:text-primary transition-colors"
          >
            <span className="hidden lg:block text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {searchPlaceholder}
            </span>
            <Search className="w-5 h-5 xl:w-6 xl:h-6 group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={toggleMobileMenu}
            aria-label="Open Mobile Menu"
            suppressHydrationWarning
            className="flex xl:hidden p-2 -mr-2 text-text-primary hover:text-primary transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Button 
            variant="primary" 
            className="hidden xl:flex px-6 tracking-wide" 
            suppressHydrationWarning
            onClick={() => {
              const phone = companyData.whatsapp?.replace(/[^0-9]/g, '') || '917045140314';
              window.open(`https://wa.me/${phone}`, '_blank', 'noopener,noreferrer');
            }}
          >
            Request Quote
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
