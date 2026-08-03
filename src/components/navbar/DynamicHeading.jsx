"use client";
import { useHeaderContext } from '@/context/HeaderContext';
import navigationData from '@/data/navigation.json';
import { motion, AnimatePresence } from 'framer-motion';

const NAVIGATION = navigationData.primary;

export const DynamicHeading = () => {
  const { dynamicHeading, activeRoute } = useHeaderContext();
  
  // Find the current page name based on activeRoute
  const navItem = NAVIGATION.find(item => item.path === activeRoute) || NAVIGATION[0];
  const pageName = navItem.label;
  
  return (
    <div className="hidden md:flex flex-1 flex-col items-center justify-center">
      <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-semibold mb-1">
        {dynamicHeading?.subtitle || pageName}
      </span>
      <h1 className="text-sm xl:text-lg font-heading font-medium text-text-primary tracking-tight">
        {dynamicHeading?.title || dynamicHeading}
      </h1>
    </div>
  );
};
