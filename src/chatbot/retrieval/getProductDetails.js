import { getProductBySlug } from '@/utils/productData';
import { formatProductForChatbot } from './formatters';

/**
 * Retrieves ONE exact product from the existing source data by its ID or slug.
 * Returns only the customer-relevant information required to answer questions.
 * @param {string} productIdOrSlug - The product's ID or slug to look up.
 * @returns {Object|null} The formatted product details, or null if not found.
 */
export function getProductDetails(productIdOrSlug) {
  if (!productIdOrSlug) return null;
  
  const result = getProductBySlug(productIdOrSlug.toLowerCase().trim());
  if (!result) return null;

  return formatProductForChatbot(result.product, result.category, result.subCategory);
}
