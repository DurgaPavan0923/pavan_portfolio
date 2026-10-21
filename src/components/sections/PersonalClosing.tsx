'use client';

import React, { useState } from 'react';
import {
  Mail,
  Copy,
  Check,
  Linkedin,
  Github,
  FileText,
  MapPin,
  ArrowUp,
  Sparkles,
  ArrowUpRight,
  ExternalLink,
} from 'lucide-react';
import { PROFILE_DATA } from '@/data/profile';

export function PersonalClosing() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE_DATA.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="closing"
      aria-label="Thank You and Connect"
      className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Decorative Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-cyan-500/10 to-violet-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Closing Card */}
      <div className="relative rounded-3xl bg-gradient-to-b from-white/90 via-white/70 to-slate-50/80 dark:from-slate-900/80 dark:via-slate-900/60 dark:to-slate-950/80 border border-slate-200 dark:border-white/[0.1] p-8 sm:p-12 lg:p-16 backdrop-blur-2xl shadow-2xl overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THANK YOU FOR VISITING</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 font-display">
            Let’s Build Something Exceptional Together
          </h2>

          <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            I’m always open to discussing new opportunities in{' '}
            <strong className="text-slate-900 dark:text-white font-semibold">
              Applied AI, Machine Learning, and Full-Stack Systems
            </strong>
            , as well as research collaborations and open-source ideas. Feel free to reach out directly.
          </p>

          {/* Availability Status */}
          <div className="mt-6 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-medium">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span>Available for Full-Time Roles & Opportunities</span>
          </div>

          {/* Quick Contact Cards */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {/* Email Card */}
            <div className="rounded-2xl bg-white/80 dark:bg-slate-950/60 border border-slate-200 dark:border-white/[0.08] p-5 flex flex-col justify-between hover:border-cyan-500/40 transition-colors group">
              <div>
                <div className="w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-3">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Email
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                  {PROFILE_DATA.contact.email}
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 hover:bg-cyan-500 hover:text-slate-950 transition-colors"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
                <a
                  href={`mailto:${PROFILE_DATA.contact.email}`}
                  className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 hover:text-cyan-500 transition-colors"
                  aria-label="Send email directly"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* LinkedIn Card */}
            <a
              href={PROFILE_DATA.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-white/80 dark:bg-slate-950/60 border border-slate-200 dark:border-white/[0.08] p-5 flex flex-col justify-between hover:border-cyan-500/40 transition-colors group"
            >
              <div>
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  LinkedIn
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                  {PROFILE_DATA.contact.linkedinUsername}
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs font-medium text-cyan-600 dark:text-cyan-400 group-hover:translate-x-0.5 transition-transform">
                <span>View Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </a>

            {/* GitHub Card */}
            <a
              href={PROFILE_DATA.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-white/80 dark:bg-slate-950/60 border border-slate-200 dark:border-white/[0.08] p-5 flex flex-col justify-between hover:border-cyan-500/40 transition-colors group"
            >
              <div>
                <div className="w-9 h-9 rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-3">
                  <Github className="w-4 h-4" />
                </div>
                <div className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  GitHub
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                  @{PROFILE_DATA.contact.githubUsername}
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs font-medium text-cyan-600 dark:text-cyan-400 group-hover:translate-x-0.5 transition-transform">
                <span>Explore Code</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </a>

            {/* Resume Download Card */}
            <a
              href={PROFILE_DATA.contact.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-white/80 dark:bg-slate-950/60 border border-slate-200 dark:border-white/[0.08] p-5 flex flex-col justify-between hover:border-cyan-500/40 transition-colors group"
            >
              <div>
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Resume
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                  Official PDF (Verified)
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs font-medium text-cyan-600 dark:text-cyan-400 group-hover:translate-x-0.5 transition-transform">
                <span>Download Resume</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </a>
          </div>

          {/* Location & Back to Top Row */}
          <div className="mt-10 pt-6 border-t border-slate-200/60 dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            <div className="inline-flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-cyan-500" />
              <span>{PROFILE_DATA.contact.location} • Open to Remote & Relocation</span>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-200 dark:hover:bg-white/[0.08] transition-colors"
              aria-label="Scroll to top of the page"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
