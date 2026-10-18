'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
<<<<<<< HEAD
import { ArrowRight, FileText, Bot, Sparkles, MapPin } from 'lucide-react';
=======
import { ArrowRight, FileText, Bot, Sparkles, MapPin, Award } from 'lucide-react';
>>>>>>> origin/main
import { PROFILE_DATA } from '@/data/profile';

interface HeroProps {
  onOpenChat: () => void;
}

<<<<<<< HEAD
const ROLES = [
  'Building Enterprise RAG Systems',
  'Training Deep Learning Models',
  'Architecting Multi-Agent AI Workflows',
  'Deploying Scalable Cloud Architectures',
];

=======
>>>>>>> origin/main
export function Hero({ onOpenChat }: HeroProps) {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

<<<<<<< HEAD
  useEffect(() => {
    const currentFullText = ROLES[currentRoleIndex];
=======
  const roles = [
    'Building Enterprise RAG Systems',
    'Training Deep Learning Models',
    'Architecting Multi-Agent AI Workflows',
    'Deploying Scalable Cloud Architectures',
  ];

  useEffect(() => {
    const currentFullText = roles[currentRoleIndex];
>>>>>>> origin/main
    const typingSpeed = isDeleting ? 30 : 70;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentFullText.length) {
          setDisplayedText(currentFullText.slice(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(currentFullText.slice(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
<<<<<<< HEAD
          setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
=======
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
>>>>>>> origin/main
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
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Available for AI/ML Internships & Roles</span>
          </div>

          {/* Name & Title */}
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-slate-100 leading-[1.1] mb-3">
            Rajana Durga <br className="hidden sm:inline" />
            <span className="text-gradient-cyan">Pavan Kumar</span>
          </h1>

          {/* Dynamic Typewriter Role */}
          <div className="flex items-center gap-2 text-base sm:text-xl font-mono text-cyan-400 font-semibold mb-4 min-h-[32px]">
            <span className="text-slate-500">&gt;</span>
            <span>{displayedText}</span>
            <span className="w-2 h-5 bg-cyan-400 animate-pulse inline-block" />
          </div>

          {/* Education & Location Subtitle */}
          <p className="text-xs sm:text-sm font-medium text-slate-400 mb-6 flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              SOA University (ITER) · B.Tech CSE (AI & ML)
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-violet-400" />
              Bhubaneswar, Odisha, India
            </span>
          </p>

          {/* Core Bio Summary */}
          <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed mb-8">
            Engineering end-to-end intelligent systems, Retrieval-Augmented Generation (RAG) pipelines, and cloud-native machine learning architectures. Student Intern at <strong className="text-slate-100">TIH IIT Guwahati</strong> and Club Coordinator at <strong className="text-slate-100">GDGoC ITER</strong>.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-10 w-full sm:w-auto">
            {/* Download Resume */}
            <a
              href="/Rajana.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-slate-950 font-bold text-xs sm:text-sm transition-transform hover:-translate-y-0.5 shadow-lg shadow-cyan-500/25"
            >
              <FileText className="w-4 h-4" />
              <span>Download Resume</span>
            </a>

            {/* Explore Work */}
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] text-slate-200 hover:text-white font-semibold text-xs sm:text-sm transition-all hover:border-cyan-400/40"
            >
              <span>Explore My Work</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </a>

            {/* Talk to AI */}
            <button
              type="button"
              onClick={onOpenChat}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/30 text-violet-300 hover:text-violet-200 font-semibold text-xs sm:text-sm transition-all"
            >
              <Bot className="w-4 h-4 text-violet-400" />
              <span>Ask AI Assistant</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-xl">
            <div className="p-3.5 rounded-2xl glass-card text-center">
              <div className="font-display font-extrabold text-xl sm:text-2xl text-cyan-400">12+</div>
              <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">Projects</div>
            </div>
            <div className="p-3.5 rounded-2xl glass-card text-center">
              <div className="font-display font-extrabold text-xl sm:text-2xl text-emerald-400">98</div>
              <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">GCP Badges</div>
            </div>
            <div className="p-3.5 rounded-2xl glass-card text-center">
              <div className="font-display font-extrabold text-xl sm:text-2xl text-violet-400">6+</div>
              <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">Certifications</div>
            </div>
            <div className="p-3.5 rounded-2xl glass-card text-center">
              <div className="font-display font-extrabold text-xl sm:text-2xl text-amber-400">4+</div>
              <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">Hackathons</div>
            </div>
          </div>
        </div>

        {/* Right Column: High-Res Profile Avatar with Glowing Conic Orbit */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
            {/* Outer Conic Rotating Ring */}
            <div className="absolute inset-0 rounded-full p-1 bg-gradient-to-tr from-cyan-400 via-violet-500 to-emerald-400 animate-spin-slow opacity-80 blur-[1px]" />

            {/* Secondary Glow */}
            <div className="absolute -inset-3 rounded-full bg-cyan-500/10 blur-xl pointer-events-none" />

            {/* Inner Avatar Container */}
            <div className="relative w-[95%] h-[95%] rounded-full overflow-hidden bg-slate-950 border-4 border-slate-900 shadow-2xl flex items-center justify-center">
              <Image
                src="/Pavan.jpeg"
                alt="Rajana Durga Pavan Kumar - AI & ML Engineer"
                fill
                priority
                sizes="(max-width: 768px) 256px, 320px"
                className="object-cover object-top scale-110 hover:scale-115 transition-transform duration-500"
              />
            </div>

            {/* Floating Orbital Tech Badges */}
            <div className="absolute -top-2 left-6 px-3 py-1 rounded-full bg-slate-900/90 border border-cyan-400/40 text-[11px] font-mono text-cyan-300 shadow-md flex items-center gap-1.5 animate-float-slow">
              <span>🔗</span>
              <span>Neo4j Certified</span>
            </div>

            <div className="absolute bottom-4 -left-4 px-3 py-1 rounded-full bg-slate-900/90 border border-violet-400/40 text-[11px] font-mono text-violet-300 shadow-md flex items-center gap-1.5 animate-float-slow" style={{ animationDelay: '1.5s' }}>
              <span>☁️</span>
              <span>Microsoft Azure</span>
            </div>

            <div className="absolute top-1/2 -right-4 px-3 py-1 rounded-full bg-slate-900/90 border border-emerald-400/40 text-[11px] font-mono text-emerald-300 shadow-md flex items-center gap-1.5 animate-float-slow" style={{ animationDelay: '2.5s' }}>
              <span>💎</span>
              <span>GCP Diamond</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
