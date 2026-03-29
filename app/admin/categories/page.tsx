'use client';

import React, { useState } from 'react';
import { useStore } from '@/store/useStore';
import { 
  Plus, Trash2, Tag, AlertCircle, 
  GripVertical, Edit2, Check, X 
} from 'lucide-react';
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ConfirmationModal from '@/components/ui/ConfirmationModal';

// --- Sortable Item Component ---
interface SortableItemProps {
  id: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isEditing: boolean;
  editValue: string;
  setEditValue: (val: string) => void;
  onSaveEdit: (id: string) => void;
  onCancelEdit: () => void;
}

const SortableCategoryItem = ({ 
  id, onEdit, onDelete, isEditing, 
  editValue, setEditValue, onSaveEdit, onCancelEdit 
}: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      className={`p-4 flex items-center justify-between bg-white border-b border-gray-50 hover:bg-gray-50/50 transition-colors group ${isDragging ? 'shadow-lg rounded-xl border-none' : ''}`}
    >
      <div className="flex items-center gap-4 flex-1">
        <button 
          {...attributes} {...listeners}
          className="p-1 text-gray-300 hover:text-black cursor-grab active:cursor-grabbing"
        >
          <GripVertical size={18} />
        </button>

        {isEditing ? (
          <div className="flex-1 flex items-center gap-2 animate-fadeIn">
            <input
              autoFocus
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="flex-1 px-3 py-1.5 rounded-lg border border-black focus:outline-none text-sm font-medium"
              onKeyDown={(e) => {
                if (e.key === 'Enter') onSaveEdit(id);
                if (e.key === 'Escape') onCancelEdit();
              }}
            />
            <button 
              onClick={() => onSaveEdit(id)}
              className="p-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all"
            >
              <Check size={14} />
            </button>
            <button 
              onClick={onCancelEdit}
              className="p-2 bg-gray-100 text-gray-500 rounded-lg hover:bg-gray-200 transition-all"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <span className="font-medium text-gray-700">{id}</span>
        )}
      </div>

      {!isEditing && (
        <div className="flex items-center gap-2 opacity-70 group-hover:opacity-100 transition-all">
          <button
            onClick={() => onEdit(id)}
            className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all"
            title="Edit category"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(id)}
            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
            title="Delete category"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

// --- Main Page Component ---
const CategoriesPage = () => {
  const { 
    categories, addCategory, updateCategory, 
    deleteCategory, reorderCategories, addToast,
    products
  } = useStore();
  
  const [newCategory, setNewCategory] = useState('');
  const [error, setError] = useState('');
  
  // Edit State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  // Delete Confirmation State
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // DnD Sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const val = newCategory.trim();
    if (!val) return;
    
    if (categories.includes(val)) {
      addToast('Category already exists!', 'error');
      return;
    }

    addCategory(val);
    setNewCategory('');
    addToast('Category successfully created!', 'success');
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = categories.indexOf(active.id as string);
      const newIndex = categories.indexOf(over?.id as string);
      reorderCategories(arrayMove(categories, oldIndex, newIndex));
      addToast('Order updated!', 'info');
    }
  };

  const startEditing = (id: string) => {
    setEditingId(id);
    setEditValue(id);
  };

  const saveEdit = (oldId: string) => {
    const val = editValue.trim();
    if (!val || val === oldId) {
      setEditingId(null);
      return;
    }

    if (categories.includes(val)) {
      addToast('This category name already exists!', 'error');
      return;
    }

    updateCategory(oldId, val);
    setEditingId(null);
    addToast(`Renamed to "${val}"`, 'success');
  };

  const confirmDelete = (id: string) => {
    setDeleteConfirm(id);
  };

  const performDelete = () => {
    if (deleteConfirm) {
      deleteCategory(deleteConfirm);
      addToast('Category successfully deleted!', 'success');
      setDeleteConfirm(null);
    }
  };

  const getProductsCount = (cat: string) => {
    return products.filter(p => p.category === cat).length;
  };

  return (
    <div className="p-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-black uppercase tracking-tight">Manage Categories</h1>
        <p className="text-gray-500 mt-2">Organize your product categories and set their display order.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Category Form */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm h-fit">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2 uppercase tracking-tight">
            <Plus size={20} className="text-black" />
            Add New Category
          </h3>
          <form onSubmit={handleAddCategory} className="space-y-4">
            <div>
              <label htmlFor="category" className="block text-xs font-bold text-gray-400 uppercase mb-3 tracking-widest">
                Category Name
              </label>
              <input
                type="text"
                id="category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="e.g. Aksesoris"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black transition-all"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-black text-white rounded-xl font-bold tracking-widest uppercase text-xs hover:bg-gray-800 transition-all shadow-xl active:scale-[0.98]"
            >
              Save Category
            </button>
          </form>
        </div>

        {/* Categories List */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
            <h3 className="text-lg font-bold flex items-center gap-2 uppercase tracking-tight">
              <Tag size={20} className="text-black" />
              Existing Categories
            </h3>
            <span className="text-[10px] font-bold text-gray-400 bg-white border border-gray-100 px-3 py-1.5 rounded-full uppercase tracking-widest">
              {categories.length} Total
            </span>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext 
              items={categories}
              strategy={verticalListSortingStrategy}
            >
              <div className="divide-y divide-gray-50">
                {categories.map((category) => (
                  <SortableCategoryItem 
                    key={category} 
                    id={category} 
                    onEdit={startEditing}
                    onDelete={confirmDelete}
                    isEditing={editingId === category}
                    editValue={editValue}
                    setEditValue={setEditValue}
                    onSaveEdit={saveEdit}
                    onCancelEdit={() => setEditingId(null)}
                  />
                ))}
                {categories.length === 0 && (
                  <div className="p-20 text-center">
                    <p className="text-gray-400 italic font-medium">No categories found. Add one to get started.</p>
                  </div>
                )}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={performDelete}
        title="Delete Category?"
        message={`Are you sure you want to delete "${deleteConfirm}"? This will remove it from the store filters. Products in this category will remain but without a valid category link.`}
      />
    </div>
  );
};

export default CategoriesPage;
