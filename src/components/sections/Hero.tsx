'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, FileText, Bot, Sparkles, MapPin, Code2, Zap } from 'lucide-react';
import { PROFILE_DATA } from '@/data/profile';

interface HeroProps {
  onOpenChat: () => void;
}

const ROLES = [
  'Building Enterprise RAG Systems',
  'Training Deep Learning Models',
  'Architecting Multi-Agent AI Workflows',
  'Deploying Scalable Cloud Architectures',
];

export function Hero({ onOpenChat }: HeroProps) {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Animated stat counters
  const [counts, setCounts] = useState({ projects: 0, badges: 0, certs: 0, hackathons: 0 });

  useEffect(() => {
    let startTime: number | null = null;
    const duration = 1500; // ms

    const animateCounters = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCounts({
        projects: Math.floor(easeOut * 12),
        badges: Math.floor(easeOut * 98),
        certs: Math.floor(easeOut * 6),
        hackathons: Math.floor(easeOut * 4),
      });

      if (progress < 1) {
        requestAnimationFrame(animateCounters);
      } else {
        setCounts({ projects: 12, badges: 98, certs: 6, hackathons: 4 });
      }
    };

    const frameId = requestAnimationFrame(animateCounters);
    return () => cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    const currentFullText = ROLES[currentRoleIndex];
    const typingSpeed = isDeleting ? 30 : 65;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentFullText.length) {
          setDisplayedText(currentFullText.slice(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(currentFullText.slice(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex]);

  return (
    <section
      id="hero"
      aria-label="Hero Section"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 sm:pt-36 pb-16 px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Headline, Typewriter, CTAs, Stats */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left animate-fade-up">
          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium mb-6 transition-transform hover:scale-105 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            <span>Available for AI/ML Internships & Roles</span>
          </div>

          {/* Name & Title */}
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-slate-900 dark:text-slate-100 leading-[1.1] mb-3">
            Rajana Durga <br className="hidden sm:inline" />
            <span className="text-gradient-cyan">Pavan Kumar</span>
          </h1>

          {/* Dynamic Typewriter Role */}
          <div className="flex items-center gap-2 text-base sm:text-xl font-mono text-cyan-600 dark:text-cyan-400 font-semibold mb-4 min-h-[32px]">
            <span className="text-slate-400 dark:text-slate-500">&gt;</span>
            <span>{displayedText}</span>
            <span className="w-2 h-5 bg-cyan-500 dark:bg-cyan-400 animate-pulse inline-block" />
          </div>

          {/* Education & Location Subtitle */}
          <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 mb-6 flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              SOA University (ITER) · B.Tech CSE (AI & ML)
            </span>
            <span className="text-slate-400 dark:text-slate-600 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
              Bhubaneswar, Odisha, India
            </span>
          </p>

          {/* Core Bio Summary */}
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 max-w-xl leading-relaxed mb-8">
            Engineering end-to-end intelligent systems, Retrieval-Augmented Generation (RAG) pipelines, and cloud-native machine learning architectures. Student Intern at <strong className="text-slate-900 dark:text-slate-100 font-semibold">TIH IIT Guwahati</strong> and Club Coordinator at <strong className="text-slate-900 dark:text-slate-100 font-semibold">GDGoC ITER</strong>.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-10 w-full sm:w-auto">
            {/* Download Resume */}
            <a
              href="/Rajana.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-slate-950 font-bold text-xs sm:text-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/30 group"
            >
              <FileText className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>Download Resume</span>
              <Zap className="w-3.5 h-3.5 opacity-75" />
            </a>

            {/* Explore Work */}
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-white font-semibold text-xs sm:text-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/50 group"
            >
              <span>Explore My Work</span>
              <ArrowRight className="w-4 h-4 text-cyan-500 dark:text-cyan-400 transition-transform group-hover:translate-x-1" />
            </a>

            {/* Talk to AI */}
            <button
              type="button"
              onClick={onOpenChat}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/30 text-violet-700 dark:text-violet-300 hover:text-violet-900 dark:hover:text-violet-200 font-semibold text-xs sm:text-sm transition-all duration-300 hover:-translate-y-1 group"
            >
              <Bot className="w-4 h-4 text-violet-600 dark:text-violet-400 transition-transform group-hover:rotate-12" />
              <span>Ask AI Assistant</span>
            </button>
          </div>

          {/* Stats Bar with Animated Roll Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-xl">
            <div className="p-3.5 rounded-2xl glass-card text-center transition-all duration-300 hover:scale-105 group">
              <div className="font-display font-extrabold text-2xl sm:text-3xl text-cyan-600 dark:text-cyan-400">
                {counts.projects}+
              </div>
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">Projects</div>
            </div>
            <div className="p-3.5 rounded-2xl glass-card text-center transition-all duration-300 hover:scale-105 group">
              <div className="font-display font-extrabold text-2xl sm:text-3xl text-emerald-600 dark:text-emerald-400">
                {counts.badges}
              </div>
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">GCP Badges</div>
            </div>
            <div className="p-3.5 rounded-2xl glass-card text-center transition-all duration-300 hover:scale-105 group">
              <div className="font-display font-extrabold text-2xl sm:text-3xl text-violet-600 dark:text-violet-400">
                {counts.certs}+
              </div>
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">Certifications</div>
            </div>
            <div className="p-3.5 rounded-2xl glass-card text-center transition-all duration-300 hover:scale-105 group">
              <div className="font-display font-extrabold text-2xl sm:text-3xl text-amber-600 dark:text-amber-400">
                {counts.hackathons}+
              </div>
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">Hackathons</div>
            </div>
          </div>
        </div>

        {/* Right Column: High-Res Profile Avatar with Rotating Conic Orbit */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
            {/* Outer Conic Rotating Ring */}
            <div className="absolute inset-0 rounded-full p-1 bg-gradient-to-tr from-cyan-400 via-violet-500 to-emerald-400 animate-spin-slow opacity-80 blur-[1px]" />

            {/* Secondary Glow */}
            <div className="absolute -inset-3 rounded-full bg-cyan-500/15 dark:bg-cyan-500/10 blur-xl pointer-events-none animate-pulse-slow" />

            {/* Inner Avatar Container */}
            <div className="relative w-[95%] h-[95%] rounded-full overflow-hidden bg-slate-100 dark:bg-slate-950 border-4 border-white dark:border-slate-900 shadow-2xl flex items-center justify-center">
              <Image
                src="/Pavan.jpeg"
                alt="Rajana Durga Pavan Kumar - AI & ML Engineer"
                fill
                priority
                sizes="(max-width: 768px) 256px, 320px"
                className="object-cover object-top scale-110 hover:scale-115 transition-transform duration-700 ease-out"
              />
            </div>

            {/* Floating Orbital Tech Badges */}
            <div className="absolute -top-2 left-6 px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-slate-900/90 border border-cyan-400/40 text-[11px] font-mono text-cyan-600 dark:text-cyan-300 shadow-lg flex items-center gap-1.5 animate-float-slow hover:scale-110 transition-transform cursor-default">
              <span>🔗</span>
              <span className="font-semibold">Neo4j Certified</span>
            </div>

            <div className="absolute bottom-4 -left-4 px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-slate-900/90 border border-violet-400/40 text-[11px] font-mono text-violet-600 dark:text-violet-300 shadow-lg flex items-center gap-1.5 animate-float-slow hover:scale-110 transition-transform cursor-default" style={{ animationDelay: '1.5s' }}>
              <span>☁️</span>
              <span className="font-semibold">Microsoft Azure</span>
            </div>

            <div className="absolute top-1/2 -right-4 px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-slate-900/90 border border-emerald-400/40 text-[11px] font-mono text-emerald-600 dark:text-emerald-300 shadow-lg flex items-center gap-1.5 animate-float-slow hover:scale-110 transition-transform cursor-default" style={{ animationDelay: '2.5s' }}>
              <span>💎</span>
              <span className="font-semibold">GCP Diamond</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
