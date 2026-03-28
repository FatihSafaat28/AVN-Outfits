import React from 'react';
import Image from 'next/image';

const AboutPage = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1600&q=80"
          alt="Brand Office"
          fill
          className="object-cover grayscale"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white animate-fadeIn">OUR STORY</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          <div className="space-y-6 text-center">
            <h2 className="text-sm font-bold tracking-[0.4em] uppercase text-gray-400">Founded in 2026</h2>
            <p className="text-3xl md:text-4xl font-light text-black leading-tight italic">
              "AVN Outfits was born out of a desire for simplicity in a world of noise."
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold tracking-tight text-black uppercase">The Philosophy</h3>
              <p className="text-gray-600 leading-relaxed">
                We believe that clothing is more than just a cover. It's an expression of one's values. At AVN Outfits, we focus on the "Essential"—the core pieces that every man needs in his wardrobe, executed with uncompromising quality.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our designs are minimalist by nature, focusing on clean lines, premium fabrics, and a fit that feels like it was made just for you.
              </p>
            </div>
            <div className="relative aspect-square bg-gray-50 border border-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80"
                alt="Fabric Detail"
                fill
                className="object-cover p-4"
              />
            </div>
          </div>

          <div className="pt-16 border-t border-gray-100 flex flex-col items-center space-y-8">
            <h3 className="text-2xl font-bold tracking-tight text-black uppercase">Uncompromising Quality</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              <div className="text-center space-y-2">
                <h4 className="font-bold text-black uppercase text-sm">Fine Materials</h4>
                <p className="text-xs text-gray-500">We source only the highest grade cotton and linen.</p>
              </div>
              <div className="text-center space-y-2">
                <h4 className="font-bold text-black uppercase text-sm">Timeless Design</h4>
                <p className="text-xs text-gray-500">Our pieces are designed to last beyond seasons.</p>
              </div>
              <div className="text-center space-y-2">
                <h4 className="font-bold text-black uppercase text-sm">Ethical Production</h4>
                <p className="text-xs text-gray-500">Fair wages and sustainable practices are our baseline.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
