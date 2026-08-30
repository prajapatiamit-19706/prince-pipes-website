"use client";

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function ProductBreadcrumb({ breadcrumbs }) {
  const containerRef = useRef(null);

  const formatName = (name) => {
    if (!name) return '';
    return name.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
  };

  useGSAP(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
  }, { scope: containerRef });

  if (!breadcrumbs || breadcrumbs.length === 0) return null;

  return (
    <nav ref={containerRef} aria-label="Breadcrumb" className="py-2 text-sm mt-2">
      <ol className="flex items-center space-x-2 text-neutral-500 flex-wrap">
        <li>
          <Link href="/" className="hover:text-primary transition-colors flex items-center">
            <Home className="w-4 h-4 mr-1" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {breadcrumbs.map((crumb, index) => {
          // The Home link is sometimes included in the JSON, let's filter it out if it points to "/"
          if (crumb.path === "/") return null;

          const isLast = index === breadcrumbs.length - 1;

          return (
            <li key={crumb.path} className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-1 text-neutral-400" />
              {isLast ? (
                <span className="text-neutral-900 font-medium" aria-current="page">
                  {formatName(crumb.name)}
                </span>
              ) : crumb.path ? (
                <Link
                  href={crumb.path}
                  className="hover:text-primary transition-colors hover:underline decoration-neutral-300 underline-offset-4"
                >
                  {formatName(crumb.name)}
                </Link>
              ) : (
                <span className="text-neutral-500">
                  {formatName(crumb.name)}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
