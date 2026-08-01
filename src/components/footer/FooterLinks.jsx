"use client";
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/components/ui/button/buttonVariants';

export const FooterLinks = ({ items }) => {
  if (!items || !Array.isArray(items)) return null;

  return (
    <>
      {items.map((item) => (
        <Link 
          key={item.id} 
          href={item.path || '#'}
          className="group flex items-center py-1 text-primary-200 hover:text-white transition-colors duration-200"
        >
          {/* Subtle arrow animation */}
          <span className="opacity-0 -translate-x-2 w-0 group-hover:w-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 overflow-hidden text-white mr-1 flex items-center">
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
          
          <span className="relative">
            {item.label}
            {/* Underline grow effect */}
            <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-white transition-all duration-300 group-hover:w-full opacity-50" />
          </span>
        </Link>
      ))}
    </>
  );
};
