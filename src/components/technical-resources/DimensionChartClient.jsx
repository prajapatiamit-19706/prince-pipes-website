/* eslint-disable react-hooks/exhaustive-deps, react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import ProductSelector from './ProductSelector';
import DimensionChartPanel from './DimensionChartPanel';
import FAQAccordion from './FAQAccordion';
import TechnicalSupportCTA from './TechnicalSupportCTA';
import dimensionData from '@/data/ss_dimension_chart.json';
import { ProductBreadcrumb } from '@/components/product/ProductBreadcrumb';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function DimensionChartClient() {
  const containerRef = useRef(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const productParam = searchParams.get('product');

  const products = dimensionData.products || [];
  
  // Default to first product if none selected or invalid
  const defaultProductId = products[0]?.id;
  const initialProductId = products.some(p => p.id === productParam) ? productParam : defaultProductId;

  const [selectedProductId, setSelectedProductId] = useState(initialProductId);
  const [unit, setUnit] = useState('inch');

  const selectedProduct = products.find(p => p.id === selectedProductId) || products[0];

  // Update URL when product changes
  const handleProductSelect = (id) => {
    setSelectedProductId(id);
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('product', id);
    router.push(`?${newParams.toString()}`, { scroll: false });
    
    // Reset unit to inch when switching products if the new product supports it, else mm
    const newProduct = products.find(p => p.id === id);
    if (newProduct?.availableUnits && !newProduct.availableUnits.includes(unit)) {
      setUnit(newProduct.availableUnits[0]);
    }
  };

  // Sync state if URL changes externally
  useEffect(() => {
    if (productParam && products.some(p => p.id === productParam)) {
      setSelectedProductId(productParam);
    }
  }, [productParam, products]);

  // Smooth GSAP Animations
  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.fromTo('.breadcrumb-item', 
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' }
    );
    
    tl.fromTo('.header-animate',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: 'power3.out' },
      "-=0.2"
    );
    
    tl.fromTo('.product-selector-animate',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      "-=0.4"
    );
    
    tl.fromTo('.panel-animate',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      "-=0.4"
    );
    
    gsap.fromTo('.info-block-animate',
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.info-block-animate',
          start: 'top 85%',
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-10 lg:pt-12 pb-8 md:pb-12">
      
      {/* Compact Breadcrumb */}
      <div className="breadcrumb-item -mt-4 mb-2 md:-mt-6 md:mb-4">
        <ProductBreadcrumb breadcrumbs={[
          { name: 'Technical Resources', path: '/technical-resources' },
          { name: 'Dimension Charts', path: '/technical-resources/dimension-charts' }
        ]} />
      </div>

      {/* Page Header */}
      <div className="max-w-3xl mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary tracking-tight mb-4 uppercase header-animate">
          Stainless Steel <br/>
          <span className="text-secondary">Pipe Fittings Dimension Chart</span>
        </h1>
        <p className="text-base md:text-lg text-text-secondary mb-6 leading-relaxed header-animate">
          Reference dimensions for stainless steel pipe fittings manufactured to applicable industry standards.
        </p>
        
        {/* Standard Badges */}
        <div className="flex flex-wrap gap-2 header-animate">
          <span className="inline-flex items-center px-3 py-1 rounded bg-surface border border-border text-xs font-medium text-text-secondary shadow-sm">
            SS 304 / 304L / 316 / 316L
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded bg-surface border border-border text-xs font-medium text-text-secondary shadow-sm">
            ASME B16.9
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded bg-surface border border-border text-xs font-medium text-text-secondary shadow-sm">
            ASME B16.11
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded bg-surface border border-border text-xs font-medium text-text-secondary shadow-sm">
            ASTM A182
          </span>
        </div>
      </div>

      {/* Product Selector */}
      <div className="product-selector-animate">
        <ProductSelector 
          products={products} 
          selectedProductId={selectedProductId}
          onSelectProduct={handleProductSelect}
        />
      </div>

      {/* Main Dimension Section */}
      <div className="panel-animate">
        <DimensionChartPanel 
          product={selectedProduct} 
          unit={unit} 
          setUnit={setUnit} 
        />
      </div>

      {/* Technical Information Block */}
      <div className="bg-surface/50 border border-border/50 rounded-xl p-5 md:p-6 mb-12 info-block-animate">
        <h3 className="text-sm font-bold text-text mb-3 uppercase tracking-wider">Technical Information</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm text-text-secondary">
          <li className="flex items-start">
            <span className="text-primary mr-2">✓</span>
            <span>Dimensions are provided for reference only.</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">✓</span>
            <span>Dimensions should be verified against applicable standards.</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">✓</span>
            <span>Dimensions may vary according to product configuration.</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">✓</span>
            <span>Material and schedule affect dimensional specifications.</span>
          </li>
        </ul>
      </div>

      {/* FAQ & CTA */}
      <FAQAccordion />
      <TechnicalSupportCTA />
    </div>
  );
}
