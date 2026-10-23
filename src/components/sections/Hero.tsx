'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, FileText, Mail, Sparkles, Zap, Layers } from 'lucide-react';
import { PROFILE_DATA } from '@/data/profile';
import { PROJECTS } from '@/data/projects';
import { CERTIFICATIONS } from '@/data/certifications';

interface HeroProps {
  onOpenChat?: () => void;
}

const ROLES = [
  'Building Retrieval-Augmented Generation Pipelines',
  'Training Deep Learning & NLP Models',
  'Evaluating Multi-Agent Verification Systems',
  'Deploying Containerized Cloud Services',
];

export function Hero({ onOpenChat }: HeroProps) {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Derive counts directly from data arrays (single source of truth)
  const projectsCount = PROJECTS.length;
  const certsCount = CERTIFICATIONS.length;
  const badgesCount = 98; // Verified Google Cloud Arcade Diamond milestone
  const reposCount = 22; // Verified GitHub public repositories

  useEffect(() => {
    const currentFullText = ROLES[currentRoleIndex];
    const typingSpeed = isDeleting ? 25 : 55;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentFullText.length) {
          setDisplayedText(currentFullText.slice(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2400);
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
      className="relative min-h-[88vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 overflow-hidden"
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
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-slate-900 dark:text-slate-100 leading-[1.1] mb-3">
            Hi, I’m <span className="text-gradient-cyan">{PROFILE_DATA.fullName}</span>
          </h1>

          {/* Dynamic Typewriter Role */}
          <div className="h-10 sm:h-12 flex items-center justify-center lg:justify-start mb-4">
            <span className="text-base sm:text-xl font-mono text-cyan-600 dark:text-cyan-400 font-semibold flex items-center">
              {displayedText}
              <span className="inline-block w-2.5 h-5 ml-1 bg-cyan-500 dark:bg-cyan-400 animate-pulse" />
            </span>
          </div>

          {/* One-Line Value Statement */}
          <p className="text-base sm:text-lg text-slate-800 dark:text-slate-200 max-w-2xl font-medium leading-relaxed mb-8">
            AI &amp; Machine Learning Engineer specializing in RAG architectures, multi-agent evaluation pipelines, and production systems.
          </p>

          {/* Action CTAs: 3 Explicit Recruiter Actions */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-10">
            {/* 1. View Projects */}
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-0.5 group cursor-pointer"
            >
              <Layers className="w-4 h-4" />
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            {/* 2. Download Resume */}
            <a
              href="/Rajana.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Rajana_Durga_Pavan_Kumar_Resume.pdf"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.12] text-slate-800 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-white font-semibold text-xs sm:text-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/50 group shadow-sm cursor-pointer"
            >
              <FileText className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Download Resume</span>
            </a>

            {/* 3. Contact */}
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.12] text-slate-800 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-white font-semibold text-xs sm:text-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/50 group shadow-sm cursor-pointer"
            >
              <Mail className="w-4 h-4 text-violet-500" />
              <span>Contact</span>
            </a>
          </div>

          {/* Stats Bar: Truthful stats derived directly from typed data arrays */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-xl">
            <div className="p-3.5 rounded-2xl glass-card text-center transition-all duration-300 hover:scale-105 group">
              <div className="font-display font-extrabold text-2xl sm:text-3xl text-cyan-600 dark:text-cyan-400">
                {projectsCount}
              </div>
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">Projects Built</div>
            </div>
            <div className="p-3.5 rounded-2xl glass-card text-center transition-all duration-300 hover:scale-105 group">
              <div className="font-display font-extrabold text-2xl sm:text-3xl text-emerald-600 dark:text-emerald-400">
                {badgesCount}
              </div>
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">GCP Badges</div>
            </div>
            <div className="p-3.5 rounded-2xl glass-card text-center transition-all duration-300 hover:scale-105 group">
              <div className="font-display font-extrabold text-2xl sm:text-3xl text-violet-600 dark:text-violet-400">
                {certsCount}
              </div>
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">Certifications</div>
            </div>
            <div className="p-3.5 rounded-2xl glass-card text-center transition-all duration-300 hover:scale-105 group">
              <div className="font-display font-extrabold text-2xl sm:text-3xl text-amber-600 dark:text-amber-400">
                {reposCount}
              </div>
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">Public Repos</div>
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
            <div className="absolute -top-3 sm:-top-4 left-0 sm:-left-4 p-2 sm:px-3 sm:py-1.5 rounded-xl glass-card border-cyan-400/40 flex items-center gap-2 shadow-lg">
              <span className="p-1 rounded-md bg-cyan-500/20 text-cyan-600 dark:text-cyan-400">
                <Sparkles className="w-3.5 h-3.5" />
              </span>
              <div className="text-left">
                <div className="text-[9px] font-mono text-slate-500 dark:text-slate-400 uppercase leading-none">Student Intern</div>
                <div className="text-[11px] font-bold text-slate-900 dark:text-slate-100 font-display">TIH IIT Guwahati</div>
              </div>
            </div>

            {/* Floating Info Pill 2: Neo4j Certified */}
            <div className="absolute -bottom-3 sm:-bottom-4 right-0 sm:-right-4 p-2 sm:px-3 sm:py-1.5 rounded-xl glass-card border-violet-400/40 flex items-center gap-2 shadow-lg">
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
