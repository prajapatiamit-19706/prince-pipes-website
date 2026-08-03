"use client";
import { useHeaderContext } from '@/context/HeaderContext';
import { Phone, Mail, Award, Globe } from 'lucide-react';
import { HEADER_LAYOUT } from '@/constants/layout';
import { motion, AnimatePresence } from 'framer-motion';

export const UtilityBar = () => {
  const { isScrolled } = useHeaderContext();

  return (
    <AnimatePresence>
      {!isScrolled && (
        <motion.div
          initial={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="bg-primary text-white overflow-hidden hidden md:block"
        >
          <div className="container-wide h-[32px] xl:h-[40px] flex items-center justify-between text-[10px] xl:text-xs font-medium">
            <div className="flex items-center gap-4 xl:gap-6">
              <a href="tel:+18001234567" className="flex items-center gap-1.5 xl:gap-2 hover:text-accent transition-colors">
                <Phone className="w-3 h-3 xl:w-3.5 xl:h-3.5" />
                <span>1800-123-4567</span>
              </a>
              <a href="mailto:info@princepipes.com" className="flex items-center gap-1.5 xl:gap-2 hover:text-accent transition-colors">
                <Mail className="w-3 h-3 xl:w-3.5 xl:h-3.5" />
                <span>info@princepipes.com</span>
              </a>
            </div>
            <div className="flex items-center gap-4 xl:gap-6">
              <span className="flex items-center gap-1.5 xl:gap-2">
                <Award className="w-3 h-3 xl:w-3.5 xl:h-3.5" />
                ISO 9001:2015 Certified
              </span>
              <span className="flex items-center gap-1.5 xl:gap-2 text-accent">
                <Globe className="w-3 h-3 xl:w-3.5 xl:h-3.5" />
                Export Worldwide
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
