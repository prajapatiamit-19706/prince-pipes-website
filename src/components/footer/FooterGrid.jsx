import { Logo } from '@/components/navbar/Logo';
import { FooterColumn } from './FooterColumn';
import { FooterLinks } from './FooterLinks';
import navigationData from '@/data/navigation.json';
import companyData from '@/data/company.json';
import contactData from '@/data/contact.json';

// Helper to get nav category by id
const getNavItems = (id) => {
  const item = navigationData.primary.find(n => n.id === id);
  return item?.children || [];
};

export const FooterGrid = () => {
  const companyLinks = getNavItems('company');
  const productLinks = getNavItems('products');
  const resourceLinks = getNavItems('technical-resources');

  return (
    <div className="container-wide py-8 md:py-6 md:py-10 lg:py-16 lg:py-10 md:py-6 md:py-10 lg:py-16 lg:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
        
        {/* Column 1: Brand */}
        <div className="lg:col-span-1 flex flex-col items-start">
          <div className="bg-white p-3 rounded-lg mb-6 shadow-sm inline-block">
            {/* The Logo component currently assumes a white background for the header. 
                Wrapping it in a white pill/box works well for dark footers. */}
            <Logo />
          </div>
          {companyData.tagline && (
            <p className="text-white font-medium text-lg mb-4">
              {companyData.tagline}
            </p>
          )}
          <p className="text-primary-200 text-sm leading-relaxed">
            {companyData.description.length > 150 
              ? companyData.description.substring(0, 150) + "..."
              : companyData.description}
          </p>
        </div>

        {/* Column 2: Company */}
        <FooterColumn title="Company">
          <FooterLinks items={companyLinks} />
        </FooterColumn>

        {/* Column 3: Products */}
        <FooterColumn title="Products">
          <FooterLinks items={productLinks} />
        </FooterColumn>

        {/* Column 4: Resources */}
        <FooterColumn title="Technical Resources">
          <FooterLinks items={resourceLinks} />
        </FooterColumn>

        {/* Column 5: Contact */}
        <FooterColumn title="Contact Us">
          {contactData.phone && (
            <div className="mb-2">
              <span className="block text-xs text-primary-300 uppercase tracking-wider mb-1">Phone</span>
              <a href={`tel:${contactData.phone.replace(/\s+/g, '')}`} className="text-white hover:text-primary-100 transition-colors">
                {contactData.phone}
              </a>
            </div>
          )}
          
          {contactData.email && (
            <div className="mb-2">
              <span className="block text-xs text-primary-300 uppercase tracking-wider mb-1">Email</span>
              <a href={`mailto:${contactData.email}`} className="text-white hover:text-primary-100 transition-colors">
                {contactData.email}
              </a>
            </div>
          )}
          
          {contactData.officeAddress && (
            <div className="mb-4">
              <span className="block text-xs text-primary-300 uppercase tracking-wider mb-1">Office</span>
              <address className="text-primary-200 text-sm not-italic">
                {contactData.officeAddress}
              </address>
            </div>
          )}
        </FooterColumn>
      </div>
    </div>
  );
};
