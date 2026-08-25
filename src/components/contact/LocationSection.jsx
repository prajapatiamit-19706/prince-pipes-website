"use client";
import React from "react";
import { MapPin } from "lucide-react";
import companyData from "@/data/company.json";

export function LocationSection() {
  const { officeAddress, factoryAddress } = companyData;
  const addressToSearch = officeAddress || "Mumbai, India";
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressToSearch)}`;

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
          <div className="max-w-2xl w-full">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#142E57] mb-8">
              Visit Us
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-6 p-6 sm:p-8 rounded-xl border border-[#E7EDF5] bg-[#FCFCFA] h-[calc(100%-68px)] transition-shadow hover:shadow-[0_4px_20px_rgba(20,46,87,0.05)]">
              <div className="bg-[#EEF4FB] w-12 h-12 rounded-lg flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-[#142E57]" />
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-[#142E57] text-lg mb-3">Head Office</h3>
                <p className="text-[#5B6B80] leading-relaxed mb-4 text-sm sm:text-base">
                  {officeAddress}
                </p>
                
                <a 
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-semibold text-[#142E57] hover:text-[#2f6fbe] transition-colors"
                >
                  View on Google Maps <span className="ml-1 text-lg">→</span>
                </a>

                {factoryAddress && (
                  <>
                    <div className="w-full h-px bg-[#E7EDF5] my-6"></div>
                    <h3 className="font-semibold text-[#142E57] text-lg mb-3">Manufacturing Unit</h3>
                    <p className="text-[#5B6B80] leading-relaxed text-sm sm:text-base">
                      {factoryAddress}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="w-full h-[350px] lg:h-auto lg:min-h-[400px] rounded-xl overflow-hidden border border-[#E7EDF5] shadow-sm lg:mt-[68px]">
            <iframe 
              src={`https://maps.google.com/maps?q=${encodeURIComponent(addressToSearch)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
