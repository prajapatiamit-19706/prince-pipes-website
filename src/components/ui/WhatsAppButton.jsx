"use client";

import companyData from "@/data/company.json";

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

export default function WhatsAppButton() {
  const { whatsapp } = companyData;
  const whatsappNumber = whatsapp?.replace(/[^0-9]/g, "");
  
  if (!whatsappNumber) return null;

  const defaultWhatsAppMsg = "Hello,\n\nI would like to enquire about your pipe fittings.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultWhatsAppMsg)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#128C7E] hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#25D366]/50 transition-all duration-300 ease-out"
    >
      <WhatsAppIcon className="w-7 h-7" />
    </a>
  );
}
