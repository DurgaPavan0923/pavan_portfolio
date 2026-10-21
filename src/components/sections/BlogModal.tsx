'use client';

import React, { useEffect } from 'react';
import { BlogPost } from '@/types';
import { X, Calendar } from 'lucide-react';

interface BlogModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export function BlogModal({ post, onClose }: BlogModalProps) {
  useEffect(() => {
    if (!post) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [post, onClose]);

  if (!post) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={post.title}
      className="fixed inset-0 z-[115] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md transition-opacity" onClick={onClose} />

      {/* Reader Dialog */}
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/[0.12] rounded-3xl p-6 sm:p-10 shadow-2xl overflow-y-auto z-10 animate-fade-up">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/[0.08]">
          <div className="flex-1">
            <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-2">
              <Calendar className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>{post.date}</span>
            </div>

            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-slate-100 leading-snug">
              {post.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.08] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/[0.08] transition-colors"
            aria-label="Close article"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="prose dark:prose-invert prose-sm sm:prose-base max-w-none text-slate-700 dark:text-slate-300 leading-relaxed space-y-4 pt-6">
          <div
            className="whitespace-pre-line font-sans text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: post.content
                .replace(/### (.*?)\n/g, '<h3 class="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 mt-6 mb-2">$1</h3>')
                .replace(/```([\s\S]*?)```/g, '<pre class="p-4 rounded-2xl bg-slate-900 text-cyan-300 border border-slate-700 overflow-x-auto text-xs font-mono my-4"><code>$1</code></pre>')
                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 dark:text-slate-100 font-semibold">$1</strong>'),
            }}
          />
        </div>
      </div>
    </div>
  );
}
