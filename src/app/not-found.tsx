import React from 'react';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 p-6 text-center">
      <div className="max-w-md p-8 rounded-3xl glass-panel border border-white/[0.08] shadow-2xl animate-fade-up">
        <div className="text-6xl font-display font-extrabold text-cyan-400 mb-2">404</div>
        <h1 className="font-display font-bold text-xl text-slate-100 mb-3">
          Neural Pathway Not Found
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
          The requested coordinate or document node does not exist in Pavan’s portfolio architecture.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 font-bold text-xs transition-transform hover:-translate-y-0.5 shadow-md shadow-cyan-500/20"
        >
          <Home className="w-4 h-4" />
          <span>Return to Portfolio</span>
        </Link>
      </div>
    </div>
  );
}
