'use client';

import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '@/data/skills';
import { Sparkles, Layers, Cpu, Cloud, Terminal, Database, Code2, Zap } from 'lucide-react';

const MARQUEE_TECH = [
  { name: 'PyTorch', icon: '🔥', category: 'Deep Learning' },
  { name: 'Google Gemini 1.5', icon: '✨', category: 'GenAI' },
  { name: 'Neo4j Graph RAG', icon: '🕸️', category: 'Knowledge Graphs' },
  { name: 'Microsoft Azure', icon: '☁️', category: 'Cloud Infrastructure' },
  { name: 'Pinecone Vector DB', icon: '🌲', category: 'Vector Search' },
  { name: 'Google Cloud Platform', icon: '🌐', category: 'Cloud MLOps' },
  { name: 'LangChain & LlamaIndex', icon: '🦜', category: 'Agents' },
  { name: 'Next.js 15 & React 19', icon: '⚛️', category: 'Full Stack' },
  { name: 'Docker & Kubernetes', icon: '🐳', category: 'DevOps' },
  { name: 'FastAPI & Python', icon: '⚡', category: 'Backend' },
  { name: 'Scikit-Learn', icon: '📊', category: 'Machine Learning' },
  { name: 'Three.js & Canvas', icon: '🎨', category: 'Interactive 3D' },
];

export function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categoryIcons: Record<string, React.ReactNode> = {
    'Generative AI, LLMs & RAG': <Sparkles className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />,
    'Machine Learning & Deep Learning': <Cpu className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />,
    'Cloud Platforms & MLOps': <Cloud className="w-4 h-4 text-violet-500 dark:text-violet-400" />,
    'Languages & Core Computer Science': <Terminal className="w-4 h-4 text-amber-500 dark:text-amber-400" />,
    'Databases & Storage': <Database className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />,
    'Frontend & Interactive Visuals': <Code2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />,
  };

  const categories = ['All', ...SKILL_CATEGORIES.map((c) => c.title)];

  const displayCategories =
    selectedCategory === 'All'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.title === selectedCategory);

  return (
    <section id="skills" aria-label="Skills & AI Toolkit" className="relative py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium mb-3">
            <span>02 // TECHNICAL TOOLKIT</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-slate-100 tracking-tight mb-4">
            AI Toolkit, Cloud Services &amp; <span className="text-gradient-cyan">Core Technologies</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            A battle-tested technology stack spanning multi-agent orchestration, graph RAG, deep learning frameworks, and enterprise cloud infrastructure.
          </p>
        </div>

        {/* Infinite Animated Marquee Ribbon */}
        <div className="relative w-full overflow-hidden mb-12 py-3 border-y border-slate-200 dark:border-white/[0.08] bg-slate-50/50 dark:bg-white/[0.01]">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          <div className="flex gap-4 w-max animate-marquee hover:[animation-play-state:paused]">
            {[...MARQUEE_TECH, ...MARQUEE_TECH].map((tech, i) => (
              <div
                key={i}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] shadow-sm text-xs font-medium text-slate-700 dark:text-slate-200 hover:scale-105 hover:border-cyan-400 transition-all cursor-default"
              >
                <span className="text-sm">{tech.icon}</span>
                <span className="font-semibold text-slate-800 dark:text-slate-100">{tech.name}</span>
                <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10 px-1.5 py-0.5 rounded">
                  {tech.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20 scale-105'
                    : 'bg-white dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.06] shadow-sm'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCategories.map((cat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl glass-card flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] group-hover:border-cyan-400/50 transition-colors">
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

              {/* Skills Pills */}
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
