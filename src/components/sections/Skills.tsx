'use client';

import React from 'react';
import { SKILL_CATEGORIES } from '@/data/skills';
import { Sparkles, Layers, Cpu, Cloud, Terminal, Database, Code2 } from 'lucide-react';

const MARQUEE_TECH = [
  { name: 'PyTorch', icon: '🔥' },
  { name: 'Google Gemini API', icon: '✨' },
  { name: 'Neo4j Graph RAG', icon: '🕸️' },
  { name: 'Microsoft Azure', icon: '☁️' },
  { name: 'Pinecone Vector DB', icon: '🌲' },
  { name: 'Google Cloud Platform', icon: '🌐' },
  { name: 'LangChain & LlamaIndex', icon: '🦜' },
  { name: 'Next.js 15 & React 19', icon: '⚛️' },
  { name: 'Docker & Kubernetes', icon: '🐳' },
  { name: 'FastAPI & Python', icon: '⚡' },
  { name: 'Scikit-Learn', icon: '📊' },
  { name: 'Three.js & Canvas', icon: '🎨' },
];

export function Skills() {
  const categoryIcons: Record<string, React.ReactNode> = {
    'Generative AI, LLMs & RAG': <Sparkles className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />,
    'Machine Learning & Deep Learning': <Cpu className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />,
    'Cloud Platforms & MLOps': <Cloud className="w-4 h-4 text-violet-500 dark:text-violet-400" />,
    'Languages & Core Computer Science': <Terminal className="w-4 h-4 text-amber-500 dark:text-amber-400" />,
    'Databases & Storage': <Database className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />,
    'Frontend & Interactive Visuals': <Code2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />,
  };

  return (
    <section id="skills" aria-label="Skills & AI Toolkit" className="relative py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium mb-3">
            <span>04 // SKILLS & TOOLKIT</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-slate-100 tracking-tight mb-4">
            AI Toolkit, Cloud Services &amp; <span className="text-gradient-cyan">Core Technologies</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            A battle-tested technology stack spanning multi-agent orchestration, graph RAG, deep learning frameworks, and enterprise cloud infrastructure.
          </p>
        </div>

        {/* Infinite Animated Marquee Ribbon */}
        <div className="relative w-full overflow-hidden mb-14 py-3 border-y border-slate-200 dark:border-white/[0.08] bg-slate-50/50 dark:bg-white/[0.01]">
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

        {/* Categories Grid (Clean Grouped Sections) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl glass-card flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-cyan-400/40"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] group-hover:border-cyan-400/50 transition-colors shadow-sm">
                    {categoryIcons[cat.title] || <Layers className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {cat.title}
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-5">{cat.description}</p>
              </div>

              {/* Skills Chips */}
              <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100 dark:border-white/[0.04]">
                {cat.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-white/[0.03] hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.06] hover:border-cyan-400/50 text-xs font-medium text-slate-700 dark:text-slate-200 transition-all duration-200 hover:scale-105"
                  >
                    <span>{skill.icon}</span>
                    <span>{skill.name}</span>
                    {skill.level === 'Expert' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 shadow-[0_0_6px_#00cfff]" title="Expert" />
                    )}
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
