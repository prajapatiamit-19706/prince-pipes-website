"use client";

import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function CertificatesEmptyState() {
  return (
    <div className="w-full py-16 sm:py-24 flex flex-col items-center justify-center text-center bg-white border border-slate-200 rounded-xl px-4">
      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-6 border border-slate-100 shadow-sm">
        <ShieldCheck className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
        Certificates Coming Soon
      </h3>
      <p className="text-slate-500 max-w-md mx-auto text-base">
        Quality certifications and company credentials will be available here. We are continually updating our resources to demonstrate our commitment to quality.
      </p>
    </div>
  );
}
