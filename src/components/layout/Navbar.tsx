'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';
import { Sun, Moon, Search, Menu, FileText, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenPalette: () => void;
  onOpenMobileMenu: () => void;
}

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Moments', href: '#moments' },
  { label: 'Toolkit', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Activity', href: '#activity' },
  { label: 'Experience', href: '#experience' },
  { label: 'Research', href: '#research' },
  { label: 'Credentials', href: '#credentials' },
  { label: 'Blogs', href: '#blogs' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({ onOpenPalette, onOpenMobileMenu }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

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

        {/* Desktop Navigation Links */}
        <div className="hidden xl:flex items-center gap-1 bg-slate-100/80 dark:bg-white/[0.03] p-1.5 rounded-full border border-slate-200/60 dark:border-white/[0.06]">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
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
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Quick Search Palette Trigger (Cmd+K) */}
          <button
            type="button"
            onClick={onOpenPalette}
            aria-label="Search and quick actions (Press Ctrl+K or Cmd+K)"
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono bg-slate-100 dark:bg-white/[0.05] hover:bg-slate-200 dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer shadow-sm"
          >
            <Search className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span className="hidden sm:inline">⌘K</span>
          </button>

          {/* Theme Toggle (Dark / Light) */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="p-2 rounded-xl bg-slate-100 dark:bg-white/[0.05] hover:bg-slate-200 dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-cyan-600" />
            )}
          </button>

          {/* Resume Download Quick Pill (Desktop) */}
          <a
            href="/Rajana.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download ATS-Friendly Resume"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>

          {/* Mobile Hamburger Trigger */}
          <button
            type="button"
            onClick={onOpenMobileMenu}
            aria-label="Open mobile navigation menu"
            className="xl:hidden p-2 rounded-xl bg-slate-100 dark:bg-white/[0.05] hover:bg-slate-200 dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>
    </header>
  );
}
