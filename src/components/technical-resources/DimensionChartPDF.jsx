import React from 'react';
import TechnicalDimensionDrawing from './TechnicalDimensionDrawing';
import DimensionTable from './DimensionTable';

export default function DimensionChartPDF({ product, unit, contactData, companyData }) {
  return (
    <div 
      id="dimension-chart-pdf-container" 
      className="bg-white p-8 w-[1024px] font-sans text-gray-900"
      style={{
        boxSizing: 'border-box'
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-start border-b-2 border-primary pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary uppercase tracking-tight mb-2">
            {product.name} Dimensions
          </h1>
          <div className="flex gap-4 text-sm text-gray-600 font-medium">
            {product.standards?.length > 0 && (
              <span>Standard: {product.standards.join(', ')}</span>
            )}
            {product.materials?.length > 0 && (
              <span>Material: {product.materials.join(', ')}</span>
            )}
            <span>Unit: {unit.toUpperCase()}</span>
          </div>
        </div>
        
        {/* Company Info */}
        <div className="text-right text-sm">
          <div className="text-xl font-bold text-primary mb-1">
            {companyData?.name || 'Prince Pipes & Fittings'}
          </div>
          {contactData?.phone && <div className="text-gray-600">Phone: {contactData.phone}</div>}
          {contactData?.email && <div className="text-gray-600">Email: {contactData.email}</div>}
          {contactData?.officeAddress && (
            <div className="text-gray-500 max-w-xs ml-auto mt-1 leading-snug">
              {contactData.officeAddress}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-8">
        {/* Drawing Section */}
        <div className="w-full max-w-2xl mx-auto border border-gray-200 rounded-lg p-6 bg-gray-50">
          <TechnicalDimensionDrawing product={product} />
        </div>

        {/* Table Section */}
        <div className="w-full">
          <DimensionTable product={product} unit={unit} isPdfView={true} />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-4 border-t border-gray-200 text-center text-xs text-gray-400">
        Generated from {companyData?.website || 'princepipes.com'} • Dimensions are for reference only.
      </div>
    </div>
  );
}
