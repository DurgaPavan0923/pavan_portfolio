'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { GALLERY_ITEMS } from '@/data/gallery';
import { GalleryItem } from '@/types';
import { GalleryModal } from './GalleryModal';
import { Camera, Calendar, MapPin, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

const BLUR_PLACEHOLDER =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBmaWxsPSIjMGYxNzJhIi8+PC9zdmc+';

export function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [isOffscreen, setIsOffscreen] = useState(false);
  const [isTabHidden, setIsTabHidden] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Drag interaction state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 1. Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // 2. Pause when tab is hidden or off-screen (with generous 300px margin so it moves on load)
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabHidden(document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsOffscreen(!entry.isIntersecting);
      },
      { rootMargin: '300px 0px 300px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
    };
  }, []);

  const shouldPause = isHovered || isTouching || isOffscreen || isTabHidden || isDragging;

  // Manual scroll buttons
  const scrollManual = useCallback((direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardWidth = container.clientWidth * (window.innerWidth < 768 ? 0.85 : 0.4);
    const delta = direction === 'left' ? -cardWidth : cardWidth;

    if (typeof container.scrollBy === 'function') {
      container.scrollBy({ left: delta, behavior: 'smooth' });
    } else {
      container.scrollLeft += delta;
    }
  }, []);

  // Keyboard navigation within carousel container
  const handleContainerKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollManual('left');
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollManual('right');
    }
  };

  // Drag / swipe handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeftState(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
    setIsHovered(false);
  };

  const handleOpenPhoto = (index: number) => {
    setSelectedIndex(index % GALLERY_ITEMS.length);
  };

  const renderPhotoCard = (item: GalleryItem, index: number, isPriority = false, isClone = false) => {
    const realIndex = index % GALLERY_ITEMS.length;

    return (
      <div
        key={isClone ? `clone-${item.id}-${index}` : `orig-${item.id}-${index}`}
        onClick={() => handleOpenPhoto(realIndex)}
        role="button"
        tabIndex={isClone ? -1 : 0}
        aria-hidden={isClone}
        onKeyDown={(e) => {
          if (!isClone && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            handleOpenPhoto(realIndex);
          }
        }}
        aria-label={isClone ? undefined : `View photograph: ${item.title}`}
        className="w-[82vw] max-w-[340px] sm:w-[360px] md:w-[calc(50vw-28px)] lg:w-[calc(33.333vw-28px)] xl:w-[calc(25vw-24px)] shrink-0 group relative rounded-3xl overflow-hidden glass-card cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 block snap-center select-none"
      >
        {/* Photo Container */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-900/10 dark:bg-slate-900/40">
          <Image
            src={item.imageSrc}
            alt={item.title}
            fill
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
            sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            priority={isPriority}
            loading={isPriority ? 'eager' : 'lazy'}
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

          {/* Hover Quick Action Zoom */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100 z-10 pointer-events-none">
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
    );
  };

  return (
    <section
      id="moments"
      ref={sectionRef}
      aria-label="Moments & Photo Retrospective"
      className="relative py-20 px-0 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-medium mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>07 // MOMENTS IN ACTION</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-slate-100 tracking-tight mb-3">
            Engineering &amp; Campus <span className="text-gradient-cyan">Moments</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Continuous retrospective documenting national hackathons, state honors, technical symposia, and leadership milestones ({GALLERY_ITEMS.length} verified moments).
          </p>
        </div>

        {/* Manual navigation controls */}
        <div className="flex items-center justify-between sm:justify-end gap-2 mt-6">
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 sm:hidden">
            Swipe or use arrows
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollManual('left')}
              aria-label="Scroll moments left"
              className="p-2.5 rounded-full bg-white dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.08] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/[0.08] shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollManual('right')}
              aria-label="Scroll moments right"
              className="p-2.5 rounded-full bg-white dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.08] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/[0.08] shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Infinite Seamless Moving Strip with soft edge fade masks */}
      <div
        ref={scrollContainerRef}
        tabIndex={0}
        role="region"
        aria-label="Photo carousel strip. Use arrow keys to navigate."
        onKeyDown={handleContainerKeyDown}
        className={`relative w-full overflow-x-hidden py-4 select-none [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] focus:outline-none focus:ring-2 focus:ring-cyan-400/50 ${
          isReducedMotion ? 'overflow-x-auto scroll-smooth snap-x snap-mandatory' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseUpOrLeave}
        onTouchStart={() => setIsTouching(true)}
        onTouchEnd={() => setIsTouching(false)}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
      >
        <div
          data-paused={shouldPause}
          className={`flex w-max ${isReducedMotion ? '' : 'animate-marquee-rtl'}`}
        >
          {/* Track 1: Original 16 items */}
          <div className="flex shrink-0 gap-5 sm:gap-6 pr-5 sm:pr-6">
            {GALLERY_ITEMS.map((item, idx) => renderPhotoCard(item, idx, idx < 2, false))}
          </div>

          {/* Track 2: Identical cloned set for seamless 50% loop */}
          <div className="flex shrink-0 gap-5 sm:gap-6 pr-5 sm:pr-6" aria-hidden="true">
            {GALLERY_ITEMS.map((item, idx) => renderPhotoCard(item, idx + GALLERY_ITEMS.length, false, true))}
          </div>
        </div>
      </div>

      {/* Fullscreen Accessible Lightbox Modal */}
      <GalleryModal
        items={GALLERY_ITEMS}
        currentIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onSelectIndex={(idx) => setSelectedIndex(idx)}
      />
    </section>
  );
}
