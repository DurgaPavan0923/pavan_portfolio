'use client';

import React, { useEffect, useState } from 'react';
import { GitHubTelemetryData, FeaturedRepo } from '@/lib/github';
import snapshotData from '@/data/github-snapshot.json';
import { GitFork, Star, BookOpen, ExternalLink, Calendar, GitCommit, Flame, Code, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';
import { PROFILE_DATA } from '@/data/profile';

const INITIAL_DATA: GitHubTelemetryData = snapshotData as unknown as GitHubTelemetryData;

export function GitHubActivity() {
  const [data, setData] = useState<GitHubTelemetryData>(INITIAL_DATA);
  const [loading, setLoading] = useState(false);
  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number } | null>(null);

  useEffect(() => {
    async function loadTelemetry() {
      try {
        const res = await fetch('/api/github');
        if (res.ok) {
          const fetched = await res.json();
          setData(fetched);
        }
      } catch (err) {
        console.warn('Failed to load GitHub telemetry, keeping snapshot:', err);
      } finally {
        setLoading(false);
      }
    }

    loadTelemetry();
  }, []);

  const getDayColor = (level: string) => {
    switch (level) {
      case 'FOURTH_QUARTILE':
        return 'bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_6px_#10b981]';
      case 'THIRD_QUARTILE':
        return 'bg-emerald-400 dark:bg-emerald-600';
      case 'SECOND_QUARTILE':
        return 'bg-emerald-300 dark:bg-emerald-800';
      case 'FIRST_QUARTILE':
        return 'bg-emerald-200 dark:bg-emerald-950';
      default:
        return 'bg-slate-100 dark:bg-white/[0.04]';
    }
  };

  const formatTooltipDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <section id="activity" aria-label="GitHub Activity & Open Source" className="relative py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-400 text-xs font-mono font-medium mb-3">
            <span>04 // OPEN SOURCE METRICS</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-slate-100 tracking-tight mb-4">
            GitHub Telemetry &amp; <span className="text-gradient-cyan">Verified Contributions</span>
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            <span>
              Real-time engineering telemetry for{' '}
              <a
                href={PROFILE_DATA.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-600 dark:text-cyan-400 hover:underline font-mono font-medium"
              >
                @{PROFILE_DATA.contact.githubUsername}
              </a>
            </span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            {data.isStale ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
                <AlertTriangle className="w-3 h-3" />
                <span>Cached Snapshot</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-3 h-3" />
                <span>Live Data</span>
              </span>
            )}
          </div>
        </div>

        {/* 4 Stat Cards: Verified Open-Source Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl glass-card text-center hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-center gap-1.5 text-cyan-600 dark:text-cyan-400 mb-1">
              <Calendar className="w-4 h-4" />
              <span className="text-xs font-mono uppercase tracking-wider">Annual Contribs</span>
            </div>
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-slate-100">
              {data.totalContributions}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Last 12 Months</div>
          </div>

          <div className="p-5 rounded-2xl glass-card text-center hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-center gap-1.5 text-emerald-600 dark:text-emerald-400 mb-1">
              <GitCommit className="w-4 h-4" />
              <span className="text-xs font-mono uppercase tracking-wider">Indexed Commits</span>
            </div>
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-slate-100">
              {data.totalCommits}+
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Verified Commits</div>
          </div>

          <div className="p-5 rounded-2xl glass-card text-center hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-center gap-1.5 text-violet-600 dark:text-violet-400 mb-1">
              <BookOpen className="w-4 h-4" />
              <span className="text-xs font-mono uppercase tracking-wider">Public Repos</span>
            </div>
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-slate-100">
              {data.publicRepos}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Repositories</div>
          </div>

          <div className="p-5 rounded-2xl glass-card text-center hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-center gap-1.5 text-amber-600 dark:text-amber-400 mb-1">
              <Flame className="w-4 h-4" />
              <span className="text-xs font-mono uppercase tracking-wider">Best Streak</span>
            </div>
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-slate-100">
              {data.longestStreak} <span className="text-sm font-normal text-slate-400">days</span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Current: {data.currentStreak}d
            </div>
          </div>
        </div>

        {/* Contribution Graph Container */}
        <div className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-white/[0.08] mb-10 overflow-hidden shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-200 dark:border-white/[0.06]">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                Annual Public Contribution Calendar ({data.totalContributions} total)
              </span>
            </div>

            {/* Hover tooltip / Legend */}
            <div className="flex items-center gap-4">
              {hoveredDay ? (
                <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                  {hoveredDay.count} contribution{hoveredDay.count === 1 ? '' : 's'} on {formatTooltipDate(hoveredDay.date)}
                </span>
              ) : (
                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  <span>Less</span>
                  <div className="w-2.5 h-2.5 rounded-sm bg-slate-100 dark:bg-white/[0.05]" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-emerald-200 dark:bg-emerald-950" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-emerald-300 dark:bg-emerald-800" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-emerald-400 dark:bg-emerald-600" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500 dark:bg-emerald-400" />
                  <span>More</span>
                </div>
              )}
            </div>
          </div>

          {/* Grid Scrollable Wrapper */}
          <div className="overflow-x-auto pb-2">
            <div className="inline-grid grid-flow-col gap-1.5 auto-cols-max">
              {data.calendar.weeks.map((week, wIdx) => (
                <div key={wIdx} className="grid grid-rows-7 gap-1.5">
                  {week.contributionDays.map((day, dIdx) => (
                    <div
                      key={dIdx}
                      className={`w-3 h-3 rounded-[2px] ${getDayColor(day.contributionLevel)} hover:ring-2 hover:ring-cyan-400 transition-all cursor-pointer`}
                      onMouseEnter={() => setHoveredDay({ date: day.date, count: day.contributionCount })}
                      onMouseLeave={() => setHoveredDay(null)}
                      title={`${day.contributionCount} contributions on ${formatTooltipDate(day.date)}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Top Languages Byte-Weighted Breakdown */}
          {data.topLanguages && data.topLanguages.length > 0 && (
            <div className="pt-6 mt-6 border-t border-slate-200 dark:border-white/[0.06]">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 mb-2.5">
                <span className="flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>Repository Language Distribution</span>
                </span>
                <span>Byte-weighted</span>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden flex bg-slate-100 dark:bg-white/[0.05] mb-3">
                {data.topLanguages.map((lang, lIdx) => (
                  <div
                    key={lIdx}
                    style={{
                      width: `${lang.percentage}%`,
                      backgroundColor: lang.color || '#38bdf8',
                    }}
                    title={`${lang.name}: ${lang.percentage}%`}
                  />
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-4">
                {data.topLanguages.map((lang, lIdx) => (
                  <div key={lIdx} className="flex items-center gap-1.5 text-xs">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: lang.color || '#38bdf8' }}
                    />
                    <span className="font-medium text-slate-800 dark:text-slate-200">{lang.name}</span>
                    <span className="font-mono text-slate-400 text-[11px]">{lang.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Featured Repositories Subgrid */}
        <div className="mb-4">
          <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>Featured Open-Source Repositories</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.featuredRepos.map((repo, idx) => (
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
                      <span>{repo.displayName || repo.name}</span>
                      <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors" />
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/[0.06] flex items-center gap-1">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: repo.languageColor || '#38bdf8' }}
                      />
                      <span>{repo.language}</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
                    {repo.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-slate-500 pt-3 border-t border-slate-100 dark:border-white/[0.04]">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                      <span>{repo.stars}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                      <span>{repo.forks}</span>
                    </span>
                  </div>
                  {repo.updatedRelative && (
                    <span className="text-[11px] text-slate-400">updated {repo.updatedRelative}</span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
