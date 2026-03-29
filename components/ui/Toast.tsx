'use client';

import React from 'react';
import { Toast as ToastType } from '@/store/useStore';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

interface ToastProps {
  toast: ToastType;
  onRemove: (id: string) => void;
}

const Toast = ({ toast, onRemove }: ToastProps) => {
  const icons = {
    success: <CheckCircle2 className="text-black" size={20} />,
    error: <AlertCircle className="text-red-500" size={20} />,
    info: <Info className="text-blue-500" size={20} />,
  };

  return (
    <div className="flex shrink-0 items-center gap-4 p-4 rounded-2xl shadow-2xl border border-gray-100 bg-white animate-slideInRight min-w-[300px] z-9999">
      <div className="shrink-0">
        {icons[toast.type]}
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold text-black uppercase tracking-tight">{toast.message}</p>
      </div>
      <button
        onClick={() => onRemove(toast.id)}
        className="text-gray-400 hover:text-black transition-colors"
      >
        <X size={16} />
      </button>
      
      <style jsx>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slideInRight {
          animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default Toast;
