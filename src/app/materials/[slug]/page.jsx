import { notFound } from 'next/navigation';
import { 
  getMaterialBySlug, 
  getAllMaterialSlugs, 
  getProductFamiliesForMaterial,
  getRelatedMaterials 
} from '@/utils/materialData';
import {
  MaterialHero,
  MaterialAtGlance,
  MaterialWhy,
  MaterialGrades,
  MaterialProductFamilies,
  MaterialStandards,
  MaterialApplications,
  MaterialComparisonLinks,
  MaterialCTA
} from '@/components/materials';

// Pre-render pages for known materials
export function generateStaticParams() {
  const slugs = getAllMaterialSlugs();
  return slugs.map(slug => ({ slug }));
}

// Generate dynamic metadata based on materialMaster.json SEO rules
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const material = getMaterialBySlug(slug);
  
  if (!material) {
    return {
      title: 'Material Not Found | Prince Pipes & Fittings',
    };
  }

  const seo = material.seo || {};

  return {
    title: seo.title || `${material.name} | Prince Pipes & Fittings`,
    description: seo.description || material.heroDescription,
    alternates: {
      canonical: seo.canonicalPath || `/materials/${material.slug}`,
    },
    openGraph: seo.openGraph ? {
      title: seo.openGraph.title,
      description: seo.openGraph.description,
      type: seo.openGraph.type || 'website',
    } : undefined,
    twitter: seo.twitter ? {
      card: seo.twitter.card,
      title: seo.twitter.title,
      description: seo.twitter.description,
    } : undefined,
  };
}

export default async function MaterialPage({ params }) {
  const { slug } = await params;
  const material = getMaterialBySlug(slug);
  
  if (!material) {
    notFound();
  }

  const productFamilies = getProductFamiliesForMaterial(material);
  const relatedMaterials = getRelatedMaterials(material.slug);
  
  // Use dynamically generated images based on the slug, or fallback to placeholder
  const imagePath = `/api/images/${material.slug}_hero.jpg`; // Note: Adjust the path if you save generated images to public/

  return (
    <main className="min-h-screen bg-white">
      <MaterialHero material={material} imagePath={imagePath} />
      <MaterialAtGlance material={material} />
      <MaterialWhy material={material} />
      <MaterialGrades material={material} />
      <MaterialProductFamilies material={material} productFamilies={productFamilies} />
      <MaterialStandards material={material} />
      <MaterialApplications material={material} />
      <MaterialComparisonLinks relatedMaterials={relatedMaterials} />
      <MaterialCTA material={material} />
    </main>
  );
}
