"use client";

import { useRef, useState, useMemo, useEffect } from 'react';
import { Search, Package, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export function ProductFinder({ searchIndex }) {
  const containerRef = useRef(null);
  const searchContainerRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const { items = [] } = searchIndex || {};

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Compute filtered results
  const filteredResults = useMemo(() => {
    if (!items.length) return [];
    return items.filter(item => {
      if (searchQuery) {
        // Deep search match
        const queryTerms = searchQuery.toLowerCase().split(' ').filter(Boolean);
        // All query terms must be found somewhere in the item's search string
        if (!queryTerms.every(term => item.searchString.includes(term))) {
          return false;
        }
      }
      return true;
    });
  }, [items, searchQuery]);

  const showResults = isSearchFocused || searchQuery;

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });

    tl.fromTo(
      ".finder-header",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    )
      .fromTo(
        ".finder-search",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="py-12" id="product-finder">
      <div className="finder-header text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-3">
          FIND YOUR PRODUCT
        </h2>
        <p className="text-sm text-neutral-500 max-w-lg mx-auto leading-relaxed">
          Search by product name, fitting type, material, grade, schedule, or standard
        </p>
      </div>

      <div ref={searchContainerRef} className="finder-search relative max-w-4xl mx-auto mb-12 z-40">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="e.g. 316 Stainless Steel Flange"
            className="w-full pl-12 pr-4 py-4 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
          />
        </div>
      </div>

      {/* Inline Results Section */}
      {showResults && (
        <div className="max-w-6xl mx-auto mt-12 bg-white border border-neutral-200 shadow-sm rounded-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
          {filteredResults.length === 0 ? (
            <div className="p-8 text-center text-neutral-500">
              <Package className="w-8 h-8 mx-auto mb-3 opacity-20" />
              No products found matching your filters.
            </div>
          ) : (
            <ul className="py-2 max-h-[500px] overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-200 hover:[&::-webkit-scrollbar-thumb]:bg-neutral-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-solid [&::-webkit-scrollbar-thumb]:border-white">
              <li className="px-4 py-3 text-xs font-semibold text-neutral-400 uppercase tracking-wider bg-neutral-50 border-b border-neutral-100 sticky top-0 z-10">
                {filteredResults.length} Result{filteredResults.length !== 1 ? 's' : ''} Found
              </li>
              {filteredResults.slice(0, 15).map(item => (
                <li key={item.slug}>
                  <Link
                    href={item.url}
                    className="flex items-center justify-between px-6 py-4 hover:bg-neutral-50 transition-colors border-b border-neutral-50 last:border-0 group"
                    onClick={() => setIsSearchFocused(false)}
                  >
                    <div>
                      <div className="font-medium text-neutral-900 group-hover:text-primary transition-colors">
                        {item.name}
                      </div>
                      <div className="text-xs text-neutral-500 mt-2 flex flex-wrap gap-2">
                        <span className="bg-neutral-100 px-2 py-1 rounded-md text-neutral-600">{item.material}</span>
                        <span className="bg-neutral-100 px-2 py-1 rounded-md text-neutral-600">{item.connection}</span>

                        {/* Dynamic Proof Tags */}
                        {searchQuery && item.specs && item.specs
                          .filter(spec =>
                            searchQuery.toLowerCase().split(' ').filter(Boolean).some(term => spec.toLowerCase().includes(term))
                          )
                          // Exclude if it's already exactly the material or connection to avoid duplicates
                          .filter(spec => spec !== item.material && spec !== item.connection)
                          .slice(0, 2)
                          .map((match, idx) => (
                            <span key={`match-${idx}`} className="bg-primary/5 text-primary px-2 py-1 rounded-md border border-primary/10 font-medium">
                              {match}
                            </span>
                          ))}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </Link>
                </li>
              ))}
              {filteredResults.length > 15 && (
                <li className="px-6 py-4 text-center text-sm text-neutral-500 bg-neutral-50">
                  Refine your search to see more specific results.
                </li>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
