"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function FullscreenImageViewer({ images, currentIndex, isOpen, onClose }) {
  const [index, setIndex] = useState(currentIndex);
  const [scale, setScale] = useState(1);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  // Sync index when opened
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setIndex(currentIndex);
      setScale(1);
    }
  }

  // Body overflow
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useGSAP(() => {
    if (isOpen) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)", delay: 0.1 }
      );
    }
  }, [isOpen]);

  const handleNext = useCallback((e) => {
    e?.stopPropagation();
    if (!images || images.length === 0) return;
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setScale(1);
  }, [images]);

  const handlePrev = useCallback((e) => {
    e?.stopPropagation();
    if (!images || images.length === 0) return;
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setScale(1);
  }, [images]);

  const handleZoomIn = (e) => {
    e?.stopPropagation();
    setScale(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = (e) => {
    e?.stopPropagation();
    setScale(prev => Math.max(prev - 0.5, 1));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose]);

  if (!isOpen || !images || images.length === 0) return null;

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
    
    if (isLeftSwipe && images.length > 1) {
      handleNext();
    }
    if (isRightSwipe && images.length > 1) {
      handlePrev();
    }
  };

  const currentImage = images[index];

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center touch-none"
      onClick={onClose}
    >
      <div className="absolute top-6 right-6 flex items-center gap-4 z-10">
        <div className="flex bg-white/10 rounded-full p-1 backdrop-blur-md">
          <button onClick={handleZoomOut} className="p-2 text-white hover:bg-white/20 rounded-full transition-colors">
            <ZoomOut size={20} />
          </button>
          <button onClick={handleZoomIn} className="p-2 text-white hover:bg-white/20 rounded-full transition-colors">
            <ZoomIn size={20} />
          </button>
        </div>
        <button 
          onClick={onClose}
          className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md"
        >
          <X size={24} />
        </button>
      </div>

      {images.length > 1 && (
        <>
          <button 
            onClick={handlePrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md z-10"
          >
            <ChevronLeft size={32} />
          </button>
          <button 
            onClick={handleNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md z-10"
          >
            <ChevronRight size={32} />
          </button>
        </>
      )}

      <div 
        ref={contentRef}
        className="relative w-full max-w-6xl h-[80vh] flex items-center justify-center p-4 cursor-grab active:cursor-grabbing touch-pan-y"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEndHandler}
      >
        <div 
          className="relative w-full h-full transition-transform duration-300 ease-out"
          style={{ transform: `scale(${scale})` }}
        >
          <Image
            src={currentImage}
            alt={`Product full view ${index + 1}`}
            fill
            className="object-contain"
            sizes="100vw"
            quality={100}
            priority
          />
        </div>
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 font-mono tracking-widest text-sm bg-black/50 px-4 py-2 rounded-full backdrop-blur-md">
          {index + 1} / {images.length}
        </div>
      )}
    </div>
  );
}
