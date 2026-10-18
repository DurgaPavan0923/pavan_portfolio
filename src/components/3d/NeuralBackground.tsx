'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
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

    // Responsive particle count (fewer on mobile to preserve 60fps)
    const count = width < 768 ? 35 : width < 1200 ? 65 : 95;
    const maxDistance = width < 768 ? 90 : 130;

    const particles: Particle[] = [];
    const colors = ['#00cfff', '#8b5cf6', '#10b981', '#38bdf8'];

    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 1.8 + 1;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius,
        baseRadius: radius,
        color: colors[Math.floor(Math.random() * colors.length)],
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

    // Pause animation when user scrolls far down past the fold or switches tab
    const handleVisibilityChange = () => {
      isPaused = document.hidden;
    };

    const handleScroll = () => {
      // Slow down rendering if deep down the page
      isPaused = window.scrollY > 2500;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    function render() {
      if (!isPaused && ctx) {
        ctx.clearRect(0, 0, width, height);

        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          else if (p.x > width) p.x = 0;

          if (p.y < 0) p.y = height;
          else if (p.y > height) p.y = 0;

          // Mouse attraction
          const dxMouse = mouse.x - p.x;
          const dyMouse = mouse.y - p.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          if (distMouse < 120) {
            p.x += dxMouse * 0.015;
            p.y += dyMouse * 0.015;
            p.radius = p.baseRadius * 1.5;
          } else {
            p.radius = p.baseRadius;
          }

          // Draw node
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Connect nearby nodes
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDistance) {
              const alpha = (1 - dist / maxDistance) * 0.18;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(0, 207, 255, ${alpha})`;
              ctx.lineWidth = 0.75;
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
        className="w-full h-full block opacity-75"
        aria-hidden="true"
      />
      {/* Ambient gradient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[30rem] h-[30rem] bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}
