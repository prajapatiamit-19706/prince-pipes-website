"use client";
import { useEffect, useRef } from 'react';
import { useSearchContext } from '@/context/SearchContext';
import { Search, X } from 'lucide-react';

export const SearchInput = () => {
  const { searchQuery, setSearchQuery, closeSearch } = useSearchContext();
  const inputRef = useRef(null);

  // Auto-focus on mount
  useEffect(() => {
    // Slight delay ensures the modal animation completes before focus
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex items-center w-full px-6 py-5 border-b border-border bg-white rounded-t-2xl">
      <Search className="w-6 h-6 text-primary absolute left-6" />
      <input
        ref={inputRef}
        type="text"
        placeholder="Search engineering products, materials, standards..."
        className="w-full bg-transparent text-lg lg:text-xl font-heading font-medium text-text-primary placeholder:text-text-muted outline-none pl-12 pr-12"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        autoComplete="off"
        spellCheck="false"
      />
      {searchQuery && (
        <button
          onClick={() => {
            setSearchQuery("");
            inputRef.current?.focus();
          }}
          className="absolute right-14 p-1.5 text-text-muted hover:text-primary transition-colors bg-surface hover:bg-surface-2 rounded-full"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
      <button
        onClick={closeSearch}
        className="absolute right-4 p-2 text-text-secondary hover:text-primary transition-colors bg-surface hover:bg-surface-2 rounded-lg text-xs font-semibold tracking-wide border border-border"
        aria-label="Close search"
      >
        ESC
      </button>
    </div>
  );
};
