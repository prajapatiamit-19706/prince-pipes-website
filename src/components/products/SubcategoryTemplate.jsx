"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ProductGrid } from './ProductGrid';
import { ProductBreadcrumb } from '../product/ProductBreadcrumb';
import { getSubcategoryBreadcrumbs } from '@/utils/productData';

gsap.registerPlugin(useGSAP);

export function SubcategoryTemplate({ category, subcategory }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set('.subcategory-reveal', { opacity: 1, y: 0 });
      return;
    }

    // Set initial state
    gsap.set('.subcategory-reveal', { opacity: 0, y: 20 });

    // Animate with a slight delay to allow breadcrumb to start first
    gsap.to('.subcategory-reveal', {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
      stagger: 0.1,
      delay: 0.1,
    });
  }, { scope: containerRef });

  if (!category || !subcategory) return null;

  const breadcrumbs = getSubcategoryBreadcrumbs(category.slug, subcategory.slug);
  const products = subcategory.products || [];
  const totalProducts = products.length;

  return (
    <div ref={containerRef} className="bg-white min-h-screen pt-24 pb-12 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <ProductBreadcrumb breadcrumbs={breadcrumbs} />

        {/* Subcategory Hero Section */}
        <div className="py-12 lg:py-16 border-b border-neutral-200 mb-12">
          <h1 className="subcategory-reveal text-4xl md:text-5xl font-bold text-neutral-900 mb-6 uppercase tracking-tight opacity-0">
            {subcategory.name}
          </h1>
          {subcategory.description && (
            <p className="subcategory-reveal text-lg text-neutral-600 max-w-3xl leading-relaxed opacity-0">
              {subcategory.description}
            </p>
          )}
          <div className="subcategory-reveal mt-8 opacity-0">
            <span className="inline-block bg-neutral-100 text-neutral-600 px-4 py-2 rounded-sm text-sm font-semibold">
              {totalProducts} {totalProducts === 1 ? 'Product' : 'Products'} Available
            </span>
          </div>
        </div>

        {/* Product Listing */}
        <section aria-labelledby="subcategory-products">
          <div className="subcategory-reveal flex items-center justify-between mb-8 opacity-0">
            <h2 id="subcategory-products" className="text-2xl font-bold text-neutral-900">
              Products
            </h2>
          </div>
          {/* ProductGrid handles its own staggered viewport entrance */}
          <ProductGrid products={products} />
        </section>
      </div>
    </div>
  );
}
