import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function HeroCategories({ categories }) {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="w-full bg-surface py-20 border-t border-border mt-auto">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-2">Product Range</h2>
            <p className="text-3xl md:text-4xl font-bold text-text tracking-tight">Premium Industrial Solutions</p>
          </div>
          <Link href="/products" className="hidden md:flex items-center gap-2 text-primary font-medium hover:text-primary-hover transition-colors group">
            View All Categories
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={category.href}
              className="hero-category-card opacity-0 translate-y-8 group flex flex-col h-full p-6 rounded-xl border border-border bg-background transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] hover:border-primary/40 relative overflow-hidden"
            >
              {/* Blueprint Background on Hover */}
              <div className="absolute inset-0 bg-blueprint bg-[length:30px_30px] opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />

              {/* Image Section */}
              <div className="w-full aspect-[4/3] bg-surface-2 rounded-lg mb-6 flex items-center justify-center overflow-hidden relative border border-border/50">
                 <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent z-0 transition-opacity duration-500 group-hover:opacity-20" />
                 {category.image ? (
                   <div className="relative w-full h-full z-10 transition-transform duration-500 ease-out group-hover:scale-105 group-hover:rotate-2 group-hover:-translate-y-2">
                     <Image 
                       src={category.image} 
                       alt={category.name} 
                       fill 
                       className="object-cover mix-blend-multiply" 
                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                     />
                   </div>
                 ) : (
                   <span className="text-xs font-mono text-text-muted uppercase tracking-widest relative z-10">Image Pending</span>
                 )}
              </div>
              
              {/* Content Section */}
              <div className="flex flex-col flex-grow relative z-10">
                <h3 className="text-xl font-bold text-text mb-2 group-hover:text-primary transition-colors duration-300">
                  {category.name}
                </h3>
                
                <p className="text-sm text-text-secondary leading-relaxed mb-4 flex-grow">
                  {category.description}
                </p>
                
                {category.standards && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {category.standards.map((std, idx) => (
                      <span key={idx} className="px-2 py-1 text-[10px] font-mono font-bold tracking-wider text-text-secondary bg-surface border border-border rounded transition-colors duration-300 group-hover:border-primary/20">
                        {std}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Footer / Arrow */}
                <div className="flex items-center text-sm font-bold text-primary mt-auto">
                  Explore Category
                  <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
