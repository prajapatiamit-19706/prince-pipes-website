"use client";

import { HeaderProvider, useHeaderContext } from '@/context/HeaderContext';
import { SearchProvider } from '@/context/SearchContext';
import { UtilityBar } from './UtilityBar';
import { BrandHeader } from './BrandHeader';
import { PrimaryNavigation } from './PrimaryNavigation';
import { MobileHeader } from './MobileHeader';
import { MobileDrawer } from './MobileDrawer';
import dynamic from 'next/dynamic';
import { cn } from '@/components/ui/button/buttonVariants';

const SearchModal = dynamic(() => import('@/components/search/SearchModal').then(mod => mod.SearchModal), { 
  ssr: false 
});
import { HEADER_LAYOUT } from '@/constants/layout';

const HeaderContent = () => {
  const { isAtTop } = useHeaderContext();
  
  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 w-full z-[500] flex flex-col bg-white",
        !isAtTop ? "shadow-md" : "shadow-[0_4px_20px_rgba(15,39,71,0.03)]"
      )}>
        <UtilityBar />
        <BrandHeader />
        <PrimaryNavigation />
        <MobileHeader />
        <MobileDrawer />
      </header>
      
      {/* Desktop Spacer (xl+) */}
      <div 
        className="hidden xl:block w-full" 
        style={{ height: HEADER_LAYOUT.HEIGHT_LANDING }}
      />
      {/* Tablet Spacer (md to xl) */}
      <div 
        className="hidden md:block xl:hidden w-full" 
        style={{ height: HEADER_LAYOUT.UTILITY_BAR_HEIGHT_TABLET + HEADER_LAYOUT.BRAND_HEADER_HEIGHT }}
      />
      {/* Mobile Spacer (<md) */}
      <div 
        className="block md:hidden w-full"
        style={{ height: HEADER_LAYOUT.BRAND_HEADER_HEIGHT }}
      />
    </>
  );
};

export const Navbar = () => {
  return (
    <SearchProvider>
      <HeaderProvider>
        <HeaderContent />
      </HeaderProvider>
      <SearchModal />
    </SearchProvider>
  );
};
