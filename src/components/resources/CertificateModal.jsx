"use client";

import React, { useEffect, useRef, useCallback } from 'react';
import { X, Download, FileText } from 'lucide-react';
import gsap from 'gsap';

export default function CertificateModal({ certificate, isOpen, onClose }) {
  const modalRef = useRef(null);
  const backdropRef = useRef(null);
  const contentRef = useRef(null);

  const handleClose = useCallback(() => {
    // Exit Animation
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(contentRef.current, { opacity: 0, scale: 0.95, y: 10, duration: 0.2, ease: 'power2.in' })
      .to(backdropRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in' }, '-=0.1');
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    // Body scroll lock
    document.body.style.overflow = 'hidden';

    // Entrance Animation
    const tl = gsap.timeline();
    tl.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
      .fromTo(contentRef.current, { opacity: 0, scale: 0.95, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power3.out' }, '-=0.1');

    const handleEscape = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, handleClose]);

  if (!isOpen || !certificate) return null;

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div 
        ref={backdropRef}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div 
        ref={contentRef}
        className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-100 text-primary-700 rounded-md">
              <FileText className="w-5 h-5" />
            </div>
            <h2 id="modal-title" className="text-lg sm:text-xl font-bold text-slate-900 pr-4 truncate">
              {certificate.title}
            </h2>
          </div>
          <button 
            onClick={handleClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body (PDF Viewer) */}
        <div className="flex-grow bg-slate-100 relative min-h-[50vh] sm:min-h-[70vh] p-2 sm:p-4">
          {certificate.document ? (
            <iframe 
              src={`${certificate.document}#view=FitH`}
              className="w-full h-full min-h-[50vh] sm:min-h-[70vh] rounded-md shadow-sm bg-white border-0"
              title={certificate.title}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white p-6 text-center">
                <FileText className="w-16 h-16 text-slate-300 mb-4" />
                <p className="text-slate-600 mb-4">Your browser does not support inline PDFs.</p>
                <a 
                  href={certificate.document} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-primary-700 text-white rounded-sm font-medium hover:bg-primary-800 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF Instead
                </a>
              </div>
            </iframe>
          ) : (
             <div className="absolute inset-0 flex flex-col items-center justify-center bg-white p-6 text-center">
                <p className="text-slate-600">Document preview not available.</p>
             </div>
          )}
        </div>

        {/* Footer */}
        {certificate.document && (
          <div className="p-4 sm:p-5 border-t border-slate-200 bg-white flex justify-end">
            <a 
              href={certificate.document}
              download
              className="inline-flex items-center justify-center px-6 py-2.5 bg-slate-900 text-white font-medium text-sm transition-colors hover:bg-slate-800 rounded-sm shadow-sm"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Document
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
