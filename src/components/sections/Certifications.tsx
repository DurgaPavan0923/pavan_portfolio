'use client';

import React from 'react';
import { CERTIFICATIONS } from '@/data/certifications';
import { PROFILE_DATA } from '@/data/profile';
import { ExternalLink, ShieldCheck, GraduationCap, Calendar, MapPin, Award } from 'lucide-react';

export function Certifications() {
  return (
    <section id="credentials" aria-label="Credentials & Education" className="relative py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-mono font-medium mb-3">
            <span>05 // CREDENTIALS &amp; EDUCATION</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-slate-100 tracking-tight mb-4">
            Education, Certifications &amp; <span className="text-gradient-cyan">Verified Honors</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Formal university engineering foundation, specialized industry certifications, and national hackathon qualifications.
          </p>
        </div>

        {/* 1. Formal University Education Card */}
        <div className="mb-12">
          <div className="p-6 sm:p-8 rounded-3xl glass-card border-cyan-400/30 relative overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-amber-400 to-violet-500" />
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

              {/* Education Meta Details: Period, Location, CGPA & Verification */}
              <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-between gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-white/[0.04]">
                <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-cyan-500" />
                    {PROFILE_DATA.education.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                    {PROFILE_DATA.education.location}
                  </span>
                </div>

                {/* CGPA with Verification Path */}
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-right">
                    <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase">Current CGPA</div>
                    <div className="text-sm font-bold font-mono text-slate-900 dark:text-slate-100">{PROFILE_DATA.education.cgpa}</div>
                  </div>
                  <a
                    href="http://115.240.101.71:81/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-white dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.1] text-[11px] font-mono text-cyan-600 dark:text-cyan-400 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    title="SOA University Student Portal Verification"
                  >
                    <span>Result Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Industry Certifications Grid */}
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200 dark:border-white/[0.08]">
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span>Professional Certifications &amp; Hackathon Honors</span>
          </h3>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            {CERTIFICATIONS.length} Verified Credentials
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              className="p-5 rounded-2xl glass-card flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-cyan-400/30"
            >
              <div>
                <div className="flex items-center mb-3">
                  <span className="text-2xl p-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.06] shadow-sm">
                    {cert.icon}
                  </span>
                </div>

                <h4 className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors mb-1">
                  {cert.name}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">{cert.issuer}</p>

                {cert.credentialId && (
                  <p className="text-[10px] font-mono text-slate-500 dark:text-slate-500 mt-2">
                    ID: {cert.credentialId}
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
