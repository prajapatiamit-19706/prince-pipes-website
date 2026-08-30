"use client";

import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import CertificateCard from './CertificateCard';
import CertificateModal from './CertificateModal';
import CertificatesEmptyState from './CertificatesEmptyState';

export default function CertificatesClient({ certificates }) {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const gridRef = useRef(null);

  useGSAP(() => {
    if (certificates && certificates.length > 0) {
      gsap.fromTo(
        '.certificate-card',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 0.2 }
      );
    }
  }, { scope: gridRef, dependencies: [certificates] });

  const handleOpenModal = (certificate) => {
    setSelectedCertificate(certificate);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCertificate(null), 300); // clear after animation
  };

  return (
    <div className="w-full">
      {/* Certificate Grid */}
      {(!certificates || certificates.length === 0) ? (
        <div className="mt-8">
          <CertificatesEmptyState />
        </div>
      ) : (
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-8"
        >
          {certificates.map((cert) => (
            <CertificateCard 
              key={cert.id} 
              certificate={cert} 
              onView={handleOpenModal} 
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <CertificateModal 
        certificate={selectedCertificate} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
}
