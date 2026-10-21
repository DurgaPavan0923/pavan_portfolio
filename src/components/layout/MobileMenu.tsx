'use client';

import React, { useEffect } from 'react';
import { X, FileText, Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { PROFILE_DATA } from '@/data/profile';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Moments', href: '#moments' },
  { label: 'Toolkit', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'GitHub Activity', href: '#activity' },
  { label: 'Experience', href: '#experience' },
  { label: 'Research Focus', href: '#research' },
  { label: 'Credentials', href: '#credentials' },
  { label: 'Technical Blogs', href: '#blogs' },
  { label: 'Contact', href: '#contact' },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
      className="fixed inset-0 z-[100] xl:hidden"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 dark:bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white/95 dark:bg-slate-950/95 border-l border-slate-200 dark:border-white/[0.08] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto backdrop-blur-lg">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-white/[0.08]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 to-violet-500 flex items-center justify-center font-bold text-slate-950 font-display text-sm">
                PK
              </div>
              <span className="font-display font-bold text-base tracking-tight text-slate-900 dark:text-slate-100">
                Pavan Kumar<span className="text-cyan-500">.</span>
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center border border-slate-200 dark:border-white/[0.08]"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-1 py-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="px-4 py-3 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-xs text-slate-400 font-mono">↗</span>
              </a>
            ))}
          </nav>
        </div>

        {/* Footer & Resume Action */}
        <div className="pt-6 border-t border-slate-200 dark:border-white/[0.08] flex flex-col gap-4">
          <a
            href="/Rajana.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 font-semibold text-sm shadow-lg shadow-cyan-500/20"
          >
            <FileText className="w-4 h-4" />
            <span>Download Official Resume</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          {/* Social Icons */}
          <div className="flex items-center justify-center gap-4 text-slate-500 dark:text-slate-400">
            <a
              href={PROFILE_DATA.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 rounded-lg bg-slate-100 dark:bg-white/[0.04] hover:text-cyan-600 dark:hover:text-cyan-400"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PROFILE_DATA.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 rounded-lg bg-slate-100 dark:bg-white/[0.04] hover:text-cyan-600 dark:hover:text-cyan-400"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PROFILE_DATA.contact.email}`}
              aria-label="Send Email"
              className="p-2 rounded-lg bg-slate-100 dark:bg-white/[0.04] hover:text-cyan-600 dark:hover:text-cyan-400"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
