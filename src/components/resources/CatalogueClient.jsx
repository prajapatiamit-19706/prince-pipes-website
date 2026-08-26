'use client';

import React, { useMemo, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CatalogueClient({ productsData, industriesData }) {
  const containerRef = useRef(null);

  // 1. Data Extraction (Dynamically derived from products.json)
  const catalogueData = useMemo(() => {
    const connectionTypesMap = {};
    const fittingTypesMap = {};
    const materials = [];
    
    if (productsData?.catalog?.categories) {
      productsData.catalog.categories.forEach(cat => {
        // Material Extraction
        const materialName = cat.name.split(' Pipe')[0];
        let materialProductCount = 0;

        cat.subCategories?.forEach(sub => {
          const prodCount = sub.products?.length || 0;
          materialProductCount += prodCount;

          // Connection Types Extraction
          if (!connectionTypesMap[sub.name]) {
            connectionTypesMap[sub.name] = { 
              name: sub.name, 
              count: 0, 
              // Route to the first instance of this category as an example (e.g., SS Buttweld)
              link: `/products/${cat.slug}/${sub.slug}` 
            };
          }
          connectionTypesMap[sub.name].count += prodCount;

          // Fitting Types Extraction (Strip material prefix)
          sub.products?.forEach(p => {
            let baseName = p.name;
            if (baseName.startsWith(materialName)) {
              baseName = baseName.replace(materialName, '').trim();
            }
            if (!fittingTypesMap[baseName]) {
              fittingTypesMap[baseName] = { name: baseName, count: 0 };
            }
            fittingTypesMap[baseName].count += 1;
          });
        });

        if (materialProductCount > 0) {
          materials.push({
            name: materialName,
            count: materialProductCount,
            link: `/products/${cat.slug}`
          });
        }
      });
    }

    return {
      connectionTypes: Object.values(connectionTypesMap).sort((a, b) => b.count - a.count),
      fittingTypes: Object.values(fittingTypesMap).sort((a, b) => b.count - a.count),
      materials,
      applications: industriesData && Array.isArray(industriesData) ? industriesData : []
    };
  }, [productsData, industriesData]);



  // 3. GSAP Animations
  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      const tl = gsap.timeline();
      
      tl.from('.gsap-hero', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        clearProps: 'all'
      });

      // Scroll reveals for sections
      const sections = gsap.utils.toArray('.gsap-section');
      sections.forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            once: true
          },
          y: 20,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
          clearProps: 'all'
        });
      });

      // Staggered cards reveal
      const gridContainers = gsap.utils.toArray('.gsap-grid-container');
      gridContainers.forEach((container) => {
        const cards = container.querySelectorAll('.gsap-card');
        gsap.from(cards, {
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            once: true
          },
          y: 15,
          opacity: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out',
          clearProps: 'all'
        });
      });
    }
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>

      {/* Hero Section */}
      <div className="bg-slate-900 text-white rounded-2xl p-8 md:p-12 lg:p-16 mb-6 md:mb-10 lg:mb-16 relative overflow-hidden shadow-xl">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 text-xs font-semibold tracking-wide uppercase mb-6 gsap-hero border border-indigo-500/30">
            Complete Product Range
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 gsap-hero">
            Product Catalogue
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed gsap-hero">
            Explore our complete range of industrial pipe fittings and find the right solution for your piping requirements.
          </p>
          
          <div className="flex flex-wrap gap-4 gsap-hero">
            <a href="#connection-types" className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors shadow-lg shadow-indigo-600/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500">
              Explore Products
            </a>
            <a 
              href="/catalogue_pdf/PPF CATALOGUE.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium border border-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-white flex items-center"
            >
              <svg className="w-5 h-5 mr-2 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Catalogue
            </a>
          </div>
        </div>
      </div>

      {/* Connection Type Selector */}
      {catalogueData.connectionTypes.length > 0 && (
        <section id="connection-types" className="mb-6 md:mb-10 lg:mb-16">
          <div className="gsap-section mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Choose Your Connection</h2>
            <p className="text-slate-600">Start with the connection type to explore suitable fitting families.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 gsap-grid-container">
            {catalogueData.connectionTypes.map((conn, idx) => (
              <Link key={idx} href={conn.link} className="gsap-card group bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-200 block no-underline focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <div className="w-12 h-12 bg-slate-50 text-indigo-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-50 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-indigo-700 transition-colors">{conn.name}</h3>
                <p className="text-sm font-medium text-slate-500">{conn.count} Available Products</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Explore by Fitting Type */}
      {catalogueData.fittingTypes.length > 0 && (
        <section className="mb-6 md:mb-10 lg:mb-16">
          <div className="gsap-section mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Explore by Fitting Type</h2>
            <p className="text-slate-600">Browse our comprehensive catalogue by specific fitting types.</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4 gsap-grid-container">
            {catalogueData.fittingTypes.map((fitting, idx) => (
              <div key={idx} className="gsap-card bg-white border border-slate-200 rounded-lg p-4 sm:p-5 hover:bg-slate-50 transition-colors flex flex-col justify-between h-full">
                <div>
                  <div className="text-slate-400 mb-3 group-hover:text-indigo-500 transition-colors">
                    {/* Clean minimal line-art icon abstraction for fitting */}
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16v16H4z" opacity="0.2"/>
                      <path d="M4 12h16M12 4v16"/>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-slate-900 text-sm leading-tight mb-1">{fitting.name}</h3>
                </div>
                <div className="mt-3 text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded w-max">
                  {fitting.count} variants
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Material Range */}
      {catalogueData.materials.length > 0 && (
        <section className="mb-6 md:mb-10 lg:mb-16">
          <div className="gsap-section mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Material Range</h2>
            <p className="text-slate-600">Our fittings are available in a wide range of industrial grades.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gsap-grid-container">
            {catalogueData.materials.map((mat, idx) => (
              <Link key={idx} href={mat.link} className="gsap-card group bg-slate-50 border border-slate-200 rounded-xl p-5 hover:bg-white hover:shadow-md hover:border-slate-300 transition-all duration-200 block no-underline focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors mb-1">{mat.name}</h3>
                <p className="text-sm text-slate-500 flex items-center">
                  View {mat.count} products
                  <svg className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Application / Industry */}
      {catalogueData.applications.length > 0 && (
        <section className="mb-6 md:mb-10 lg:mb-16">
          <div className="gsap-section mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Built for Diverse Applications</h2>
            <p className="text-slate-600">Engineered to meet the stringent demands of global industries.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 gsap-grid-container">
            {catalogueData.applications.map((app, idx) => (
              <div key={idx} className="gsap-card bg-white border border-slate-200 rounded-lg p-4 text-center hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors">
                <span className="font-semibold text-slate-700 text-sm">{app.title || app.name}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Catalogue Download CTA & Contact CTA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 gsap-section">
        
        {/* Download CTA */}
        <div className="bg-slate-900 rounded-2xl p-8 shadow-md relative overflow-hidden flex flex-col items-start justify-center">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2 relative z-10">Need the Complete Product Range?</h2>
          <p className="text-slate-400 mb-6 relative z-10 max-w-md">
            Download our product catalogue for a convenient overview of our available fittings and solutions.
          </p>
          <a 
              href="/catalogue_pdf/PPF CATALOGUE.pdf"
              target="_blank"
              rel="noopener noreferrer"
            className="group px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 flex items-center relative z-10 w-fit"
          >
            <svg className="w-5 h-5 mr-2 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Catalogue
          </a>
        </div>

        {/* Contact CTA */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-8 shadow-sm flex flex-col items-start justify-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Looking for a Specific Fitting?</h2>
          <p className="text-slate-600 mb-6 max-w-md">
            Our team can help you identify the right product for your piping requirements or assist with custom fabrication.
          </p>
          <Link 
            href="/contact"
            className="group px-5 py-2.5 rounded-lg bg-white border border-slate-300 hover:border-indigo-400 hover:text-indigo-700 text-slate-700 font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center shadow-sm"
          >
            Talk to Our Team
            <svg className="w-4 h-4 ml-2 opacity-70 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

      </div>
    </div>
  );
}
