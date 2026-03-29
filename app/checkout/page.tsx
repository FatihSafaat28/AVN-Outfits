'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store';
import Button from '@/components/ui/Button';
import { CreditCard, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const CheckoutPage = () => {
  const router = useRouter();
  const { items, getTotalPrice } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // 2-second loading state
    setTimeout(() => {
      // Don't clear cart here to avoid "cart empty" flash on this page
      router.push('/success');
    }, 2000);
  };

  if (items.length === 0 && !isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <p className="text-gray-500 font-medium">Your cart is empty.</p>
        <Link href="/store">
          <Button variant="outline">Back to Store</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link href="/store" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors mb-8">
          <ArrowLeft size={14} className="mr-2" />
          Back to Shopping
        </Link>

        <h1 className="text-3xl font-bold tracking-tight text-black mb-12 uppercase">Checkout</h1>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Form */}
          <div className="lg:col-span-7 space-y-12">
            <section className="space-y-6">
              <div className="flex items-center space-x-4 border-b border-gray-100 pb-4">
                <Truck size={20} className="text-black" />
                <h2 className="text-lg font-bold tracking-tight uppercase">Shipping Details</h2>
              </div>
              <form id="checkout-form" onSubmit={handlePay} className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Full Name</label>
                  <input required className="w-full px-4 py-3 border border-gray-100 focus:border-black outline-none transition-colors text-sm" placeholder="John Doe" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email</label>
                  <input required type="email" className="w-full px-4 py-3 border border-gray-100 focus:border-black outline-none transition-colors text-sm" placeholder="john@example.com" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Phone</label>
                  <input required className="w-full px-4 py-3 border border-gray-100 focus:border-black outline-none transition-colors text-sm" placeholder="+62 812..." />
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Address</label>
                  <input required className="w-full px-4 py-3 border border-gray-100 focus:border-black outline-none transition-colors text-sm" placeholder="St. Minimalist No. 26" />
                </div>
              </form>
            </section>

            <section className="space-y-6">
              <div className="flex items-center space-x-4 border-b border-gray-100 pb-4">
                <CreditCard size={20} className="text-black" />
                <h2 className="text-lg font-bold tracking-tight uppercase">Payment Method</h2>
              </div>
              <div className="grid gap-4">
                <label className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-black bg-gray-50' : 'border-gray-100 hover:border-gray-200'}`}>
                  <div className="flex items-center space-x-4">
                    <input type="radio" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="accent-black" />
                    <span className="text-sm font-semibold uppercase tracking-tight">Credit Card</span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-8 h-5 bg-gray-200 rounded-sm" />
                    <div className="w-8 h-5 bg-gray-200 rounded-sm" />
                  </div>
                </label>
                <label className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${paymentMethod === 'transfer' ? 'border-black bg-gray-50' : 'border-gray-100 hover:border-gray-200'}`}>
                  <div className="flex items-center space-x-4">
                    <input type="radio" checked={paymentMethod === 'transfer'} onChange={() => setPaymentMethod('transfer')} className="accent-black" />
                    <span className="text-sm font-semibold uppercase tracking-tight">Bank Transfer</span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Manual</span>
                </label>
              </div>
            </section>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-gray-50 p-8 border border-gray-100 space-y-6 sticky top-24">
              <h2 className="text-lg font-bold tracking-tight uppercase border-b border-gray-200 pb-4">Order Summary</h2>
              
              <div className="max-h-60 overflow-y-auto pr-2 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">{item.name} x {item.quantity}</span>
                    <span className="font-bold text-black font-mono">
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0,
                      }).format(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-gray-200 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 uppercase tracking-widest text-xs">Subtotal</span>
                  <span className="font-medium">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 uppercase tracking-widest text-xs">Shipping</span>
                  <span className="text-gray-400 uppercase text-[10px] font-bold">Free</span>
                </div>
                <div className="flex justify-between items-baseline pt-4">
                  <span className="text-sm font-bold uppercase tracking-[0.2em]">Total</span>
                  <span className="text-2xl font-black text-black font-mono">
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      minimumFractionDigits: 0,
                    }).format(getTotalPrice())}
                  </span>
                </div>
              </div>

              <Button 
                form="checkout-form"
                type="submit"
                className="w-full text-sm py-4"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Securely...
                  </span>
                ) : (
                  <>
                    <ShieldCheck size={18} className="mr-2" />
                    Complete Purchase
                  </>
                )}
              </Button>
              <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest">Secure encrypted checkout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
