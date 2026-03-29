import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { products as initialProducts, Product } from '@/lib/data';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface StoreState {
  products: Product[];
  categories: string[];
  toasts: Toast[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addCategory: (category: string) => void;
  updateCategory: (oldName: string, newName: string) => void;
  deleteCategory: (category: string) => void;
  reorderCategories: (newOrder: string[]) => void;
  addToast: (message: string, type: Toast['type']) => void;
  removeToast: (id: string) => void;
  resetStore: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      products: initialProducts,
      categories: ['Kaos', 'Kemeja', 'Celana Panjang', 'Celana Pendek'],
      toasts: [],
      
      addProduct: (product) => set((state) => ({
        products: [
          { ...product, id: Math.random().toString(36).substr(2, 9) },
          ...state.products
        ]
      })),

      updateProduct: (id, updatedProduct) => set((state) => ({
        products: state.products.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p))
      })),

      deleteProduct: (id) => set((state) => ({
        products: state.products.filter((p) => p.id !== id)
      })),

      addCategory: (category) => set((state) => {
        if (state.categories.includes(category)) return state;
        return { categories: [...state.categories, category] };
      }),

      updateCategory: (oldName, newName) => set((state) => {
        if (state.categories.includes(newName)) return state;
        return {
          categories: state.categories.map(c => c === oldName ? newName : c),
          products: state.products.map(p => p.category === oldName ? { ...p, category: newName } : p)
        };
      }),

      deleteCategory: (category) => set((state) => ({
        categories: state.categories.filter((c) => c !== category),
        // Normally we'd handle orphaned products, but for a demo we'll leave them or uncategorize them.
      })),

      reorderCategories: (newOrder) => set({ categories: newOrder }),

      addToast: (message, type) => {
        const id = Math.random().toString(36).substr(2, 9);
        set((state) => ({
          toasts: [...state.toasts, { id, message, type }]
        }));
        setTimeout(() => get().removeToast(id), 3000);
      },

      removeToast: (id) => set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id)
      })),

      resetStore: () => set({
        products: initialProducts,
        categories: ['Kaos', 'Kemeja', 'Celana Panjang', 'Celana Pendek'],
        toasts: []
      }),
    }),
    {
      name: 'avn-demo-storage',
      storage: createJSONStorage(() => localStorage),
      // Only persist products and categories, exclude toasts
      partialize: (state) => ({ 
        products: state.products, 
        categories: state.categories 
      }),
    }
  )
);
