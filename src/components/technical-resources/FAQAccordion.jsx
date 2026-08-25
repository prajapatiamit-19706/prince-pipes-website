"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "What standards are used for these dimensions?",
    answer: "The dimensions provided are based on applicable industry standards including ASME B16.9 for buttweld fittings and ASME B16.11 for forged threaded fittings. Always verify against your specific project requirements."
  },
  {
    question: "Which stainless steel grades are covered?",
    answer: "These dimension charts generally apply to standard austenitic stainless steel grades including SS 304, 304L, 316, and 316L (ASTM A182/A403)."
  },
  {
    question: "Are these dimensions available in inch and metric units?",
    answer: "Yes, you can toggle between Inch and MM units at the top of the dimension table. If a specific unit is not available for a product, the option will be hidden or disabled."
  },
  {
    question: "Are dimensions available for all schedules?",
    answer: "We provide dimensions for common schedules such as SCH 5S, 10S, 40S, and 80S. For heavier walls or specialized schedules not listed here, please contact our technical team."
  },
  {
    question: "Can I request custom dimensions?",
    answer: "Yes, our manufacturing facility can accommodate custom dimensional requirements. Please reach out to our technical support team to discuss your specific needs."
  },
  {
    question: "Can I download the dimension chart?",
    answer: "Yes, you can use the 'Download PDF' button above the dimension table to download a consolidated version of the selected dimension chart."
  }
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full mt-12 mb-8">
      <h2 className="text-xl font-bold text-primary mb-4">Frequently Asked Questions</h2>
      <div className="bg-white border border-border/60 rounded-xl overflow-hidden shadow-sm divide-y divide-border/40">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="w-full">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-surface/50 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary/50"
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-text text-sm md:text-base pr-4">
                  {faq.question}
                </span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-text-muted flex-shrink-0" />
                )}
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-4 pt-0 text-text-secondary text-sm md:text-base leading-relaxed bg-surface/30">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
