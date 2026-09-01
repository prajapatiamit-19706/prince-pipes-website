import productsData from '@/data/products.json';

/**
 * Traverses the JSON structure to find a product by its slug.
 * It searches both inside categories directly and inside subcategories.
 * @param {string} slug - The slug of the product to find.
 * @returns {Object|null} The product object and its parent category details, or null if not found.
 */
export function getProductBySlug(slug) {
  if (!productsData?.catalog?.categories) return null;

  for (const category of productsData.catalog.categories) {
    // Search in direct products of category (e.g. Carbon Steel)
    if (category.products && category.products.length > 0) {
      const foundProduct = category.products.find(p => p.slug === slug);
      if (foundProduct) {
        return {
          product: foundProduct,
          category: {
            id: category.id,
            name: category.name,
            slug: category.slug,
            description: category.description
          },
          subCategory: null
        };
      }
    }

    // Search in subCategories (e.g. Stainless Steel -> Threaded Fittings)
    if (category.subCategories && category.subCategories.length > 0) {
      for (const subCat of category.subCategories) {
        if (subCat.products && subCat.products.length > 0) {
          const foundProduct = subCat.products.find(p => p.slug === slug);
          if (foundProduct) {
            return {
              product: foundProduct,
              category: {
                id: category.id,
                name: category.name,
                slug: category.slug,
                description: category.description
              },
              subCategory: {
                id: subCat.id,
                name: subCat.name,
                slug: subCat.slug,
                description: subCat.description
              }
            };
          }
        }
      }
    }
  }

  return null;
}

/**
 * Gets the canonical URL for a product based on its hierarchy.
 * @param {string} slug - The product slug.
 * @returns {string} The canonical URL (e.g., /products/cat/subcat/slug)
 */
export function getProductUrl(slug) {
  const result = getProductBySlug(slug);
  if (!result) return `/products/${slug}`; // Fallback if not found

  const { category, subCategory } = result;
  if (subCategory) {
    return `/products/${category.slug}/${subCategory.slug}/${slug}`;
  }
  return `/products/${category.slug}/${slug}`;
}

/**
 * Generates dynamic breadcrumbs for a product based on its hierarchy.
 * @param {string} slug - The product slug.
 * @returns {Array<{name: string, path: string}>} Array of breadcrumb objects.
 */
export function getProductBreadcrumbs(slug) {
  const result = getProductBySlug(slug);
  if (!result) return [];

  const { product, category, subCategory } = result;
  const breadcrumbs = [
    { name: "Products", path: "/#products" },
    { name: category.name, path: `/products/${category.slug}` }
  ];

  if (subCategory) {
    breadcrumbs.push({ name: subCategory.name, path: `/products/${category.slug}/${subCategory.slug}` });
  }

  breadcrumbs.push({ name: product.name, path: getProductUrl(slug) });
  
  return breadcrumbs;
}

/**
 * Gets all product slugs as array of path segments across all categories and subcategories.
 * Useful for Next.js catch-all generateStaticParams.
 * @returns {Array<Array<string>>} Array of path segment arrays (e.g., [['cat', 'slug'], ['cat', 'subcat', 'slug']])
 */
export function getAllProductSlugs() {
  if (!productsData?.catalog?.categories) return [];
  
  const paths = [];

  for (const category of productsData.catalog.categories) {
    if (category.products) {
      category.products.forEach(p => paths.push([category.slug, p.slug]));
    }
    if (category.subCategories) {
      category.subCategories.forEach(subCat => {
        if (subCat.products) {
          subCat.products.forEach(p => paths.push([category.slug, subCat.slug, p.slug]));
        }
      });
    }
  }

  return paths;
}

/**
 * Gets all raw product slugs for Next/Prev links calculation.
 * @returns {Array<string>} Array of product slugs.
 */
function getFlatProductSlugs() {
  if (!productsData?.catalog?.categories) return [];
  
  const slugs = [];

  for (const category of productsData.catalog.categories) {
    if (category.products) {
      category.products.forEach(p => slugs.push(p.slug));
    }
    if (category.subCategories) {
      category.subCategories.forEach(subCat => {
        if (subCat.products) {
          subCat.products.forEach(p => slugs.push(p.slug));
        }
      });
    }
  }

  return slugs;
}

