import Link from 'next/link';
import { SocialLinks } from './SocialLinks';
import companyData from '@/data/company.json';
import footerData from '@/data/footer.json';

export const FooterBottom = () => {
  const currentYear = new Date().getFullYear();
  const companyName = companyData.name || "Prince Pipes & Fittings";

  return (
    <div className="container-wide py-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Copyright */}
        <div className="text-primary-300 text-sm text-center md:text-left">
          &copy; {currentYear} {companyName}. All rights reserved.
        </div>

        {/* Utility Links */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-sm">

          <Link href="/sitemap" className="text-primary-300 hover:text-white transition-colors">
            Sitemap
          </Link>
        </div>

        {/* Social Links */}
        {footerData.showSocialLinks && <SocialLinks />}

      </div>
    </div>
  );
};
