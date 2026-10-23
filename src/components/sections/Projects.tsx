'use client';

import React, { useState } from 'react';
import { PROJECTS } from '@/data/projects';
import { Project } from '@/types';
import { ProjectModal } from './ProjectModal';
import {
  ExternalLink,
  Github,
  ArrowRight,
  BarChart3,
  Lightbulb,
  AlertCircle,
  FileCheck2,
  Layers,
  Wrench,
} from 'lucide-react';

export function Projects() {
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const featuredProjects = PROJECTS.filter((p) => p.featured);
  const secondaryProjects = PROJECTS.filter((p) => !p.featured);

  return (
    <section id="projects" aria-label="Featured Projects" className="relative py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-medium mb-3">
            <span>01 // FEATURED PROJECTS</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-slate-100 tracking-tight mb-4">
            Evaluated AI Systems &amp; <span className="text-gradient-cyan">Engineered Applications</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Every featured project includes an empirical evaluation pipeline with published datasets, run scripts, and reproducibility methodologies.
          </p>
        </div>

        {/* 3 Prominent Featured Project Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {featuredProjects.map((project) => (
            <div
              key={project.slug}
              className="p-6 rounded-3xl glass-card flex flex-col justify-between group relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl border-cyan-400/40 dark:border-cyan-400/30"
            >
              {/* Top Accent Gradient Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-emerald-400 to-violet-500" />

              <div>
                {/* Header: Emoji & Repo Links */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl p-2.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    {project.emoji}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.name} GitHub Repository`}
                        className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        title="View GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.name} Live Demo`}
                        className="p-2 rounded-xl text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        title="Launch Live Application"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 dark:text-slate-100 mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  {project.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {project.tagline}
                </p>

                {/* Structured Recruiter Breakdown: Problem → Approach → Result → What I'd Improve */}
                <div className="space-y-3.5 my-4 text-xs leading-relaxed">
                  {/* 1. Problem */}
                  <div className="p-3 rounded-xl bg-amber-500/[0.06] border border-amber-500/15">
                    <div className="flex items-center gap-1.5 font-bold text-amber-700 dark:text-amber-400 text-[11px] uppercase tracking-wider mb-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>Problem</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300">{project.problem}</p>
                  </div>

                  {/* 2. Approach */}
                  <div className="p-3 rounded-xl bg-cyan-500/[0.06] border border-cyan-500/15">
                    <div className="flex items-center gap-1.5 font-bold text-cyan-700 dark:text-cyan-400 text-[11px] uppercase tracking-wider mb-1">
                      <Lightbulb className="w-3.5 h-3.5 shrink-0" />
                      <span>Approach</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300">{project.approach || project.solution}</p>
                  </div>

                  {/* 3. Result (Real numbers, n, dataset, date) */}
                  {project.evalResult && (
                    <div className="p-3 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/15">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400 text-[11px] uppercase tracking-wider">
                          <BarChart3 className="w-3.5 h-3.5 shrink-0" />
                          <span>Evaluation Result</span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                          {project.evalResult.date}
                        </span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 mb-2">
                        {project.evalResult.summary}
                      </p>
                      <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mb-2">
                        Dataset: <span className="font-semibold text-slate-700 dark:text-slate-300">{project.evalResult.dataset}</span> ({project.evalResult.sampleSize})
                      </div>
                      {/* Metric Pills */}
                      <div className="grid grid-cols-2 gap-1.5">
                        {project.evalResult.metrics.map((m, idx) => (
                          <div key={idx} className="p-1.5 rounded-lg bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-white/[0.06] text-center">
                            <div className="font-bold text-[11px] text-emerald-600 dark:text-emerald-400">{m.value}</div>
                            <div className="text-[9px] font-mono text-slate-500 uppercase">{m.label}</div>
                          </div>
                        ))}
                      </div>
                      {/* Link to /evals */}
                      {project.evalUrl && (
                        <div className="mt-2.5 pt-2 border-t border-emerald-500/10 flex items-center justify-between">
                          <a
                            href={project.evalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                          >
                            <FileCheck2 className="w-3 h-3" />
                            <span>Read /evals Methodology</span>
                            <span className="text-[9px]">↗</span>
                          </a>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 4. What I'd Improve */}
                  {project.whatIdImprove && (
                    <div className="p-3 rounded-xl bg-violet-500/[0.06] border border-violet-500/15">
                      <div className="flex items-center gap-1.5 font-bold text-violet-700 dark:text-violet-400 text-[11px] uppercase tracking-wider mb-1">
                        <Wrench className="w-3.5 h-3.5 shrink-0" />
                        <span>What I’d Improve</span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300">{project.whatIdImprove}</p>
                    </div>
                  )}
                </div>

                {/* Tech Stack Chips (Only technology chips) */}
                <div className="flex flex-wrap gap-1.5 my-4">
                  {project.technologies.slice(0, 5).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/[0.06]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono text-slate-500">
                      +{project.technologies.length - 5}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-slate-100 dark:border-white/[0.04] flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setActiveModalProject(project)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors group/btn cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <span>Detailed Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400"
                    >
                      <span>Repo</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Secondary Compact Projects (IRA, AGORA, Algorithm Arena, SOA NCC without metrics) */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200 dark:border-white/[0.08]">
            <div>
              <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 dark:text-slate-100">
                Secondary Systems &amp; Prototypes
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Simulation prototypes, hackathon builds, and campus portals (compact cards without performance metrics).
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400">{secondaryProjects.length} Systems</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {secondaryProjects.map((project) => (
              <div
                key={project.slug}
                className="p-5 rounded-2xl glass-card flex flex-col justify-between group transition-all duration-200 hover:-translate-y-1 hover:border-cyan-400/30"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{project.emoji}</span>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.name} Repository`}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>

                  <h4 className="font-display font-bold text-sm text-slate-900 dark:text-slate-100 mb-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {project.name}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-3">
                    {project.description}
                  </p>

                  {/* Technology Chips */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-white/[0.04] flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">
                    {project.slug === 'ira-smart-city' || project.slug === 'agora-governance'
                      ? 'Demo Mode'
                      : 'Open Source'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveModalProject(project)}
                    className="text-[11px] font-semibold text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer"
                  >
                    Details ↗
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deep Case Study Modal */}
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      </div>
    </section>
  );
}
