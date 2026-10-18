'use client';

import React from 'react';
import { GraduationCap, MapPin, Cloud, Award, Sparkles, Code, ArrowUpRight, Github, Linkedin, FileText } from 'lucide-react';
import { PROFILE_DATA } from '@/data/profile';

export function About() {
  const INFO_CARDS = [
    {
      icon: <GraduationCap className="w-5 h-5 text-cyan-400" />,
      label: 'Degree & University',
      value: 'B.Tech CSE (AI & ML)',
      sub: 'SOA University (ITER) · 2023 – 2027',
    },
    {
      icon: <MapPin className="w-5 h-5 text-violet-400" />,
      label: 'Location & Availability',
      value: 'Bhubaneswar, Odisha',
      sub: 'Open to Remote & On-Site Roles',
    },
    {
      icon: <Cloud className="w-5 h-5 text-emerald-400" />,
      label: 'Cloud & Infrastructure',
      value: 'Azure & Google Cloud',
      sub: 'MS Elevate Intern · 98 GCP Badges',
    },
    {
      icon: <Award className="w-5 h-5 text-amber-400" />,
      label: 'Leadership Experience',
      value: 'GDGoC Coordinator & NCC Sergeant',
      sub: 'Led 100+ member team · Rajya Puraskar',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-cyan-400" />,
      label: 'Core Specialization',
      value: 'RAG & Multi-Agent AI',
      sub: 'Graph RAG (Neo4j) · Gemini API',
    },
    {
      icon: <Code className="w-5 h-5 text-emerald-400" />,
      label: 'Currently Engineering',
      value: 'FactLens AI Platform',
      sub: 'Explainable AI & Misinformation Research',
    },
  ];

  return (
    <section id="about" aria-label="About Section" className="relative py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-medium mb-3">
            <span>01 // WHO I AM</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-100 tracking-tight">
            Engineering Systems from <span className="text-gradient-cyan">Checkpoints to Production</span>
          </h2>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Bio Narrative */}
          <div className="lg:col-span-6 flex flex-col gap-5 text-slate-300 text-sm sm:text-base leading-relaxed">
            {PROFILE_DATA.bioParagraphs.map((para, i) => (
              <p key={i} className="text-slate-300 leading-relaxed">
                {para}
              </p>
            ))}

            {/* Quick Links Row */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <a
                href={PROFILE_DATA.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-slate-200 hover:text-white text-xs font-semibold transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-slate-500" />
              </a>

              <a
                href={PROFILE_DATA.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-slate-200 hover:text-white text-xs font-semibold transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-cyan-400" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3 text-slate-500" />
              </a>

              <a
                href="/Rajana.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-slate-200 hover:text-white text-xs font-semibold transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>Resume (PDF)</span>
                <ArrowUpRight className="w-3 h-3 text-slate-500" />
              </a>
            </div>
          </div>

          {/* Right: Info Cards Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {INFO_CARDS.map((card, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl glass-card flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] group-hover:border-cyan-400/30 transition-colors">
                    {card.icon}
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    {card.label}
                  </span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm sm:text-base text-slate-100 mb-1 group-hover:text-cyan-400 transition-colors">
                    {card.value}
                  </h3>
                  <p className="text-xs text-slate-400 leading-snug">{card.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
