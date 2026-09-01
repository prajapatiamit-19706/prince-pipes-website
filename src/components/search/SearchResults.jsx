"use client";
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchContext } from '@/context/SearchContext';
import { performSearch } from '@/utils/searchEngine';
import { PrinceLoader } from '@/components/ui/loader/PrinceLoader';
import { SearchSection } from './SearchSection';
import { SearchResultItem } from './SearchResultItem';
import { SearchEmptyState } from './SearchEmptyState';

// Custom hook for debouncing
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const SearchResults = () => {
  const { searchQuery, closeSearch } = useSearchContext();
  const router = useRouter();
  const debouncedQuery = useDebounce(searchQuery, 600); // 600ms debounce for local search

  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Memoized search execution
  const results = useMemo(() => {
    return performSearch(debouncedQuery);
  }, [debouncedQuery]);

  // Flatten results just for keyboard navigation index mapping
  const flatResults = useMemo(() => {
    if (!results) return [];
    return Object.values(results).flat();
  }, [results]);

  const hasResults = flatResults.length > 0;
  const isInitial = !debouncedQuery;

  // Reset selected index when query changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedIndex(-1);
  }, [debouncedQuery]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!hasResults) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < flatResults.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'Enter') {
        if (selectedIndex >= 0 && flatResults[selectedIndex]) {
          e.preventDefault();
          router.push(flatResults[selectedIndex].path);
          closeSearch();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasResults, flatResults, selectedIndex, router, closeSearch]);

  if (isInitial) {
    return (
      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar">
        <SearchEmptyState isInitial={true} />
      </div>
    );
  }

  // Show contextual loader while typing before debounce resolves
  if (searchQuery !== debouncedQuery && debouncedQuery.length > 0) {
    return (
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center p-8 bg-white/50">
        <PrinceLoader size="md" label="Searching catalog" />
      </div>
    );
  }

  if (!hasResults) {
    return (
      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar">
        <SearchEmptyState isInitial={false} />
      </div>
    );
  }

  // To track the global index across sections for the selected state
  let globalIndexCounter = 0;

  return (
    <div className="flex-1 min-h-0 overflow-y-auto p-6 bg-white/50 custom-scrollbar">
      {Object.entries(results).map(([category, items]) => {
        if (items.length === 0) return null;

        return (
          <SearchSection key={category} title={category}>
            {items.map((item) => {
              const currentIndex = globalIndexCounter++;
              return (
                <SearchResultItem
                  key={item.id}
                  item={item}
                  isSelected={selectedIndex === currentIndex}
                  onMouseEnter={() => setSelectedIndex(currentIndex)}
                />
              );
            })}
          </SearchSection>
        );
      })}
    </div>
  );
};
