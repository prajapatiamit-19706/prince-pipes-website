import React from "react";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactMethods } from "@/components/contact/ContactMethods";
import { QuickInquiry } from "@/components/contact/QuickInquiry";
import { LocationSection } from "@/components/contact/LocationSection";
import { ContactCTA } from "@/components/contact/ContactCTA";

export const metadata = {
  title: "Contact Us | Prince Pipes & Fittings",
  description: "Contact our engineering and sales team for pipe fitting requirements, quotations, and technical specifications.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FCFCFA]">
      <ContactHero />
      <ContactMethods />
      <QuickInquiry />
      <LocationSection />
      <ContactCTA />
    </div>
  );
}
