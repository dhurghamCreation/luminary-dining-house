import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CheckCircle2, Sparkles, X, Info } from 'lucide-react';

interface Toast {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'info';
}

interface ToastContextType {
  showToast: (title: string, message: string, type?: 'success' | 'info') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (title: string, message: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, title, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3.5 rounded-xl border border-[#c7a85c]/40 bg-[#161310]/95 p-4 shadow-2xl backdrop-blur-md animate-fade-up"
          >
            <div className="p-1 rounded-full bg-[#c7a85c]/20 text-[#c7a85c] shrink-0 mt-0.5">
              {toast.type === 'success' ? <CheckCircle2 size={16} /> : <Info size={16} />}
            </div>
            <div className="flex-1 min-w-0">
              <h5 className="font-serif text-sm text-white font-medium">{toast.title}</h5>
              <p className="text-xs text-white/65 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/40 hover:text-white transition shrink-0"
              aria-label="Dismiss notification"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
