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

  // MOCK SERVICE SUBMISSION
  const submitQuoteRequest = async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("MOCK API: Quote Request Submitted successfully:", data);
        resolve({ success: true });
      }, 1500);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      setIsError(false);
      // Simulate random error (10% chance) just to show error state works, 
      // otherwise it succeeds.
      if (Math.random() < 0.1) throw new Error("Network error");
      
      await submitQuoteRequest(formData);
      setIsSuccess(true);
    } catch (error) {
      console.error("Submission failed", error);
      setIsError(true);
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
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-4">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-2xl font-display font-medium text-neutral-900">Request Sent</h3>
              <p className="text-neutral-600">
                Our engineering team will review your request for <span className="font-semibold">{productName}</span> and respond within 24 hours.
              </p>
              <button 
                onClick={close}
                className="mt-8 bg-neutral-900 hover:bg-neutral-800 text-white px-8 py-3 w-full font-medium tracking-wide transition-colors"
              >
                CLOSE
              </button>
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-4">
                <X size={32} />
              </div>
              <h3 className="text-2xl font-display font-medium text-neutral-900">Request Failed</h3>
              <p className="text-neutral-600">
                There was an issue submitting your request. Please try again later.
              </p>
              <button 
                onClick={() => setIsError(false)}
                className="mt-8 bg-neutral-900 hover:bg-neutral-800 text-white px-8 py-3 w-full font-medium tracking-wide transition-colors"
              >
                TRY AGAIN
              </button>
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
}
