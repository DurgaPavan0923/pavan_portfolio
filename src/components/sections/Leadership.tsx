'use client';

import React from 'react';
import { LEADERSHIP_RECOGNITIONS } from '@/data/leadership';
import { Shield, Award, GraduationCap, Terminal, Code2, Sparkles } from 'lucide-react';

export function Leadership() {
  const getLeadershipIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield':
        return <Shield className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />;
      case 'Award':
        return <Award className="w-5 h-5 text-amber-500" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />;
      case 'Terminal':
        return <Terminal className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />;
      default:
        return <Award className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />;
    }
  };

  return (
    <section id="leadership" aria-label="Leadership & Service" className="relative py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-medium mb-3">
            <span>07 // LEADERSHIP &amp; CIVIC SERVICE</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-slate-100 tracking-tight mb-4">
            Discipline, Service &amp; <span className="text-gradient-cyan">Campus Coordination</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Demonstrated commitment through National Cadet Corps sergeant service, Bharat Scouts &amp; Guides civic leadership, and university initiatives.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEADERSHIP_RECOGNITIONS.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl glass-card flex flex-col justify-between group transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div>
                <div className="flex items-center mb-4">
                  <div className="p-2.5 rounded-2xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] shadow-sm">
                    {getLeadershipIcon(item.icon)}
                  </div>
                </div>

                <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors mb-1">
                  {item.title}
                </h3>
                <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-3">{item.organization}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{item.description}</p>
              </div>

              {item.period && (
                <div className="pt-3 border-t border-slate-100 dark:border-white/[0.04] text-[11px] font-mono text-slate-500">
                  {item.period}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
