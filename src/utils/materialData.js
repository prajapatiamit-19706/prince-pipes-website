import materialMaster from '@/data/materialMaster.json';
import productsData from '@/data/products.json';

/**
 * Retrieves a material by its slug.
 * @param {string} slug 
 * @returns {Object|null}
 */
export function getMaterialBySlug(slug) {
  return materialMaster.materials.find(m => m.slug === slug) || null;
}

/**
 * Retrieves all material slugs for static generation.
 * @returns {string[]}
 */
export function getAllMaterialSlugs() {
  return materialMaster.materials.map(m => m.slug);
}

/**
 * Derives product families based on a material's linking strategy.
 * @param {Object} materialConfig 
 * @returns {Array} List of product families
 */
export function getProductFamiliesForMaterial(materialConfig) {
  const families = [];
  const { productLinking } = materialConfig;
  
  if (!productLinking) return families;

  const categories = productsData.catalog?.categories || [];

  categories.forEach(category => {
    const isExplicitCategory = productLinking.categorySlugs?.includes(category.slug);
    const isMaterialMatch = productLinking.materialAliases?.includes(category.material) || category.material === materialConfig.name;

    if (isExplicitCategory || isMaterialMatch) {
      if (category.subCategories && category.subCategories.length > 0) {
        category.subCategories.forEach(sub => {
          const productsList = sub.products || [];
          const count = productsList.length;
          
          if (count > 0) {
            const sampleProducts = productsList.slice(0, 4).map(p => p.name || p.type);
            
            families.push({
              name: sub.name,
              count: count,
              products: sampleProducts,
              href: `/products/${category.slug}/${sub.slug}`
            });
          }
        });
      } else {
        // Fallback for categories without subcategories
        const productsList = category.products || [];
        const count = productsList.length;
        if (count > 0) {
           const sampleProducts = productsList.slice(0, 4).map(p => p.name || p.type);
           families.push({
             name: category.name,
             count: count,
             products: sampleProducts,
             href: `/products/${category.slug}`
           });
        }
      }
    }
  });

  return families;
}

/**
 * Retrieves related materials for the comparison section.
 * @param {string} currentSlug 
 * @returns {Array} List of related materials
 */
export function getRelatedMaterials(currentSlug) {
  return materialMaster.materials
    .filter(m => m.slug !== currentSlug)
    .slice(0, 4)
    .map(m => ({
      name: m.name,
      slug: m.slug,
      href: `/materials/${m.slug}`
    }));
}
