"use client";
import { useRef, useEffect } from 'react';
import { useSearchContext } from '@/context/SearchContext';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchInput } from './SearchInput';
import { SearchResults } from './SearchResults';

export const SearchModal = () => {
  const { isSearchOpen, closeSearch } = useSearchContext();
  const modalRef = useRef(null);

  // Lock body scroll when search is open
  useLockBodyScroll(isSearchOpen);

  // Close when clicking outside the modal or pressing Escape
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeSearch();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeSearch();
      }
    };
    
    if (isSearchOpen) {
      // Small delay prevents immediate close if they clicked the search icon
      setTimeout(() => {
        window.addEventListener('click', handleOutsideClick);
      }, 10);
      window.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      window.removeEventListener('click', handleOutsideClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSearchOpen, closeSearch]);

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[1000] bg-white md:bg-primary/20 md:backdrop-blur-sm flex justify-center md:items-start md:pt-[15vh] md:px-6"
          role="dialog"
          aria-modal="true"
        >
          <motion.div 
            ref={modalRef}
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full h-full md:h-auto md:max-h-[80vh] md:max-w-[800px] flex flex-col bg-white md:bg-white/95 md:backdrop-blur-xl md:shadow-2xl md:rounded-2xl md:border md:border-border/60 overflow-hidden"
          >
            <SearchInput />
            <SearchResults />
            
            {/* Optional Footer CTA */}
            <div className="border-t border-border bg-surface/50 px-6 py-4 flex justify-between items-center text-sm">
              <div className="flex gap-4 text-text-muted hidden sm:flex">
                <span className="flex items-center gap-1.5">
                  <kbd className="px-2 py-1 bg-white border border-border rounded shadow-sm text-[10px] font-mono font-semibold">↑</kbd>
                  <kbd className="px-2 py-1 bg-white border border-border rounded shadow-sm text-[10px] font-mono font-semibold">↓</kbd>
                  to navigate
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-2 py-1 bg-white border border-border rounded shadow-sm text-[10px] font-mono font-semibold">ENTER</kbd>
                  to select
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-2 py-1 bg-white border border-border rounded shadow-sm text-[10px] font-mono font-semibold">ESC</kbd>
                  to close
                </span>
              </div>
              <a href="/contact" onClick={closeSearch} className="text-primary font-semibold hover:underline flex items-center gap-1 ml-auto">
                Need help? Request a Quote
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
