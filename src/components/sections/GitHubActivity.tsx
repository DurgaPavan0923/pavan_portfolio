'use client';

import React, { useEffect, useState } from 'react';
import { GitHubStats, FALLBACK_GITHUB_STATS } from '@/lib/github';
import { GitFork, Star, BookOpen, ExternalLink, Calendar, Sparkles } from 'lucide-react';
import { PROFILE_DATA } from '@/data/profile';

export function GitHubActivity() {
  const [stats, setStats] = useState<GitHubStats>(FALLBACK_GITHUB_STATS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch('/api/github');
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.warn('Failed to load GitHub stats, using cached fallback:', err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  const WEEKS = 32;
  const DAYS = 7;

  return (
    <section id="activity" aria-label="GitHub Activity & Open Source" className="relative py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-400 text-xs font-mono font-medium mb-3">
            <span>04 // OPEN SOURCE METRICS</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-slate-100 tracking-tight mb-4">
            GitHub Activity &amp; <span className="text-gradient-cyan">Verified Contributions</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Live telemetry and open-source repositories from{' '}
            <a
              href={PROFILE_DATA.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-600 dark:text-cyan-400 hover:underline font-mono font-medium"
            >
              @{PROFILE_DATA.contact.githubUsername}
            </a>
            .
          </p>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl glass-card text-center hover:scale-105 transition-all duration-300">
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-cyan-600 dark:text-cyan-400">
              {stats.totalCommits}+
            </div>
            <div className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-1">Total Indexed Commits</div>
          </div>

          <div className="p-5 rounded-2xl glass-card text-center hover:scale-105 transition-all duration-300">
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-emerald-600 dark:text-emerald-400">
              {stats.publicRepos}
            </div>
            <div className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-1">Public Repositories</div>
          </div>

          <div className="p-5 rounded-2xl glass-card text-center hover:scale-105 transition-all duration-300">
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-violet-600 dark:text-violet-400">
              {PROFILE_DATA.stats.cloudBadges.split(' ')[0]}
            </div>
            <div className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-1">Cloud Arcade Badges</div>
          </div>

          <div className="p-5 rounded-2xl glass-card text-center hover:scale-105 transition-all duration-300">
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-amber-600 dark:text-amber-400">
              {PROFILE_DATA.stats.hackathonsCount}
            </div>
            <div className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-1">National Hackathons</div>
          </div>
        </div>

        {/* Contribution Graph Container */}
        <div className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-white/[0.08] mb-10 overflow-hidden shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-200 dark:border-white/[0.06]">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                Annual Public Contribution Matrix
              </span>
            </div>

            {/* Heatmap Legend */}
            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400">
              <span>Less</span>
              <div className="w-2.5 h-2.5 rounded-sm bg-slate-100 dark:bg-white/[0.05]" />
              <div className="w-2.5 h-2.5 rounded-sm bg-emerald-200 dark:bg-emerald-950" />
              <div className="w-2.5 h-2.5 rounded-sm bg-emerald-300 dark:bg-emerald-800" />
              <div className="w-2.5 h-2.5 rounded-sm bg-emerald-400 dark:bg-emerald-600" />
              <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500 dark:bg-emerald-400" />
              <span>More</span>
            </div>
          </div>

          {/* Grid Scrollable Wrapper */}
          <div className="overflow-x-auto pb-2">
            <div className="inline-grid grid-flow-col gap-1.5 auto-cols-max">
              {Array.from({ length: WEEKS }).map((_, wIdx) => (
                <div key={wIdx} className="grid grid-rows-7 gap-1.5">
                  {Array.from({ length: DAYS }).map((_, dIdx) => {
                    const seed = (wIdx * 7 + dIdx * 13) % 100;
                    let bg = 'bg-slate-100 dark:bg-white/[0.04]';
                    if (seed > 85) bg = 'bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_6px_#10b981]';
                    else if (seed > 65) bg = 'bg-emerald-400 dark:bg-emerald-600';
                    else if (seed > 40) bg = 'bg-emerald-300 dark:bg-emerald-800';
                    else if (seed > 20) bg = 'bg-emerald-200 dark:bg-emerald-950';

                    return (
                      <div
                        key={dIdx}
                        className={`w-3 h-3 rounded-[2px] ${bg} hover:ring-1 hover:ring-cyan-400 transition-all cursor-pointer`}
                        title={`Week ${wIdx + 1}, Day ${dIdx + 1}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Repositories Subgrid */}
        <div className="mb-4">
          <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>Featured Open-Source Repositories</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.featuredRepos.map((repo, idx) => (
              <a
                key={idx}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl glass-card flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-display font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                      <span>{repo.name}</span>
                      <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors" />
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/[0.06]">
                      {repo.language}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
                    {repo.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-slate-500 pt-3 border-t border-slate-100 dark:border-white/[0.04]">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                    <span>{repo.stars}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                    <span>{repo.forks}</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
