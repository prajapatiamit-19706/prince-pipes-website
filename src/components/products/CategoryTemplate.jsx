"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SubcategoryCard } from './SubcategoryCard';
import { ProductGrid } from './ProductGrid';
import { ProductBreadcrumb } from '../product/ProductBreadcrumb';
import { getCategoryBreadcrumbs } from '@/utils/productData';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function CategoryTemplate({ category }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set('.category-reveal', { opacity: 1, y: 0 });
      gsap.set('.subcat-card-anim', { opacity: 1, y: 0, scale: 1 });
      return;
    }

    // Set initial state for page header elements
    gsap.set('.category-reveal', { opacity: 0, y: 20 });
    gsap.set('.subcat-card-anim', { opacity: 0, y: 30, scale: 0.98 });

    // Animate header with a slight delay
    gsap.to('.category-reveal', {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
      stagger: 0.1,
      delay: 0.1,
    });

    // ScrollTrigger for subcategory cards
    const subcatCards = gsap.utils.toArray('.subcat-card-anim', containerRef.current);
    if (subcatCards.length > 0) {
      ScrollTrigger.batch(subcatCards, {
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.08,
            overwrite: true
          });
        },
        once: true
      });
    }
  }, { scope: containerRef });

  if (!category) return null;

  const breadcrumbs = getCategoryBreadcrumbs(category.slug);
  const hasSubcategories = category.subCategories && category.subCategories.length > 0;
  
  // Calculate total products recursively if there are subcategories, or directly
  const totalProducts = hasSubcategories
    ? category.subCategories.reduce((acc, sub) => acc + (sub.products ? sub.products.length : 0), 0)
    : (category.products ? category.products.length : 0);

  return (
    <div ref={containerRef} className="bg-white min-h-screen pt-24 pb-12 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <ProductBreadcrumb breadcrumbs={breadcrumbs} />

        {/* Category Hero Section */}
        <div className="py-12 lg:py-16 border-b border-neutral-200 mb-12">
          <h1 className="category-reveal text-4xl md:text-5xl font-bold text-neutral-900 mb-6 uppercase tracking-tight opacity-0">
            {category.name}
          </h1>
          {category.description && (
            <p className="category-reveal text-lg text-neutral-600 max-w-3xl leading-relaxed opacity-0">
              {category.description}
            </p>
          )}
          <div className="category-reveal mt-8 opacity-0">
            <span className="inline-block bg-neutral-100 text-neutral-600 px-4 py-2 rounded-sm text-sm font-semibold">
              {totalProducts} {totalProducts === 1 ? 'Product' : 'Products'} Available
            </span>
          </div>
        </div>

        {/* Dynamic Layout Based on Hierarchy Pattern */}
        {hasSubcategories ? (
          <section aria-labelledby="browse-by-type">
            <div className="category-reveal opacity-0">
              <h2 id="browse-by-type" className="text-2xl font-bold text-neutral-900 mb-8">
                Browse by Type
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.subCategories.map((subCategory) => (
                <div key={subCategory.id || subCategory.slug} className="subcat-card-anim opacity-0">
                  <SubcategoryCard 
                    categorySlug={category.slug}
                    subcategory={subCategory}
                  />
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section aria-labelledby="category-products">
            <div className="category-reveal flex items-center justify-between mb-8 opacity-0">
              <h2 id="category-products" className="text-2xl font-bold text-neutral-900">
                Products
              </h2>
            </div>
            {/* ProductGrid handles its own staggered viewport entrance */}
            <ProductGrid products={category.products || []} />
          </section>
        )}
      </div>
    </div>
  );
}
