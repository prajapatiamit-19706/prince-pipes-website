"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import companyData from "@/data/company.json";

export function ContactCTA() {
  const whatsappNumber = companyData.whatsapp?.replace(/[^0-9]/g, "") || "";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <section className="py-12 md:py-16 bg-[#EEF4FB] border-t border-[#E7EDF5]">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#142E57] mb-3">
          Have a Specific Requirement?
        </h2>
        <p className="text-[#5B6B80] text-sm sm:text-base max-w-xl mx-auto mb-6">
          Our engineering team is ready to help you find the right pipe fitting solution for your project.
        </p>
        
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-block">
          <Button className="group bg-[#142E57] hover:bg-[#1D4377] text-white h-12 px-8 rounded-md shadow-sm transition-all duration-300">
            Talk to Our Team
            <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </a>
      </div>
    </section>
  );
}
