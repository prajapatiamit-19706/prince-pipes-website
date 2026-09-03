"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { galleryCategories } from "@/data/gallery";

export const GalleryFilters = ({ activeCategory, setActiveCategory }) => {
  const scrollContainerRef = useRef(null);

  // Optional horizontal scroll functionality for mobile
  useEffect(() => {
    const handleWheel = (e) => {
      if (window.innerWidth < 768 && scrollContainerRef.current) {
        if (e.deltaY !== 0) {
          e.preventDefault();
          scrollContainerRef.current.scrollLeft += e.deltaY;
        }
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <div className="sticky top-[70px] z-40 bg-background/80 backdrop-blur-lg border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div
          ref={scrollContainerRef}
          className="flex items-center justify-start md:justify-center space-x-1 md:space-x-2 py-3 overflow-x-auto scrollbar-hide whitespace-nowrap"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {galleryCategories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`
                  relative px-4 py-1.5 text-xs md:text-sm font-medium rounded-full transition-all duration-300
                  ${isActive
                    ? "text-white bg-primary-900 shadow-sm"
                    : "text-text-secondary hover:bg-surface-2 hover:text-text bg-transparent"
                  }
                `}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hide scrollbar styles injection */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}} />
    </div>
  );
};
