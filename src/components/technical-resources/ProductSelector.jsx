import React from 'react';
import * as LucideIcons from 'lucide-react';

export default function ProductSelector({ products, selectedProductId, onSelectProduct }) {
  return (
    <div className="w-full mt-6 mb-8 border-b border-border/60 pb-2">
      <div className="flex flex-wrap items-center gap-2 pb-2">
        {products.map((product) => {
          // Fallback to Box icon if the specified icon isn't found
          const IconComponent = LucideIcons[product.icon] || LucideIcons.Box;
          const isActive = product.id === selectedProductId;
          
          return (
            <button
              key={product.id}
              onClick={() => onSelectProduct(product.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors snap-start
                ${isActive 
                  ? 'bg-primary text-white shadow-sm border border-primary' 
                  : 'bg-surface hover:bg-surface-2 text-text-secondary border border-border hover:text-text'
                }
              `}
              aria-pressed={isActive}
            >
              <IconComponent className={`w-4 h-4 ${isActive ? 'text-white' : 'text-text-muted'}`} />
              <span className="text-sm font-medium">{product.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
