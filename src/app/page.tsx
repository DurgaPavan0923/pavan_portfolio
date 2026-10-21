'use client';

import React, { useState } from 'react';
import { NeuralBackground } from '@/components/3d/NeuralBackground';
import { Navbar } from '@/components/layout/Navbar';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { Footer } from '@/components/layout/Footer';
import { ChatBot } from '@/components/ai/ChatBot';

import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Gallery } from '@/components/sections/Gallery';
import { WhyWorkWithMe } from '@/components/sections/WhyWorkWithMe';
import { Skills } from '@/components/sections/Skills';
import { Projects } from '@/components/sections/Projects';
import { GitHubActivity } from '@/components/sections/GitHubActivity';
import { Experience } from '@/components/sections/Experience';
import { Research } from '@/components/sections/Research';
import { Certifications } from '@/components/sections/Certifications';
import { Leadership } from '@/components/sections/Leadership';
import { Blogs } from '@/components/sections/Blogs';
import { Contact } from '@/components/sections/Contact';
import { PersonalClosing } from '@/components/sections/PersonalClosing';

export default function Home() {
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* 60fps Dynamic Neural Particle Canvas */}
      <NeuralBackground />

      {/* Navigation Dock */}
      <Navbar
        onOpenPalette={() => setIsPaletteOpen(true)}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
      />

      {/* Mobile Slide-Over Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Cmd + K Command Palette */}
      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* Main Semantic Landmark */}
      <main id="main-content" className="relative z-10">
        <Hero onOpenChat={() => setIsChatOpen(true)} />
        <About />
        <Gallery />
        <WhyWorkWithMe />
        <Skills />
        <Projects />
        <GitHubActivity />
        <Experience />
        <Research />
        <Certifications />
        <Leadership />
        <Blogs />
        <Contact />
        <PersonalClosing />
      </main>

      {/* Semantic Footer */}
      <Footer />

      {/* Neural AI Assistant */}
      <ChatBot
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
        onClose={() => setIsChatOpen(false)}
      />
    </div>
  );
}
