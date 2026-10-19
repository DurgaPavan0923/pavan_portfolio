'use client';

import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '@/data/skills';
import { Sparkles, Layers, Cpu, Cloud, Terminal, Database, Code2 } from 'lucide-react';

export function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categoryIcons: Record<string, React.ReactNode> = {
    'Generative AI, LLMs & RAG': <Sparkles className="w-4 h-4 text-cyan-400" />,
    'Machine Learning & Deep Learning': <Cpu className="w-4 h-4 text-emerald-400" />,
    'Cloud Platforms & MLOps': <Cloud className="w-4 h-4 text-violet-400" />,
    'Languages & Core Computer Science': <Terminal className="w-4 h-4 text-amber-400" />,
    'Databases & Storage': <Database className="w-4 h-4 text-cyan-400" />,
    'Frontend & Interactive Visuals': <Code2 className="w-4 h-4 text-emerald-400" />,
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
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium mb-3">
            <span>02 // TECHNICAL TOOLKIT</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-100 tracking-tight mb-4">
            AI Toolkit, Cloud Services &amp; <span className="text-gradient-cyan">Core Technologies</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            A battle-tested technology stack spanning multi-agent orchestration, graph RAG, deep learning frameworks, and cloud infrastructure.
          </p>
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
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20 scale-105'
                    : 'bg-white/[0.04] text-slate-400 hover:text-slate-200 hover:bg-white/[0.08] border border-white/[0.06]'
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
              className="p-6 rounded-2xl glass-card flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] group-hover:border-cyan-400/40 transition-colors">
                    {categoryIcons[cat.title] || <Layers className="w-4 h-4 text-cyan-400" />}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-slate-100 group-hover:text-cyan-400 transition-colors">
                      {cat.title}
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-5">{cat.description}</p>
              </div>

              {/* Skills Pills */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-white/[0.04]">
                {cat.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-cyan-400/30 text-xs font-medium text-slate-200 transition-colors"
                  >
                    <span>{skill.icon}</span>
                    <span>{skill.name}</span>
                    {skill.level === 'Expert' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00cfff]" title="Expert" />
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
