"use client";
import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/components/ui/button/buttonVariants';
import { useHeaderContext } from '@/context/HeaderContext';
import { MegaMenuContainer } from './mega-menus/MegaMenuContainer';
import { ProductsMegaMenu } from './mega-menus/ProductsMegaMenu';
import { CompanyMegaMenu } from './mega-menus/CompanyMegaMenu';
import { TechnicalMegaMenu } from './mega-menus/TechnicalMegaMenu';
import { ResourcesMegaMenu } from './mega-menus/ResourcesMegaMenu';
import { MaterialsMegaMenu } from './mega-menus/MaterialsMegaMenu';
import { StandardDropdown } from './StandardDropdown'; // fallback if needed
import { motion, AnimatePresence } from 'framer-motion';

export const NavigationItem = ({ item, isMobile = false }) => {
  const pathname = usePathname();
  const isActive = pathname === item.path;
  const { activeDropdown, setActiveDropdown, closeMobileMenu } = useHeaderContext();
  const isDropdownOpen = activeDropdown === item.path;
  const timeoutRef = useRef(null);
  const hasDropdown = item.type === 'dropdown' && item.children && item.children.length > 0;

  const handleMouseEnter = () => {
    if (isMobile || !hasDropdown) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(item.path);
  };

  const handleMouseLeave = () => {
    if (isMobile || !hasDropdown) return;
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown((prev) => (prev === item.path ? null : prev));
    }, 150);
  };

  const handleClick = (e) => {
    if (hasDropdown) {
      if (isMobile) {
        e.preventDefault();
        setActiveDropdown(isDropdownOpen ? null : item.path);
      } else {
        // On desktop, prevent default for all dropdowns to avoid redirecting
        e.preventDefault();
      }
    } else if (isMobile) {
      closeMobileMenu();
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const baseClasses = "group flex items-center transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm cursor-pointer";

  const desktopClasses = cn(
    "text-[16px] h-full flex items-center relative gap-1.5 tracking-wide transition-colors duration-300",
    isActive || isDropdownOpen ? "text-primary font-semibold" : "text-text-secondary font-medium hover:text-primary"
  );

  const mobileClasses = cn(
    "text-lg py-4 border-b border-border w-full justify-between font-medium transition-colors duration-300",
    isActive ? "text-primary font-semibold" : "text-text-primary hover:text-primary"
  );

  const renderDesktopDropdown = () => {
    if (isMobile || !hasDropdown) return null;
    
    switch(item.id) {
      case 'products': return <ProductsMegaMenu isOpen={isDropdownOpen} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />;
      case 'company': return <CompanyMegaMenu isOpen={isDropdownOpen} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />;
      case 'technical-resources': return <TechnicalMegaMenu isOpen={isDropdownOpen} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />;
      case 'resources': return <ResourcesMegaMenu isOpen={isDropdownOpen} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />;
      case 'materials': return <MaterialsMegaMenu isOpen={isDropdownOpen} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />;
      default: return (
        <StandardDropdown
          isOpen={isDropdownOpen}
          items={item.children}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      );
    }
  };

  return (
    <div
      className={isMobile ? "w-full flex flex-col" : "h-full flex items-center relative"}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={item.path}
        onClick={handleClick}
        className={cn(baseClasses, isMobile ? mobileClasses : desktopClasses)}
        aria-current={isActive ? 'page' : undefined}
      >
        <span>{item.label}</span>
        {hasDropdown && (
          <ChevronDown
            className={cn(
              "w-3.5 h-3.5 transition-all duration-300 mt-0.5",
              isActive || isDropdownOpen ? "opacity-100 text-primary rotate-180" : "opacity-50 group-hover:opacity-100"
            )}
          />
        )}
        {!isMobile && (
          <span
            className={cn(
              "absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 transition-all duration-300 ease-out",
              isActive
                ? "w-full bg-primary opacity-100"
                : isDropdownOpen
                  ? "w-full bg-primary opacity-40"
                  : "w-0 bg-primary opacity-0 group-hover:w-full group-hover:opacity-40"
            )}
          />
        )}
      </Link>

      {/* Mobile Accordion */}
      <AnimatePresence>
        {isMobile && isDropdownOpen && hasDropdown && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden flex flex-col bg-surface rounded-b-md mb-2"
          >
            <div className="p-4 flex flex-col gap-3">
              {item.children.map(subItem => (
                <Link key={subItem.id} href={subItem.path} className="text-[15px] font-medium text-text-secondary hover:text-primary transition-colors" onClick={() => closeMobileMenu()}>
                  {subItem.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Dropdowns */}
      {renderDesktopDropdown()}
    </div>
  );
};
