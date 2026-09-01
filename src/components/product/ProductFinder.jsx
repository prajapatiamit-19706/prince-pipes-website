/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useRef, useState, useEffect } from 'react';
import { Search, Package, ArrowRight, Loader2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const HighlightText = ({ text, highlight }) => {
  if (!highlight || !highlight.trim() || !text) return <>{text}</>;
  
  // Escape regex special characters
  const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedHighlight})`, 'gi');
  const parts = text.split(regex);
  
  return (
    <>
      {parts.map((part, i) => 
        regex.test(part) ? <span key={i} className="text-primary font-bold bg-primary/10 px-0.5 rounded">{part}</span> : part
      )}
    </>
  );
};

export function ProductFinder() {
  const containerRef = useRef(null);
  const searchContainerRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalMatches, setTotalMatches] = useState(0);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      setTotalMatches(0);
      setIsLoading(false);
      setError(null);
      return;
    }

    const abortController = new AbortController();
    
    setIsLoading(true);
    setError(null);

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/products/search?q=${encodeURIComponent(searchQuery)}`, {
          signal: abortController.signal
        });
        
        if (!res.ok) throw new Error('Search failed');
        
        const data = await res.json();
        setResults(data.items || []);
        setTotalMatches(data.total || 0);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Search error:', err);
          setError('Failed to fetch results.');
          setResults([]);
        }
      } finally {
        setIsLoading(false);
      }
    }, 300); // 300ms debounce

    return () => {
      clearTimeout(timer);
      abortController.abort();
    };
  }, [searchQuery]);

  const showResults = isSearchFocused && searchQuery.trim().length > 0;

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
            suppressHydrationWarning
            type="text"
            placeholder="e.g. 316 Stainless Steel Flange"
            className="w-full pl-12 pr-4 py-4 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
          />
          {isLoading && (
            <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary animate-spin" />
          )}
        </div>
      </div>

      {/* Inline Results Section */}
      {showResults && (
        <div className="max-w-6xl mx-auto mt-12 bg-white border border-neutral-200 shadow-sm rounded-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
          {error ? (
             <div className="p-8 text-center text-red-500">{error}</div>
          ) : results.length === 0 && !isLoading ? (
            <div className="p-8 text-center text-neutral-500">
              <Package className="w-8 h-8 mx-auto mb-3 opacity-20" />
              No products found matching your filters.
            </div>
          ) : (
            <ul className="py-2 max-h-[500px] overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-200 hover:[&::-webkit-scrollbar-thumb]:bg-neutral-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-solid [&::-webkit-scrollbar-thumb]:border-white">
              {!isLoading && (
                <li className="px-4 py-3 text-xs font-semibold text-neutral-400 uppercase tracking-wider bg-neutral-50 border-b border-neutral-100 sticky top-0 z-10">
                  {totalMatches} Result{totalMatches !== 1 ? 's' : ''} Found
                </li>
              )}
              {results.map(item => (
                <li key={item.slug}>
                  <Link
                    href={item.url}
                    className="flex items-center justify-between px-6 py-4 hover:bg-neutral-50 transition-colors border-b border-neutral-50 last:border-0 group"
                    onClick={() => setIsSearchFocused(false)}
                  >
                    <div>
                      <div className="font-medium text-neutral-900 group-hover:text-primary transition-colors">
                        <HighlightText text={item.name} highlight={searchQuery} />
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
              {totalMatches > 15 && (
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
