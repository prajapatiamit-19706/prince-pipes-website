import React from 'react';
import qualityData from '@/data/quality.json';
import QualityHero from '@/components/quality/QualityHero';
import QualityIntro from '@/components/quality/QualityIntro';
import QualityFramework from '@/components/quality/QualityFramework';
import QualityTesting from '@/components/quality/QualityTesting';
import QualityStandards from '@/components/quality/QualityStandards';
import QualityAssurance from '@/components/quality/QualityAssurance';
import QualityCTA from '@/components/quality/QualityCTA';

export const metadata = {
  title: qualityData.page.seo.title,
  description: qualityData.page.seo.description,
  keywords: qualityData.page.seo.keywords.join(', '),
  alternates: {
    canonical: qualityData.page.seo.canonical,
  },
  openGraph: {
    title: qualityData.page.seo.ogTitle,
    description: qualityData.page.seo.ogDescription,
  }
};

export default function QualityPage() {
  const { 
    hero, 
    qualityPhilosophy, 
    qualityFramework, 
    inspectionTesting, 
    standards, 
    technicalAssurance, 
    cta, 
    structuredData 
  } = qualityData.page;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <main className="flex flex-col bg-white min-h-screen">
        <QualityHero data={hero} />
        <QualityIntro data={qualityPhilosophy} />
        <QualityFramework data={qualityFramework} />
        <QualityTesting data={inspectionTesting} />
        <QualityStandards data={standards} />
        <QualityAssurance data={technicalAssurance} />
        <QualityCTA data={cta} />
      </main>
    </>
  );
}
