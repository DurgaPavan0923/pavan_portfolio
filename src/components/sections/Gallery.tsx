'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { GALLERY_ITEMS } from '@/data/gallery';
import { GalleryItem } from '@/types';
import { GalleryModal } from './GalleryModal';
import { Camera, Calendar, MapPin, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

export function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Pause when off-screen or tab is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setIsPaused(true);
        } else if (!document.hidden) {
          setIsPaused(false);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
    };
  }, []);

  // Manual scroll buttons for reduced motion or manual paging
  const scrollManual = useCallback((direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = (scrollContainerRef.current.clientWidth || 320) * 0.75;
    if (typeof scrollContainerRef.current.scrollBy === 'function') {
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    } else {
      scrollContainerRef.current.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
    }
  }, []);

  const handleOpenPhoto = (item: GalleryItem) => {
    const idx = GALLERY_ITEMS.findIndex((p) => p.id === item.id);
    if (idx !== -1) {
      setSelectedIndex(idx);
    }
  };

  // Duplicate items for continuous infinite marquee right-to-left
  const marqueeItems = [...GALLERY_ITEMS, ...GALLERY_ITEMS];

  return (
    <section
      id="moments"
      ref={sectionRef}
      aria-label="Moments & Photo Retrospective"
      className="relative py-20 px-0 overflow-hidden"
    >
      <span id="gallery" className="absolute -top-24" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-10">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-medium mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>02 // LIFE & LEADERSHIP IN ACTION</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-slate-100 tracking-tight mb-4">
            Moments in Action &amp; <span className="text-gradient-cyan">Campus Impact</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            A photographic retrospective spanning national hackathons, state gubernatorial military honors, and developer summits.
          </p>
        </div>

        {/* Manual navigation controls */}
        <div className="flex items-center justify-end gap-2 mt-6">
          <button
            type="button"
            onClick={() => scrollManual('left')}
            aria-label="Scroll moments left"
            className="p-2.5 rounded-full bg-white dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.08] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/[0.08] shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollManual('right')}
            aria-label="Scroll moments right"
            className="p-2.5 rounded-full bg-white dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.08] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/[0.08] shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Infinite Seamless Moving Strip with soft edge fade mask */}
      <div
        ref={scrollContainerRef}
        className={`relative w-full overflow-x-auto scrollbar-none py-4 ${
          isReducedMotion ? 'scroll-smooth snap-x snap-mandatory' : ''
        } [mask-image:linear-gradient(to_right,transparent,black_3%,black_97%,transparent)]`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div
          data-paused={isPaused}
          className={`flex gap-6 w-max px-4 ${
            isReducedMotion ? '' : 'animate-marquee-rtl'
          }`}
        >
          {marqueeItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              onClick={() => handleOpenPhoto(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpenPhoto(item);
                }
              }}
              aria-label={`View photograph: ${item.title}`}
              className="w-[82vw] sm:w-[70vw] md:w-[42vw] lg:w-[28vw] xl:w-[24vw] shrink-0 group relative rounded-3xl overflow-hidden glass-card cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 block snap-center"
            >
              {/* Photo Container */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-900/10 dark:bg-slate-900/40">
                <Image
                  src={item.imageSrc}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 28vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                {/* Hover Quick Action Zoom */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100 z-10">
                  <div className="px-4 py-2 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-cyan-400/50 text-cyan-300 text-xs font-mono font-medium flex items-center gap-2 shadow-2xl">
                    <ZoomIn className="w-4 h-4 text-cyan-400" />
                    <span>View Moment</span>
                  </div>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors mb-1 line-clamp-1">
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
      </div>

      {/* Fullscreen Lightbox Modal */}
      <GalleryModal
        items={GALLERY_ITEMS}
        currentIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onSelectIndex={(idx) => setSelectedIndex(idx)}
      />
    </section>
  );
}
