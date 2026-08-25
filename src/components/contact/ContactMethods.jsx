"use client";
import React from "react";
import { Mail, Phone } from "lucide-react";
import companyData from "@/data/company.json";

// Custom WhatsApp Icon for accuracy (since Lucide doesn't have an official brand one)
const WhatsAppIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

export function ContactMethods() {
  const { phone, email, whatsapp } = companyData;

  // Format numbers for links
  const phoneLink = `tel:${phone?.replace(/[^0-9+]/g, "")}`;
  const whatsappNumber = whatsapp?.replace(/[^0-9]/g, "");

  const defaultWhatsAppMsg = "Hello,\n\nI would like to enquire about your pipe fittings.\n\nProduct:\nSize:\nQuantity:\nRequirement:\n\nPlease share the details.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultWhatsAppMsg)}`;

  const emailSubject = "Product Enquiry — Prince Pipes";
  const emailBody = "Hello,\n\nI would like to enquire about your pipe fittings.\n\nProduct:\nSize:\nQuantity:\nRequirement:\n\nRegards,";
  const emailLink = `mailto:${email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  const methods = [
    {
      id: "whatsapp",
      title: "WhatsApp",
      description: "Quick inquiries and quotation requests.",
      cta: "Chat Now",
      icon: WhatsAppIcon,
      href: whatsappUrl,
      primary: true,
      target: "_blank"
    },
    {
      id: "email",
      title: "Email",
      description: "Send your product requirements or enquiry.",
      cta: "Send Email",
      icon: Mail,
      href: emailLink,
      primary: false,
      target: "_blank"
    },
    {
      id: "phone",
      title: "Call Us",
      description: "Speak directly with our engineering team.",
      cta: "Call Now",
      icon: Phone,
      href: phoneLink,
      primary: false,
      target: "_self"
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl">
        <div className="mb-10 text-center lg:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#142E57] mb-3">
            How Can We Help?
          </h2>
          <p className="text-[#5B6B80] text-sm sm:text-base">
            Choose the easiest way to connect with our team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {methods.map((method, i) => (
            <a
              key={method.id}
              href={method.href}
              target={method.target}
              rel={method.target === "_blank" ? "noopener noreferrer" : undefined}
              className={`group flex flex-col p-6 sm:p-8 rounded-xl border transition-all duration-300 hover:-translate-y-1 ${method.primary
                  ? "border-[#142E57]/20 bg-[#FCFCFA] shadow-[0_4px_20px_rgba(20,46,87,0.05)] hover:shadow-[0_8px_30px_rgba(20,46,87,0.1)] hover:border-[#142E57]/40"
                  : "border-[#E7EDF5] bg-white hover:shadow-[0_4px_20px_rgba(20,46,87,0.05)] hover:border-[#142E57]/30"
                }`}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-colors ${method.primary ? "bg-[#142E57] text-white" : "bg-[#EEF4FB] text-[#142E57] group-hover:bg-[#142E57] group-hover:text-white"
                }`}>
                <method.icon className="w-6 h-6" />
              </div>

              <h3 className="font-bold text-[#142E57] text-xl mb-2">{method.title}</h3>
              <p className="text-[#5B6B80] text-sm sm:text-base leading-relaxed mb-8 flex-1">
                {method.description}
              </p>

              <div className="mt-auto flex items-center font-semibold text-sm sm:text-base text-[#142E57] group-hover:text-[#2f6fbe] transition-colors">
                {method.cta}
                <span className="ml-1 text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
