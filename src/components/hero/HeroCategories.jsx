import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import categoriesData from "@/data/categories.json";

export function HeroCategories() {
  const categories = categoriesData;

  if (!categories || categories.length === 0) return null;

  return (
    <div id="products" className="w-full bg-[#F7F9FC] py-8 md:py-12 lg:py-20 border-t border-gray-200 mt-auto">
      <div className="max-w-[1340px] mx-auto px-6 md:px-12">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-[#1E4FA8] uppercase tracking-widest mb-2">Product Range</h2>
            <p className="text-3xl md:text-4xl font-bold text-[#0F2748] tracking-tight mb-4">Premium Industrial Solutions</p>
            <p className="text-[#6B7280] text-lg">Precision-engineered pipe fittings for demanding industrial applications.</p>
          </div>
          {/* <Link href="/products" className="inline-flex items-center gap-2 text-[#1E4FA8] font-bold hover:text-[#0F2748] transition-colors group whitespace-nowrap">
            View All Categories
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link> */}
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const isPrimary = category.id === "stainless-steel-pipe-fittings";

            return (
              <Link
                key={category.id}
                href={`/products/${category.slug}`}
                className={`hero-category-card opacity-0 translate-y-8 group flex flex-col h-full p-6 rounded-xl bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg relative overflow-hidden ${isPrimary
                  ? 'border-[1.5px] border-[#1E4FA8]/30 hover:border-[#c29b62]'
                  : 'border border-gray-200 hover:border-[#1E4FA8]/40'
                  }`}
              >
                {/* Image Section */}
                <div className="w-full aspect-[4/3] bg-[#F7F9FC] rounded-lg mb-6 flex items-center justify-center overflow-hidden relative border border-gray-100">
                  {category.image ? (
                    <div className="relative w-full h-full z-10 transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                      <Image
                        src={category.image}
                        alt={`${category.name} products`}
                        fill
                        className="object-cover mix-blend-multiply"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  ) : (
                    <span className="text-xs font-mono text-[#6B7280] uppercase tracking-widest relative z-10">Image Pending</span>
                  )}

                  {isPrimary && (
                    <div className="absolute top-3 right-3 z-20 bg-[#F7F9FC] text-[#0F2748] border border-[#1E4FA8]/20 text-[10px] font-bold px-2 py-1 rounded tracking-wider uppercase shadow-sm">
                      Primary Range
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="flex flex-col flex-grow relative z-10">
                  <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 text-[#0F2748] group-hover:text-[#1E4FA8]`}>
                    {category.name}
                  </h3>

                  {category.description && (
                    <p className="text-sm text-[#6B7280] leading-relaxed mb-5 flex-grow">
                      {category.description}
                    </p>
                  )}

                  {category.indicator && (
                    <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                      <span className="px-2 py-1 text-[11px] font-mono font-bold tracking-wider text-[#6B7280] bg-[#F7F9FC] border border-gray-200 rounded transition-colors duration-300 group-hover:border-[#1E4FA8]/30 group-hover:text-[#0F2748]">
                        {category.indicator}
                      </span>
                    </div>
                  )}

                  {/* Footer / Arrow */}
                  <div className="flex items-center text-sm font-bold text-[#1E4FA8] mt-auto">
                    Explore Category
                    <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}
