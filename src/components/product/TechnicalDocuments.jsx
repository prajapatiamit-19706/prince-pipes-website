"use client";

import { FileText, Download } from 'lucide-react';

export function TechnicalDocuments({ documents }) {
  if (!documents || Object.values(documents).every(v => !v)) return null;

  const docsList = [
    { label: "Product Datasheet", url: documents.datasheet },
    { label: "Dimension Chart", url: documents.dimensionChart },
    { label: "Weight Chart", url: documents.weightChart },
    { label: "Technical Document", url: documents.technicalDocument },
    { label: "Catalogue", url: documents.catalogue },
  ].filter(doc => doc.url);

  if (docsList.length === 0) return null;

  return (
    <section className="bg-neutral-50 border border-neutral-200 p-8 sticky top-24">
      <h2 className="text-sm font-bold tracking-[0.2em] text-neutral-900 uppercase mb-8">
        TECHNICAL RESOURCES
      </h2>
      
      <div className="space-y-6">
        {docsList.map((doc, idx) => (
          <div key={idx} className="flex flex-col gap-3 pb-6 border-b border-neutral-200 last:border-0 last:pb-0">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-neutral-400" />
              <span className="text-sm font-medium text-neutral-800">{doc.label}</span>
            </div>
            <a 
              href={doc.url} 
              className="text-xs font-bold tracking-widest text-primary hover:text-primary-dark transition-colors inline-flex items-center gap-1.5 uppercase"
            >
              [ VIEW / DOWNLOAD ]
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
