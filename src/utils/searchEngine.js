import navigationData from '@/data/navigation.json';
import productsData from '@/data/products.json';

let searchIndexCache = null;

/**
 * Flattens nested hierarchical JSON data into a flat array of searchable items.
 */
export const buildSearchIndex = () => {
  if (searchIndexCache) return searchIndexCache;

  const index = [];

  const processItems = (items, categoryOverride = null) => {
    if (!items || !Array.isArray(items)) return;
    
    items.forEach(item => {
      // Determine category based on parent or fallback
      const currentCategory = categoryOverride || item.label;

      // Only add to index if it has a real path and isn't just a dropdown trigger without a page
      if (item.path && item.path !== '#') {
        // If the item itself is a parent (like Products), its category shouldn't be "Products" 
        // to avoid "Products > Products". We use a general category for root items.
        const assignedCategory = categoryOverride ? categoryOverride : "General Navigation";
        
        index.push({
          id: item.id || Math.random().toString(36).substring(2, 9),
          label: item.label,
          path: item.path,
          category: assignedCategory,
          description: item.description || ''
        });
      }

      // Recursively process children
      if (item.children && item.children.length > 0) {
        processItems(item.children, currentCategory);
      }
    });
  };

  // Build index from existing JSON files
  if (navigationData.primary) {
    processItems(navigationData.primary);
  }
  
  if (navigationData.utility) {
    processItems(navigationData.utility, "Utility & Support");
  }

  const processProducts = () => {
    if (!productsData?.catalog?.categories) return;

    productsData.catalog.categories.forEach(category => {
      if (category.subCategories) {
        category.subCategories.forEach(sub => {
          if (sub.products) {
            sub.products.forEach(product => {
              // Build a searchable string from specs, keywords, and description
              const specs = product.technicalSpecifications || {};
              const searchableText = [
                product.type,
                product.description?.full,
                specs.material,
                ...(specs.grades || []),
                specs.sizeRange,
                ...(specs.manufacturing || []),
                ...(specs.standards || []),
                ...(specs.schedule || []),
                ...(specs.connection || []),
                ...(specs.threadType || []),
                ...(specs.pressureClass || []),
                ...(product.seo?.keywords || [])
              ].filter(Boolean).join(' ');

              index.push({
                id: product.id,
                label: product.name,
                path: `/products/${product.slug}`,
                category: category.name,
                description: product.description?.short || '',
                searchableText: searchableText
              });
            });
          }
        });
      }
    });
  };

  processProducts();

  searchIndexCache = index;
  return index;
};

/**
 * Searches the index and returns grouped results.
 */
export const performSearch = (query) => {
  if (!query || query.trim() === '') return {};
  
  const index = buildSearchIndex();
  const lowerQuery = query.toLowerCase().trim();
  
  // Fuzzy/Substring match
  const results = index.filter(item => {
    return (
      item.label.toLowerCase().includes(lowerQuery) || 
      item.category.toLowerCase().includes(lowerQuery) ||
      (item.description && item.description.toLowerCase().includes(lowerQuery)) ||
      (item.searchableText && item.searchableText.toLowerCase().includes(lowerQuery))
    );
  });

  // Group by category
  const grouped = results.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    // Avoid duplicate pushes if somehow IDs collide
    if (!acc[item.category].find(existing => existing.path === item.path)) {
      acc[item.category].push(item);
    }
    return acc;
  }, {});

  return grouped;
};
