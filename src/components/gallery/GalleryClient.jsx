"use client";

import { GalleryHero } from "@/components/gallery/GalleryHero";
import { MasonryGallery } from "@/components/gallery/MasonryGallery";

export const GalleryClient = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <GalleryHero />
      <MasonryGallery />
    </div>
  );
};
