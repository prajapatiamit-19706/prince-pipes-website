"use client";
import { Search } from 'lucide-react';
import { useSearchContext } from '@/context/SearchContext';

export const SearchEmptyState = ({ isInitial }) => {
  const { searchQuery } = useSearchContext();

  if (isInitial) {
    return (
      <div className="flex flex-col items-center justify-center py-6 md:py-10 lg:py-16 px-6 text-center">
        <div className="w-16 h-16 bg-surface-2 rounded-full flex items-center justify-center mb-6">
          <Search className="w-8 h-8 text-text-muted" />
        </div>
        <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
          Find Engineering Solutions
        </h3>
        <p className="text-text-secondary max-w-sm">
          Search across our catalogue of products, technical resources, standards, and company information.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-6 md:py-10 lg:py-16 px-6 text-center">
      <div className="w-16 h-16 bg-surface-2 rounded-full flex items-center justify-center mb-6">
        <Search className="w-8 h-8 text-text-muted" />
      </div>
      <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
        No results found for &quot;{searchQuery}&quot;
      </h3>
      <p className="text-text-secondary max-w-sm">
        We couldn&apos;t find anything matching your search. Try checking for typos or using more generic terms.
      </p>
    </div>
  );
};
