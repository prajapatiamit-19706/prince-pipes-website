"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ENGINEERING_BLUE = "#202020";

export const MegaMenuContainer = ({ isOpen, onMouseEnter, onMouseLeave, children, width = "800px", align = "center", padding = "p-8" }) => {
  const alignmentClasses = {
    center: "left-1/2 -translate-x-1/2",
    left: "left-0 -translate-x-35", // slight negative translation to align visually with the nav item padding
    right: "right-0 translate-x-4"
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.98, width }}
          animate={{ opacity: 1, y: 0, scale: 1, width }}
          exit={{ opacity: 0, y: 12, scale: 0.98, width }}
          transition={{ duration: 0.25, ease: [0.215, 0.61, 0.355, 1] }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className={`absolute top-[calc(100%+8px)] ${alignmentClasses[align]} bg-[#FCFCFA] shadow-[0_30px_60px_-15px_rgba(20,46,87,0.15)] z-[400] rounded-3xl overflow-hidden border-[1px] border-border/50 origin-top`}
        >
          {/* Invisible bridge to prevent hover loss */}
          <div className="absolute -top-3 left-0 w-full h-3 bg-transparent" />

          {/* Subtle engineering background */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(${ENGINEERING_BLUE} 1px, transparent 1px), linear-gradient(90deg, ${ENGINEERING_BLUE} 1px, transparent 1px)`,
                backgroundSize: "2rem 2rem",
              }}
            />
          </div>

          {/* Content */}
          <div className={`relative z-10 w-full h-full ${padding}`}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
