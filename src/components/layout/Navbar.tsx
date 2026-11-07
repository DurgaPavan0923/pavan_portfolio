'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';
import { Sun, Moon, Search, Menu, FileText } from 'lucide-react';

interface NavbarProps {
  onOpenPalette: () => void;
  onOpenMobileMenu: () => void;
}

const NAV_LINKS = [
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Open Source', href: '#open-source' },
  { label: 'Skills', href: '#skills' },
  { label: 'Credentials', href: '#credentials' },
  { label: 'Leadership', href: '#leadership' },
  { label: 'Moments', href: '#moments' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({ onOpenPalette, onOpenMobileMenu }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('projects');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -50% 0px' }
    );

    const sectionElements = document.querySelectorAll('section[id]');
    sectionElements.forEach((el) => observer.observe(el));
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      sectionElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-3 sm:px-6 py-3">
      <nav
        aria-label="Main Navigation"
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 ${
          isScrolled
            ? 'glass-card shadow-lg shadow-black/5 dark:shadow-black/20 border-slate-200/80 dark:border-white/[0.12] backdrop-blur-xl'
            : 'bg-white/40 dark:bg-slate-950/40 border-transparent backdrop-blur-md'
        }`}
      >
        {/* Brand Identity */}
        <Link
          href="#hero"
          className="group flex items-center gap-2.5 font-display font-extrabold text-base sm:text-lg tracking-tight text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-lg"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-emerald-400 flex items-center justify-center text-slate-950 font-mono font-bold text-sm shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            P
          </div>
          <span className="hidden sm:inline font-bold">
            Pavan<span className="text-cyan-600 dark:text-cyan-400">.ai</span>
          </span>
        </Link>

        {/* Desktop Navigation Links (Recruiter-First Order) */}
        <div className="hidden xl:flex items-center gap-1 bg-slate-100/80 dark:bg-white/[0.03] p-1.5 rounded-full border border-slate-200/60 dark:border-white/[0.06]">
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-white/[0.06]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Right Action Icons & Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* ⌘K Command Palette Trigger */}
          <button
            type="button"
            onClick={onOpenPalette}
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.08] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/[0.08] text-xs font-mono transition-all hover:border-cyan-400/50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400"
            aria-label="Open Command Palette (Ctrl+K or Cmd+K)"
          >
            <Search className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span className="opacity-80">Search</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[10px] text-slate-700 dark:text-slate-300 font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Theme Switcher Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 border border-slate-200 dark:border-white/[0.08] transition-all hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Resume Quick Action */}
          <a
            href="/Rajana.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Rajana_Durga_Pavan_Kumar_Resume.pdf"
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>

          {/* Mobile Hamburger Drawer Trigger */}
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="xl:hidden p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/[0.08] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400"
            aria-label="Open mobile navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>
    </header>
  );
}
