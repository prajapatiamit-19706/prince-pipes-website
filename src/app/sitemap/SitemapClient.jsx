"use client";

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Building, Box, FileText, Phone, Settings, Shield } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import navigationData from '@/data/navigation.json';

gsap.registerPlugin(useGSAP);

export default function SitemapClient() {
  const containerRef = useRef(null);

  // Group data logically based on navigation.json
  const navItems = navigationData.primary || [];
  
  const getSectionData = (id) => navItems.find(item => item.id === id);

  const sections = [
    {
      title: 'Company',
      icon: <Building className="w-5 h-5 text-primary" />,
      data: getSectionData('company'),
    },
    {
      title: 'Products',
      icon: <Box className="w-5 h-5 text-primary" />,
      data: getSectionData('products'),
    },
    {
      title: 'Materials',
      icon: <Settings className="w-5 h-5 text-primary" />,
      data: getSectionData('materials'),
    },
    {
      title: 'Technical Resources',
      icon: <FileText className="w-5 h-5 text-primary" />,
      data: getSectionData('technical-resources'),
    },
    {
      title: 'Resources',
      icon: <FileText className="w-5 h-5 text-primary" />,
      data: getSectionData('resources'),
    },
    {
      title: 'Contact',
      icon: <Phone className="w-5 h-5 text-primary" />,
      links: [
        { label: 'Contact Us', path: '/contact' }
      ]
    },
    {
      title: 'Legal',
      icon: <Shield className="w-5 h-5 text-primary" />,
      links: [
        { label: 'Sitemap', path: '/sitemap' }
      ]
    }
  ];

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set('.sitemap-reveal', { opacity: 1, y: 0 });
      return;
    }

    gsap.set('.sitemap-reveal', { opacity: 0, y: 20 });
    gsap.to('.sitemap-reveal', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.05,
      delay: 0.1,
    });
  }, { scope: containerRef });

  const renderLinks = (item) => {
    if (!item) return null;

    if (item.children) {
      return (
        <ul className="space-y-3 mt-4">
          {item.children.map((child) => (
            <li key={child.id} className="flex flex-col">
              <Link 
                href={child.path}
                className="group flex items-center text-neutral-600 hover:text-primary font-medium transition-colors py-1"
              >
                <span className="relative">
                  {child.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </span>
                <ArrowRight className="w-3.5 h-3.5 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </Link>
              
              {/* Nested Children (e.g. Subcategories) */}
              {child.children && (
                <ul className="pl-4 mt-2 space-y-2 border-l border-neutral-200 ml-2">
                  {child.children.map((subChild) => (
                    <li key={subChild.id}>
                      <Link 
                        href={subChild.path}
                        className="group flex items-center text-sm text-neutral-500 hover:text-primary transition-colors"
                      >
                        <span className="relative">
                          {subChild.label}
                          <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
                        </span>
                        <ArrowRight className="w-3 h-3 ml-1.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      );
    }

    return null;
  };

  return (
    <main ref={containerRef} className="min-h-screen bg-white pt-20 md:pt-24 pb-12 overflow-hidden font-body">
      
      {/* Hero Section */}
      <div className="container-wide mb-10 md:mb-12">
        <div className="max-w-4xl">
          <div className="sitemap-reveal flex items-center gap-3 mb-4">
            <span className="h-[1px] w-12 bg-primary"></span>
            <span className="text-sm font-bold tracking-[0.2em] text-primary uppercase">Sitemap</span>
          </div>
          <h1 className="sitemap-reveal text-4xl md:text-5xl lg:text-6xl font-display font-medium text-primary leading-tight mb-4 uppercase">
            EXPLORE PRINCE PIPES & <span className="text-secondary">FITTINGS</span>
          </h1>
          <p className="sitemap-reveal text-lg text-neutral-600 max-w-2xl leading-relaxed">
            A comprehensive overview of our website structure. Quickly navigate through our product catalogue, manufacturing capabilities, technical resources, and company information.
          </p>
        </div>
      </div>

      {/* Structured Multi-Column Layout */}
      <div className="bg-neutral-50 border-y border-neutral-200 py-10 md:py-16">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            
            {/* Render dynamically mapped sections */}
            {sections.map((section, idx) => (
              <div key={idx} className="sitemap-reveal flex flex-col">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-200">
                  {section.icon}
                  <h2 className="text-xl font-bold text-neutral-900 tracking-tight uppercase">
                    {section.title}
                  </h2>
                </div>

                {/* Either it has data from navigation.json, or hardcoded links */}
                {section.data ? renderLinks(section.data) : (
                  <ul className="space-y-3 mt-2">
                    {section.links && section.links.map((link, i) => (
                      <li key={i}>
                        <Link 
                          href={link.path}
                          className="group flex items-center text-neutral-600 hover:text-primary font-medium transition-colors py-1"
                        >
                          <span className="relative">
                            {link.label}
                            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

          </div>
        </div>
      </div>

    </main>
  );
}
