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
  const [isPaused, setIsPaused] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [scrollStartLeft, setScrollStartLeft] = useState(0);

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
        } else if (!document.hidden && !isDragging) {
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
  }, [isDragging]);

  // Manual scroll buttons
  const scrollManual = useCallback((direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = (scrollContainerRef.current.clientWidth || 360) * 0.85;
    if (typeof scrollContainerRef.current.scrollBy === 'function') {
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    } else {
      scrollContainerRef.current.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
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

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setIsPaused(true);
    setDragStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollStartLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - dragStartX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollStartLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setIsPaused(false);
    }
  };

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
            Photographic archive documenting national hackathons, state honors, technical symposia, and student leadership.
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

      {/* Infinite Seamless Moving Strip with soft edge fade mask */}
      <div
        ref={scrollContainerRef}
        tabIndex={0}
        role="region"
        aria-label="Photo carousel strip. Use arrow keys to navigate."
        onKeyDown={handleContainerKeyDown}
        className={`relative w-full overflow-x-auto scrollbar-none py-4 select-none ${
          isReducedMotion ? 'scroll-smooth snap-x snap-mandatory' : ''
        } [mask-image:linear-gradient(to_right,transparent,black_3%,black_97%,transparent)] focus:outline-none focus:ring-2 focus:ring-cyan-400/50`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={handleMouseUpOrLeave}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
      >
        <div
          data-paused={isPaused}
          className={`flex gap-5 sm:gap-6 w-max px-4 ${
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
              className="w-[85vw] max-w-[360px] md:w-[calc(50vw-24px)] md:max-w-none lg:w-[calc(33.333vw-24px)] lg:max-w-[380px] shrink-0 group relative rounded-3xl overflow-hidden glass-card cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 block snap-center"
            >
              {/* Photo Container */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-900/10 dark:bg-slate-900/40">
                <Image
                  src={item.imageSrc}
                  alt={item.title}
                  fill
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                  sizes="(max-width: 768px) 85vw, (max-width: 1024px) 50vw, 380px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Dark Vignette Overlay */}
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
