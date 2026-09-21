// Data extracted from public/images/Gallery directory

export const galleryCategories = [
  "All"
];

// Helper to create objects
const createItem = (id, src, category, alt) => ({
  id,
  src,
  category,
  alt
});

export const galleryItems = [
  createItem("img-1", "/images/Gallery/20260919_153126.jpg.webp", "All", "Gallery Image 1"),
  createItem("img-2", "/images/Gallery/20260919_153402.webp", "All", "Gallery Image 2"),
  createItem("img-3", "/images/Gallery/20260919_153545.webp", "All", "Gallery Image 3"),
  createItem("img-4", "/images/Gallery/20260919_153636.webp", "All", "Gallery Image 4"),
  createItem("img-5", "/images/Gallery/20260919_154028.webp", "All", "Gallery Image 5"),
  createItem("img-6", "/images/Gallery/20260919_154121.webp", "All", "Gallery Image 6"),
  createItem("img-7", "/images/Gallery/20260919_155048.webp", "All", "Gallery Image 7"),
  createItem("img-8", "/images/Gallery/20260919_155508.webp", "All", "Gallery Image 8")
];
