'use client';

import React, { useState } from 'react';
import { useStore } from '@/store/useStore';
import ProductCard from '@/components/product/ProductCard';

const StorePage = () => {
  const { products, categories: storeCategories } = useStore();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...storeCategories];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header */}
      <div className="bg-gray-50 py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fadeIn">
          <h1 className="text-4xl font-bold tracking-tight text-black mb-4 uppercase">The Store</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Browse our complete collection of minimalist essentials. Quality-focused designs for every occasion.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 text-sm font-bold tracking-widest uppercase transition-all duration-300 border-b-2 ${
                activeCategory === category 
                  ? 'border-black text-black' 
                  : 'border-transparent text-gray-400 hover:text-black hover:border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-gray-500 font-medium">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StorePage;
