'use client';

import React, { useEffect } from 'react';
import { Project } from '@/types';
import { X, ExternalLink, Github, CheckCircle2, AlertTriangle, Lightbulb, Layers, Cpu } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} Details`}
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/[0.12] rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto z-10 animate-fade-up">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/[0.08]">
          <div className="flex items-center gap-3">
            <span className="text-3xl sm:text-4xl">{project.emoji}</span>
            <div>
              <h2 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-slate-100">
                {project.name}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.08] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/[0.08] transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tagline */}
        <p className="text-xs sm:text-sm text-cyan-700 dark:text-cyan-300 font-medium my-4 italic">
          {project.tagline}
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
          {project.metrics.map((m, idx) => (
            <div key={idx} className="p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] text-center">
              <div className="font-display font-extrabold text-lg sm:text-xl text-cyan-600 dark:text-cyan-400">{m.value}</div>
              <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Deep Dive Sections */}
        <div className="space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          {/* Problem */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-500/5 border border-amber-200 dark:border-amber-500/15">
            <div className="flex items-center gap-2 font-display font-bold text-amber-700 dark:text-amber-400 text-sm mb-1.5">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>The Problem Space</span>
            </div>
            <p className="leading-relaxed text-slate-700 dark:text-slate-300">{project.problem}</p>
          </div>

          {/* Solution */}
          <div className="p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-500/5 border border-cyan-200 dark:border-cyan-500/15">
            <div className="flex items-center gap-2 font-display font-bold text-cyan-700 dark:text-cyan-400 text-sm mb-1.5">
              <Lightbulb className="w-4 h-4 shrink-0" />
              <span>Engineered Architectural Solution</span>
            </div>
            <p className="leading-relaxed text-slate-700 dark:text-slate-300">{project.solution}</p>
          </div>

          {/* Architecture Steps (if present) */}
          {project.architectureSteps && (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06]">
              <div className="flex items-center gap-2 font-display font-bold text-slate-900 dark:text-slate-100 text-sm mb-4">
                <Layers className="w-4 h-4 text-violet-600 dark:text-violet-400 shrink-0" />
                <span>System Pipeline &amp; Data Flow</span>
              </div>
              <div className="space-y-3">
                {project.architectureSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-lg">{step.icon}</span>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900 dark:text-slate-200 text-xs sm:text-sm flex items-center gap-1.5">
                        <span>Step {idx + 1}: {step.title}</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies */}
          <div>
            <div className="flex items-center gap-2 font-display font-bold text-slate-900 dark:text-slate-200 text-xs uppercase tracking-wider mb-2.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Technology Stack</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-xs font-mono text-slate-700 dark:text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Impact */}
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-200 dark:border-emerald-500/15">
            <div className="flex items-center gap-2 font-display font-bold text-emerald-700 dark:text-emerald-400 text-sm mb-1">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Verified Impact &amp; Evaluation</span>
            </div>
            <p className="leading-relaxed text-slate-700 dark:text-slate-300">{project.impact}</p>
          </div>
        </div>

        {/* Action Links */}
        <div className="flex items-center justify-end gap-3 pt-6 mt-6 border-t border-slate-200 dark:border-white/[0.08]">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.08] text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/[0.1] text-xs font-semibold transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>View Source Code</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 font-bold text-xs transition-transform hover:-translate-y-0.5 shadow-md shadow-cyan-500/20"
            >
              <span>Launch Live System</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
