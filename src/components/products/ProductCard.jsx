"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { getProductUrl } from '@/utils/productData';

export function ProductCard({ product }) {
  if (!product) return null;

  // Use primary image if available, else thumbnail, else a fallback placeholder.
  const imageUrl = product.media?.primaryImage || product.media?.thumbnail || '/placeholder-product.svg';
  const url = getProductUrl(product.slug);

  return (
    <Link href={url} className="group flex flex-col bg-white border border-neutral-200 hover:border-primary/50 hover:shadow-lg motion-safe:hover:-translate-y-1 transition-all duration-300 ease-out rounded-sm overflow-hidden h-full">
      <div className="relative aspect-square w-full bg-neutral-50 overflow-hidden">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover motion-safe:group-hover:scale-[1.03] transition-transform duration-500 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-2">
          {product.type && (
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1 block">
              {product.type}
            </span>
          )}
          <h3 className="text-lg font-bold text-neutral-900 group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </div>

        {product.technicalSpecifications?.material && (
          <p className="text-sm text-neutral-600 mb-1">
            <span className="font-medium">Material:</span> {product.technicalSpecifications.material}
          </p>
        )}
        
        {product.technicalSpecifications?.sizeRange && (
          <p className="text-sm text-neutral-600 mb-4">
            <span className="font-medium">Size Range:</span> {product.technicalSpecifications.sizeRange}
          </p>
        )}

        <div className="mt-auto pt-4 flex items-center text-primary font-semibold text-sm group-hover:gap-2 transition-all">
          View Product
          <ArrowRight className="w-4 h-4 ml-1 motion-safe:group-hover:translate-x-1 transition-transform duration-300 ease-out" />
        </div>
      </div>
    </Link>
  );
}
