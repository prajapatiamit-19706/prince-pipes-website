"use client";
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Globe2, Settings } from 'lucide-react';
import footerData from '@/data/footer.json';
import { SocialLinks } from './SocialLinks';

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
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center"
        >
          {/* First Certification (Left) */}
          {items[0] && (
            <motion.div 
              variants={itemVariants}
              className="flex items-center gap-3 text-primary-200 hover:text-white transition-colors duration-300 group justify-self-center md:justify-self-start"
            >
              <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                {(() => {
                  const Icon = getTrustIcon(items[0], 0);
                  return <Icon className="w-5 h-5 text-primary-300 group-hover:text-white transition-colors" />
                })()}
              </div>
              <span className="font-medium text-sm md:text-base tracking-wide">{items[0]}</span>
            </motion.div>
          )}

          {/* Second Certification / MSME (Center) */}
          {items[1] && (
            <motion.div 
              variants={itemVariants}
              className="flex items-center gap-3 text-primary-200 hover:text-white transition-colors duration-300 group justify-self-center"
            >
              <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                {(() => {
                  const Icon = getTrustIcon(items[1], 1);
                  return <Icon className="w-5 h-5 text-primary-300 group-hover:text-white transition-colors" />
                })()}
              </div>
              <span className="font-medium text-sm md:text-base tracking-wide">{items[1]}</span>
            </motion.div>
          )}

          {/* Social Links (Right) */}
          <motion.div variants={itemVariants} className="justify-self-center md:justify-self-end">
            <SocialLinks />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
