import { FooterGrid } from './FooterGrid';
import { FooterTrust } from './FooterTrust';
import { FooterBottom } from './FooterBottom';
import footerData from '@/data/footer.json';

export const Footer = () => {
  return (
    <footer className="bg-primary-900 w-full overflow-hidden flex flex-col relative z-10 font-body">
      {/* 
        Section 1: Premium CTA Banner 
        Transitions from light page body into the dark footer 
      */}

      {/* 
        Section 2: Main Footer Grid
        5-column responsive layout for brand, company, products, resources, and contact
      */}
      <FooterGrid />

      {/* 
        Section 3: Trust Strip
        Displays modular trust signals and certifications from footer.json
      */}
      {footerData.showCertifications && <FooterTrust />}

      {/* 
        Section 4: Bottom Bar
        Copyright, Privacy Policy, Terms, and Social Icons
      */}
      <div className="bg-primary-950">
        <FooterBottom />
      </div>
    </footer>
  );
};
