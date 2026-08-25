import React from 'react';
import { PhoneCall, Mail } from 'lucide-react';
import Link from 'next/link';

export default function TechnicalSupportCTA() {
  return (
    <div className="w-full bg-primary-50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between border border-primary-100 shadow-sm mt-8 mb-12">
      <div className="mb-6 md:mb-0 md:mr-8 text-center md:text-left flex-1">
        <h3 className="text-xl md:text-2xl font-bold text-primary mb-2">Need Technical Assistance?</h3>
        <p className="text-text-secondary text-sm md:text-base max-w-2xl">
          Our team can help with product dimensions, specifications, custom requirements, and material selection for your specific industrial application.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
        <Link 
          href="/contact?subject=Technical+Information"
          className="w-full sm:w-auto flex items-center justify-center px-6 py-3 rounded-full bg-primary hover:bg-primary-600 text-white font-medium transition-colors shadow-sm whitespace-nowrap"
        >
          <PhoneCall className="w-4 h-4 mr-2" />
          <span>Request Technical Info</span>
        </Link>
        <Link 
          href="/request-quote"
          className="w-full sm:w-auto flex items-center justify-center px-6 py-3 rounded-full bg-white hover:bg-surface text-primary border border-primary/20 font-medium transition-colors shadow-sm whitespace-nowrap"
        >
          <Mail className="w-4 h-4 mr-2" />
          <span>Request a Quote</span>
        </Link>
      </div>
    </div>
  );
}
