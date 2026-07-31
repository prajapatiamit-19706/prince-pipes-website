"use client";
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const StandardDropdown = ({ isOpen, items, onMouseEnter, onMouseLeave }) => {
  return (
    <AnimatePresence>
      {isOpen && items && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[320px] bg-white shadow-dropdown z-[400] rounded-xl border border-border overflow-hidden"
        >
          {/* Invisible bridge to prevent hover loss between nav item and dropdown */}
          <div className="absolute -top-2 left-0 w-full h-2 bg-transparent" />
          
          <div className="flex flex-col py-2">
            {items.map((item) => (
              <Link 
                key={item.id}
                href={item.path}
                className="group flex flex-col px-6 py-4 hover:bg-surface transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-text-primary group-hover:text-primary transition-colors">
                    {item.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
                {item.description && (
                  <span className="text-xs text-text-muted mt-1 font-medium">
                    {item.description}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
