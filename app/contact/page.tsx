'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import { Send, CheckCircle } from 'lucide-react';

const ContactPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Dummy submit action
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header */}
      <div className="bg-gray-50 py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fadeIn">
          <h1 className="text-4xl font-bold tracking-tight text-black mb-4 uppercase">Contact Us</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Have a question about our collections or your order? We're here to help.
          </p>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        {isSubmitted ? (
          <div className="bg-gray-50 p-12 text-center space-y-6 animate-fadeIn">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center">
                <CheckCircle size={32} />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-black uppercase">Message Sent</h2>
            <p className="text-gray-500">
              Thank you for reaching out. Our team will get back to you within 24 hours.
            </p>
            <Button variant="outline" onClick={() => setIsSubmitted(false)}>
              Send Another Message
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-gray-400">Full Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-black focus:outline-none transition-colors text-sm"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-black focus:outline-none transition-colors text-sm"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-gray-400">Message</label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-black focus:outline-none transition-colors text-sm resize-none"
                  placeholder="How can we help you?"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full group"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <>
                  Send Message
                  <Send size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>
        )}

        <div className="mt-24 pt-12 border-t border-gray-100 grid grid-cols-2 gap-8 text-center md:text-left">
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Email</h3>
            <p className="text-sm font-medium text-black">hello@avnoutfits.com</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Location</h3>
            <p className="text-sm font-medium text-black">Jakarta, Indonesia</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
