"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Box } from 'lucide-react';

export function SubcategoryCard({ categorySlug, subcategory }) {
  if (!subcategory) return null;

  // Use subcategory image if available, otherwise a placeholder
  const imageUrl = subcategory.image || '/placeholder-category.jpg';
  
  // Calculate product count safely
  const productCount = subcategory.products ? subcategory.products.length : 0;
  
  return (
    <Link 
      href={`/products/${categorySlug}/${subcategory.slug}`}
      className="group flex flex-col bg-white border border-neutral-200 hover:border-primary/50 hover:shadow-lg motion-safe:hover:-translate-y-1 transition-all duration-300 ease-out rounded-sm overflow-hidden h-full"
    >
      <div className="relative h-48 w-full bg-neutral-100 overflow-hidden flex items-center justify-center">
        {subcategory.image ? (
          <Image
            src={imageUrl}
            alt={subcategory.name}
            fill
            className="object-cover motion-safe:group-hover:scale-[1.03] transition-transform duration-500 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <Box className="w-16 h-16 text-neutral-300 motion-safe:group-hover:scale-[1.03] transition-transform duration-500 ease-out" />
        )}
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-neutral-900 group-hover:text-primary transition-colors mb-2">
          {subcategory.name}
        </h3>
        
        {subcategory.description && (
          <p className="text-sm text-neutral-600 line-clamp-2 mb-4">
            {subcategory.description}
          </p>
        )}
        
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xs font-medium text-neutral-500 bg-neutral-100 px-2 py-1 rounded-sm">
            {productCount} {productCount === 1 ? 'Product' : 'Products'}
          </span>
          <span className="flex items-center text-primary font-semibold text-sm group-hover:gap-2 transition-all">
            Explore
            <ArrowRight className="w-4 h-4 ml-1 motion-safe:group-hover:translate-x-1 transition-transform duration-300 ease-out" />
          </span>
        </div>
      </div>
    </Link>
  );
}
