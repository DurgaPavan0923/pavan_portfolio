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

  // Animated stat counters initialized to verified values to eliminate SSR 0+ flash
  const [counts, setCounts] = useState({ projects: 7, badges: 98, certs: 6, problems: 300 });

  useEffect(() => {
    let startTime: number | null = null;
    const duration = 1500; // ms

    const animateCounters = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCounts({
        projects: Math.floor(easeOut * 7),
        badges: Math.floor(easeOut * 98),
        certs: Math.floor(easeOut * 6),
        problems: Math.floor(easeOut * 300),
      });

      if (progress < 1) {
        requestAnimationFrame(animateCounters);
      } else {
        setCounts({ projects: 7, badges: 98, certs: 6, problems: 300 });
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
      aria-label="Introduction & Headline"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 overflow-hidden"
    >
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Headline, Typewriter, CTAs, Stats */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Availability Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium mb-6 animate-fade-in shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Available for Applied AI &amp; ML Roles</span>
          </div>

          {/* Name & Academic Identity */}
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-slate-900 dark:text-slate-100 leading-[1.1] mb-4">
            Hi, I’m <span className="text-gradient-cyan">{PROFILE_DATA.fullName}</span>
          </h1>

          {/* Dynamic Typewriter Role */}
          <div className="h-10 sm:h-12 flex items-center justify-center lg:justify-start mb-6">
            <span className="text-lg sm:text-2xl font-mono text-cyan-600 dark:text-cyan-400 font-semibold flex items-center">
              {displayedText}
              <span className="inline-block w-2.5 h-6 ml-1 bg-cyan-500 dark:bg-cyan-400 animate-pulse" />
            </span>
          </div>

          {/* Concise Positioning Subheading */}
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed mb-8">
            Computer Science undergraduate at SOA University (ITER). Specializing in{' '}
            <strong className="text-slate-900 dark:text-white font-semibold">
              Retrieval-Augmented Generation (Graph RAG)
            </strong>
            , multi-agent consensus networks, and cloud MLOps. Student Intern at{' '}
            <span className="text-cyan-600 dark:text-cyan-400 font-medium">TIH IIT Guwahati</span> &amp; GDGoC Club Coordinator.
          </p>

          {/* Action CTAs: Magnetic Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-12">
            {/* Download Resume */}
            <a
              href="/Rajana.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-1 group"
            >
              <FileText className="w-4 h-4" />
              <span>Download Resume</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            {/* Explore Work */}
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.12] text-slate-800 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-white font-semibold text-xs sm:text-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/50 group shadow-sm"
            >
              <span>Explore My Work</span>
              <ArrowRight className="w-4 h-4 text-cyan-600 dark:text-cyan-400 transition-transform group-hover:translate-x-1" />
            </a>

            {/* Talk to AI */}
            <button
              type="button"
              onClick={onOpenChat}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/30 text-violet-700 dark:text-violet-300 hover:text-violet-900 dark:hover:text-violet-200 font-semibold text-xs sm:text-sm transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
            >
              <Bot className="w-4 h-4 text-violet-600 dark:text-violet-400 transition-transform group-hover:rotate-12" />
              <span>Ask AI Assistant</span>
            </button>
          </div>

          {/* Stats Bar with Initialized Values to prevent SSR 0+ flash */}
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
                {counts.problems}+
              </div>
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">Coding Problems</div>
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

            {/* Floating Info Pill 1: TIH IIT Guwahati */}
            <div className="absolute -top-3 sm:-top-4 left-0 sm:-left-4 p-2 sm:px-3 sm:py-1.5 rounded-xl glass-card border-cyan-400/40 flex items-center gap-2 animate-bounce-slow shadow-lg">
              <span className="p-1 rounded-md bg-cyan-500/20 text-cyan-600 dark:text-cyan-400">
                <Sparkles className="w-3.5 h-3.5" />
              </span>
              <div className="text-left">
                <div className="text-[9px] font-mono text-slate-500 dark:text-slate-400 uppercase leading-none">Research Intern</div>
                <div className="text-[11px] font-bold text-slate-900 dark:text-slate-100 font-display">TIH IIT Guwahati</div>
              </div>
            </div>

            {/* Floating Info Pill 2: Neo4j Certified */}
            <div className="absolute -bottom-3 sm:-bottom-4 right-0 sm:-right-4 p-2 sm:px-3 sm:py-1.5 rounded-xl glass-card border-violet-400/40 flex items-center gap-2 animate-bounce-slow shadow-lg [animation-delay:1.5s]">
              <span className="p-1 rounded-md bg-violet-500/20 text-violet-600 dark:text-violet-400">
                <Zap className="w-3.5 h-3.5" />
              </span>
              <div className="text-left">
                <div className="text-[9px] font-mono text-slate-500 dark:text-slate-400 uppercase leading-none">Graph RAG</div>
                <div className="text-[11px] font-bold text-slate-900 dark:text-slate-100 font-display">Neo4j Certified</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
