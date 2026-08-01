import React from "react";
import Link from "next/link";
import { buttonVariants } from "../ui/button/buttonVariants";
import { ArrowRight } from "lucide-react";

export function HeroButtons({ buttons }) {
  if (!buttons) return null;

  return (
    <div className="hero-anim opacity-0 translate-y-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-8">
      {buttons.primary && (
        <Link
          href={buttons.primary.href}
          className={buttonVariants({ variant: "primary", size: "lg", className: "w-full sm:w-auto gap-2 group" })}
        >
          {buttons.primary.label}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
      {buttons.secondary && (
        <Link
          href={buttons.secondary.href}
          className={buttonVariants({ variant: "secondary", size: "lg", className: "w-full border border-[#c29b62] sm:w-auto gap-2 group" })}
        >
          {buttons.secondary.label}
          <ArrowRight className="w-4 h-4 text-[#c29b62] group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}
