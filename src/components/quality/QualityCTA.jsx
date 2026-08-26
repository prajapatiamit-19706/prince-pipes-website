import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function QualityCTA({ data }) {
  if (!data) return null;

  return (
    <section className="bg-white py-12 lg:py-8 md:py-12 lg:py-20 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-lg p-8 sm:p-12 lg:p-16 shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative overflow-hidden">
          
          {/* Decorative background for the card */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#33415540_1px,transparent_1px),linear-gradient(to_bottom,#33415540_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

          <div className="w-full lg:w-2/3 relative z-10">
            <span className="block text-[10px] font-bold tracking-widest text-primary-400 uppercase mb-3">
              {data.eyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
              {data.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl">
              {data.description}
            </p>
          </div>

          <div className="w-full lg:w-1/3 flex flex-wrap gap-4 lg:justify-end relative z-10">
            <Link 
              href={data.primaryButton.href} 
              className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-medium text-sm transition-colors hover:bg-primary-500 rounded-sm shadow-sm"
            >
              {data.primaryButton.label} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link 
              href={data.secondaryButton.href} 
              className="inline-flex items-center justify-center px-6 py-3 bg-slate-800 text-slate-200 border border-slate-700 font-medium text-sm transition-colors hover:bg-slate-700 hover:text-white rounded-sm"
            >
              {data.secondaryButton.label}
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
