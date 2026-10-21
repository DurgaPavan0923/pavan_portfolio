'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { GALLERY_ITEMS } from '@/data/gallery';
import { GalleryCategory, GalleryItem } from '@/types';
import { GalleryModal } from './GalleryModal';
import { Camera, Calendar, MapPin, ZoomIn, Sparkles, Award } from 'lucide-react';

const CATEGORIES: GalleryCategory[] = [
  'All',
  'Hackathons & Tech',
  'NCC & Discipline',
  'Community & Leadership',
];

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('All');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const handleOpenPhoto = (item: GalleryItem) => {
    const idx = GALLERY_ITEMS.findIndex((p) => p.id === item.id);
    if (idx !== -1) {
      setSelectedIndex(idx);
    }
  };

  const getBadgeStyle = (category: string) => {
    switch (category) {
      case 'Hackathons & Tech':
        return 'bg-cyan-500/10 border-cyan-500/20 text-cyan-600 dark:text-cyan-400';
      case 'NCC & Discipline':
        return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400';
      case 'Community & Leadership':
        return 'bg-violet-500/10 border-violet-500/20 text-violet-600 dark:text-violet-400';
      default:
        return 'bg-slate-500/10 border-slate-500/20 text-slate-600 dark:text-slate-400';
    }
  };

  const getAspectClass = (aspect: string) => {
    switch (aspect) {
      case 'portrait':
        return 'aspect-[3/4]';
      case 'wide':
        return 'aspect-[16/9]';
      default:
        return 'aspect-[4/3]';
    }
  };

  return (
    <section id="gallery" aria-label="Moments & Photo Gallery" className="relative py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-medium mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>09 // LIFE & LEADERSHIP IN ACTION</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-slate-100 tracking-tight mb-4">
            Moments in Action &amp; <span className="text-gradient-cyan">Campus Impact</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Real photographic proof of leadership, discipline, and building: from national hackathons and SIH to state gubernatorial honors, armed forces camps, and developer summits.
          </p>

          {/* Impact Snapshot Pills */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap mt-6 text-xs font-mono text-slate-600 dark:text-slate-400">
            <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
              <span>22 Documented Moments</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-emerald-500" />
              <span>State &amp; National Honors</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-violet-500" />
              <span>Odisha &amp; Pan-India</span>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
          {CATEGORIES.map((cat) => {
            const count =
              cat === 'All'
                ? GALLERY_ITEMS.length
                : GALLERY_ITEMS.filter((item) => item.category === cat).length;
            const isActive = activeCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2 border ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-semibold border-cyan-400 shadow-lg shadow-cyan-500/20 scale-105'
                    : 'bg-white/60 dark:bg-white/[0.03] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/[0.08] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06]'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                    isActive
                      ? 'bg-slate-950/20 text-slate-950'
                      : 'bg-slate-200 dark:bg-white/[0.08] text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Masonry Columns Layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenPhoto(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpenPhoto(item);
                }
              }}
              aria-label={`View photo: ${item.title}`}
              className="break-inside-avoid group relative rounded-3xl overflow-hidden glass-card cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-cyan-500/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 block"
            >
              {/* Image Container with native aspect ratio */}
              <div className={`relative w-full ${getAspectClass(item.aspectRatio)} overflow-hidden bg-slate-900/10 dark:bg-slate-900/40`}>
                <Image
                  src={item.imageSrc}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />

                {/* Ambient vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                {/* Top Badge Overlay */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider backdrop-blur-md border ${getBadgeStyle(
                      item.category
                    )}`}
                  >
                    {item.category}
                  </span>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-cyan-300">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Hover Quick Action Pill */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100 z-10">
                  <div className="px-4 py-2 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-cyan-400/40 text-cyan-300 text-xs font-mono font-medium flex items-center gap-2 shadow-2xl">
                    <ZoomIn className="w-4 h-4 text-cyan-400" />
                    <span>View Moment</span>
                  </div>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors mb-1 line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-3">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-3 border-t border-slate-100 dark:border-white/[0.04]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-cyan-500" />
                    {item.date}
                  </span>
                  <span className="flex items-center gap-1 line-clamp-1 max-w-[55%]">
                    <MapPin className="w-3 h-3 text-emerald-500 shrink-0" />
                    <span className="truncate">{item.location.split(',')[0]}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Lightbox Modal */}
        <GalleryModal
          items={GALLERY_ITEMS}
          currentIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onSelectIndex={(idx) => setSelectedIndex(idx)}
        />
      </div>
    </section>
  );
}
