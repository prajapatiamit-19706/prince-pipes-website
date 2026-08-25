import React from 'react';
import { ShieldCheck, Award } from 'lucide-react';

export default function MaterialStandards({ material }) {
  if (!material.standards || material.standards.length === 0) return null;

  return (
    <section className="pt-16 pb-2 md:py-24 bg-white border-t border-slate-100 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-slate-50/80 to-transparent pointer-events-none -z-10" />

      <div className="container-wide">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            Standards & Specifications
          </h2>
          <p className="text-lg text-slate-500">
            Manufactured and certified in accordance with global industrial standards to ensure uncompromising quality and performance.
          </p>
        </div>

        {/* Global Standards Badges */}
        <div className="flex flex-wrap gap-4 mb-16">
          {material.standards.map((standard, index) => (
            <div
              key={index}
              className="group relative px-6 py-3.5 bg-white border border-slate-200 rounded-xl overflow-hidden cursor-default transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/5 hover:border-blue-200 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center justify-center space-x-3">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300 group-hover:bg-primary-700 transition-colors duration-300 shadow-sm" />
                <span className="text-lg font-bold tracking-wide text-slate-700 group-hover:text-primary-700 transition-colors duration-300">
                  {standard}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Typical Fitting Standards */}
        {material.typicalFittingStandards && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {material.typicalFittingStandards.map((std, idx) => (
              <div key={idx} className="group p-8 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 hover:border-blue-100 transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  <Award className="w-24 h-24 text-blue-900 transform group-hover:rotate-12 transition-transform duration-500" />
                </div>

                <div className="relative">
                  <div className="w-14 h-14 bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary-700 group-hover:text-white transition-all duration-300 shadow-sm ring-1 ring-slate-100 group-hover:ring-primary-400">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-2xl text-slate-900 block mb-3 group-hover:text-primary-700 transition-colors">{std}</h3>
                  <p className="text-base text-slate-500 leading-relaxed group-hover:text-slate-600 transition-colors">
                    Standard manufacturing specification for <span className="font-medium">{material.shortName}</span> fittings.
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
