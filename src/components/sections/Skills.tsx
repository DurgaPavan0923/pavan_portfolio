'use client';

import React from 'react';
import { SKILL_CATEGORIES } from '@/data/skills';
import { Sparkles, Terminal, Code2, Cloud, Brain, Layers } from 'lucide-react';

export function Skills() {
  const categoryIcons: Record<string, React.ReactNode> = {
    'Machine Learning': <Brain className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
    'Generative AI': <Sparkles className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
    'AI Engineering': <Terminal className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
    'Full-Stack & Cloud': <Cloud className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
  };

  const totalSkillsCount = SKILL_CATEGORIES.reduce((acc, cat) => acc + cat.skills.length, 0);

  return (
    <section id="skills" aria-label="Technical Skills" className="relative py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-medium mb-3">
            <span>05 // TECHNICAL SKILLS</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-slate-100 tracking-tight mb-4">
            Technical <span className="text-gradient-cyan">Skills</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Only technologies proven in code repositories, evaluated systems, or university coursework. Structured into 4 core competencies ({totalSkillsCount} total competencies).
          </p>
        </div>

        {/* 4 Balanced Competency Groups in 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl glass-card flex flex-col justify-between group transition-all duration-200 hover:-translate-y-1 hover:border-cyan-400/40 relative overflow-hidden"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] group-hover:border-cyan-400/50 transition-colors shadow-sm">
                    {categoryIcons[cat.title] || <Code2 className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
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
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.06] hover:border-cyan-400/50 text-xs font-mono font-medium text-slate-700 dark:text-slate-200 transition-all duration-200"
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
