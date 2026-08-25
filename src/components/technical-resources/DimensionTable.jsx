import React from 'react';

export default function DimensionTable({ product, unit, isPdfView = false }) {
  if (!product || !product.data) return null;

  const data = product.data[unit] || [];
  const columns = product.columns || [];

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full p-8 text-text-muted bg-surface/30 rounded-xl border border-border/50">
        <p>Dimension data is currently unavailable for this unit.</p>
      </div>
    );
  }

  return (
    <div 
      className={`flex flex-col bg-white overflow-hidden ${!isPdfView ? 'border border-border/50 rounded-xl shadow-sm' : ''}`} 
      style={!isPdfView ? { maxHeight: '600px' } : {}}
    >
      <div className={`table-scroll-container ${!isPdfView ? 'overflow-auto flex-1 relative relative-scroll' : 'w-full'}`} data-lenis-prevent="true">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="text-xs text-text-secondary uppercase bg-surface sticky top-0 z-20 shadow-sm shadow-border/20">
            <tr>
              {columns.map((col, index) => (
                <th 
                  key={col.key} 
                  scope="col" 
                  className={`px-4 py-3 font-semibold border-b border-border/80 whitespace-nowrap bg-surface
                    ${index === 0 ? 'sticky left-0 z-30 shadow-[1px_0_0_0_var(--color-border-dark)]' : ''}
                  `}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {data.map((row, rowIndex) => (
              <tr 
                key={rowIndex} 
                className="hover:bg-surface-2/50 transition-colors group"
              >
                {columns.map((col, colIndex) => {
                  const value = row[col.key];
                  const isPrimaryCol = colIndex === 0;
                  
                  return (
                    <td 
                      key={`${rowIndex}-${col.key}`} 
                      className={`px-4 py-2.5 whitespace-nowrap
                        ${isPrimaryCol ? 'font-medium text-text bg-white group-hover:bg-surface-2/50 sticky left-0 z-10 shadow-[1px_0_0_0_var(--color-border)]' : 'text-text-secondary'}
                        ${value === '-' ? 'text-text-muted text-center' : ''}
                      `}
                    >
                      {value || '-'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
