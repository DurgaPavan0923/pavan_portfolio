'use client';

import React, { useEffect, useRef } from 'react';
import { X, FileText, Github, Linkedin, Mail, Search, Bot } from 'lucide-react';
import { PROFILE_DATA } from '@/data/profile';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPalette?: () => void;
  onOpenChat?: () => void;
}

const NAV_LINKS = [
  { label: 'Featured Projects', href: '#projects' },
  { label: 'Internships & Research', href: '#experience' },
  { label: 'Open Source Telemetry', href: '#open-source' },
  { label: 'Technical Skills', href: '#skills' },
  { label: 'Education & Certifications', href: '#credentials' },
  { label: 'Leadership & Achievements', href: '#leadership' },
  { label: 'Moments & Highlights', href: '#moments' },
  { label: 'Contact', href: '#contact' },
];

export function MobileMenu({ isOpen, onClose, onOpenPalette, onOpenChat }: MobileMenuProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Focus initial element
    setTimeout(() => closeButtonRef.current?.focus(), 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Focus trap
      if (e.key === 'Tab' && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
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
        className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer with Safe Area Spacing */}
      <div
        ref={drawerRef}
        className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-white/[0.08] p-5 sm:p-6 shadow-2xl flex flex-col justify-between overflow-y-auto backdrop-blur-xl pb-safe"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/[0.08]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 to-emerald-400 flex items-center justify-center font-bold text-slate-950 font-display text-sm shadow-sm">
                PK
              </div>
              <span className="font-display font-bold text-base tracking-tight text-slate-900 dark:text-slate-100">
                Pavan Kumar<span className="text-cyan-600 dark:text-cyan-400">.</span>
              </span>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center border border-slate-200 dark:border-white/[0.08] focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Prominent Quick Triggers: ⌘K Command Palette & AI Assistant */}
          <div className="pt-4 pb-2 space-y-2">
            {onOpenPalette && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenPalette();
                }}
                className="w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.08] text-xs font-mono text-slate-800 dark:text-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <Search className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span className="font-sans font-medium text-sm">Command Palette</span>
                </span>
                <kbd className="px-2 py-0.5 rounded bg-slate-200 dark:bg-white/[0.1] text-[10px] font-mono text-slate-600 dark:text-slate-300">
                  ⌘K
                </kbd>
              </button>
            )}

            {onOpenChat && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenChat();
                }}
                className="w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 text-xs font-mono text-cyan-700 dark:text-cyan-300 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <Bot className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span className="font-sans font-medium text-sm">Ask Neural AI</span>
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </button>
            )}
          </div>

          {/* Nav Links in Recruiter-First Order */}
          <nav className="flex flex-col gap-1 py-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="min-h-[44px] px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-colors flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <span>{link.label}</span>
                <span className="text-xs text-slate-400 font-mono">↗</span>
              </a>
            ))}
          </nav>
        </div>

        {/* Footer & Resume Action */}
        <div className="pt-4 border-t border-slate-200 dark:border-white/[0.08] flex flex-col gap-3">
          <a
            href="/Rajana.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Rajana_Durga_Pavan_Kumar_Resume.pdf"
            className="w-full min-h-[44px] flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>Download Resume</span>
          </a>

          {/* Social Links (≥44px Touch Targets) */}
          <div className="flex items-center justify-center gap-2 text-slate-500">
            <a
              href={PROFILE_DATA.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="w-11 h-11 rounded-lg flex items-center justify-center hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={PROFILE_DATA.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="w-11 h-11 rounded-lg flex items-center justify-center hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${PROFILE_DATA.contact.email}`}
              aria-label="Send Email"
              className="w-11 h-11 rounded-lg flex items-center justify-center hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
