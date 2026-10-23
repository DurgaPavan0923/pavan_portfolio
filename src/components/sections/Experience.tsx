'use client';

import React from 'react';
import { EXPERIENCES } from '@/data/experience';
import { Calendar, MapPin, CheckCircle, ExternalLink, Github } from 'lucide-react';

export function Experience() {
  return (
    <section id="experience" aria-label="Work Experience" className="relative py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-medium mb-3">
            <span>02 // WORK EXPERIENCE</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-slate-100 tracking-tight mb-4">
            Internships, Research &amp; <span className="text-gradient-cyan">Engineering Roles</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Hands-on machine learning engineering, applied research at IITs, and technical community leadership with measurable outcomes.
          </p>
        </div>

        {/* Timeline List */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-cyan-500/30 dark:border-cyan-500/20 space-y-10">
          {EXPERIENCES.map((exp, idx) => {
            const isCurrent = idx === 0;
            return (
              <div key={idx} className="relative group">
                {/* Timeline Node Icon */}
                <div
                  className={`absolute -left-[35px] sm:-left-[43px] top-1.5 w-8 h-8 rounded-full bg-white dark:bg-slate-950 border-2 border-cyan-500 dark:border-cyan-400/60 flex items-center justify-center text-sm shadow-[0_0_15px_rgba(0,207,255,0.35)] group-hover:scale-125 group-hover:border-cyan-400 transition-all duration-300 z-10 ${
                    isCurrent ? 'ring-4 ring-cyan-400/20' : ''
                  }`}
                >
                  {exp.icon}
                  {isCurrent && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  )}
                </div>

                {/* Card Container */}
                <div className="p-6 rounded-3xl glass-card transition-all duration-300 group-hover:border-cyan-400/40 group-hover:-translate-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-display font-bold text-lg text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                        {exp.title}
                      </h3>
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{exp.company}</p>
                    </div>

                    <div className="flex flex-col sm:items-end text-xs font-mono text-slate-500 dark:text-slate-400 gap-1 shrink-0">
                      <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                        <Calendar className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                        <span>{exp.period}</span>
                      </span>
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{exp.location}</span>
                      </span>
                    </div>
                  </div>

                  {/* Bullet Points */}
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 my-4">
                    {exp.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-cyan-500 dark:text-cyan-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{pt}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Skills Chips & Direct Links */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-white/[0.04]">
                    <div className="flex flex-wrap gap-1.5">
                      {exp.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded-md bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] text-[11px] font-mono text-slate-600 dark:text-slate-400 hover:border-cyan-400/40 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Links to repo or verification */}
                    <div className="flex items-center gap-3 shrink-0">
                      {exp.repoUrl && (
                        <a
                          href={exp.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-mono font-medium text-cyan-600 dark:text-cyan-400 hover:underline"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Code Repository</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                      {exp.verifyUrl && (
                        <a
                          href={exp.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-mono font-medium text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:underline"
                        >
                          <span>Verification</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
