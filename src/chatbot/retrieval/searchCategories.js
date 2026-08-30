import { getAllCategories } from '@/utils/productData';

/**
 * Searches and returns summarized category and subcategory information.
 * Used for answering high-level questions about product lines.
 * @param {string} query - The search query (e.g. "threaded fittings", "stainless steel")
 * @returns {Array<Object>} Relevant categories/subcategories
 */
export function searchCategories(query) {
  if (!query) return [];
  
  const categories = getAllCategories();
  const lowerQuery = query.toLowerCase().trim();
  const results = [];

  categories.forEach(cat => {
    let catScore = 0;
    
    // Check if the main category matches
    if (cat.name.toLowerCase().includes(lowerQuery) || cat.slug.toLowerCase().includes(lowerQuery)) {
      catScore += 50;
      results.push({
        type: 'category',
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        material: cat.material,
        score: catScore,
        subCategories: cat.subCategories?.map(sub => ({ name: sub.name, slug: sub.slug }))
      });
    }

    // Check if any subcategory matches
    if (cat.subCategories) {
      cat.subCategories.forEach(sub => {
        let subScore = 0;
        if (sub.name.toLowerCase().includes(lowerQuery) || sub.slug.toLowerCase().includes(lowerQuery)) {
          subScore += 50;
          // Add context from the parent category to boost relevance
          if (cat.name.toLowerCase().includes(lowerQuery)) subScore += 20;

          results.push({
            type: 'subcategory',
            parentCategory: cat.name,
            name: sub.name,
            slug: sub.slug,
            description: sub.description,
            score: subScore,
            sampleProducts: sub.products?.slice(0, 5).map(p => p.name) || [] // Show up to 5 products as examples
          });
        }
      });
    }
  });

  return results.sort((a, b) => b.score - a.score).map(r => {
    // Strip score before returning
    const { score, ...rest } = r;
    return rest;
  });
}