/**
 * Gets the next logical product in the catalog for the "Next Product" component.
 * @param {string} currentSlug - The current product's slug.
 * @returns {Object|null} The next product's core details, or null if none.
 */
export function getNextProduct(currentSlug) {
  const allSlugs = getFlatProductSlugs();
  const currentIndex = allSlugs.indexOf(currentSlug);
  
  if (currentIndex === -1 || currentIndex === allSlugs.length - 1) {
    // If it's the last product, loop back to the first one
    if (allSlugs.length > 0) {
      const firstProduct = getProductBySlug(allSlugs[0]);
      return firstProduct?.product || null;
    }
    return null;
  }

  const nextProduct = getProductBySlug(allSlugs[currentIndex + 1]);
  return nextProduct?.product || null;
}

/**
 * Fetches the full product objects for an array of related product IDs/slugs.
 * Note: products.json currently stores related products as an array of IDs (which seem to match slugs).
 * @param {Array<string>} relatedProductIds - Array of product IDs or slugs.
 * @returns {Array<Object>} Array of product objects.
 */
export function getRelatedProducts(relatedProductIds) {
  if (!relatedProductIds || !Array.isArray(relatedProductIds) || relatedProductIds.length === 0) return [];
  
  const relatedProducts = [];
  
  relatedProductIds.forEach(idOrSlug => {
    // In the current JSON, the ID is often identical to the slug. 
    // If not, we could optimize this by building an ID-to-Product map.
    const result = getProductBySlug(idOrSlug);
    if (result && result.product) {
      relatedProducts.push(result.product);
    }
  });

  return relatedProducts;
}

/**
 * Returns a fallback product URL if the user navigates to a Category or Subcategory
 * page that doesn't exist yet, preventing a 404.
 * @param {Array<string>} slugArray - The path segments (e.g. ['stainless', 'threaded'])
 * @returns {string|null} URL to redirect to, or null if not found.
 */
export function getFallbackRedirectUrl(slugArray) {
  if (!productsData?.catalog?.categories || !Array.isArray(slugArray)) return null;
  
  const categorySlug = slugArray[0];
  const subCategorySlug = slugArray.length > 1 ? slugArray[1] : null;

  const category = productsData.catalog.categories.find(c => c.slug === categorySlug);
  if (!category) return null;

  if (subCategorySlug) {
    const subCat = category.subCategories?.find(s => s.slug === subCategorySlug);
    if (subCat && subCat.products && subCat.products.length > 0) {
      return getProductUrl(subCat.products[0].slug);
    }
  } else {
    // If they just navigated to the main category, find the very first product
    if (category.products && category.products.length > 0) {
      return getProductUrl(category.products[0].slug);
    }
    if (category.subCategories && category.subCategories.length > 0) {
      const firstSub = category.subCategories[0];
      if (firstSub.products && firstSub.products.length > 0) {
         return getProductUrl(firstSub.products[0].slug);
      }
    }
  }

  return null;
}

/**
 * Generates a lightweight search index for the client-side ProductFinder.
 * Minimizes the JSON payload sent to the browser.
 */
export function getProductSearchIndex() {
  if (!productsData?.catalog?.categories) return { items: [] };
  
  const items = [];

  const processProduct = (p, cat, subCat) => {
    const mat = p.technicalSpecifications?.material || cat.name;
    const conn = subCat?.name ? subCat.name.replace(' Fittings', '') : 'Standard';

    // Build deep search string
    const terms = [p.name, p.slug, cat.name];
    if (subCat?.name) terms.push(subCat.name);
    
    const specsData = [];
    if (p.technicalSpecifications) {
      Object.entries(p.technicalSpecifications).forEach(([key, val]) => {
        if (typeof val === 'string' || typeof val === 'number') {
          terms.push(val.toString());
          specsData.push(val.toString());
        }
        else if (Array.isArray(val)) {
          terms.push(val.join(' '));
          specsData.push(val.join(' / '));
        }
      });
    }

    if (p.description?.short) terms.push(p.description.short);

    items.push({
      name: p.name,
      slug: p.slug,
      material: mat,
      connection: conn,
      specs: specsData,
      searchString: terms.join(' ').toLowerCase(),
      url: getProductUrl(p.slug)
    });
  };

  productsData.catalog.categories.forEach(cat => {
    if (cat.products) {
      cat.products.forEach(p => processProduct(p, cat, null));
    }
    if (cat.subCategories) {
      cat.subCategories.forEach(sub => {
        if (sub.products) {
          sub.products.forEach(p => processProduct(p, cat, sub));
        }
      });
    }
  });

  return { items };
}

