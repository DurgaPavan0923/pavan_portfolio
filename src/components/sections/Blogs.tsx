'use client';

import React, { useState } from 'react';
import { BLOG_POSTS } from '@/data/blogs';
import { BlogPost } from '@/types';
import { BlogModal } from './BlogModal';
import { BookOpen, Clock, Calendar, ArrowRight, Tag } from 'lucide-react';

export function Blogs() {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  return (
    <section id="blogs" aria-label="Technical Insights & Articles" className="relative py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-medium mb-3">
            <span>09 // TECHNICAL WRITING & ARCHITECTURE</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-100 tracking-tight mb-4">
            Technical Insights &amp; <span className="text-gradient-cyan">Engineering Deep-Dives</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            In-depth architectural breakdowns covering Graph RAG, multi-agent verification loops, and deep sequence learning.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.slug}
              className="p-6 rounded-3xl glass-card flex flex-col justify-between group"
            >
              <div>
                {/* Meta */}
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-semibold uppercase tracking-wider text-[10px]">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    <span>{post.readTime}</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-base sm:text-lg text-slate-100 group-hover:text-cyan-400 transition-colors mb-2 leading-snug">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-6">
                  {post.excerpt}
                </p>
              </div>

              <div>
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5 pt-3 border-t border-white/[0.04]">
                  {post.tags.slice(0, 3).map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded-md bg-white/[0.03] text-[10px] font-mono text-slate-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Read Button */}
                <button
                  type="button"
                  onClick={() => setActivePost(post)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-cyan-500/15 hover:text-cyan-300 text-slate-200 text-xs font-semibold border border-white/[0.08] hover:border-cyan-400/40 transition-all group-hover:shadow-md"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
