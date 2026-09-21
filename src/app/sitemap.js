import { getAllProductSlugs, getAllCategories } from '@/utils/productData';
import { getAllMaterialSlugs } from '@/utils/materialData';

export default function sitemap() {
  const baseUrl = 'https://ppfworks.in';

  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/quality',
    '/contact',
    '/sitemap',
    '/resources/catalogue',
    '/technical-resources/dimension-charts',
    '/technical-resources/weight-charts',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  // Categories
  const categories = getAllCategories().map((cat) => ({
    url: `${baseUrl}/products/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Subcategories
  const subcategories = [];
  getAllCategories().forEach(cat => {
    if (cat.subCategories) {
      cat.subCategories.forEach(sub => {
        subcategories.push({
          url: `${baseUrl}/products/${cat.slug}/${sub.slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      });
    }
  });

  // All product slugs
  const productSlugs = getAllProductSlugs();
  const productRoutes = productSlugs.map((slugArray) => {
    // slugArray is like ['category', 'slug'] or ['category', 'subcat', 'slug']
    return {
      url: `${baseUrl}/products/${slugArray.join('/')}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    };
  });

  // Material slugs
  const materialSlugs = getAllMaterialSlugs();
  const materialRoutes = materialSlugs.map((slug) => ({
    url: `${baseUrl}/materials/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...categories, ...subcategories, ...productRoutes, ...materialRoutes];
}
