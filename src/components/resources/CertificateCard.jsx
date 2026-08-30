"use client";

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { FileText, ExternalLink } from 'lucide-react';

export default function CertificateCard({ certificate, onView }) {
  const cardRef = useRef(null);
  
  useGSAP(() => {
    // Entrance animation is handled by the parent grid staggering, 
    // but we can add a subtle hover effect here or use tailwind classes.
    // Tailwind classes are sufficient and more performant for hover.
  }, { scope: cardRef });

  return (
    <div 
      ref={cardRef}
      className="certificate-card group relative flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-slate-300 hover:-translate-y-1 h-full"
    >
      {/* Document Preview */}
      <div className="relative w-full pt-[75%] bg-slate-50 border-b border-slate-100 flex items-center justify-center overflow-hidden">
        {certificate.document ? (
          <div className="absolute inset-0 overflow-hidden pointer-events-none select-none group-hover:scale-105 transition-transform duration-500 ease-out">
            {/* An invisible overlay to ensure no interaction with the iframe */}
            <div className="absolute inset-0 z-10 bg-transparent"></div>
            <iframe 
              src={`${certificate.document}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border-0"
              title={`${certificate.title} Preview`}
              tabIndex={-1}
            />
          </div>
        ) : (
          <>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-50"></div>
            <div className="absolute flex flex-col items-center justify-center text-slate-400 group-hover:text-primary-600 transition-colors duration-300 group-hover:scale-105">
              <FileText className="w-16 h-16 stroke-[1.5] mb-3" />
              <span className="text-xs font-mono font-medium tracking-widest uppercase">Document</span>
            </div>
          </>
        )}
      </div>
      
      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-primary-700 transition-colors">
          {certificate.title}
        </h3>
        
        {certificate.certificateNumber && (
          <div className="text-sm text-slate-600 mb-1 flex items-start">
            <span className="font-semibold mr-2 min-w-[70px]">Number:</span>
            <span>{certificate.certificateNumber}</span>
          </div>
        )}
        
        {certificate.issuer && (
          <div className="text-sm text-slate-600 mb-1 flex items-start">
            <span className="font-semibold mr-2 min-w-[70px]">Issuer:</span>
            <span>{certificate.issuer}</span>
          </div>
        )}
        
        {certificate.validity && (
          <div className="text-sm text-slate-600 mb-4 flex items-start">
            <span className="font-semibold mr-2 min-w-[70px]">Validity:</span>
            <span>{certificate.validity}</span>
          </div>
        )}

        <div className="mt-auto pt-4">
          <button 
            onClick={() => onView(certificate)}
            className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-slate-50 text-slate-800 border border-slate-200 font-medium text-sm transition-colors hover:bg-primary-50 hover:text-primary-700 hover:border-primary-200 rounded-sm"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View Certificate
          </button>
        </div>
      </div>
    </div>
  );
}
