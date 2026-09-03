"use client";

import { motion } from "framer-motion";
import { ProductBreadcrumb } from "@/components/product/ProductBreadcrumb";

export const GalleryHero = () => {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Company", path: "/about" },
    { name: "Gallery", path: "/gallery" }
  ];

  return (
    <section className="relative bg-white text-primary-900 pt-6 pb-8 md:pt-8 md:pb-12 border-b border-border">
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl mx-auto flex flex-col items-center"
        >
          <div className="mb-6">
            <ProductBreadcrumb breadcrumbs={breadcrumbs} />
          </div>

          <h2 className="text-xs md:text-sm font-bold tracking-[0.2em] text-primary-500 uppercase mb-4">
            OUR PRODUCTS
          </h2>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight mb-4">
            Product Gallery
          </h1>

          <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto font-light leading-relaxed">
            Explore our range of precision-engineered pipe fittings and industrial piping components.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
