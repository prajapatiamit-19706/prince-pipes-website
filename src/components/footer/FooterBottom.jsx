import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import companyData from '@/data/company.json';

export const FooterBottom = () => {
  const currentYear = new Date().getFullYear();
  const companyName = companyData.name || "Prince Pipes & Fittings";

  return (
    <div className="container-wide py-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Copyright */}
        <div className="text-primary-300 text-sm text-center md:text-left flex-1">
          &copy; {currentYear} {companyName}. All rights reserved.
        </div>

        {/* Utility Links */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-sm flex-1">
          <Link href="/sitemap" className="text-primary-300 hover:text-white transition-colors">
            Sitemap
          </Link>
        </div>

        {/* Developer Contact */}
        <div className="flex justify-center md:justify-end flex-1">
          <a 
            href="https://wa.me/919724818006" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-sm text-primary-300 hover:text-white transition-colors"
          >
            <span>Meet Developer</span>
            <div className="p-1.5 rounded-full bg-white/5 group-hover:bg-[#25D366]/20 group-hover:text-[#25D366] transition-colors">
              <MessageCircle className="w-4 h-4" />
            </div>
          </a>
        </div>

      </div>
    </div>
  );
};
