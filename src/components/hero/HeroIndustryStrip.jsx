import React from "react";
import {
  Droplets,
  Factory,
  FlaskConical,
  Zap,
  Pill,
  Ship,
  Utensils,
  HardHat
} from "lucide-react";
import { cn } from "@/components/ui/button/buttonVariants";

const getIndustryIcon = (index) => {
  const iconProps = { className: "w-8 h-8 text-primary relative z-10", strokeWidth: 1.5 };
  switch (index) {
    case 0: return <Droplets {...iconProps} />;
    case 1: return <Factory {...iconProps} />;
    case 2: return <FlaskConical {...iconProps} />;
    case 3: return <Zap {...iconProps} />;
    case 4: return <Pill {...iconProps} />;
    case 5: return <Ship {...iconProps} />;
    case 6: return <Utensils {...iconProps} />;
    case 7: return <HardHat {...iconProps} />;
    default: return null;
  }
};

export function HeroIndustryStrip({ industries }) {
  if (!industries || industries.length === 0) return null;

  return (
    <div className="hero-anim opacity-0 translate-y-4 w-full bg-surface-50 py-12 overflow-hidden border-t border-border mt-12 hidden lg:block">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col items-center">

        <span className="text-sm font-bold text-primary uppercase tracking-widest mb-10">
          Trusted By Industries Worldwide
        </span>

        <div className="w-full flex items-stretch justify-between">
          {industries.map((industry, index) => (
            <div
              key={index}
              className={cn(
                "group flex-1 flex flex-col items-center justify-center gap-4 px-2 cursor-pointer",
                index !== industries.length - 1 && "border-r border-border/50"
              )}
            >
              <div className="relative flex items-center justify-center p-3 rounded-2xl transition-all duration-500 group-hover:bg-primary/5 group-hover:shadow-[0_0_20px_rgba(var(--primary),0.1)]">
                {/* Subtle accent blob behind the icon that expands on hover */}
                <div className="absolute inset-0 m-auto w-6 h-6 bg-secondary/10 rounded-full blur-sm transition-all duration-500 group-hover:w-12 group-hover:h-12 group-hover:bg-secondary/20 group-hover:blur-md" />
                
                {/* Icon wrapper with scale and float animation */}
                <div className="relative z-10 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-1">
                  {getIndustryIcon(index)}
                </div>
              </div>
              <span className="text-[11px] font-bold text-text uppercase tracking-wider text-center max-w-[100px] leading-tight transition-all duration-500 group-hover:text-primary group-hover:-translate-y-0.5">
                {industry}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
