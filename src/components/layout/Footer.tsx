'use client';

import React, { useEffect, useState } from 'react';
import { ArrowUp, Github, Linkedin, Mail, Clock, Heart } from 'lucide-react';
import { PROFILE_DATA } from '@/data/profile';

export function Footer() {
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      // Calculate IST time (UTC+5:30)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      const formatter = new Intl.DateTimeFormat([], options);
      setLocalTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/[0.08] bg-slate-950/60 backdrop-blur-md pt-12 pb-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Top Tier */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Tagline */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className="font-display font-bold text-lg tracking-tight text-slate-100">
                {PROFILE_DATA.fullName}
              </span>
              <span className="text-cyan-400 font-mono text-xs">/ AI & ML Engineer</span>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              SOA University (ITER) · Neo4j Certified · Google Cloud Diamond League · TIH IIT Guwahati Intern
            </p>
          </div>

          {/* Time & Availability Badge */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for AI/ML Roles</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-400 text-xs font-mono">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Bhubaneswar, IN: {localTime || '10:45 PM IST'}</span>
            </div>
          </div>
        </div>

        {/* Middle Tier: Social & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/[0.04]">
          <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
            <a
              href={PROFILE_DATA.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href={PROFILE_DATA.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <a
              href={`mailto:${PROFILE_DATA.contact.email}`}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{PROFILE_DATA.contact.email}</span>
            </a>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-slate-100 text-xs transition-colors border border-white/[0.08]"
            aria-label="Back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3 h-3 text-cyan-400" />
          </button>
        </div>

        {/* Bottom Tier */}
        <div className="text-center text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} Rajana Durga Pavan Kumar. Engineered with Next.js 15, TypeScript & Tailwind.</p>
          <p className="flex items-center gap-1">
            <span>Built with precision & passion</span>
            <Heart className="w-3 h-3 text-cyan-400 fill-cyan-400" />
          </p>
        </div>
      </div>
    </footer>
  );
}
