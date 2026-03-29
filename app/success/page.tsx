'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/lib/store';

const SuccessPage = () => {
  const { clearCart } = useCartStore();

  useEffect(() => {
    // Clear the cart when the user arrives at the success page
    // This prevents the "empty cart" flash on the checkout page
    clearCart();
  }, [clearCart]);

  return (
    <div className="bg-white min-h-[80vh] flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-10 animate-fadeIn">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-black text-white rounded-full flex items-center justify-center shadow-2xl shadow-gray-200">
            <CheckCircle size={48} />
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter text-black uppercase">Order Confirmed</h1>
          <p className="text-gray-500 leading-relaxed text-sm">
            Thank you for choosing AVN Outfits. Your order has been placed successfully and is being prepared for shipment.
          </p>
          <div className="bg-gray-50 p-4 border border-dashed border-gray-200 rounded-sm">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Order Reference</p>
            <p className="font-mono text-black">#AVN-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
          </div>
        </div>

        <div className="space-y-4 pt-6">
          <Link href="/store" className="block">
            <Button className="w-full">
              Continue Shopping
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
          <Link href="/" className="block">
            <Button variant="outline" className="w-full">
              Back to Home
            </Button>
          </Link>
        </div>

        <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">
          A confirmation email will be sent shortly.
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;
