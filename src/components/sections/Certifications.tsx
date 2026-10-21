'use client';

import React from 'react';
import { CERTIFICATIONS } from '@/data/certifications';
import { ExternalLink, ShieldCheck } from 'lucide-react';

export function Certifications() {
  return (
    <section id="credentials" aria-label="Certifications & Hackathons" className="relative py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-mono font-medium mb-3">
            <span>07 // CREDENTIALS & HONORS</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-slate-100 tracking-tight mb-4">
            Industry Certifications &amp; <span className="text-gradient-cyan">Hackathon Distinctions</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Verified credentials in Graph Databases, Cloud Engineering, Deep Learning, and national hackathon qualifiers.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              className="p-5 rounded-2xl glass-card flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              <div>
                <div className="flex items-center mb-3">
                  <span className="text-2xl p-1.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.06] shadow-sm">
                    {cert.icon}
                  </span>
                </div>

                <h3 className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors mb-1">
                  {cert.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">{cert.issuer}</p>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 dark:border-white/[0.04] text-xs font-mono">
                <span className="text-slate-500">{cert.date}</span>
                {cert.verifyUrl ? (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-semibold"
                  >
                    <span>Verify</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
                    <span>Available on request</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
