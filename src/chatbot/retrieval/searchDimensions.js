import dimensionsData from '@/data/ss_dimension_chart.json';

/**
 * Retrieves dimension chart data for a specific product type and size.
 * @param {string} productType - The type of product (e.g. "Tee", "Nipple", "Elbow")
 * @param {string} [sizeQuery] - Optional specific size to filter (e.g. "2", "1/2")
 * @returns {Object|null} The dimension data, or null if not found
 */
export function searchDimensions(productType, sizeQuery = null) {
  if (!productType || !dimensionsData?.products) return null;
  
  const lowerType = productType.toLowerCase().trim();
  
  // Find matching product in dimension chart
  const matchedProduct = dimensionsData.products.find(p => 
    p.id.toLowerCase() === lowerType || 
    p.name.toLowerCase().includes(lowerType)
  );
  
  if (!matchedProduct) return null;

  // Clone to avoid mutating original source
  const result = {
    product: matchedProduct.name,
    standards: matchedProduct.standards,
    columns: matchedProduct.columns
  };

  if (!sizeQuery) {
    // If no size is specified, return all sizes (maybe trim to avoid huge payload, but let's return it as is for now)
    result.data = matchedProduct.data;
    return result;
  }

  // Filter specific size if requested
  const lowerSize = sizeQuery.toLowerCase().trim();
  result.data = {};
  
  Object.keys(matchedProduct.data).forEach(unit => {
    result.data[unit] = matchedProduct.data[unit].filter(row => 
      row.nps === lowerSize || row.dn === lowerSize || String(row.nps).includes(lowerSize)
    );
  });

  return result;
}
