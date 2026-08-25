import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function MaterialComparisonLinks({ relatedMaterials }) {
  if (!relatedMaterials || relatedMaterials.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-white border-t border-slate-100">
      <div className="container-wide">
        <h2 className="text-2xl font-bold text-slate-900 mb-4 uppercase">
          CHOOSE THE RIGHT MATERIAL
        </h2>
        <p className="text-lg text-slate-600 mb-12">
          Not sure which material suits your application? Compare other engineering materials.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {relatedMaterials.map((mat, index) => (
            <Link key={index} href={mat.href} className="group flex flex-col p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-primary-200 hover:bg-primary-50 transition-all duration-300">
              <span className="font-bold text-slate-900 group-hover:text-primary-700 transition-colors mb-4">{mat.name}</span>
              <div className="flex items-center space-x-2 text-primary-600 text-sm font-semibold mt-auto">
                <span>Explore</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
