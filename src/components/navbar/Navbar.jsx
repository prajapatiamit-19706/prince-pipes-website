"use client";

import { HeaderProvider } from '@/context/HeaderContext';
import { SearchProvider } from '@/context/SearchContext';
import { UtilityBar } from './UtilityBar';
import { BrandHeader } from './BrandHeader';
import { PrimaryNavigation } from './PrimaryNavigation';
import { MobileHeader } from './MobileHeader';
import { MobileDrawer } from './MobileDrawer';
import { SearchModal } from '@/components/search/SearchModal';
import { cn } from '@/components/ui/button/buttonVariants';
import { HEADER_LAYOUT } from '@/constants/layout';

export const Navbar = () => {
  return (
    <SearchProvider>
      <HeaderProvider>
        <header className={cn(
          "fixed top-0 left-0 w-full z-[500] flex flex-col shadow-navbar bg-white",
        )}>
          <UtilityBar />
          <BrandHeader />
          <PrimaryNavigation />
          <MobileHeader />
          <MobileDrawer />
        </header>
        {/* Desktop Spacer (xl+) */}
        <div 
          className="hidden xl:block w-full transition-all duration-300" 
          style={{ height: HEADER_LAYOUT.HEIGHT_LANDING }}
        />
        {/* Tablet Spacer (md to xl) */}
        <div 
          className="hidden md:block xl:hidden w-full transition-all duration-300" 
          style={{ height: HEADER_LAYOUT.UTILITY_BAR_HEIGHT_TABLET + HEADER_LAYOUT.BRAND_HEADER_HEIGHT }}
        />
        {/* Mobile Spacer (<md) */}
        <div 
          className="block md:hidden w-full transition-all duration-300"
          style={{ height: HEADER_LAYOUT.BRAND_HEADER_HEIGHT }}
        />
      </HeaderProvider>
      <SearchModal />
    </SearchProvider>
  );
};
