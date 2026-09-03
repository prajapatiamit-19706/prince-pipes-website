"use client";

import { useState, useMemo, useEffect } from "react";
import { galleryItems } from "@/data/gallery";
import { GalleryItem } from "./GalleryItem";
import { GalleryLightbox } from "./GalleryLightbox";
import { motion } from "framer-motion";

export const MasonryGallery = ({ activeCategory }) => {
  const [columnsCount, setColumnsCount] = useState(6);
  
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter items based on category
  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return galleryItems;
    return galleryItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const openLightbox = (item) => {
    const index = filteredItems.findIndex((i) => i.id === item.id);
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  // Update column count based on window resize
  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 640) setColumnsCount(3); // mobile
      else if (window.innerWidth < 1024) setColumnsCount(4); // tablet
      else setColumnsCount(6); // desktop
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  // Partition the items into column arrays to guarantee they NEVER change columns when resizing
  const columns = useMemo(() => {
    const cols = Array.from({ length: columnsCount }, () => []);
    filteredItems.forEach((item, i) => {
      cols[i % columnsCount].push(item);
    });
    return cols;
  }, [filteredItems, columnsCount]);

  return (
    <section className="pt-4 pb-12 md:pt-8 md:pb-20 bg-surface min-h-screen">
      <div className="container mx-auto px-4 md:px-6">

        {/* Empty State */}
        {filteredItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <h3 className="text-2xl font-medium text-text mb-4">No products found in this category.</h3>
            <p className="text-text-secondary">Please try selecting a different material category.</p>
          </motion.div>
        ) : (
          <>
            {/* 
              Masonry Grid using Flex Columns
              This guarantees that existing images stay exactly where they are when new ones are appended.
            */}
            <div className="flex gap-2 sm:gap-4 md:gap-6 mx-auto w-full max-w-[1800px]">
              {columns.map((col, colIndex) => (
                <div key={colIndex} className="flex-1 flex flex-col gap-2 sm:gap-4 md:gap-6">
                  {col.map((item) => (
                    <GalleryItem
                      key={item.id}
                      item={item}
                      onClick={openLightbox}
                    />
                  ))}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Lightbox Modal */}
      <GalleryLightbox
        isOpen={lightboxOpen}
        images={filteredItems}
        currentIndex={currentIndex}
        onClose={() => setLightboxOpen(false)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
};
