'use client';

import React from 'react';
import Image from 'next/image';
import { Product } from '@/lib/data';
import { useCartStore } from '@/lib/store';
import { Plus } from 'lucide-react';
import Button from '@/components/ui/Button';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem, toggleCart } = useCartStore();

  const handleAddToCart = () => {
    addItem(product);
    toggleCart(); // Automatically open cart drawer to show progress
  };

  return (
    <div className="group relative bg-white border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-gray-100/50">
      <div className="relative aspect-4/5 overflow-hidden bg-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
          <Button 
            className="w-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
            onClick={handleAddToCart}
          >
            <Plus size={18} className="mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
      <div className="p-4 space-y-1">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">{product.category}</p>
        <h3 className="text-sm font-semibold text-gray-900 group-hover:text-black transition-colors truncate">{product.name}</h3>
        <p className="text-sm font-bold text-black">
          {new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
          }).format(product.price)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
