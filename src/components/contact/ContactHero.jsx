"use client";
import React from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ProductBreadcrumb } from "@/components/product/ProductBreadcrumb";

export function ContactHero() {
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.fromTo(
      ".contact-hero-content > *",
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
    );
  }, []);

  return (
    <section className="pt-12 pb-12 md:pt-16 md:pb-16 bg-[#FCFCFA] border-b border-[#E7EDF5]">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl">
        <div className="contact-hero-content max-w-2xl">
          <ProductBreadcrumb
            breadcrumbs={[{ name: "Contact", path: "/contact" }]}
          />

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#142E57] tracking-tight leading-[1.1] mb-6">
            Get in Touch
          </h1>

          <p className="text-lg sm:text-xl text-[#5B6B80] leading-relaxed mb-4">
            Let&apos;s discuss your pipe fitting requirements.
          </p>

          <p className="text-[#5B6B80] text-sm sm:text-base leading-relaxed">
            Contact our engineering and sales team for product inquiries,
            technical specifications, quotations, and custom manufacturing requirements.
          </p>
        </div>
      </div>
    </section>
  );
}
