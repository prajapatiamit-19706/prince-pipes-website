"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function RequestQuoteModal({ productName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const firstInputRef = useRef(null);

  const [formData, setFormData] = useState({
    product: productName || '',
    quantity: '',
    grade: '',
    application: '',
    email: '',
    message: ''
  });

  const close = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = '';
    // Reset after animation completes
    setTimeout(() => {
      setIsSuccess(false);
      setIsError(false);
      setFormData(prev => ({ ...prev, quantity: '', email: '', message: '' }));
    }, 500);
  }, []);

  // Listen for the custom event to open and ESC to close
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
      // Focus first input slightly after opening
      setTimeout(() => {
        if (firstInputRef.current) firstInputRef.current.focus();
      }, 400);
    };
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        close();
      }
    };
    
    window.addEventListener('open-quote-modal', handleOpen);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('open-quote-modal', handleOpen);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [close]);

  useGSAP(() => {
    if (isOpen) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        panelRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.4, ease: "power3.out" }
      );
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      setIsError(false);
      
      // Construct WhatsApp Message
      const phoneNumber = "917045140314";
      const message = `*New Quote Request*
*Product:* ${formData.product}
*Quantity:* ${formData.quantity}
*Grade:* ${formData.grade || 'N/A'}
*Email:* ${formData.email}
*Message:* ${formData.message || 'None'}`;
      
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      
      // Simulate slight delay for UX
      await new Promise(resolve => setTimeout(resolve, 800));
      
      window.open(whatsappUrl, '_blank');
      close(); // Close modal immediately
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-neutral-900/40 backdrop-blur-sm flex justify-end"
      onClick={close}
    >
      <div 
        ref={panelRef}
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-neutral-100">
          <h2 className="text-sm font-bold tracking-[0.2em] text-neutral-900 uppercase">
            REQUEST A QUOTE
          </h2>
          <button onClick={close} className="text-neutral-400 hover:text-neutral-800 transition-colors p-2">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div>
                <label className="block text-xs font-semibold tracking-wider text-neutral-500 mb-2 uppercase">Product</label>
                <input 
                  type="text" 
                  name="product"
                  value={formData.product}
                  readOnly
                  className="w-full bg-neutral-50 border border-neutral-200 px-4 py-3 text-neutral-800 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold tracking-wider text-neutral-500 mb-2 uppercase">Quantity <span className="text-red-500">*</span></label>
                  <input 
                    ref={firstInputRef}
                    type="number" 
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full bg-white border border-neutral-200 px-4 py-3 text-neutral-800 focus:border-primary focus:outline-none transition-colors"
                    placeholder="e.g. 100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold tracking-wider text-neutral-500 mb-2 uppercase">Grade (Optional)</label>
                  <input 
                    type="text" 
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    className="w-full bg-white border border-neutral-200 px-4 py-3 text-neutral-800 focus:border-primary focus:outline-none transition-colors"
                    placeholder="e.g. SS 316"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-wider text-neutral-500 mb-2 uppercase">Email Address <span className="text-red-500">*</span></label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-neutral-200 px-4 py-3 text-neutral-800 focus:border-primary focus:outline-none transition-colors"
                  placeholder="name@company.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-wider text-neutral-500 mb-2 uppercase">Additional Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full bg-white border border-neutral-200 px-4 py-3 text-neutral-800 focus:border-primary focus:outline-none transition-colors resize-none"
                  placeholder="Specific requirements, standards, or application details..."
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full text-white px-8 py-4 font-medium tracking-wide transition-colors ${
                  isSubmitting ? 'bg-neutral-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark'
                }`}
              >
                {isSubmitting ? 'SENDING REQUEST...' : 'SEND REQUEST →'}
              </button>
            </form>
        </div>
      </div>
    </div>
  );
}
