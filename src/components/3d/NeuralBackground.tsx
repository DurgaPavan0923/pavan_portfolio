'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  colorDark: string;
  colorLight: string;
}

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let animationFrameId: number;
    let isPaused = false;

    // Responsive particle count
    const count = width < 768 ? 40 : width < 1200 ? 70 : 105;
    const maxDistance = width < 768 ? 95 : 135;

    const particles: Particle[] = [];
    const colorsDark = ['#00cfff', '#8b5cf6', '#10b981', '#38bdf8'];
    const colorsLight = ['#0284c7', '#7c3aed', '#059669', '#2563eb'];

    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 2 + 1;
      const colorIndex = Math.floor(Math.random() * colorsDark.length);
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius,
        baseRadius: radius,
        colorDark: colorsDark[colorIndex],
        colorLight: colorsLight[colorIndex],
      });
    }

    const mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleVisibilityChange = () => {
      isPaused = document.hidden;
    };

    const handleScroll = () => {
      isPaused = window.scrollY > 3500;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    function render() {
      if (!isPaused && ctx) {
        ctx.clearRect(0, 0, width, height);
        const isLight = document.documentElement.classList.contains('light');

        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          else if (p.x > width) p.x = 0;

          if (p.y < 0) p.y = height;
          else if (p.y > height) p.y = 0;

          // Mouse attraction & pulse
          const dxMouse = mouse.x - p.x;
          const dyMouse = mouse.y - p.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          if (distMouse < 140) {
            p.x += dxMouse * 0.02;
            p.y += dyMouse * 0.02;
            p.radius = p.baseRadius * 1.8;
          } else {
            p.radius = p.baseRadius;
          }

          const currentColor = isLight ? p.colorLight : p.colorDark;

          // Draw node
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = currentColor;
          if (!isLight) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = currentColor;
          } else {
            ctx.shadowBlur = 0;
          }
          ctx.fill();
          ctx.shadowBlur = 0;

          // Connect nearby nodes
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDistance) {
              const alpha = (1 - dist / maxDistance) * (isLight ? 0.28 : 0.2);
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = isLight
                ? `rgba(2, 132, 199, ${alpha})`
                : `rgba(0, 207, 255, ${alpha})`;
              ctx.lineWidth = isLight ? 0.9 : 0.75;
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-85 dark:opacity-75 transition-opacity duration-300"
        aria-hidden="true"
      />
      {/* Ambient gradient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/3 right-1/4 w-[30rem] h-[30rem] bg-violet-600/10 dark:bg-violet-600/5 rounded-full blur-3xl pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }} />
    </div>
  );
}
