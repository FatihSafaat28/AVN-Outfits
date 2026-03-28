'use client';

import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-center md:text-left transition-all duration-300">
          <div>
            <span className="text-xl font-bold tracking-tighter text-black">AVN OUTFITS</span>
            <p className="mt-2 text-sm text-gray-500">Premium Men's Clothing for the Modern Individual.</p>
          </div>
          <div className="flex space-x-6 text-sm font-medium text-gray-600">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <Link href="/store" className="hover:text-black transition-colors">Store</Link>
            <Link href="/about" className="hover:text-black transition-colors">About Us</Link>
            <Link href="/contact" className="hover:text-black transition-colors">Contact</Link>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} AVN Outfits. All rights reserved.</p>
          <div className="flex space-x-4 text-xs text-gray-400">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
