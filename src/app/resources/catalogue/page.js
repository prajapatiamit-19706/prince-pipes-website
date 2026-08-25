import React from 'react';
import CatalogueClient from '@/components/resources/CatalogueClient';
import productsData from '@/data/products.json';
import industriesData from '@/data/industries.json';

export const metadata = {
  title: 'Product Catalogue | Industrial Pipe Fittings',
  description: 'Explore our comprehensive product catalogue of industrial pipe fittings, flanges, and components. Available in Stainless Steel, Carbon Steel, and more.',
};

export default function ProductCataloguePage() {
  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CatalogueClient 
          productsData={productsData} 
          industriesData={industriesData} 
        />
      </div>
    </main>
  );
}
