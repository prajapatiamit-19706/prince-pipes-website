"use client";
import React from 'react';
import Link from 'next/link';
import { useSearchContext } from '@/context/SearchContext';
import { ArrowRight, FileText, Package, CheckCircle } from 'lucide-react';
import { cn } from '@/components/ui/button/buttonVariants';

// Pick an icon based on category
const getCategoryIcon = (category) => {
  const cat = category.toLowerCase();
  if (cat.includes('product')) return Package;
  if (cat.includes('quality') || cat.includes('certification')) return CheckCircle;
  return FileText;
};

export const SearchResultItem = ({ item, isSelected, onMouseEnter }) => {
  const { closeSearch } = useSearchContext();
  const iconComp = getCategoryIcon(item.category);

  return (
    <Link
      href={item.path}
      onClick={closeSearch}
      onMouseEnter={onMouseEnter}
      className={cn(
        "group flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer outline-none",
        isSelected ? "bg-surface shadow-sm" : "hover:bg-surface/50 text-text-primary"
      )}
    >
      <div className="flex items-center gap-4">
        <div className={cn(
          "p-2 rounded-md transition-colors",
          isSelected ? "bg-white text-primary shadow-sm" : "bg-surface-2 text-text-secondary group-hover:bg-white group-hover:text-primary group-hover:shadow-sm"
        )}>
          {React.createElement(iconComp, { className: "w-5 h-5" })}
        </div>
        <div className="flex flex-col">
          <span className={cn(
            "font-medium transition-colors",
            isSelected ? "text-primary" : "text-text-primary group-hover:text-primary"
          )}>
            {item.label}
          </span>
          {item.description && (
            <span className="text-sm text-text-muted mt-0.5 line-clamp-1">
              {item.description}
            </span>
          )}
        </div>
      </div>
      
      <ArrowRight className={cn(
        "w-4 h-4 transition-all duration-300",
        isSelected ? "opacity-100 text-primary translate-x-0" : "opacity-0 -translate-x-2 text-text-muted group-hover:opacity-100 group-hover:text-primary group-hover:translate-x-0"
      )} />
    </Link>
  );
};
