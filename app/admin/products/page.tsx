'use client';

import React, { useState, useRef, useMemo } from 'react';
import { useStore } from '@/store/useStore';
import { Plus, Trash2, ShoppingBag, ImageIcon, X, DollarSign, Tag, Search, Filter, Edit2 } from 'lucide-react';
import Image from 'next/image';
import ConfirmationModal from '@/components/ui/ConfirmationModal';

const ProductsPage = () => {
  const { products, categories, addProduct, updateProduct, deleteProduct, addToast } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: categories[0] || '',
    price: '',
    image: null as string | null,
  });
  
  const [imageMeta, setImageMeta] = useState<{
    name: string;
    originalSize: string;
    compressedSize: string;
  } | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const compressImage = (file: File): Promise<{ base64: string; size: number }> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new (window as any).Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          let width = img.width;
          let height = img.height;

          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          // Compress to JPEG 0.7
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          
          // Calculate compressed size from base64
          const stringLength = dataUrl.length - 'data:image/jpeg;base64,'.length;
          const sizeInBytes = Math.ceil(stringLength * 0.75);
          
          resolve({ base64: dataUrl, size: sizeInBytes });
        };
      };
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const originalSize = formatSize(file.size);
      const fileName = file.name;
      
      const { base64, size } = await compressImage(file);
      const compressedSize = formatSize(size);
      
      setImageMeta({
        name: fileName,
        originalSize,
        compressedSize
      });
      
      setFormData({ ...formData, image: base64 });
    }
  };

  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormData({ name: '', category: categories[0] || '', price: '', image: null });
    setImageMeta(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: any) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toLocaleString('id-ID'),
      image: product.image,
    });
    setImageMeta(null); // Reset metadata for existing products unless we re-upload
    setIsModalOpen(true);
  };

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.image) return;

    if (editingId) {
      updateProduct(editingId, {
        name: formData.name,
        category: formData.category,
        price: Number(formData.price.replace(/\D/g, '')),
        image: formData.image,
      });
      addToast('Product successfully updated!', 'success');
    } else {
      addProduct({
        name: formData.name,
        category: formData.category,
        price: Number(formData.price.replace(/\D/g, '')),
        image: formData.image,
      });
      addToast('Product successfully created!', 'success');
    }

    setIsModalOpen(false);
  };

  const performDelete = () => {
    if (deleteConfirmId) {
      deleteProduct(deleteConfirmId);
      addToast('Product successfully deleted!', 'success');
      setDeleteConfirmId(null);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           p.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  return (
    <div className="p-8">
      {/* Header */}
      <header className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-black uppercase tracking-tight">Product Catalog</h1>
          <p className="text-gray-500 mt-2">Manage your clothing items and their availability.</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center justify-center gap-2 px-6 py-4 bg-black text-white rounded-xl font-bold tracking-widest uppercase text-xs hover:bg-gray-800 transition-all shadow-xl active:scale-[0.98] w-full md:w-fit"
        >
          <Plus size={18} />
          New Product
        </button>
      </header>

      {/* Filters & Search */}
      <div className="mb-10 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-100 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition-all text-sm font-medium"
            />
          </div>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-4 py-2.5 rounded-full border border-gray-100 whitespace-nowrap">
            Showing {filteredProducts.length} of {products.length} Products
          </div>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          {['All', ...categories].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border ${
                selectedCategory === category
                  ? 'bg-black text-white border-black shadow-lg shadow-black/10 scale-105'
                  : 'bg-white text-gray-400 border-gray-100 hover:border-black hover:text-black shadow-sm'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Product List */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Product</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Price</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-16 rounded-lg overflow-hidden bg-gray-100 border border-gray-50 shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <span className="font-bold text-gray-900 line-clamp-1">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-widest">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-8 py-4">
                    <span className="font-bold text-gray-900 tracking-tight">Rp {product.price.toLocaleString()}</span>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-70 group-hover:opacity-100 transition-all">
                      <button
                        onClick={() => handleOpenEditModal(product)}
                        className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all"
                        title="Edit product"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(product.id)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete product"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredProducts.length === 0 && (
            <div className="p-24 text-center">
              <div className="bg-gray-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-gray-300">
                <ShoppingBag size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 uppercase tracking-tight">No products found</h3>
              <p className="text-gray-400 mt-2 font-medium">Try adjusting your filters or add a new collection.</p>
            </div>
          )}
        </div>

        {/* Pagination UI */}
        {totalPages > 1 && (
          <div className="px-8 py-5 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-200 bg-white text-black disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-all font-bold text-[10px] uppercase tracking-widest px-4"
              >
                Prev
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg text-[10px] font-bold transition-all ${
                      currentPage === page 
                        ? 'bg-black text-white shadow-lg shadow-black/10' 
                        : 'bg-white text-gray-400 border border-gray-100 hover:border-black hover:text-black'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-200 bg-white text-black disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-all font-bold text-[10px] uppercase tracking-widest px-4"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-slideUp">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-black uppercase tracking-tight">
                {editingId ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-all">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Side: Image Upload */}
                <div className="space-y-4">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Product Image</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative aspect-3/4 rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden flex flex-col items-center justify-center gap-4 ${
                      formData.image ? 'border-transparent bg-gray-50' : 'border-gray-200 hover:border-black hover:bg-gray-50'
                    }`}
                  >
                    {formData.image ? (
                      <>
                        <Image src={formData.image} alt="Preview" fill sizes="(max-width: 768px) 100vw, 300px" className="object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold uppercase tracking-widest">
                          Change Image
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="p-5 bg-gray-100 rounded-2xl text-gray-400 shadow-sm">
                          <ImageIcon size={32} />
                        </div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Click to upload</p>
                      </>
                    )}
                  </div>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleImageChange} 
                      className="hidden" 
                      accept="image/*"
                    />
                    {imageMeta && (
                      <div className="pt-2 px-1 text-left space-y-1 animate-fadeIn">
                        <p className="text-[10px] font-bold text-black uppercase truncate max-w-[200px]" title={imageMeta.name}>
                          {imageMeta.name}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] text-gray-400 font-medium">Original: {imageMeta.originalSize}</span>
                          <span className="text-[10px] text-green-600 font-bold">→ Optimized: {imageMeta.compressedSize}</span>
                        </div>
                      </div>
                    )}
                    {!imageMeta && formData.image && !formData.image.startsWith('data:') && (
                      <div className="pt-2 px-1 text-left">
                        <p className="text-[9px] text-gray-400 font-medium italic">Remote Unsplash Image</p>
                      </div>
                    )}
                  </div>

                {/* Right Side: Form Fields */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-3 tracking-widest gap-2">
                       <ShoppingBag size={14} className="inline mr-2" /> Product Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Basic White Shirt"
                      className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black transition-all font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-3 tracking-widest gap-2">
                      <Tag size={14} className="inline mr-2" /> Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black transition-all appearance-none bg-white font-medium"
                      required
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-3 tracking-widest gap-2">
                      <DollarSign size={14} className="inline mr-2" /> Price (IDR)
                    </label>
                    <input
                      type="text"
                      value={formData.price}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/\D/g, ''); // Remove non-digits
                        const formatted = rawValue ? Number(rawValue).toLocaleString('id-ID') : '';
                        setFormData({ ...formData, price: formatted });
                      }}
                      placeholder="150.000"
                      className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black transition-all font-medium"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-4 border border-gray-200 text-gray-400 rounded-2xl font-bold tracking-widest uppercase text-xs hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-2 py-4 bg-black text-white rounded-2xl font-bold tracking-widest uppercase text-xs hover:bg-gray-800 transition-all shadow-xl shadow-black/10 active:scale-[0.98]"
                >
                  {editingId ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={performDelete}
        title="Delete Product?"
        message="Are you sure you want to delete this product? This action cannot be undone and it will be immediately removed from the store."
      />

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-slideUp {
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default ProductsPage;
