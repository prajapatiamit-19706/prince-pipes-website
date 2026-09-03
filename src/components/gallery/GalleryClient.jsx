"use client";

import { useState } from "react";
import { GalleryHero } from "@/components/gallery/GalleryHero";
import { GalleryFilters } from "@/components/gallery/GalleryFilters";
import { MasonryGallery } from "@/components/gallery/MasonryGallery";

export const GalleryClient = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="flex flex-col min-h-screen">
      <GalleryHero />
      <GalleryFilters 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
      />
      <MasonryGallery activeCategory={activeCategory} />
    </div>
  );
};
