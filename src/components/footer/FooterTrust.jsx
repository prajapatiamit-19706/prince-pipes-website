"use client";
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Globe2, Settings } from 'lucide-react';
import footerData from '@/data/footer.json';

// Simple mapping for icons based on text content
const getTrustIcon = (text, index) => {
  const lower = text.toLowerCase();
  if (lower.includes('iso') || lower.includes('certif')) return ShieldCheck;
  if (lower.includes('export') || lower.includes('global') || lower.includes('world')) return Globe2;
  if (lower.includes('india') || lower.includes('msme')) return Award;
  return Settings;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export const FooterTrust = () => {
  const items = footerData.certifications || [];
  
  if (items.length === 0) return null;

  return (
    <div className="border-y border-white/10 bg-primary-800/30">
      <div className="container-wide py-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center md:justify-between items-center gap-6"
        >
          {items.map((item, index) => {
            const Icon = getTrustIcon(item, index);
            return (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="flex items-center gap-3 text-primary-200 hover:text-white transition-colors duration-300 group"
              >
                <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                  <Icon className="w-5 h-5 text-primary-300 group-hover:text-white transition-colors" />
                </div>
                <span className="font-medium text-sm md:text-base tracking-wide">{item}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};
