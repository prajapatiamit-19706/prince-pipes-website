import weightData from '@/data/stainless_steel_weight_chart.json';

/**
 * Retrieves weight data for a specific product type and size.
 * @param {string} productType - The type of product (e.g. "Tee", "Reducer")
 * @param {string} [sizeQuery] - Optional specific size to filter (e.g. "2")
 * @returns {Object|null} The weight data, or null if not found
 */
export function searchWeight(productType, sizeQuery = null) {
  if (!productType || !weightData?.products) return null;
  
  const lowerType = productType.toLowerCase().trim();
  
  // Find matching product in weight chart
  const matchedProduct = weightData.products.find(p => 
    p.product.toLowerCase().includes(lowerType)
  );
  
  if (!matchedProduct) return null;

  const result = {
    product: matchedProduct.product,
    weightUnit: matchedProduct.weightUnit,
    source: matchedProduct.source
  };

  if (!sizeQuery) {
    // Note: returning all data could be large, but useful if the chatbot needs to list them
    result.data = matchedProduct.data;
    return result;
  }

  const lowerSize = sizeQuery.toLowerCase().trim();
  result.data = matchedProduct.data.filter(row => 
    row.nps === lowerSize || row.dn === lowerSize || String(row.nps).includes(lowerSize)
  );

  return result;
}
