import React from 'react';
import CertificatesClient from '@/components/resources/CertificatesClient';
import { ProductBreadcrumb } from '@/components/product/ProductBreadcrumb';
import certificatesData from '@/data/certificates.json';

export const metadata = {
  title: 'Certificates | Prince Pipes & Fittings',
  description: 'Explore Prince Pipes & Fittings certifications and quality credentials demonstrating our commitment to quality and reliable manufacturing.',
};

export default function CertificatesPage() {
  const breadcrumbs = [
    { name: 'Resources', path: null },
    { name: 'Certificates', path: '/resources/certificates' }
  ];

  return (
    <main className="min-h-screen bg-slate-50 pb-12 md:pb-16 lg:pb-24">
      {/* Compact Hero Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="mb-4">
            <ProductBreadcrumb breadcrumbs={breadcrumbs} />
          </div>
          <div className="max-w-3xl">
            <span className="inline-block text-[11px] font-bold tracking-widest text-primary-700 uppercase bg-slate-50 px-3 py-1 border border-slate-200 rounded-sm mb-4">
              CERTIFICATIONS & QUALITY
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-[42px] leading-[1.2] font-bold text-slate-900 tracking-tight mb-4">
              Certificates
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              View our certifications and quality credentials that demonstrate our commitment to quality and reliable manufacturing.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CertificatesClient certificates={certificatesData} />
      </section>
    </main>
  );
}
