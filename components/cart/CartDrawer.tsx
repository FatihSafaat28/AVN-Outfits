'use client';

import React from 'react';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import Button from '@/components/ui/Button';
import Link from 'next/link';

const CartDrawer = () => {
  const { items, isCartOpen, toggleCart, updateQuantity, removeItem, getTotalPrice } = useCartStore();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-1002 transition-opacity duration-300 ease-in-out">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={toggleCart}
      />
      
      {/* Drawer */}
      <div className="absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-500 ease-in-out transform translate-x-0">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <ShoppingBag size={20} className="text-black" />
            <h2 className="text-lg font-bold tracking-tight">SHOPPING BAG ({items.length})</h2>
          </div>
          <button onClick={toggleCart} className="p-2 -mr-2 text-gray-400 hover:text-black transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                <ShoppingBag size={24} className="text-gray-300" />
              </div>
              <p className="text-gray-500 font-medium">Your bag is empty.</p>
              <Button variant="outline" size="sm" onClick={toggleCart}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex space-x-4 animate-fadeIn">
                <div className="relative h-24 w-20 shrink-0 bg-gray-50 border border-gray-100 overflow-hidden">
                  <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-semibold text-black leading-tight">{item.name}</h3>
                      <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-black transition-colors">
                        <X size={14} />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">{item.category}</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="flex items-center border border-gray-100 rounded-sm">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 px-2 text-gray-400 hover:text-black transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-2 text-xs font-bold text-black border-x border-gray-50 min-w-8 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 px-2 text-gray-400 hover:text-black transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <p className="text-sm font-bold text-black font-mono">
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0,
                      }).format(item.price)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50/50 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500 uppercase tracking-widest">Subtotal</span>
              <span className="text-lg font-bold text-black">
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  minimumFractionDigits: 0,
                }).format(getTotalPrice())}
              </span>
            </div>
            <p className="text-xs text-gray-400">Shipping and taxes calculated at checkout.</p>
            <Link href="/checkout" onClick={toggleCart}>
              <Button className="w-full justify-between group">
                Proceed to Checkout
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
