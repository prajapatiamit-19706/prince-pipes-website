"use client";
import { NavigationItem } from './NavigationItem';
import navigationData from '@/data/navigation.json';
import { useHeaderContext } from '@/context/HeaderContext';
import { HEADER_LAYOUT } from '@/constants/layout';
import { motion } from 'framer-motion';

const NAVIGATION = navigationData.primary;

export const PrimaryNavigation = () => {
  const { isScrolled } = useHeaderContext();

  return (
    <motion.div
      animate={{
        height: isScrolled ? HEADER_LAYOUT.PRIMARY_NAV_HEIGHT_SCROLLED : HEADER_LAYOUT.PRIMARY_NAV_HEIGHT
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="bg-white hidden md:flex justify-center z-10 relative"
    >
      <nav className="flex items-center h-full gap-10">
        {NAVIGATION.map((item) => (
          <NavigationItem key={item.id} item={item} />
        ))}
      </nav>
    </motion.div>
  );
};
