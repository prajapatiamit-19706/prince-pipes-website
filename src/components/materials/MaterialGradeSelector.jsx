"use client";

import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

export default function MaterialGradeSelector({ material }) {
  // Normalize grades to handle both array of strings and array of objects
  const normalizedGrades = material.grades?.map(g => typeof g === 'object' ? g.grade : g) || [];
  const [activeGrade, setActiveGrade] = useState(normalizedGrades[0] || "");

  if (normalizedGrades.length === 0) return null;

  return (
    <div className="flex flex-col space-y-8">
      {/* Grade Tabs */}
      <div className="flex overflow-x-auto pb-4 hide-scrollbar space-x-2">
        {normalizedGrades.map((grade, idx) => (
          <button
            key={`${grade}-${idx}`}
            onClick={() => setActiveGrade(grade)}
            className={`flex-shrink-0 px-6 py-3 rounded-full text-sm font-medium transition-all ${activeGrade === grade
                ? 'bg-primary text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
          >
            {grade}
          </button>
        ))}
      </div>

      {/* Grade Details - Interactive Area */}
      <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm transition-all duration-300">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">

          <div className="space-y-4 max-w-xl">
            <h3 className="text-3xl font-bold text-slate-900">
              {material.shortName} {activeGrade}
            </h3>
            <p className="text-slate-600 leading-relaxed text-lg">
              {activeGrade} is one of the most widely used grades of {material.name.toLowerCase()}, offering excellent balance of strength, corrosion resistance, and fabricability for industrial applications.
            </p>
          </div>

          <div className="w-full md:w-auto">
            <button className="group flex items-center space-x-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              <span>View full grade specifications</span>
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Dummy technical specs block just to show composition layout */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-slate-100">
          <div className="space-y-1">
            <div className="text-sm text-slate-500 uppercase tracking-wider">Chromium</div>
            <div className="font-medium text-slate-900">18-20%</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-slate-500 uppercase tracking-wider">Nickel</div>
            <div className="font-medium text-slate-900">8-10.5%</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-slate-500 uppercase tracking-wider">Carbon</div>
            <div className="font-medium text-slate-900">≤0.08%</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-slate-500 uppercase tracking-wider">Molybdenum</div>
            <div className="font-medium text-slate-900">—</div>
          </div>
        </div>
      </div>
    </div>
  );
}
