'use client';

import React from 'react';
import {
  Home,
  Layers,
  Briefcase,
  GitBranch,
  Code,
  Camera,
  Mail,
  Search,
  Bot,
} from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface MobileDockProps {
  onOpenPalette: () => void;
  onOpenChat: () => void;
  isChatOpen: boolean;
}

export function MobileDock({ onOpenPalette, onOpenChat, isChatOpen }: MobileDockProps) {
  const { theme } = useTheme();

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
      <nav className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-2 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-white/[0.12] shadow-2xl shadow-cyan-500/10 transition-transform duration-300">
        {/* Home */}
        <button
          type="button"
          onClick={() => scrollTo('#')}
          aria-label="Jump to Top"
          className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <Home className="w-4 h-4" />
        </button>

        {/* Projects */}
        <button
          type="button"
          onClick={() => scrollTo('#projects')}
          aria-label="Jump to Projects"
          className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <Layers className="w-4 h-4" />
        </button>

        {/* Experience */}
        <button
          type="button"
          onClick={() => scrollTo('#experience')}
          aria-label="Jump to Experience"
          className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <Briefcase className="w-4 h-4" />
        </button>

        {/* Open Source */}
        <button
          type="button"
          onClick={() => scrollTo('#open-source')}
          aria-label="Jump to Open Source"
          className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <GitBranch className="w-4 h-4" />
        </button>

        {/* Skills */}
        <button
          type="button"
          onClick={() => scrollTo('#skills')}
          aria-label="Jump to Skills"
          className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <Code className="w-4 h-4" />
        </button>

        {/* Moments */}
        <button
          type="button"
          onClick={() => scrollTo('#moments')}
          aria-label="Jump to Moments"
          className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <Camera className="w-4 h-4" />
        </button>

        {/* Contact */}
        <button
          type="button"
          onClick={() => scrollTo('#contact')}
          aria-label="Jump to Contact"
          className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <Mail className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-4 bg-slate-200 dark:bg-white/[0.1] mx-0.5" />

        {/* Search / Command Palette */}
        <button
          type="button"
          onClick={onOpenPalette}
          aria-label="Open Command Palette"
          className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* AI Chatbot */}
        <button
          type="button"
          onClick={onOpenChat}
          aria-label={isChatOpen ? 'Close AI Chat' : 'Open AI Chat'}
          className={`p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
            isChatOpen
              ? 'bg-cyan-500 text-slate-950 font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-white/[0.08]'
          }`}
        >
          <Bot className="w-4 h-4" />
        </button>
      </nav>
    </div>
  );
}
