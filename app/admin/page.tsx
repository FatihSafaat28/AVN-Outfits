'use client';

import React from 'react';
import { useStore } from '@/store/useStore';
import { ShoppingBag, Tags, TrendingUp, Users } from 'lucide-react';

const DashboardPage = () => {
  const { products, categories } = useStore();

  const stats = [
    { name: 'Total Products', value: products.length, icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Categories', value: categories.length, icon: Tags, color: 'text-purple-600', bg: 'bg-purple-50' },
    { name: 'Total Users', value: '1', icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
    { name: 'Store Status', value: 'Live', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="p-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-black uppercase tracking-tight">Dashboard Overview</h1>
        <p className="text-gray-500 mt-2">Welcome back to AVN Outfits admin panel. Manage your store catalog here.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">{stat.name}</p>
                  <p className="text-3xl font-bold text-black mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.bg} p-3 rounded-xl`}>
                  <Icon className={stat.color} size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12">
        <div className="bg-black p-8 rounded-3xl text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-lg">
            <h3 className="text-2xl font-bold mb-4">Demo Mode Active</h3>
            <p className="text-gray-400 leading-relaxed">
              This admin panel is in **Persistent Demo Mode**. Your changes will survive page refreshes (F5) and are shared across multiple tabs. Data will only reset to the original state when you **completely close and restart your browser**.
            </p>
          </div>
          {/* Subtle decoration */}
          <div className="absolute right--10 bottom--10 w-64 h-64 bg-white/5 rounded-full blur-3xl opacity-50"></div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
