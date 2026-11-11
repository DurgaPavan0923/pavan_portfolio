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
  Maximize2,
} from 'lucide-react';

interface GalleryModalProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

const BLUR_PLACEHOLDER =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBmaWxsPSIjMGYxNzJhIi8+PC9zdmc+';

export function GalleryModal({
  items,
  currentIndex,
  onClose,
  onSelectIndex,
}: GalleryModalProps) {
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const activeItem = currentIndex !== null && items[currentIndex] ? items[currentIndex] : null;

  const handlePrev = useCallback(() => {
    if (currentIndex === null || items.length === 0) return;
    setImageLoaded(false);
    onSelectIndex((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, onSelectIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex === null || items.length === 0) return;
    setImageLoaded(false);
    onSelectIndex((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, onSelectIndex]);

  // Keyboard navigation & Focus Trap & Scroll Lock
  useEffect(() => {
    if (!activeItem) return;

    // Focus close button on mount
    const timer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
        return;
      }

      // Focus trap for Tab key
      if (e.key === 'Tab' && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    // Robust scroll position preservation
    const scrollY = window.scrollY;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
      window.scrollTo(0, scrollY);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeItem, handlePrev, handleNext, onClose]);

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;
    const diffX = touchStartX - e.changedTouches[0].clientX;
    const diffY = touchStartY - e.changedTouches[0].clientY;

    // Only swipe if horizontal movement is dominant
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStartX(null);
    setTouchStartY(null);
  };

  if (!activeItem || currentIndex === null) return null;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Photograph view: ${activeItem.title}`}
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Immersive backdrop with outside-tap dismiss */}
      <div
        className="fixed inset-0 bg-black/80 dark:bg-black/90 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Desktop Prev/Next Nav Controls (Hidden on Mobile) */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Previous photograph"
        className="hidden md:flex fixed left-4 lg:left-8 top-1/2 -translate-y-1/2 z-[130] w-12 h-12 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-white/10 hover:border-cyan-400/50 backdrop-blur-md transition-all hover:scale-105 active:scale-95 shadow-2xl items-center justify-center focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        type="button"
        onClick={handleNext}
        aria-label="Next photograph"
        className="hidden md:flex fixed right-4 lg:right-8 top-1/2 -translate-y-1/2 z-[130] w-12 h-12 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-white/10 hover:border-cyan-400/50 backdrop-blur-md transition-all hover:scale-105 active:scale-95 shadow-2xl items-center justify-center focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Lightbox Modal Card:
          Mobile: ~85-90% viewport width, max-height ~75-80vh
          Desktop: max-width 750-800px, max-height ~75vh */}
      <div className="relative w-[90vw] sm:w-[85vw] max-w-[780px] max-h-[78vh] bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/[0.12] rounded-3xl shadow-2xl overflow-hidden z-[125] flex flex-col animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 border-b border-slate-200 dark:border-white/[0.08] bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">
              {currentIndex + 1} / {items.length}
            </span>
            <span className="text-xs font-mono text-slate-300 dark:text-slate-600">·</span>
            <span className="text-xs font-mono text-slate-600 dark:text-slate-300 truncate max-w-[180px] sm:max-w-xs">
              {activeItem.title}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Mobile In-Modal Prev/Next Chevrons (≥44px target) */}
            <div className="flex md:hidden items-center gap-1">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous photograph"
                className="w-11 h-11 flex items-center justify-center rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next photograph"
                className="w-11 h-11 flex items-center justify-center rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Open Fullscreen Link */}
            <a
              href={activeItem.imageSrc}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open original photograph in new tab"
              className="w-11 h-11 flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
              title="Open full resolution"
            >
              <Maximize2 className="w-4 h-4" />
            </a>

            {/* Close Button (≥44px touch target) */}
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="w-11 h-11 flex items-center justify-center rounded-xl text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.12] border border-slate-200 dark:border-white/[0.08] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-5 flex flex-col gap-3">
          {/* Photo Container: object-contain with preserved aspect ratio */}
          <div className="relative w-full h-[36vh] sm:h-[42vh] max-h-[380px] bg-slate-950/60 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.08] flex items-center justify-center">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm z-10">
                <div className="w-7 h-7 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
              </div>
            )}
            <Image
              src={activeItem.imageSrc}
              alt={activeItem.title}
              fill
              priority
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
              sizes="(max-width: 768px) 90vw, 780px"
              className={`object-contain transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>

          {/* Caption & Metadata Below Photo */}
          <div className="flex flex-col gap-1.5 pt-1">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 tracking-tight">
                {activeItem.title}
              </h3>
              <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400 shrink-0">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-cyan-500" />
                  {activeItem.date}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                  {activeItem.location}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeItem.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
