'use client';

import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }: ConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10000 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-scaleIn">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-red-500">
            <AlertTriangle size={20} />
            <h3 className="text-lg font-bold uppercase tracking-tight">{title}</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-full transition-all">
            <X size={18} />
          </button>
        </div>
        
        <div className="p-8">
          <p className="text-gray-500 leading-relaxed font-medium">{message}</p>
        </div>

        <div className="p-6 bg-gray-50 flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-gray-200 text-gray-400 rounded-xl font-bold tracking-widest uppercase text-xs hover:bg-white transition-all shadow-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold tracking-widest uppercase text-xs hover:bg-red-600 transition-all shadow-lg shadow-red-500/10 active:scale-[0.98]"
          >
            Delete
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default ConfirmationModal;
