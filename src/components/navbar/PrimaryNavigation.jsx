"use client";
import { NavigationItem } from './NavigationItem';
import navigationData from '@/data/navigation.json';
import { useHeaderContext } from '@/context/HeaderContext';
import { useSearchContext } from '@/context/SearchContext';
import { HEADER_LAYOUT } from '@/constants/layout';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const NAVIGATION = navigationData.primary;

export const PrimaryNavigation = () => {
  const { isAtTop, isScrolled } = useHeaderContext();
  const { openSearch } = useSearchContext();

  const searchUtility = navigationData.utility?.find(item => item.id === 'search') || {};
  const searchPlaceholder = searchUtility.placeholder || "Search products, fittings, flanges...";

  return (
    <motion.div
      animate={{
        height: isAtTop ? HEADER_LAYOUT.PRIMARY_NAV_HEIGHT : HEADER_LAYOUT.PRIMARY_NAV_HEIGHT_SCROLLED
      }}
      initial={false}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="bg-white hidden xl:flex justify-center z-10 relative border-t border-border/40"
    >
      <div className="container-wide w-full flex items-center justify-between">

        {/* Left Side: Compact Logo */}
        <div className="flex-1 flex justify-start items-center">
          <AnimatePresence>
            {!isAtTop && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Logo variant="icon" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Center: Navigation Links */}
        <nav className="flex items-center h-full gap-8 xl:gap-10">
          {NAVIGATION.map((item) => (
            <NavigationItem key={item.id} item={item} />
          ))}
        </nav>

        {/* Right Side: Compact Utilities */}
        <div className="flex-1 flex justify-end items-center gap-6">
          <AnimatePresence>
            {!isAtTop && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-6"
              >
                <button
                  onClick={openSearch}
                  aria-label="Search"
                  className="group flex items-center gap-3 text-text-secondary cursor-pointer hover:text-primary transition-colors p-2"
                >
                  <span className="hidden lg:block text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {searchPlaceholder}
                  </span>
                  <Search className="w-5 h-5 xl:w-6 xl:h-6 group-hover:scale-110 transition-transform" />
                </button>
                <Button 
                  variant="primary" 
                  className="hidden xl:flex px-6 tracking-wide h-10 whitespace-nowrap"
                  onClick={() => window.dispatchEvent(new CustomEvent('open-quote-modal'))}
                >
                  Request Quote
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
