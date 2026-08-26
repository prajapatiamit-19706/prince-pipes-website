import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import MaterialGradeSelector from './MaterialGradeSelector';

export default function MaterialGrades({ material }) {
  if (!material.grades || material.grades.length === 0) return null;

  return (
    <section className="py-8 md:py-6 md:py-10 lg:py-16 lg:py-10 md:py-6 md:py-10 lg:py-16 lg:py-24 bg-white border-t border-slate-100">
      <div className="container-wide">
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            MATERIAL GRADES
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Select a grade to understand its characteristics and typical chemical composition.
          </p>
        </div>

        <MaterialGradeSelector material={material} />
      </div>
    </section>
  );
}
