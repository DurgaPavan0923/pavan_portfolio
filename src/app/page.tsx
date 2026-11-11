'use client';

import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import { NeuralBackground } from '@/components/3d/NeuralBackground';
import { Navbar } from '@/components/layout/Navbar';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { Footer } from '@/components/layout/Footer';
import { ChatBot } from '@/components/ai/ChatBot';
import { ErrorBoundary } from '@/components/layout/ErrorBoundary';

import { Hero } from '@/components/sections/Hero';
import { Projects } from '@/components/sections/Projects';
import { Experience } from '@/components/sections/Experience';
import { GitHubActivity } from '@/components/sections/GitHubActivity';
import { Skills } from '@/components/sections/Skills';
import { Certifications } from '@/components/sections/Certifications';
import { Leadership } from '@/components/sections/Leadership';
import { Gallery } from '@/components/sections/Gallery';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);

  // Focus mode exit on Escape key
  useEffect(() => {
    if (!isFocusMode) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFocusMode(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFocusMode]);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* 60fps Dynamic Neural Particle Canvas */}
      <ErrorBoundary fallbackTitle="Background Canvas Unavailable" fallbackMessage="Particle animations suspended.">
        <NeuralBackground />
      </ErrorBoundary>

      {/* Focus Mode Exit Floating Pill */}
      {isFocusMode && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 animate-fade-down">
          <button
            type="button"
            onClick={() => setIsFocusMode(false)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 dark:bg-white/90 text-white dark:text-slate-900 text-xs font-mono font-medium shadow-2xl backdrop-blur-md hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400"
            aria-label="Exit Focus Mode"
          >
            <Eye className="w-3.5 h-3.5 text-cyan-400 dark:text-cyan-600" />
            <span>Focus Mode Active</span>
            <span className="opacity-60 text-[10px]">• Press ESC or Click to Exit</span>
          </button>
        </div>
      )}

      {/* Navigation Dock */}
      {!isFocusMode && (
        <Navbar
          onOpenPalette={() => setIsPaletteOpen(true)}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />
      )}

      {/* Mobile Slide-Over Drawer with Recruiter-First Navigation & ⌘K Action */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenPalette={() => setIsPaletteOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* Cmd + K Command Palette */}
      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        onOpenChat={() => setIsChatOpen(true)}
        isFocusMode={isFocusMode}
        onToggleFocusMode={() => setIsFocusMode((prev) => !prev)}
      />

      {/* Main Semantic Landmark with Recruiter-First Flow:
          01 Hero → 02 Featured Projects → 03 Experience → 04 Open Source (live) → 05 Skills → 06 Credentials & Education → 07 Leadership → 08 Moments (photos) → 09 Contact */}
      <main id="main-content" className="relative z-10 pb-safe pb-12 lg:pb-0">
        <Hero onOpenChat={() => setIsChatOpen(true)} />
        <Projects />
        <Experience />
        <ErrorBoundary fallbackTitle="GitHub Telemetry Unavailable" fallbackMessage="Unable to load real-time GitHub telemetry. You can still inspect public projects on GitHub.">
          <GitHubActivity />
        </ErrorBoundary>
        <Skills />
        <Certifications />
        <Leadership />
        <Gallery />
        <Contact />
      </main>

      {/* Semantic Footer */}
      <Footer />

      {/* Neural AI Assistant */}
      {!isFocusMode && (
        <ErrorBoundary fallbackTitle="AI Assistant Unavailable" fallbackMessage="Unable to initialize Neural Assistant chat session.">
          <ChatBot
            isOpen={isChatOpen}
            onToggle={() => setIsChatOpen(!isChatOpen)}
            onClose={() => setIsChatOpen(false)}
          />
        </ErrorBoundary>
      )}
    </div>
  );
}
