'use client';

import React, { useMemo, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Shield, Hammer, Layers, Settings, Atom, Flame, FlaskConical, Beaker, Zap, Pill, Ship, Coffee, Building2, HardHat, Droplets, Wrench, Disc, Target, Link as LinkIcon } from 'lucide-react';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CatalogueClient({ productsData, industriesData }) {
  const containerRef = useRef(null);

  const getConnectionIcon = (name) => {
    const n = name.toLowerCase();
    if (n.includes('flange')) return Disc;
    if (n.includes('forged')) return Hammer;
    if (n.includes('fastener')) return Wrench;
    if (n.includes('dairy')) return Droplets;
    if (n.includes('thread')) return Settings;
    if (n.includes('buttweld') || n.includes('weld')) return Flame;
    if (n.includes('ferrule')) return Target;
    return LinkIcon;
  };

  // 1. Data Extraction (Dynamically derived from products.json)
  const catalogueData = useMemo(() => {
    const connectionTypesMap = {};
    
    if (productsData?.catalog?.categories) {
      productsData.catalog.categories.forEach(cat => {
        cat.subCategories?.forEach(sub => {
          const prodCount = sub.products?.length || 0;
          if (!connectionTypesMap[sub.name]) {
            connectionTypesMap[sub.name] = { 
              name: sub.name, 
              count: 0, 
              link: `/products/${cat.slug}/${sub.slug}` 
            };
          }
          connectionTypesMap[sub.name].count += prodCount;
        });
      });
    }

    const allMaterials = [
      { name: "Stainless Steel", link: "/materials/stainless-steel", icon: Shield, desc: "Corrosion-resistant grades like 304, 316, 310, 321" },
      { name: "Carbon Steel", link: "/materials/carbon-steel", icon: Hammer, desc: "High-strength grades ASTM A234 WPB, A105" },
      { name: "Alloy Steel", link: "/materials/alloy-steel", icon: Settings, desc: "Temp-resistant grades WP1, WP5, WP9, WP11" },
      { name: "Duplex Steel", link: "/materials/duplex-steel", icon: Layers, desc: "High-strength duplex 2205 (S31803 / S32205)" },
      { name: "Super Duplex", link: "/materials/super-duplex-steel", icon: Shield, desc: "Extreme environment 2507 (S32750 / S32760)" },
      { name: "Nickel Alloys", link: "/materials/nickel-alloys", icon: Atom, desc: "Monel, Inconel, Hastelloy, and specialty alloys" }
    ];

    const allApplications = [
      { name: "Oil & Gas", icon: Droplets },
      { name: "Petrochemical", icon: FlaskConical },
      { name: "Chemical Processing", icon: Beaker },
      { name: "Power Generation", icon: Zap },
      { name: "Pharmaceutical", icon: Pill },
      { name: "Marine & Offshore", icon: Ship },
      { name: "Food & Beverage", icon: Coffee },
      { name: "Construction", icon: Building2 }
    ];

    return {
      connectionTypes: Object.values(connectionTypesMap).sort((a, b) => b.count - a.count),
      materials: allMaterials,
      applications: allApplications
    };
  }, [productsData]);



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
      <div className="mb-10 md:mb-16">
        <div className="max-w-4xl">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold tracking-wide uppercase mb-6 gsap-hero border border-slate-200">
            Complete Product Range
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 gsap-hero uppercase text-primary">
            PRODUCT <span className="text-secondary">CATALOGUE</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed gsap-hero max-w-2xl">
            Explore our complete range of industrial pipe fittings and find the right solution for your piping requirements.
          </p>
          
          <div className="flex flex-wrap gap-4 gsap-hero">
            <a href="#connection-types" className="px-6 py-3 rounded-lg bg-[#142E57] hover:bg-[#142E57]/90 text-white font-bold transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#142E57]">
              Explore Products
            </a>
            <a 
              href="/catalogue_pdf/PPF CATALOGUE.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#142E57] flex items-center"
            >
              <svg className="w-5 h-5 mr-2 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            {catalogueData.connectionTypes.map((conn, idx) => {
              const ConnIcon = getConnectionIcon(conn.name);
              return (
                <Link key={idx} href={conn.link} className="gsap-card group bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-[#142E57]/30 transition-all duration-200 block no-underline focus:outline-none focus:ring-2 focus:ring-[#142E57]">
                  <div className="w-12 h-12 bg-[#EEF4FB] text-[#142E57] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#142E57] group-hover:text-white transition-colors">
                    <ConnIcon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-[#142E57] transition-colors">{conn.name}</h3>
                  <p className="text-sm font-medium text-slate-500">{conn.count} Available Products</p>
                </Link>
              );
            })}
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 gsap-grid-container">
            {catalogueData.materials.map((mat, idx) => (
              <Link key={idx} href={mat.link} className="gsap-card group bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-[#142E57]/40 transition-all duration-300 block no-underline focus:outline-none focus:ring-2 focus:ring-[#142E57] flex flex-col justify-between h-full">
                <div>
                  <div className="w-12 h-12 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center mb-4 group-hover:bg-[#142E57] group-hover:text-white transition-colors duration-300 shadow-sm border border-slate-100">
                    <mat.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#142E57] transition-colors mb-2">{mat.name}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">{mat.desc}</p>
                </div>
                <div className="text-sm font-semibold text-[#142E57] flex items-center opacity-80 group-hover:opacity-100 transition-opacity">
                  Explore Grades
                  <svg className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
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
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gsap-grid-container">
            {catalogueData.applications.map((app, idx) => (
              <div key={idx} className="gsap-card group bg-white border border-slate-200 rounded-xl p-5 hover:border-[#142E57]/40 hover:bg-[#EEF4FB]/30 hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center text-center">
                <div className="text-slate-400 group-hover:text-[#142E57] mb-3 transition-colors">
                  <app.icon className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <span className="font-semibold text-slate-800 text-sm">{app.name}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Catalogue Download CTA & Contact CTA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 gsap-section">
        
        {/* Download CTA */}
        <div className="bg-[#142E57] rounded-2xl p-8 shadow-md relative overflow-hidden flex flex-col items-start justify-center">
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
            className="group px-5 py-2.5 rounded-lg bg-white hover:bg-slate-100 text-[#142E57] font-bold transition-colors shadow-lg shadow-black/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#142E57] focus:ring-white flex items-center relative z-10 w-fit"
          >
            <svg className="w-5 h-5 mr-2 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Catalogue
          </a>
        </div>

        {/* Contact CTA */}
        <div className="bg-[#EEF4FB] border border-[#E7EDF5] rounded-2xl p-8 shadow-sm flex flex-col items-start justify-center">
          <h2 className="text-2xl font-bold text-[#142E57] mb-2">Looking for a Specific Fitting?</h2>
          <p className="text-slate-600 mb-6 max-w-md">
            Our team can help you identify the right product for your piping requirements or assist with custom fabrication.
          </p>
          <Link 
            href="/contact"
            className="group px-5 py-2.5 rounded-lg bg-white border border-slate-300 hover:border-[#142E57] hover:text-[#142E57] text-slate-700 font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#142E57] flex items-center shadow-sm"
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
