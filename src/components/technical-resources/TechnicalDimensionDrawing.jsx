/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { 
  TeeDrawing, 
  ElbowDrawing, 
  ConcentricReducerDrawing, 
  EccentricReducerDrawing, 
  LongStubEndDrawing,
  ShortStubEndDrawing, 
  ThreadedNippleDrawing, 
  HexNippleDrawing, 
  PlugDrawing, 
  SocketDrawing 
} from './drawings/FittingDrawings';

export default function TechnicalDimensionDrawing({ product }) {
  if (!product) return null;
  
  const { drawing, id } = product;
  
  const renderDrawing = () => {
    if (drawing?.image) {
      return (
        <img 
          src={drawing.image} 
          alt={`Stainless steel ${product.name.toLowerCase()} dimension drawing`}
          className="max-w-full max-h-[300px] object-contain" 
        />
      );
    }
    
    // Render SVG based on product ID
    switch(id) {
      case 'tee': return <TeeDrawing />;
      case 'elbow': return <ElbowDrawing />;
      case 'concentric-reducer': return <ConcentricReducerDrawing />;
      case 'eccentric-reducer': return <EccentricReducerDrawing />;
      case 'long-stub-end': return <LongStubEndDrawing />;
      case 'short-stub-end': return <ShortStubEndDrawing />;
      case 'cnc-threaded-nipple': return <ThreadedNippleDrawing />;
      case 'hex-nipple': return <HexNippleDrawing />;
      case 'plug': return <PlugDrawing />;
      case 'socket': return <SocketDrawing />;
      default: return (
        <div className="flex flex-col items-center justify-center text-text-muted text-center">
          <ImageIcon className="w-12 h-12 mb-3 text-border-dark" />
          <p className="text-sm font-medium text-text-secondary">Technical drawing coming soon</p>
          <p className="text-xs mt-1">Reference legend below for dimension parameters</p>
        </div>
      );
    }
  };
  
  return (
    <div className="flex flex-col h-full bg-white border border-border/50 rounded-xl overflow-hidden shadow-sm">
      <div className="p-4 border-b border-border/50 bg-surface/50">
        <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
          Technical Drawing
        </h3>
      </div>
      
      {/* Drawing Area */}
      <div className="flex-grow flex items-center justify-center p-8 bg-surface-2/30 min-h-[250px]">
        {renderDrawing()}
      </div>

      {/* Legend Area */}
      {drawing?.labels && drawing.labels.length > 0 && (
        <div className="p-4 bg-surface border-t border-border/50">
          <p className="text-xs font-semibold text-text-secondary mb-2 uppercase tracking-wide">Dimension Legend</p>
          <div className="grid grid-cols-2 gap-2">
            {drawing.labels.map((label, index) => (
              <div key={index} className="flex items-start space-x-2">
                <span className="inline-flex items-center justify-center min-w-[24px] h-6 px-1.5 rounded bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                  {label.id}
                </span>
                <span className="text-xs text-text-secondary py-1 leading-tight">
                  = {label.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
