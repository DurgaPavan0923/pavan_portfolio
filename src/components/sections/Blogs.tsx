'use client';

import React, { useState } from 'react';
import { BLOG_POSTS } from '@/data/blogs';
import { BlogPost } from '@/types';
import { BlogModal } from './BlogModal';
import { BookOpen, Calendar, ArrowRight } from 'lucide-react';

export function Blogs() {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  return (
    <section id="blogs" aria-label="Technical Insights & Articles" className="relative py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-medium mb-3">
            <span>10 // TECHNICAL WRITING & ARCHITECTURE</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-slate-100 tracking-tight mb-4">
            Technical Insights &amp; <span className="text-gradient-cyan">Engineering Deep-Dives</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            In-depth architectural breakdowns covering Graph RAG, multi-agent verification loops, and deep sequence learning.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.slug}
              className="p-6 rounded-3xl glass-card flex flex-col justify-between group transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div>
                {/* Meta: Clean Date */}
                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400 mb-3">
                  <Calendar className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>{post.date}</span>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors mb-2 leading-snug">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 mb-6">
                  {post.excerpt}
                </p>
              </div>

              <div>
                {/* Read Button */}
                <button
                  type="button"
                  onClick={() => setActivePost(post)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] hover:bg-cyan-50 dark:hover:bg-cyan-500/15 text-slate-800 dark:text-slate-200 hover:text-cyan-700 dark:hover:text-cyan-300 text-xs font-semibold border border-slate-200 dark:border-white/[0.08] hover:border-cyan-400/40 transition-all duration-300 group/btn"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reader Modal */}
      <BlogModal post={activePost} onClose={() => setActivePost(null)} />
    </section>
  );
}
