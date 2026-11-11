'use client';

import React from 'react';
import { CERTIFICATIONS } from '@/data/certifications';
import { PROFILE_DATA } from '@/data/profile';
import {
  ExternalLink,
  ShieldCheck,
  GraduationCap,
  Calendar,
  MapPin,
  Award,
  Link as LinkIcon,
  Cloud,
  Brain,
  Terminal,
  Code2,
  Trophy,
} from 'lucide-react';

export function Certifications() {
  const getCertIcon = (iconName: string) => {
    switch (iconName) {
      case 'Link':
        return <LinkIcon className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />;
      case 'Cloud':
        return <Cloud className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />;
      case 'Brain':
        return <Brain className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />;
      case 'Terminal':
        return <Terminal className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />;
      case 'Trophy':
        return <Trophy className="w-5 h-5 text-amber-500" />;
      case 'Award':
        return <Award className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />;
      default:
        return <Award className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />;
    }
  };

  return (
    <section id="certifications" aria-label="Education and Certifications" className="relative py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-medium mb-3">
            <span>06 // EDUCATION &amp; CERTIFICATIONS</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-slate-100 tracking-tight mb-4">
            Education &amp; <span className="text-gradient-cyan">Certifications</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Formal university engineering foundation at SOA ITER, professional industry certifications, and hackathon participations.
          </p>
        </div>

        {/* 1. Formal University Education Card */}
        <div className="mb-12">
          <div className="p-6 sm:p-8 rounded-3xl glass-card border-cyan-400/30 relative overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-cyan-500" />
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 shadow-sm shrink-0">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-semibold bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20 mb-2">
                    Undergraduate Degree
                  </div>
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-slate-100">
                    {PROFILE_DATA.education.degree}
                  </h3>
                  <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400 mt-0.5">
                    Specialization in {PROFILE_DATA.education.field}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {PROFILE_DATA.education.institution}
                  </p>
                </div>
              </div>

              {/* Education Meta Details: Period & Location */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-white/[0.04]">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  {PROFILE_DATA.education.period}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  {PROFILE_DATA.education.location}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Industry Certifications Grid */}
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200 dark:border-white/[0.08]">
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Award className="w-5 h-5 text-cyan-500" />
            <span>Certifications</span>
          </h3>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            {CERTIFICATIONS.length} Credentials Listed
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              className="p-5 rounded-2xl glass-card flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-cyan-400/30"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.06] shadow-sm">
                    {getCertIcon(cert.icon)}
                  </div>
                  {cert.type && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/[0.04]">
                      {cert.type}
                    </span>
                  )}
                </div>

                <h4 className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors mb-1">
                  {cert.name}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">{cert.issuer}</p>

                {cert.credentialId && (
                  <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-2">
                    {cert.credentialId}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 dark:border-white/[0.04] text-xs font-mono">
                <span className="text-slate-500">{cert.date}</span>
                {cert.verifyUrl ? (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  >
                    <span>Verification Portal</span>
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
