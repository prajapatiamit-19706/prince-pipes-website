/**
 * Helper functions to strip out internal/SEO data and return only
 * customer-facing relevant information for the chatbot.
 */

export function formatProductForChatbot(product, category, subCategory) {
  if (!product) return null;
  
  // Return a compact object without media paths, SEO, internal IDs, or ordering
  const formatted = {
    id: product.id,
    name: product.name,
    category: category?.name,
    subcategory: subCategory?.name,
    description: product.description?.short || product.description?.full,
  };

  // Extract specs if they exist
  if (product.technicalSpecifications) {
    const specs = product.technicalSpecifications;
    if (specs.material) formatted.material = specs.material;
    if (specs.grades?.length) formatted.grades = specs.grades;
    if (specs.sizeRange) formatted.sizeRange = specs.sizeRange;
    if (specs.manufacturing?.length) formatted.manufacturing = specs.manufacturing;
    if (specs.standards?.length) formatted.standards = specs.standards;
    if (specs.schedule?.length) formatted.schedule = specs.schedule;
    if (specs.connection?.length) formatted.connection = specs.connection;
    if (specs.threadType?.length) formatted.threadType = specs.threadType;
    if (specs.pressureClass?.length) formatted.pressureClass = specs.pressureClass;
  }

  if (product.testing?.length) formatted.testing = product.testing;
  if (product.applications?.length) formatted.applications = product.applications;

  return formatted;
}
