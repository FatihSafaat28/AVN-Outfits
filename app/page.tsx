import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/data";
import ProductCard from "@/components/product/ProductCard";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center bg-[#F9F9F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between w-full">
          <div className="md:w-1/2 space-y-8 z-10 text-center md:text-left animate-fadeIn">
            <div className="space-y-4">
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400">Essential Collection 2026</span>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-black leading-none">
                SIMPLICITY <br />
                IS THE NEW <br />
                <span className="text-gray-300 italic">LUXURY.</span>
              </h1>
              <p className="text-lg text-gray-500 max-w-md mx-auto md:mx-0">
                Premium minimalist essentials for the modern man. Crafted with quality, designed for life.
              </p>
            </div>
            <Link href="/store" className="inline-block">
              <Button size="lg" className="group">
                Shop the Collection
                <ArrowRight size={20} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          <div className="hidden md:block md:w-1/2 relative h-[70vh] animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <div className="absolute inset-0 border border-black/5 translate-x-6 translate-y-6 -z-10" />
            <Image
              src="https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=1200&q=80"
              alt="Hero Image"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              priority
            />
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight text-black">BESTSELLERS</h2>
              <div className="h-1 w-12 bg-black" />
            </div>
            <Link href="/store" className="text-sm font-bold border-b border-black pb-1 hover:text-gray-500 transition-colors">
              VIEW ALL
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Ethos */}
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-sm font-bold tracking-[0.4em] uppercase text-gray-400">Our Ethos</h2>
          <p className="text-2xl md:text-3xl font-medium text-black leading-snug">
            "We believe that clothing should be a reflection of who you are. No noise, just quality, fit, and timeless design."
          </p>
          <div className="flex justify-center space-x-12 pt-8">
            <div className="text-center">
              <p className="text-xl font-bold text-black font-mono">100%</p>
              <p className="text-[10px] uppercase tracking-widest text-gray-500">Cotton</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-black font-mono">Ethical</p>
              <p className="text-[10px] uppercase tracking-widest text-gray-500">Sourcing</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-black font-mono">Global</p>
              <p className="text-[10px] uppercase tracking-widest text-gray-500">Shipping</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
