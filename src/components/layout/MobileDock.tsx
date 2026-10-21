'use client';

import React from 'react';
import {
  Home,
  Camera,
  Layers,
  Mail,
  Search,
  Bot,
  Sun,
  Moon,
} from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface MobileDockProps {
  onOpenPalette: () => void;
  onOpenChat: () => void;
  isChatOpen: boolean;
}

export function MobileDock({ onOpenPalette, onOpenChat, isChatOpen }: MobileDockProps) {
  const { theme, toggleTheme } = useTheme();

  const scrollTo = (id: string) => {
    if (id === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.querySelector(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      role="toolbar"
      aria-label="Quick Actions Dock"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 lg:hidden px-2 pb-safe"
    >
      <nav className="flex items-center gap-1 sm:gap-2 px-3 py-2 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-white/[0.12] shadow-2xl shadow-cyan-500/10 transition-transform duration-300">
        {/* Home */}
        <button
          type="button"
          onClick={() => scrollTo('#')}
          aria-label="Jump to Top"
          className="p-2 sm:p-2.5 rounded-full text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors"
        >
          <Home className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        </button>

        {/* Moments */}
        <button
          type="button"
          onClick={() => scrollTo('#moments')}
          aria-label="Jump to Moments"
          className="p-2 sm:p-2.5 rounded-full text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors"
        >
          <Camera className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        </button>

        {/* Projects */}
        <button
          type="button"
          onClick={() => scrollTo('#projects')}
          aria-label="Jump to Projects"
          className="p-2 sm:p-2.5 rounded-full text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors"
        >
          <Layers className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        </button>

        {/* Contact */}
        <button
          type="button"
          onClick={() => scrollTo('#contact')}
          aria-label="Jump to Contact"
          className="p-2 sm:p-2.5 rounded-full text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors"
        >
          <Mail className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        </button>

        <div className="w-[1px] h-5 bg-slate-200 dark:bg-white/[0.1] mx-0.5" />

        {/* Search / Command Palette */}
        <button
          type="button"
          onClick={onOpenPalette}
          aria-label="Open Command Palette"
          className="p-2 sm:p-2.5 rounded-full text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors"
        >
          <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        </button>

        {/* AI Chatbot */}
        <button
          type="button"
          onClick={onOpenChat}
          aria-label={isChatOpen ? 'Close AI Chat' : 'Open AI Chat'}
          className={`p-2 sm:p-2.5 rounded-full transition-colors ${
            isChatOpen
              ? 'bg-cyan-500 text-slate-950 font-bold'
              : 'text-violet-600 dark:text-violet-400 hover:bg-violet-500/10'
          }`}
        >
          <Bot className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        </button>

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          className="p-2 sm:p-2.5 rounded-full text-slate-600 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          ) : (
            <Moon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          )}
        </button>
      </nav>
    </div>
  );
}
