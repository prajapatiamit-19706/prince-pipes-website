import { notFound, redirect } from 'next/navigation';
import { getProductBySlug, getAllProductSlugs, getNextProduct, getRelatedProducts, getProductBreadcrumbs, getProductUrl, getFallbackRedirectUrl, getProductSearchIndex, getCategoryBySlug, getSubcategoryBySlug, getProductsByCategory, getProductsBySubcategory } from '@/utils/productData';

import { CategoryTemplate } from '@/components/products/CategoryTemplate';
import { SubcategoryTemplate } from '@/components/products/SubcategoryTemplate';
import { ProductBreadcrumb } from '@/components/product/ProductBreadcrumb';
import { ProductHero } from '@/components/product/ProductHero';
import { QuickSpecs } from '@/components/product/QuickSpecs';
import { ProductFinder } from '@/components/product/ProductFinder';
import { ProductIdentification } from '@/components/product/ProductIdentification';
import { AboutProduct } from '@/components/product/AboutProduct';
import { TechnicalSpecifications } from '@/components/product/TechnicalSpecifications';
import { TechnicalDrawing } from '@/components/product/TechnicalDrawing';
import { Applications } from '@/components/product/Applications';
import { TestingQuality } from '@/components/product/TestingQuality';
import { TechnicalDocuments } from '@/components/product/TechnicalDocuments';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import { NextProduct } from '@/components/product/NextProduct';
import { RequestQuoteModal } from '@/components/product/RequestQuoteModal';

export async function generateStaticParams() {
  const paths = getAllProductSlugs();
  return paths.map((pathArray) => ({
    slug: pathArray,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  if (slug.length === 1) {
    const category = getCategoryBySlug(slug[0]);
    if (category) {
      return {
        title: category.seo?.title || `${category.name} | Prince Pipes & Fittings`,
        description: category.seo?.description || category.description || '',
        alternates: { canonical: `/products/${category.slug}` }
      };
    }
  } else if (slug.length === 2) {
    const subcategory = getSubcategoryBySlug(slug[0], slug[1]);
    if (subcategory) {
      return {
        title: subcategory.seo?.title || `${subcategory.name} | Prince Pipes & Fittings`,
        description: subcategory.seo?.description || subcategory.description || '',
        alternates: { canonical: `/products/${slug[0]}/${subcategory.slug}` }
      };
    }
  }

  const productSlug = Array.isArray(slug) ? slug[slug.length - 1] : slug;
  const result = getProductBySlug(productSlug);

  if (!result) {
    return {
      title: 'Product Not Found | Prince Pipes & Fittings',
    };
  }

  const { product } = result;
  const canonicalUrl = getProductUrl(productSlug);

  return {
    title: product.seo?.title || `${product.name} | Prince Pipes & Fittings`,
    description: product.seo?.description || product.description?.short || '',
    keywords: product.seo?.secondaryKeywords?.join(', ') || '',
    alternates: {
      canonical: canonicalUrl,
    }
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  
  if (slug.length === 1) {
    const category = getCategoryBySlug(slug[0]);
    if (category) {
      return <CategoryTemplate category={category} />;
    }
  } else if (slug.length === 2) {
    const subcategory = getSubcategoryBySlug(slug[0], slug[1]);
    if (subcategory) {
      const category = getCategoryBySlug(slug[0]);
      return <SubcategoryTemplate category={category} subcategory={subcategory} />;
    }
  }

  // Extract the product slug from the catch-all array
  const productSlug = Array.isArray(slug) ? slug[slug.length - 1] : slug;
  const result = getProductBySlug(productSlug);

  if (!result) {
    const fallbackUrl = getFallbackRedirectUrl(Array.isArray(slug) ? slug : [slug]);
    if (fallbackUrl) {
      redirect(fallbackUrl);
    }
    notFound();
  }

  const canonicalUrl = getProductUrl(productSlug);
  
  // Ensure the requested URL matches the actual canonical URL
  // If a user navigates to /products/[productSlug] but it should be deeply nested, redirect them
  const currentPath = `/products/${Array.isArray(slug) ? slug.join('/') : slug}`;
  if (currentPath !== canonicalUrl) {
    redirect(canonicalUrl);
  }

  const { product, category, subCategory } = result;
  const nextProduct = getNextProduct(productSlug);
  let relatedProducts = getRelatedProducts(product.relatedProducts);
  
  // Fallback: If no explicit related products, get other products from the same subcategory/category
  if (!relatedProducts || relatedProducts.length === 0) {
    if (subCategory) {
      relatedProducts = getProductsBySubcategory(category.id, subCategory.id)
        .filter(p => p.slug !== product.slug)
        .slice(0, 4);
    } else {
      relatedProducts = getProductsByCategory(category.id)
        .filter(p => p.slug !== product.slug)
        .slice(0, 4);
    }
  }

  const dynamicBreadcrumbs = getProductBreadcrumbs(productSlug);

  let structuredData = null;
  if (product.structuredData) {
    structuredData = { ...product.structuredData };
    structuredData.url = `https://www.princepipes.com${canonicalUrl}`;
  }

  return (
    <div className="bg-white min-h-screen pt-24 pb-12">
      {/* Container for structured data if present */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}

      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <ProductBreadcrumb breadcrumbs={dynamicBreadcrumbs} />
        
        <ProductHero 
          product={product} 
          category={category} 
          subCategory={subCategory} 
        />
        
        <QuickSpecs 
          specifications={product.technicalSpecifications} 
        />
      </div>

      {/* Full-width section for Finder & Identification */}
      <div className="bg-neutral-50 py-16 mt-16 border-y border-neutral-200">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <ProductFinder />
          <div className="mt-16">
             <ProductIdentification currentProductType={product.type} />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-16">
            <AboutProduct description={product.description} />
            <TechnicalSpecifications specifications={product.technicalSpecifications} />
            <TechnicalDrawing media={product.media} />
            <TestingQuality testing={product.testing} />
            <Applications applications={product.applications} />
          </div>

          {/* Sidebar / Secondary Info */}
          <div className="lg:col-span-4 space-y-12">
            <TechnicalDocuments documents={product.documents} />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl mt-24">
         <RelatedProducts products={relatedProducts} />
      </div>

      {nextProduct && (
        <div className="mt-24 border-t border-neutral-200">
           <NextProduct product={nextProduct} />
        </div>
      )}

      {/* Render the modal component at the root level of the page */}
      <RequestQuoteModal productName={product.name} />
    </div>
  );
}
