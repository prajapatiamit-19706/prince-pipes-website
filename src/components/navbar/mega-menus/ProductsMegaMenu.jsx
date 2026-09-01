"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowRight, Factory, Layers, Shield, Sparkles, Hammer, Flame, Settings } from 'lucide-react';
import { MegaMenuContainer } from './MegaMenuContainer';
import navigationData from '@/data/navigation.json';
import { motion, AnimatePresence } from 'framer-motion';

const iconMap = {
  "stainless-steel-pipe-fittings": Factory,
  "carbon-steel-pipe-fittings": Layers,
  "duplex-pipe-fittings": Shield,
  "super-duplex-pipe-fittings": Sparkles,
  "alloy-steel-pipe-fittings": Hammer,
  "inconel-625-pipe-fittings": Flame
};

export const ProductsMegaMenu = ({ isOpen, onMouseEnter, onMouseLeave }) => {
  const productsNav = navigationData.primary.find(item => item.id === 'products');
  const categoriesData = productsNav?.children || [];
  
  const [activeCategory, setActiveCategory] = useState(null);
  
  const activeCatData = categoriesData.find(cat => cat.id === activeCategory);
  const activeSubCategories = activeCatData?.children || [];
  const hasSubCategories = activeCategory && activeSubCategories.length > 0;
  
  // 400px for left column + 560px for right column
  const menuWidth = hasSubCategories ? "960px" : "400px";
  
  return (
    <MegaMenuContainer isOpen={isOpen} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} width={menuWidth} align="left">
      <div className="flex h-[420px]">
        {/* Left Column - Categories */}
        {/* Fixed 400px width ensures the left column doesn't squash during container width animation */}
        <div className={`flex flex-col overflow-y-auto custom-scrollbar shrink-0 transition-colors duration-300 ${hasSubCategories ? 'border-r border-border/40' : ''}`} style={{ width: '400px', paddingRight: hasSubCategories ? '24px' : '8px' }}>
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-text-muted mb-4 pl-4">Material Categories</span>
          <ul className="flex flex-col gap-1">
            {categoriesData.map((cat) => {
              const isActive = activeCategory === cat.id;
              const Icon = iconMap[cat.id] || Settings;
              const catHasSub = cat.children && cat.children.length > 0;
              
              return (
                <li key={cat.id}>
                  <Link
                    href={cat.path || '#'}
                    onMouseEnter={() => setActiveCategory(cat.id)}
                    className={`w-full text-left group relative flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-surface-2 shadow-sm' : 'hover:bg-surface-2 hover:shadow-sm'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-[#c29b62] rounded-r-full transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                      <Icon className={`w-5 h-5 transition-colors duration-300 ${isActive ? 'text-[#c29b62]' : 'text-text-muted group-hover:text-[#c29b62]'}`} strokeWidth={1.5} />
                      <span className={`font-semibold text-[15px] transition-colors duration-300 ${isActive ? 'text-primary' : 'text-text-secondary group-hover:text-primary'}`}>
                        {cat.label}
                      </span>
                    </div>
                    {/* Only show chevron if there are actual subcategories to expand */}
                    <ChevronRight className={`w-4 h-4 transition-all duration-300 ${isActive && catHasSub ? 'text-[#c29b62] translate-x-1 opacity-100' : 'text-text-muted opacity-0 -translate-x-2'}`} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right Column - Subcategories */}
        <AnimatePresence>
          {hasSubCategories && (
            <motion.div 
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.25, ease: [0.215, 0.61, 0.355, 1] }}
              className="pl-8 flex flex-col h-full relative shrink-0" 
              style={{ width: '560px' }}
            >
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-text-muted mb-4 block">Product Lines</span>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                {activeSubCategories.map(sub => (
                  <li key={sub.id}>
                    <Link href={sub.path} className="group flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface transition-all duration-200">
                      <div className="w-1.5 h-1.5 rounded-full border border-[#c29b62] group-hover:bg-[#c29b62] transition-colors duration-300" />
                      <span className="text-[14px] font-medium text-text-secondary group-hover:text-primary transition-colors duration-200">
                        {sub.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              
              <div className="mt-auto pt-6 border-t border-border/30 shrink-0 pr-8">
                 <Link href="/#products" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                   Explore all products
                   <ArrowRight className="w-4 h-4" />
                 </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MegaMenuContainer>
  );
};
