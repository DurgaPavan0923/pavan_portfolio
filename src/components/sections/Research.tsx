'use client';

import React from 'react';
import { RESEARCH_INTERESTS } from '@/data/research';

export function Research() {
  return (
    <section id="research" aria-label="Research Focus Areas" className="relative py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-400 text-xs font-mono font-medium mb-3">
            <span>06 // ACADEMIC & RESEARCH FOCUS</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-slate-100 tracking-tight mb-4">
            Research Interests &amp; <span className="text-gradient-cyan">Inquiry Domains</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Exploring the intersection of structured knowledge graphs, autonomous multi-agent reasoning, and deep representation spaces.
          </p>
        </div>

        {/* Research Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESEARCH_INTERESTS.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl glass-card flex flex-col justify-between group transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl p-2.5 rounded-2xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    {item.icon}
                  </span>
                  <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Keyword Pills */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100 dark:border-white/[0.04]">
                {item.keywords.map((kw, kIdx) => (
                  <span
                    key={kIdx}
                    className="px-2.5 py-0.5 rounded-md bg-cyan-50 dark:bg-cyan-500/5 border border-cyan-200 dark:border-cyan-500/15 text-[11px] font-mono text-cyan-700 dark:text-cyan-300 hover:scale-105 transition-transform"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
