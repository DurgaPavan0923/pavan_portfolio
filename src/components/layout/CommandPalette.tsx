'use client';

import React, { useEffect, useState, useRef } from 'react';
import {
  Search,
  FileText,
  Copy,
  Moon,
  Sun,
  Bot,
  ExternalLink,
  Code,
  Briefcase,
  Layers,
  GraduationCap,
  Mail,
  Check,
  Camera,
  Eye,
  EyeOff,
  ArrowUp,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { PROFILE_DATA } from '@/data/profile';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChat: () => void;
  isFocusMode?: boolean;
  onToggleFocusMode?: () => void;
}

interface CommandItem {
  id: string;
  label: string;
  category: 'Navigation' | 'Actions' | 'Social';
  icon: React.ReactNode;
  perform: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  onOpenChat,
  isFocusMode = false,
  onToggleFocusMode,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          setQuery('');
          setSelectedIndex(0);
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const navigateTo = (hash: string) => {
    onClose();
    if (hash === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.querySelector(hash);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE_DATA.contact.email);
    setCopiedEmail(true);
    setTimeout(() => {
      setCopiedEmail(false);
      onClose();
    }, 1200);
  };

  const COMMANDS: CommandItem[] = [
    {
      id: 'nav-projects',
      label: 'Explore Featured Projects',
      category: 'Navigation',
      icon: <Layers className="w-4 h-4 text-cyan-500" />,
      perform: () => navigateTo('#projects'),
    },
    {
      id: 'nav-why-me',
      label: 'Why Work With Me (Bento Grid)',
      category: 'Navigation',
      icon: <Sparkles className="w-4 h-4 text-amber-500" />,
      perform: () => navigateTo('#why-me'),
    },
    {
      id: 'nav-moments',
      label: 'View Moments & Photo Retrospective',
      category: 'Navigation',
      icon: <Camera className="w-4 h-4 text-emerald-500" />,
      perform: () => navigateTo('#moments'),
    },
    {
      id: 'nav-skills',
      label: 'View AI Toolkit & Core Skills',
      category: 'Navigation',
      icon: <Code className="w-4 h-4 text-cyan-500" />,
      perform: () => navigateTo('#skills'),
    },
    {
      id: 'nav-experience',
      label: 'Review Experience & Community Impact',
      category: 'Navigation',
      icon: <Briefcase className="w-4 h-4 text-violet-500" />,
      perform: () => navigateTo('#experience'),
    },
    {
      id: 'nav-credentials',
      label: 'Inspect Certifications & Hackathons',
      category: 'Navigation',
      icon: <GraduationCap className="w-4 h-4 text-amber-500" />,
      perform: () => navigateTo('#credentials'),
    },
    {
      id: 'nav-blogs',
      label: 'Read Technical Blogs & Writeups',
      category: 'Navigation',
      icon: <BookOpen className="w-4 h-4 text-blue-500" />,
      perform: () => navigateTo('#blogs'),
    },
    {
      id: 'nav-contact',
      label: 'Get In Touch / Contact',
      category: 'Navigation',
      icon: <Mail className="w-4 h-4 text-cyan-500" />,
      perform: () => navigateTo('#contact'),
    },
    {
      id: 'act-focus',
      label: isFocusMode ? 'Exit Focus Mode' : 'Toggle Focus Mode (Distraction-Free)',
      category: 'Actions',
      icon: isFocusMode ? (
        <Eye className="w-4 h-4 text-emerald-500" />
      ) : (
        <EyeOff className="w-4 h-4 text-violet-500" />
      ),
      perform: () => {
        onToggleFocusMode?.();
        onClose();
      },
    },
    {
      id: 'act-scroll-top',
      label: 'Scroll to Top of Page',
      category: 'Actions',
      icon: <ArrowUp className="w-4 h-4 text-cyan-500" />,
      perform: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'act-resume',
      label: 'Download Official Resume (PDF)',
      category: 'Actions',
      icon: <FileText className="w-4 h-4 text-cyan-500" />,
      perform: () => {
        window.open('/Rajana.pdf', '_blank');
        onClose();
      },
    },
    {
      id: 'act-copy-email',
      label: copiedEmail ? 'Email Copied!' : `Copy Email (${PROFILE_DATA.contact.email})`,
      category: 'Actions',
      icon: copiedEmail ? (
        <Check className="w-4 h-4 text-emerald-500" />
      ) : (
        <Copy className="w-4 h-4 text-slate-400" />
      ),
      perform: copyEmail,
    },
    {
      id: 'act-chat',
      label: 'Talk to Neural AI Assistant',
      category: 'Actions',
      icon: <Bot className="w-4 h-4 text-violet-500" />,
      perform: () => {
        onClose();
        onOpenChat();
      },
    },
    {
      id: 'act-theme',
      label: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
      category: 'Actions',
      icon: theme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-500" />
      ) : (
        <Moon className="w-4 h-4 text-cyan-500" />
      ),
      perform: () => {
        toggleTheme();
        onClose();
      },
    },
    {
      id: 'soc-github',
      label: 'Open GitHub Profile (@DurgaPavan0923)',
      category: 'Social',
      icon: <ExternalLink className="w-4 h-4 text-slate-400" />,
      perform: () => {
        window.open(PROFILE_DATA.contact.github, '_blank');
        onClose();
      },
    },
    {
      id: 'soc-linkedin',
      label: 'Open LinkedIn Profile',
      category: 'Social',
      icon: <ExternalLink className="w-4 h-4 text-cyan-500" />,
      perform: () => {
        window.open(PROFILE_DATA.contact.linkedin, '_blank');
        onClose();
      },
    },
  ];

  const filteredCommands = COMMANDS.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(query.toLowerCase()) ||
      cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].perform();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-[120] flex items-start justify-center pt-20 sm:pt-28 px-4"
    >
      <div className="fixed inset-0 bg-black/50 dark:bg-black/75 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-xl rounded-2xl glass-panel border border-slate-200 dark:border-white/[0.12] shadow-2xl overflow-hidden animate-fade-up">
        {/* Search Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 dark:border-white/[0.08]">
          <Search className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command, project, or section..."
            className="w-full bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none"
          />
          <kbd className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-slate-400">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2">
          {filteredCommands.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">No matching commands found.</div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  type="button"
                  onClick={() => cmd.perform()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-colors ${
                    isSelected
                      ? 'bg-cyan-50 dark:bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 font-semibold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {cmd.icon}
                    <span className="font-medium">{cmd.label}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    {cmd.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-white/[0.02] border-t border-slate-200 dark:border-white/[0.06] text-[11px] text-slate-500 font-mono">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="hidden sm:inline">⌘K / Ctrl+K</span>
        </div>
      </div>
    </div>
  );
}
