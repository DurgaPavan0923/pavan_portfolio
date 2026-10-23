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
  Award,
  GitBranch,
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

  // Recruiter-first ordered commands: Hero → Featured Projects → Experience → Open Source → Skills → Credentials & Education → Leadership → Moments → Contact
  const COMMANDS: CommandItem[] = [
    {
      id: 'nav-projects',
      label: 'Featured Projects (FactLens AI, InsightAI, Underwater Analytics)',
      category: 'Navigation',
      icon: <Layers className="w-4 h-4 text-cyan-500" />,
      perform: () => navigateTo('#projects'),
    },
    {
      id: 'nav-experience',
      label: 'Experience (TIH IIT Guwahati, Edunet, GDGoC)',
      category: 'Navigation',
      icon: <Briefcase className="w-4 h-4 text-violet-500" />,
      perform: () => navigateTo('#experience'),
    },
    {
      id: 'nav-opensource',
      label: 'Open Source (Live GitHub Telemetry & Repos)',
      category: 'Navigation',
      icon: <GitBranch className="w-4 h-4 text-emerald-500" />,
      perform: () => navigateTo('#open-source'),
    },
    {
      id: 'nav-skills',
      label: 'Skills & Toolkit (Core, Working, Familiar)',
      category: 'Navigation',
      icon: <Code className="w-4 h-4 text-cyan-500" />,
      perform: () => navigateTo('#skills'),
    },
    {
      id: 'nav-credentials',
      label: 'Credentials & Education (Certifications, B.Tech)',
      category: 'Navigation',
      icon: <GraduationCap className="w-4 h-4 text-amber-500" />,
      perform: () => navigateTo('#credentials'),
    },
    {
      id: 'nav-leadership',
      label: 'Leadership (NCC Sergeant, GDGoC Coordinator)',
      category: 'Navigation',
      icon: <Award className="w-4 h-4 text-rose-500" />,
      perform: () => navigateTo('#leadership'),
    },
    {
      id: 'nav-moments',
      label: 'Moments (Photo Retrospective & Hackathons)',
      category: 'Navigation',
      icon: <Camera className="w-4 h-4 text-cyan-400" />,
      perform: () => navigateTo('#moments'),
    },
    {
      id: 'nav-contact',
      label: 'Contact (Get in Touch / Inquiry Form)',
      category: 'Navigation',
      icon: <Mail className="w-4 h-4 text-violet-400" />,
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
      id: 'act-result-portal',
      label: 'Verify CGPA on SOA Result Portal (Student login required; marksheet available on request)',
      category: 'Actions',
      icon: <GraduationCap className="w-4 h-4 text-amber-400" />,
      perform: () => {
        onClose();
        window.open('https://soaportals.com/StudentPortalSOA/#/', '_blank', 'noopener,noreferrer');
      },
    },
    {
      id: 'act-resume',
      label: 'Download Resume (PDF)',
      category: 'Actions',
      icon: <FileText className="w-4 h-4 text-cyan-400" />,
      perform: () => {
        onClose();
        window.open('/Rajana.pdf', '_blank');
      },
    },
    {
      id: 'act-copy-email',
      label: copiedEmail ? 'Email Copied!' : 'Copy Email Address',
      category: 'Actions',
      icon: copiedEmail ? (
        <Check className="w-4 h-4 text-emerald-400" />
      ) : (
        <Copy className="w-4 h-4 text-slate-400" />
      ),
      perform: copyEmail,
    },
    {
      id: 'act-chat',
      label: 'Ask AI Portfolio Assistant',
      category: 'Actions',
      icon: <Bot className="w-4 h-4 text-violet-400" />,
      perform: () => {
        onClose();
        onOpenChat();
      },
    },
    {
      id: 'act-theme',
      label: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
      category: 'Actions',
      icon:
        theme === 'dark' ? (
          <Sun className="w-4 h-4 text-amber-400" />
        ) : (
          <Moon className="w-4 h-4 text-slate-400" />
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
        onClose();
        window.open(PROFILE_DATA.contact.github, '_blank');
      },
    },
    {
      id: 'soc-linkedin',
      label: 'Open LinkedIn Profile',
      category: 'Social',
      icon: <ExternalLink className="w-4 h-4 text-slate-400" />,
      perform: () => {
        onClose();
        window.open(PROFILE_DATA.contact.linkedin, '_blank');
      },
    },
  ];

  const filteredCommands = query
    ? COMMANDS.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          c.category.toLowerCase().includes(query.toLowerCase())
      )
    : COMMANDS;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(
        (prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length
      );
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
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Palette Container */}
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/[0.12] rounded-2xl shadow-2xl overflow-hidden z-10 animate-fade-down">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 dark:border-white/[0.08]">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or search sections..."
            className="w-full bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:outline-none"
            aria-label="Search portfolio commands"
          />
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-500 font-mono border border-slate-200 dark:border-white/[0.08]">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2">
          {filteredCommands.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500">
              No matching commands found.
            </div>
          ) : (
            filteredCommands.map((command, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={command.id}
                  type="button"
                  onClick={() => command.perform()}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-sm transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 font-medium'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="p-1 rounded-lg bg-slate-100 dark:bg-white/[0.04]">
                      {command.icon}
                    </span>
                    <span>{command.label}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    {command.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Hints */}
        <div className="px-4 py-2 border-t border-slate-200 dark:border-white/[0.08] bg-slate-50/50 dark:bg-white/[0.02] flex items-center justify-between text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <span>↑↓ Navigate</span>
            <span>·</span>
            <span>↵ Select</span>
            <span>·</span>
            <span>ESC Close</span>
          </div>
          <span className="hidden sm:inline">⌘K / Ctrl+K</span>
        </div>
      </div>
    </div>
  );
}
