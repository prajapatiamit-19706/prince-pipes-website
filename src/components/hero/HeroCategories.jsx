import React from "react";
import Link from "next/link";
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
              className="hero-category-card opacity-0 translate-y-8 group block p-6 rounded-xl border border-border bg-background transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] hover:border-primary/30"
            >
              {/* Image Placeholder */}
              <div className="w-full h-40 bg-surface-2 rounded-lg mb-6 flex items-center justify-center overflow-hidden relative">
                 <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent" />
                 <span className="text-xs font-mono text-text-muted uppercase tracking-widest">Image Placeholder</span>
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-text mb-2 group-hover:text-primary transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                {category.description}
              </p>
              
              {/* Footer / Arrow */}
              <div className="flex items-center text-sm font-bold text-primary">
                Explore Range
                <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-2" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
