import { getProductSearchIndex, getProductBySlug } from '@/utils/productData';
import { formatProductForChatbot } from './formatters';

/**
 * Searches the existing product catalog and returns the most relevant products
 * formatted for the chatbot.
 * @param {string} query - The search query (e.g. "SS 316 nipple")
 * @param {Object} options - Search options
 * @param {number} options.limit - Max results to return (default: 5)
 * @returns {Array<Object>} List of relevant formatted products
 */
export function searchProducts(query, options = { limit: 5 }) {
  if (!query || typeof query !== 'string') return [];
  
  const lowerQuery = query.toLowerCase().trim();
  const searchWords = lowerQuery.split(/\s+/);
  
  // Reuse existing lightweight index: { items: [{name, slug, material, connection, specs: [], searchString, url}] }
  const indexData = getProductSearchIndex();
  if (!indexData || !indexData.items) return [];

  const results = indexData.items.map(item => {
    let score = 0;
    
    // 1. Exact Name / Slug match
    if (item.name.toLowerCase() === lowerQuery) score += 100;
    else if (item.name.toLowerCase().includes(lowerQuery)) score += 50;
    
    if (item.slug === lowerQuery) score += 90;

    // 2. Material/Category matches
    if (item.material?.toLowerCase().includes(lowerQuery)) score += 30;
    if (item.connection?.toLowerCase().includes(lowerQuery)) score += 30;

    // 3. Keyword matches in the searchString (which includes all specs, grades, standards)
    searchWords.forEach(word => {
      // Avoid tiny words like "a", "in" inflating scores
      if (word.length <= 1) return;
      
      // If the specific spec array contains the word directly
      const exactSpecMatch = item.specs?.some(spec => 
        typeof spec === 'string' && spec.toLowerCase().includes(word)
      );
      if (exactSpecMatch) score += 20;
      
      if (item.searchString.includes(word)) score += 10;
    });

    return { slug: item.slug, score };
  })
  .filter(r => r.score > 0)
  .sort((a, b) => b.score - a.score)
  .slice(0, options.limit || 5);

  // Map slugs back to full stripped details
  return results.map(r => {
    const p = getProductBySlug(r.slug);
    if (!p) return null;
    return formatProductForChatbot(p.product, p.category, p.subCategory);
  }).filter(Boolean);
}
