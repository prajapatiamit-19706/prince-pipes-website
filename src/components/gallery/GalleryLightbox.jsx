"use client";

import { useEffect, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export const GalleryLightbox = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    },
    [isOpen, onClose, onNext, onPrev]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    // Prevent background scrolling when lightbox is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [handleKeyDown, isOpen]);

  if (!mounted) return null;

  const currentItem = images[currentIndex];

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center bg-black/95 backdrop-blur-sm"
          style={{ zIndex: 2147483647 }}
          onClick={onClose}
        >
          {/* Top Bar / Close Button */}
          <div className="absolute top-0 left-0 right-0 p-4 md:p-6 flex justify-between items-center pointer-events-none" style={{ zIndex: 2147483647 }}>
            <div className="text-white/80 font-medium tracking-widest text-xs md:text-sm uppercase drop-shadow-md">
              {currentItem?.category}
            </div>
            <div className="flex items-center space-x-4 md:space-x-6 pointer-events-auto">
              <div className="text-white/80 text-xs md:text-sm font-mono tracking-widest drop-shadow-md hidden sm:block">
                {String(currentIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="text-white bg-black/60 hover:bg-black/80 p-2 md:p-3 rounded-full backdrop-blur-md transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>

          {/* Previous Button */}
          <button
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 p-2 md:p-3 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full transition-all"
            style={{ zIndex: 2147483647 }}
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Main Image Area */}
          <div className="relative w-full h-full p-6 md:p-16 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                {currentItem && (
                  <div 
                    className="relative w-full h-full max-w-6xl max-h-[85vh]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Image
                      src={currentItem.src}
                      alt={currentItem.alt}
                      fill
                      className="object-contain drop-shadow-2xl"
                      quality={90}
                      sizes="100vw"
                      priority
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next Button */}
          <button
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 p-2 md:p-3 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full transition-all"
            style={{ zIndex: 2147483647 }}
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
