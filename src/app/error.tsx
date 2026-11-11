'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Root App Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full p-8 rounded-3xl glass-card border border-white/[0.08] text-center shadow-2xl">
        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h2 className="font-display font-extrabold text-xl mb-2 text-white">
          Application Recovery Mode
        </h2>
        <p className="text-xs text-slate-400 mb-6 leading-relaxed">
          An unexpected error occurred during page rendering. You can retry loading or return to the top of the portfolio.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 hover:scale-105 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reload Application</span>
          </button>
        </div>
      </div>
    </div>
  );
}
