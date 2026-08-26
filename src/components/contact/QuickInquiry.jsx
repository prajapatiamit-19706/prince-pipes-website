"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import companyData from "@/data/company.json";

export function QuickInquiry() {
  const [formData, setFormData] = useState({
    product: "",
    size: "",
    quantity: "",
    additional: ""
  });
  const [error, setError] = useState("");
  const [status, setStatus] = useState(""); // "sending" | "opened" | ""

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "product" && value.trim() !== "") {
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.product.trim()) {
      setError("Please enter your product requirement.");
      return;
    }

    setStatus("sending");

    // Build message
    const lines = ["Hello,\n\nI would like to enquire about:"];
    lines.push(`\nProduct / Requirement:\n${formData.product.trim()}`);
    
    if (formData.size.trim()) {
      lines.push(`\nSize:\n${formData.size.trim()}`);
    }
    
    if (formData.quantity.trim()) {
      lines.push(`\nQuantity:\n${formData.quantity.trim()}`);
    }
    
    if (formData.additional.trim()) {
      lines.push(`\nAdditional Requirement:\n${formData.additional.trim()}`);
    }

    lines.push("\n\nPlease share the available details and quotation.\n\nThank you.");
    
    const message = lines.join("\n");
    const whatsappNumber = companyData.whatsapp?.replace(/[^0-9]/g, "");
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    
    setStatus("opened");
    
    // Clear status after some time
    setTimeout(() => {
      setStatus("");
      setFormData({ product: "", size: "", quantity: "", additional: "" });
    }, 3000);
  };

  const inputClasses = "w-full bg-white border border-[#E7EDF5] rounded-md px-4 py-3 text-[#142E57] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#142E57]/20 focus:border-[#142E57]/50 transition-all text-sm sm:text-base";

  return (
    <section className="py-8 md:py-12 lg:py-8 md:py-12 lg:py-20 bg-[#FCFCFA] border-t border-[#E7EDF5]">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#142E57] mb-4">
              Send Your Requirement
            </h2>
            <p className="text-[#5B6B80] text-sm sm:text-base leading-relaxed max-w-md">
              Tell us what you need and we&apos;ll help you with the next step. Our team typically responds within business hours via WhatsApp.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E7EDF5] shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="space-y-1.5">
                  <label htmlFor="product" className="block text-sm font-semibold text-[#142E57]">
                    Product / Requirement <span className="text-[#dc2626]">*</span>
                  </label>
                  <input
                    type="text"
                    id="product"
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                    placeholder="e.g. SS 304 Threaded Barrel Nipple"
                    className={`${inputClasses} ${error ? 'border-[#dc2626] focus:ring-[#dc2626]/20' : ''}`}
                  />
                  {error && <p className="text-[#dc2626] text-xs font-medium mt-1">{error}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="size" className="block text-sm font-semibold text-[#142E57]">
                      Size <span className="text-[#7E8EA5] font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      id="size"
                      name="size"
                      value={formData.size}
                      onChange={handleChange}
                      placeholder="e.g. 1/2 inch"
                      className={inputClasses}
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label htmlFor="quantity" className="block text-sm font-semibold text-[#142E57]">
                      Quantity <span className="text-[#7E8EA5] font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      id="quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      placeholder="e.g. 500 pcs"
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="additional" className="block text-sm font-semibold text-[#142E57]">
                    Additional Requirement <span className="text-[#7E8EA5] font-normal">(Optional)</span>
                  </label>
                  <textarea
                    id="additional"
                    name="additional"
                    value={formData.additional}
                    onChange={handleChange}
                    placeholder="Any specific standards, grades, or delivery requirements?"
                    rows={4}
                    className={`${inputClasses} resize-none`}
                  />
                </div>

                <div className="pt-2">
                  <Button 
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full bg-[#142E57] hover:bg-[#1D4377] text-white h-12 text-[15px] font-semibold rounded-md shadow-sm transition-all duration-300"
                  >
                    {status === "sending" ? "Opening WhatsApp..." : "Send Inquiry on WhatsApp →"}
                  </Button>
                  
                  {status === "opened" && (
                    <div className="mt-4 p-3 bg-[#EEF4FB] text-[#142E57] text-sm text-center rounded-md font-medium border border-[#142E57]/10 transition-opacity">
                      WhatsApp opened. Complete your enquiry there.
                    </div>
                  )}
                </div>

              </form>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
