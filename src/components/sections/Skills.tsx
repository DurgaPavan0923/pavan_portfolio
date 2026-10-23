'use client';

import React from 'react';
import { SKILL_CATEGORIES } from '@/data/skills';
import { Sparkles, Terminal, Code2, Database } from 'lucide-react';

const MARQUEE_TECH = [
  { name: 'PyTorch', icon: '🔥' },
  { name: 'Google Gemini API', icon: '✨' },
  { name: 'Neo4j Graph RAG', icon: '🕸️' },
  { name: 'Microsoft Azure', icon: '☁️' },
  { name: 'Pinecone Vector DB', icon: '🌲' },
  { name: 'FastAPI & Python', icon: '⚡' },
  { name: 'Scikit-Learn', icon: '📊' },
  { name: 'Next.js 15 & React 19', icon: '⚛️' },
  { name: 'Docker', icon: '🐳' },
  { name: 'Hugging Face', icon: '🤗' },
];

export function Skills() {
  const categoryIcons: Record<string, React.ReactNode> = {
    'Core (Use Daily)': <Terminal className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />,
    'Working (Used in Projects)': <Sparkles className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />,
    'Familiar (Coursework & Labs)': <Database className="w-5 h-5 text-violet-500 dark:text-violet-400" />,
  };

  const totalSkillsCount = SKILL_CATEGORIES.reduce((acc, cat) => acc + cat.skills.length, 0);

  return (
    <section id="skills" aria-label="Skills & AI Toolkit" className="relative py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium mb-3">
            <span>04 // SKILLS &amp; TOOLKIT</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-slate-100 tracking-tight mb-4">
            Demonstrable Skills &amp; <span className="text-gradient-cyan">Engineering Toolkit</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Only technologies proven in code repositories, evaluated systems, or university coursework. Grouped by actual usage frequency ({totalSkillsCount} total competencies).
          </p>
        </div>

        {/* Continuous Animated Marquee Ribbon */}
        <div className="relative w-full overflow-hidden mb-12 py-3 border-y border-slate-200 dark:border-white/[0.08] bg-slate-50/50 dark:bg-white/[0.01]">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="flex gap-4 w-max animate-marquee hover:[animation-play-state:paused]">
            {[...MARQUEE_TECH, ...MARQUEE_TECH].map((tech, i) => (
              <div
                key={i}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] shadow-sm text-xs font-medium text-slate-700 dark:text-slate-200 hover:scale-105 hover:border-cyan-400 transition-all cursor-default"
              >
                <span className="text-sm">{tech.icon}</span>
                <span className="font-semibold text-slate-800 dark:text-slate-100">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Structured Tiers: Core, Working, Familiar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl glass-card flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-cyan-400/40 relative overflow-hidden"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] group-hover:border-cyan-400/50 transition-colors shadow-sm">
                    {categoryIcons[cat.title] || <Code2 className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {cat.title}
                    </h3>
                    <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400">
                      {cat.skills.length} verified technologies
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {cat.description}
                </p>
              </div>

              {/* Skills Chips */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-white/[0.04]">
                {cat.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.06] hover:border-cyan-400/50 text-xs font-mono font-medium text-slate-700 dark:text-slate-200 transition-all duration-200 hover:scale-105"
                  >
                    <span>{skill.icon}</span>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
