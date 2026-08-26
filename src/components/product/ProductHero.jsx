"use client";

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { FullscreenImageViewer } from './FullscreenImageViewer';
import { ProductPlaceholder } from '../hero/3d/ProductPlaceholder';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';

export function ProductHero({ product, category, subCategory }) {
  const containerRef = useRef(null);
  const imageContainerRef = useRef(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  // Extract images correctly
  const primaryImage = product.media?.primaryImage;
  const gallery = product.media?.gallery || [];
  const allImages = primaryImage ? [primaryImage, ...gallery] : gallery;
  const hasImages = allImages.length > 0;

  // Autoplay Logic
  useEffect(() => {
    if (allImages.length <= 1 || isHovered || isViewerOpen) return;

    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [allImages.length, isHovered, isViewerOpen]);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Left side content animation
    tl.fromTo(
      ".hero-category",
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    )
      .fromTo(
        ".hero-title",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(
        ".hero-desc",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(
        ".hero-specs",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(
        ".hero-cta",
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.1 },
        "-=0.3"
      );

    // Right side image animation
    gsap.fromTo(
      imageContainerRef.current,
      { opacity: 0, scale: 0.96, y: 10 },
      { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
    );
  }, { scope: containerRef });

  const handleScrollToSpecs = () => {
    const specsSection = document.getElementById('technical-specifications');
    if (specsSection) {
      specsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    setActiveImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && allImages.length > 1) {
      handleNext();
    }
    if (isRightSwipe && allImages.length > 1) {
      handlePrev();
    }
  };

  const handleRequestQuote = () => {
    // Trigger modal event
    window.dispatchEvent(new CustomEvent('open-quote-modal'));
  };

  // Determine key specs to show based on product data availability
  const keySpecs = [];
  if (product.technicalSpecifications?.material) keySpecs.push(product.technicalSpecifications.material);
  if (product.technicalSpecifications?.grades?.[0]) keySpecs.push(product.technicalSpecifications.grades[0]);
  if (product.technicalSpecifications?.sizeRange) keySpecs.push(product.technicalSpecifications.sizeRange);

  return (
    <section ref={containerRef} className="py-6 md:py-6 md:py-6 lg:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 md:gap-16 lg:gap-24 items-center">

        {/* Left Side: Content */}
        <div className="flex flex-col items-start max-w-2xl">
          <div className="hero-category text-sm font-bold tracking-[0.2em] text-primary uppercase mb-4 flex flex-col gap-1">
            <span>{category?.name}</span>
            {subCategory && <span className="text-neutral-500">{subCategory.name}</span>}
          </div>

          <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-display font-medium text-text leading-tight mb-6">
            {product.name}
          </h1>

          <p className="hero-desc text-lg text-neutral-600 mb-8 leading-relaxed max-w-xl">
            {product.description?.short || "Precision-engineered fitting for industrial applications."}
          </p>

          {keySpecs.length > 0 && (
            <div className="hero-specs flex flex-wrap items-center gap-3 mb-12">
              {keySpecs.map((spec, i) => (
                <div key={i} className="flex items-center">
                  <span className="text-sm font-medium text-neutral-800 bg-neutral-100 px-3 py-1 rounded-md">
                    {spec}
                  </span>
                  {i < keySpecs.length - 1 && (
                    <span className="mx-3 text-neutral-300">•</span>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="hero-cta flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <button
              onClick={handleRequestQuote}
              className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-none font-medium tracking-wide transition-colors duration-300 w-full sm:w-auto text-center"
            >
              REQUEST A QUOTE
            </button>
            <button
              onClick={handleScrollToSpecs}
              className="group flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-text px-8 py-4 rounded-none font-medium tracking-wide transition-colors duration-300 w-full sm:w-auto"
            >
              VIEW SPECIFICATIONS
              <ArrowDown className="w-4 h-4 text-neutral-500 group-hover:text-text transition-colors group-hover:translate-y-0.5 duration-300" />
            </button>
          </div>
        </div>

        {/* Right Side: Image / 3D Viewer */}
        <div
          className="relative w-full aspect-square md:aspect-[4/3] bg-neutral-50 rounded-xl overflow-hidden group border border-neutral-100 touch-pan-y"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEndHandler}
        >
          <div ref={imageContainerRef} className="w-full h-full relative cursor-zoom-in" onClick={() => hasImages && setIsViewerOpen(true)}>
            {hasImages ? (
              <>
                {allImages.map((img, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === activeImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                      }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} - View ${idx + 1}`}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={idx === 0}
                    />
                  </div>
                ))}
              </>
            ) : (
              // Clean placeholder if no images exist. Using 3D as a nice touch since it's available, 
              // but keeping it minimal as requested in spec.
              <div className="w-full h-full bg-neutral-100 flex items-center justify-center relative">
                {/* Optional 3D Placeholder - lightweight */}
                <div className="absolute inset-0 opacity-50">
                  <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
                    <Environment preset="city" />
                    <ProductPlaceholder />
                  </Canvas>
                </div>
                <div className="relative z-10 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium text-neutral-500 border border-neutral-200 shadow-sm">
                  Image Available on Request
                </div>
              </div>
            )}
          </div>

          {/* Carousel Indicators */}
          {allImages.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
              {allImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex(idx);
                  }}
                  className={`transition-all duration-300 h-1.5 rounded-full ${idx === activeImageIndex
                    ? "w-8 bg-primary"
                    : "w-2 bg-neutral-300 hover:bg-neutral-400"
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <FullscreenImageViewer
        images={allImages}
        currentIndex={activeImageIndex}
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
      />
    </section>
  );
}
