'use client';

import React, { useState } from 'react';
import { PROJECTS } from '@/data/projects';
import { Project, ProjectCategory } from '@/types';
import { ProjectModal } from './ProjectModal';
import { ExternalLink, Github, Layers, ArrowRight, Sparkles } from 'lucide-react';

const CATEGORIES: ProjectCategory[] = ['All', 'AI/ML', 'Full Stack AI', 'NLP', 'Web3', 'Open Source'];

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const filteredProjects =
    selectedCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" aria-label="Featured Projects" className="relative py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-medium mb-3">
            <span>03 // FEATURED WORK</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-100 tracking-tight mb-4">
            Production AI Applications &amp; <span className="text-gradient-cyan">Intelligent Systems</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            Architected with modern ML frameworks, graph databases, multi-agent reasoning, and edge cloud runtimes.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20 scale-105'
                    : 'bg-white/[0.04] text-slate-400 hover:text-slate-200 hover:bg-white/[0.08] border border-white/[0.06]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.slug}
              className={`p-6 rounded-3xl glass-card flex flex-col justify-between group relative overflow-hidden ${
                project.featured ? 'border-cyan-400/30' : ''
              }`}
            >
              {/* Top Accent Gradient Line */}
              {project.featured && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-emerald-400 to-violet-500" />
              )}

              <div>
                {/* Header: Emoji & Categories */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl p-2 rounded-2xl bg-white/[0.03] border border-white/[0.06] group-hover:scale-110 transition-transform">
                    {project.emoji}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-mono text-cyan-400 font-semibold uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        Flagship
                      </span>
                    )}
                  </div>
                </div>

                {/* Title & Tagline */}
                <h3 className="font-display font-bold text-lg sm:text-xl text-slate-100 mb-2 group-hover:text-cyan-400 transition-colors">
                  {project.name}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
                  {project.tagline}
                </p>

                {/* Metric Highlight Pill */}
                {project.metrics && project.metrics[0] && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-cyan-500/5 border border-cyan-500/15 text-xs font-mono text-cyan-300 mb-5">
                    <span className="font-bold text-cyan-400">{project.metrics[0].value}</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-slate-400">{project.metrics[0].label}</span>
                  </div>
                )}

                {/* Technologies Chips */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.slice(0, 4).map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-[11px] font-mono text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-0.5 rounded-md bg-white/[0.02] text-[11px] font-mono text-slate-500">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
                <button
                  type="button"
                  onClick={() => setActiveModalProject(project)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 group-hover:translate-x-1 transition-all"
                >
                  <span>Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors border border-white/[0.06]"
                    aria-label={`${project.name} Source Code`}
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/[0.04] hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-300 transition-colors border border-white/[0.06]"
                      aria-label={`${project.name} Live Demo`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}
