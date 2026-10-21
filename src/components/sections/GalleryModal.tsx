'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { GalleryItem } from '@/types';
import {
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  ExternalLink,
  Tag,
  Maximize2,
} from 'lucide-react';

interface GalleryModalProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export function GalleryModal({
  items,
  currentIndex,
  onClose,
  onSelectIndex,
}: GalleryModalProps) {
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const activeItem = currentIndex !== null && items[currentIndex] ? items[currentIndex] : null;

  const handlePrev = useCallback(() => {
    if (currentIndex === null) return;
    setImageLoaded(false);
    onSelectIndex((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, onSelectIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex === null) return;
    setImageLoaded(false);
    onSelectIndex((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, onSelectIndex]);

  useEffect(() => {
    if (!activeItem) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeItem, handlePrev, handleNext, onClose]);

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  if (!activeItem || currentIndex === null) return null;

  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case 'Hackathons & Tech':
        return 'bg-cyan-500/10 border-cyan-500/30 text-cyan-500 dark:text-cyan-400';
      case 'NCC & Discipline':
        return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400';
      case 'Community & Leadership':
        return 'bg-violet-500/10 border-violet-500/30 text-violet-600 dark:text-violet-400';
      default:
        return 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400';
    }
  };

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label={activeItem.title}
      className="fixed inset-0 z-[120] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Immersive backdrop */}
      <div
        className="fixed inset-0 bg-black/80 dark:bg-black/90 backdrop-blur-xl transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Floating navigation controls - Desktop prev/next */}
      <button
        onClick={handlePrev}
        aria-label="Previous photograph"
        className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-[130] p-3 sm:p-4 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white border border-white/10 hover:border-cyan-500/50 backdrop-blur-md transition-all duration-200 hover:scale-110 shadow-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={handleNext}
        aria-label="Next photograph"
        className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-[130] p-3 sm:p-4 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white border border-white/10 hover:border-cyan-500/50 backdrop-blur-md transition-all duration-200 hover:scale-110 shadow-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Main modal container */}
      <div className="relative w-full max-w-5xl bg-white dark:bg-slate-950/95 border border-slate-200 dark:border-white/[0.12] rounded-3xl shadow-2xl overflow-hidden z-[125] flex flex-col my-auto animate-in zoom-in-95 duration-200 max-h-[92vh]">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-4 border-b border-slate-200 dark:border-white/[0.08] bg-slate-50/50 dark:bg-white/[0.02]">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span
              className={`px-3 py-1 rounded-full border text-xs font-mono font-semibold uppercase tracking-wider ${getCategoryTheme(
                activeItem.category
              )}`}
            >
              {activeItem.category}
            </span>
            {activeItem.badge && (
              <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-white/[0.06] border border-slate-300 dark:border-white/[0.1] text-slate-700 dark:text-slate-300 text-xs font-mono">
                {activeItem.badge}
              </span>
            )}
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              {currentIndex + 1} / {items.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={activeItem.imageSrc}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open original high-resolution photo"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors"
              title="Open full resolution"
            >
              <Maximize2 className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.12] border border-slate-200 dark:border-white/[0.08] transition-all"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">ESC</span>
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto overflow-x-hidden p-4 sm:p-6 md:p-8 space-y-6">
          {/* Main Photo Showcase */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] max-h-[58vh] bg-slate-950/40 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.08] flex items-center justify-center">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm z-10">
                <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
              </div>
            )}
            <Image
              src={activeItem.imageSrc}
              alt={activeItem.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 85vw"
              className={`object-contain transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>

          {/* Details & Story */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-slate-100 dark:border-white/[0.06] pb-4">
              <div>
                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-slate-100 tracking-tight">
                  {activeItem.title}
                </h3>
                <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400 mt-0.5">
                  {activeItem.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400 shrink-0">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-cyan-500" />
                  {activeItem.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                  {activeItem.location}
                </span>
              </div>
            </div>

            {/* Narrative Description */}
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              {activeItem.description}
            </p>

            {/* Tags and Metadata */}
            <div className="flex items-center gap-2 flex-wrap pt-2">
              <Tag className="w-3.5 h-3.5 text-slate-400" />
              {activeItem.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-slate-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer thumbnail strip / quick switcher */}
        <div className="px-4 sm:px-6 py-3 border-t border-slate-200 dark:border-white/[0.08] bg-slate-50/70 dark:bg-white/[0.02] flex items-center gap-2 overflow-x-auto scrollbar-none">
          {items.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setImageLoaded(false);
                onSelectIndex(idx);
              }}
              aria-label={`Jump to ${item.title}`}
              className={`relative w-12 h-10 sm:w-16 sm:h-12 rounded-lg overflow-hidden shrink-0 transition-all border ${
                idx === currentIndex
                  ? 'border-cyan-400 ring-2 ring-cyan-400/40 scale-105'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={item.imageSrc}
                alt={item.title}
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
