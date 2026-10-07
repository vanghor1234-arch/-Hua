import React from 'react';
import { Info, CheckCircle, AlertTriangle } from 'lucide-react';

export interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'error' | 'info';
}

interface ToastProps {
  toasts: ToastMessage[];
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts }) => {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-[90%] max-w-md pointer-events-none">
      {toasts.map((t) => {
        let bg = 'bg-slate-800 border-slate-700';
        let icon = <Info className="w-5 h-5 text-blue-400" />;

        if (t.type === 'success') {
          bg = 'bg-emerald-950/95 border-emerald-500/40 text-emerald-200 shadow-emerald-950/50';
          icon = <CheckCircle className="w-5 h-5 text-emerald-400" />;
        } else if (t.type === 'error') {
          bg = 'bg-rose-950/95 border-rose-500/40 text-rose-200 shadow-rose-950/50';
          icon = <AlertTriangle className="w-5 h-5 text-rose-400" />;
        }

        return (
          <div
            key={t.id}
            className={`${bg} border px-4 py-3 rounded-2xl shadow-xl backdrop-blur-md flex items-center gap-3 font-khmer text-xs sm:text-sm animate-fade-in pointer-events-auto`}
          >
            {icon}
            <span className="flex-1">{t.message}</span>
          </div>
        );
      })}
    </div>
  );
};
