"use client";
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export const MegaMenu = ({ isOpen, data, onMouseEnter, onMouseLeave }) => {
  return (
    <AnimatePresence>
      {isOpen && data && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="absolute top-full left-0 w-full bg-white shadow-dropdown z-[400] border-t border-border"
        >
          <div className="container-wide py-12 flex gap-6 md:gap-8 lg:gap-12">
            <div className="flex-[2] grid grid-cols-3 gap-8">
              {data.categories.map((category) => (
                <div key={category.title} className="flex flex-col">
                  <h4 className="font-heading font-semibold text-primary mb-4 text-sm tracking-widest uppercase">
                    {category.title}
                  </h4>
                  <ul className="flex flex-col gap-3">
                    {category.items.map((item) => (
                      <li key={item.href}>
                        <Link 
                          href={item.href}
                          className="text-text-secondary hover:text-primary transition-colors font-medium text-[15px]"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="flex-1 bg-surface rounded-xl p-8 flex flex-col justify-between border border-border/50">
              <h4 className="font-heading font-semibold text-text-primary mb-6 text-sm tracking-widest uppercase flex items-center gap-2">
                Featured Products
              </h4>
              <div className="flex flex-col gap-6">
                {data.featured.map((item) => (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    className="group flex items-center gap-4 hover:bg-white p-3 rounded-lg transition-all"
                  >
                    <div className="relative w-16 h-16 bg-white rounded-md overflow-hidden flex-shrink-0 shadow-sm border border-border">
                      <Image src={item.image} alt={item.title} fill sizes="64px" className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-text-primary group-hover:text-primary transition-colors">
                        {item.title}
                      </h5>
                      <p className="text-xs text-text-muted mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
