import React from 'react';
import aboutData from '@/data/about-us-master.json';
import productData from '@/data/products.json';
import AboutHero from '@/components/about/AboutHero';
import AboutTrustStrip from '@/components/about/AboutTrustStrip';
import AboutStory from '@/components/about/AboutStory';
import AboutCapabilities from '@/components/about/AboutCapabilities';
import AboutProductLinks from '@/components/about/AboutProductLinks';
import AboutQuality from '@/components/about/AboutQuality';
import AboutServiceFlow from '@/components/about/AboutServiceFlow';
import AboutWhyChoose from '@/components/about/AboutWhyChoose';
import AboutCTA from '@/components/about/AboutCTA';

export const metadata = {
  title: aboutData.seo.title,
  description: aboutData.seo.description,
  keywords: aboutData.seo.primaryKeyword + ', ' + aboutData.seo.secondaryKeywords.join(', '),
  alternates: {
    canonical: aboutData.seo.canonicalPath,
  }
};

export default function AboutUsPage() {
  const { hero, trustSignals, story, whatWeDo, quality, supplyAndService, whyChooseUs, cta, structuredData } = aboutData;
  const categories = productData.catalog.categories;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            structuredData.organization,
            structuredData.webPage,
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": structuredData.breadcrumb
            }
          ])
        }}
      />
      <main className="flex flex-col bg-white min-h-screen">
        <AboutHero data={hero} />
        <AboutTrustStrip data={trustSignals} />
        <AboutStory data={story} />
        <AboutCapabilities data={whatWeDo} />
        <AboutProductLinks categories={categories} />
        <AboutQuality data={quality} />
        <AboutServiceFlow data={supplyAndService} />
        <AboutWhyChoose data={whyChooseUs} />
        <AboutCTA data={cta} />
      </main>
    </>
  );
}
