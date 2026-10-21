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
  { label: 'Toolkit', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Activity', href: '#activity' },
  { label: 'Experience', href: '#experience' },
  { label: 'Research', href: '#research' },
  { label: 'Credentials', href: '#credentials' },
  { label: 'Gallery', href: '#gallery' },
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
            ? 'glass-panel shadow-lg shadow-black/10 dark:shadow-black/20 border-slate-200/80 dark:border-white/[0.08]'
            : 'bg-transparent border border-transparent'
        }`}
      >
        {/* Brand Logo */}
        <Link
          href="#hero"
          className="flex items-center gap-2 group focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1"
          aria-label="Rajana Durga Pavan Kumar Home"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 to-violet-500 flex items-center justify-center font-bold text-slate-950 font-display text-sm tracking-wider shadow-[0_0_15px_rgba(0,207,255,0.3)] transition-transform group-hover:scale-105">
            PK
          </div>
          <span className="font-display font-bold text-base tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
            RDPK<span className="text-cyan-500">.</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden xl:flex items-center gap-1.5 lg:gap-2">
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-colors ${
                  isActive
                    ? 'text-cyan-600 dark:text-cyan-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-white/[0.04]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full" />
                )}
              </a>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Cmd/Ctrl+K Search Trigger */}
          <button
            type="button"
            onClick={onOpenPalette}
            className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg bg-white dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 text-xs transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 shadow-sm"
            aria-label="Open Command Palette (Cmd + K)"
          >
            <Search className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-slate-400">
              ⌘K
            </kbd>
          </button>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="w-8 h-8 rounded-lg bg-white dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 flex items-center justify-center transition-all hover:scale-105 focus-visible:ring-2 focus-visible:ring-cyan-400 shadow-sm"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 text-cyan-600 hover:-rotate-12 transition-transform" />
            )}
          </button>

          {/* Resume CTA */}
          <a
            href="/Rajana.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-slate-950 font-semibold text-xs transition-transform hover:-translate-y-0.5 shadow-sm shadow-cyan-500/20"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="xl:hidden w-8 h-8 rounded-lg bg-white dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 shadow-sm"
            aria-label="Open mobile navigation menu"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </nav>
    </header>
  );
}