/**
 * Gets all product categories.
 * @returns {Array<Object>} Array of category objects.
 */
export function getAllCategories() {
  return productsData?.catalog?.categories || [];
}

/**
 * Gets a category by its slug.
 * @param {string} slug - The category slug.
 * @returns {Object|null} The category object or null.
 */
export function getCategoryBySlug(slug) {
  if (!productsData?.catalog?.categories) return null;
  return productsData.catalog.categories.find(c => c.slug === slug) || null;
}

/**
 * Gets a subcategory by its category slug and subcategory slug.
 * @param {string} categorySlug - The parent category slug.
 * @param {string} subcategorySlug - The subcategory slug.
 * @returns {Object|null} The subcategory object or null.
 */
export function getSubcategoryBySlug(categorySlug, subcategorySlug) {
  const category = getCategoryBySlug(categorySlug);
  if (!category || !category.subCategories) return null;
  return category.subCategories.find(s => s.slug === subcategorySlug) || null;
}

/**
 * Gets all products for a given category.
 * @param {string} categoryId - The category ID.
 * @returns {Array<Object>} Array of product objects.
 */
export function getProductsByCategory(categoryId) {
  if (!productsData?.catalog?.categories) return [];
  const category = productsData.catalog.categories.find(c => c.id === categoryId);
  if (!category) return [];
  
  // Return direct products
  return category.products || [];
}

/**
 * Gets all products for a given subcategory.
 * @param {string} categoryId - The category ID.
 * @param {string} subcategoryId - The subcategory ID.
 * @returns {Array<Object>} Array of product objects.
 */
export function getProductsBySubcategory(categoryId, subcategoryId) {
  if (!productsData?.catalog?.categories) return [];
  const category = productsData.catalog.categories.find(c => c.id === categoryId);
  if (!category || !category.subCategories) return [];
  
  const subcategory = category.subCategories.find(s => s.id === subcategoryId);
  if (!subcategory) return [];
  
  return subcategory.products || [];
}

/**
 * Generates dynamic breadcrumbs for a category.
 * @param {string} categorySlug - The category slug.
 * @returns {Array<{name: string, path: string}>} Array of breadcrumb objects.
 */
export function getCategoryBreadcrumbs(categorySlug) {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return [];

  return [
    { name: "Products", path: "/#products" },
    { name: category.name, path: `/products/${category.slug}` }
  ];
}

/**
 * Generates dynamic breadcrumbs for a subcategory.
 * @param {string} categorySlug - The category slug.
 * @param {string} subcategorySlug - The subcategory slug.
 * @returns {Array<{name: string, path: string}>} Array of breadcrumb objects.
 */
export function getSubcategoryBreadcrumbs(categorySlug, subcategorySlug) {
  const category = getCategoryBySlug(categorySlug);
  const subcategory = getSubcategoryBySlug(categorySlug, subcategorySlug);
  
  if (!category || !subcategory) return [];

  return [
    { name: "Products", path: "/#products" },
    { name: category.name, path: `/products/${category.slug}` },
    { name: subcategory.name, path: `/products/${category.slug}/${subcategory.slug}` }
  ];
}

/**
 * Gets dynamic statistics about the product catalog.
 * @returns {Object} Catalog statistics (totalCategories, totalProducts)
 */
export function getCatalogStats() {
  if (!productsData?.catalog?.categories) {
    return { totalCategories: 0, totalProducts: 0 };
  }
  
  let totalCategories = productsData.catalog.categories.length;
  let totalProducts = 0;
  
  for (const category of productsData.catalog.categories) {
    if (category.products) {
      totalProducts += category.products.length;
    }
    if (category.subCategories) {
      for (const sub of category.subCategories) {
        if (sub.products) {
          totalProducts += sub.products.length;
        }
      }
    }
  }
  
  return { totalCategories, totalProducts };
}
