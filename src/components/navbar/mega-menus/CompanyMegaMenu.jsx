"use client";
import React from 'react';
import Link from 'next/link';
import { MegaMenuContainer } from './MegaMenuContainer';
import { Building2, ShieldCheck, Award, Settings, Image as ImageIcon } from 'lucide-react';
import navigationData from '@/data/navigation.json';

export const CompanyMegaMenu = ({ isOpen, onMouseEnter, onMouseLeave }) => {
  // Fetch company children from navigation.json
  const companyNav = navigationData.primary.find(item => item.id === 'company');
  const cards = companyNav?.children || [];

  const iconMap = {
    about: Building2,
    quality: ShieldCheck,
    certifications: Award,
    gallery: ImageIcon,
  };

  return (
    <MegaMenuContainer isOpen={isOpen} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} width="320px" padding="p-4">
      <div className="flex flex-col gap-1">
        {cards.map(card => {
          const Icon = iconMap[card.id] || Settings;
          return (
            <Link key={card.id} href={card.path} className="w-full text-left group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-surface-2 hover:shadow-sm">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-[#c29b62] rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Icon className="w-5 h-5 transition-colors duration-300 text-text-muted group-hover:text-[#c29b62]" strokeWidth={1.5} />
              <span className="font-semibold text-[15px] transition-colors duration-300 text-text-secondary group-hover:text-primary">{card.label}</span>
            </Link>
          );
        })}
      </div>
    </MegaMenuContainer>
  );
};
