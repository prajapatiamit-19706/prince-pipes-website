import React, { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import TechnicalDimensionDrawing from './TechnicalDimensionDrawing';
import DimensionTable from './DimensionTable';
import { generateDimensionPDF } from '@/utils/generateDimensionPDF';
import contactData from '@/data/contact.json';
import companyData from '@/data/company.json';

export default function DimensionChartPanel({ product, unit, setUnit }) {
  const [isGenerating, setIsGenerating] = useState(false);

  if (!product) return null;

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      await generateDimensionPDF(product, unit, contactData, companyData);
    } catch (error) {
      console.error("Failed to generate PDF", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-border/60 overflow-hidden mb-8">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between p-6 border-b border-border/60 bg-surface/30 gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-primary uppercase tracking-tight mb-2">
            {product.name} Dimensions
          </h2>
          <div className="flex flex-wrap gap-2 text-sm">
            {product.standards?.length > 0 && (
              <span className="inline-flex items-center text-text-secondary">
                <span className="font-semibold text-text mr-1">Standard:</span> 
                {product.standards.join(', ')}
              </span>
            )}
            {product.materials?.length > 0 && (
              <>
                <span className="hidden md:inline text-border-dark px-1">|</span>
                <span className="inline-flex items-center text-text-secondary">
                  <span className="font-semibold text-text mr-1">Material:</span> 
                  {product.materials.join(', ')}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3 mt-2 md:mt-0">
          {/* Unit Switcher */}
          {product.availableUnits?.length > 1 && (
            <div className="flex bg-surface-2 p-1 rounded-lg border border-border">
              {product.availableUnits.map(availableUnit => (
                <button
                  key={availableUnit}
                  onClick={() => setUnit(availableUnit)}
                  className={`px-3 py-1.5 text-xs font-bold uppercase rounded-md transition-all
                    ${unit === availableUnit 
                      ? 'bg-white text-primary shadow-sm ring-1 ring-border' 
                      : 'text-text-muted hover:text-text-secondary'
                    }
                  `}
                >
                  {availableUnit}
                </button>
              ))}
            </div>
          )}

          {/* Download Button */}
          <button 
            onClick={handleDownload}
            disabled={isGenerating}
            className="flex items-center px-4 py-2 bg-primary-50 hover:bg-primary-100 text-primary border border-primary-200 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                <span>Download PDF</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
        {/* Drawing Section (40%) */}
        <div className="col-span-1 lg:col-span-5 flex flex-col h-full">
          <TechnicalDimensionDrawing product={product} />
        </div>

        {/* Table Section (60%) */}
        <div className="col-span-1 lg:col-span-7 flex flex-col h-full">
          <DimensionTable product={product} unit={unit} />
        </div>
      </div>
    </div>
  );
}
