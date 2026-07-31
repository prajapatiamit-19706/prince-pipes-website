"use client";
import { useHeaderContext } from '@/context/HeaderContext';
import { useSearchContext } from '@/context/SearchContext';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { NavigationItem } from './NavigationItem';
import navigationData from '@/data/navigation.json';
import { Button } from '@/components/ui/button';
import { X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAVIGATION = navigationData.primary;

export const MobileDrawer = () => {
  const { mobileMenuOpen, closeMobileMenu } = useHeaderContext();
  const { openSearch } = useSearchContext();
  
  useLockBodyScroll(mobileMenuOpen);

  const handleSearchClick = () => {
    closeMobileMenu();
    openSearch();
  };

  return (
    <AnimatePresence>
      {mobileMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeMobileMenu}
            className="fixed inset-0 bg-primary/60 backdrop-blur-sm z-[900] md:hidden"
            aria-hidden="true"
          />
          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="fixed top-0 right-0 w-[85vw] max-w-[400px] h-full bg-white z-[1000] shadow-2xl flex flex-col md:hidden overflow-hidden"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between p-4 border-b border-border h-20">
              <span className="font-heading font-bold text-lg text-primary tracking-tight">MENU</span>
              <button 
                onClick={closeMobileMenu}
                aria-label="Close Mobile Menu"
                className="p-2 -mr-2 text-text-primary hover:text-primary transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col">
              <button 
                onClick={handleSearchClick}
                className="flex items-center gap-3 w-full py-3 px-4 mb-6 bg-surface hover:bg-surface-2 transition-colors rounded-lg text-text-secondary border border-border"
              >
                <Search className="w-5 h-5 text-primary" />
                <span className="font-medium">Search Products...</span>
              </button>
              
              <nav className="flex flex-col mb-8">
                {NAVIGATION.map((item) => (
                  <NavigationItem key={item.id} item={item} isMobile />
                ))}
              </nav>
              
              <div className="mt-auto pt-8 border-t border-border flex flex-col gap-4">
                <Button variant="primary" className="w-full">
                  Request Quote
                </Button>
                <div className="text-sm text-text-secondary text-center mt-4">
                  <p>1800-123-4567</p>
                  <p>info@princepipes.com</p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
