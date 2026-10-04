import React, { useEffect, useRef } from 'react';

/**
 * HeroFluidCursor
 * High-performance organic black liquid ink cursor interaction designed exclusively
 * for the hero section of Arun Vats' portfolio.
 *
 * Simulates black liquid ink moving through water:
 * - Fluid inertia & slight follow delay
 * - Velocity-adaptive viscous stretching and organic deformation
 * - Smooth spline ribbon with soft feathered radial dispersion
 * - Strictly pure black / near-black tone (zero color hues)
 * - Layered behind typography and portrait (never obscures face or text)
 * - Automatically clipped to hero boundaries, auto-pauses when idle
 */
export const HeroFluidCursor = ({ containerRef }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // 1. Accessibility & Device Detection
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (prefersReduced || !isFinePointer || window.innerWidth <= 768) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const heroEl = containerRef?.current || canvas.closest('.home-header') || canvas.parentElement;
    if (!heroEl) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animId = null;

    // Mouse coordinates & fluid head positions (with inertia)
    let targetX = -1000;
    let targetY = -1000;
    let headX = -1000;
    let headY = -1000;
    let prevHeadX = -1000;
    let prevHeadY = -1000;
    let isInside = false;
    let isStationary = true;
    let lastMoveTime = 0;

    // Ink droplets array
    const particles = [];
    const MAX_PARTICLES = 140;

    // History of fluid head positions for continuous viscous ribbon
    const trailPoints = [];
    const MAX_TRAIL = 16;

    // High-DPI responsive canvas sizing
    const resizeCanvas = () => {
      if (!heroEl || !canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = heroEl.clientWidth || window.innerWidth;
      height = heroEl.clientHeight || window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(heroEl);
    resizeCanvas();

    // Spawn an ink droplet with organic lateral dispersion
    const spawnInk = (x, y, vx, vy, speed, proximityAlpha) => {
      if (particles.length >= MAX_PARTICLES) {
        particles.shift();
      }

      // Organic dispersion perpendicular to motion
      const motionAngle = Math.atan2(vy, vx);
      const normalAngle = motionAngle + (Math.PI / 2) * (Math.random() > 0.5 ? 1 : -1);
      const lateralSpread = (Math.random() - 0.5) * Math.min(speed * 0.22, 2.2);

      const pVx = vx * 0.1 + Math.cos(normalAngle) * lateralSpread;
      const pVy = vy * 0.1 + Math.sin(normalAngle) * lateralSpread;

      // Radius scales gently with speed (subtle for slow moves, longer wake for fast moves)
      const baseRadius = Math.min(24, Math.max(8, speed * 0.95 + 7));
      const radius = baseRadius * (0.85 + Math.random() * 0.35);

      // Deep translucent black tone (pure charcoal / black, zero color)
      const baseAlpha = Math.min(0.22, Math.max(0.06, speed * 0.016 + 0.08)) * proximityAlpha;

      particles.push({
        x: x + (Math.random() - 0.5) * 3,
        y: y + (Math.random() - 0.5) * 3,
        vx: pVx,
        vy: pVy,
        radius,
        growth: 0.22 + Math.random() * 0.16, // simulates ink bleeding outward into fluid
        alpha: baseAlpha,
        decay: 0.942 + Math.random() * 0.014, // smooth dissipation
        angle: motionAngle,
        stretch: Math.min(1.35, 1 + speed * 0.03) // velocity-based elliptical deformation
      });
    };

    // Hero-only event handlers
    const onMouseMove = (e) => {
      const rect = heroEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      targetX = x;
      targetY = y;
      lastMoveTime = performance.now();
      isStationary = false;

      if (!isInside) {
        isInside = true;
        headX = x;
        headY = y;
        prevHeadX = x;
        prevHeadY = y;
      }

      if (!animId) {
        animId = requestAnimationFrame(renderLoop);
      }
    };

    const onMouseEnter = (e) => {
      const rect = heroEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      targetX = x;
      targetY = y;
      headX = x;
      headY = y;
      prevHeadX = x;
      prevHeadY = y;
      isInside = true;
      isStationary = false;
      lastMoveTime = performance.now();
      trailPoints.length = 0;

      if (!animId) {
        animId = requestAnimationFrame(renderLoop);
      }
    };

    const onMouseLeave = () => {
      isInside = false;
      targetX = -1000;
      targetY = -1000;
    };

    heroEl.addEventListener('mousemove', onMouseMove, { passive: true });
    heroEl.addEventListener('mouseenter', onMouseEnter, { passive: true });
    heroEl.addEventListener('mouseleave', onMouseLeave, { passive: true });

    // Main 60fps render loop
    const renderLoop = (time) => {
      ctx.clearRect(0, 0, width, height);

      // 1. Inertial spring/damping for the fluid head
      if (isInside && targetX >= 0) {
        const dx = targetX - headX;
        const dy = targetY - headY;
        const dist = Math.hypot(dx, dy);

        // Slight inertia & delay
        headX += dx * 0.26;
        headY += dy * 0.26;

        const vx = headX - prevHeadX;
        const vy = headY - prevHeadY;
        const speed = Math.hypot(vx, vy);

        if (time - lastMoveTime > 75 && dist < 1.2) {
          isStationary = true;
        }

        // Proximity attenuation: soften ink when near the center portrait area
        const centerDistX = Math.abs(headX - width * 0.5);
        const portraitWidthHalf = Math.max(150, width * 0.16);
        let proximityAlpha = 1;
        if (centerDistX < portraitWidthHalf) {
          proximityAlpha = 0.45 + 0.55 * (centerDistX / portraitWidthHalf);
        }

        // Emit fluid when moving
        if (speed > 0.4) {
          trailPoints.unshift({
            x: headX,
            y: headY,
            speed,
            alpha: Math.min(0.18, speed * 0.014 + 0.05) * proximityAlpha
          });
          if (trailPoints.length > MAX_TRAIL) {
            trailPoints.pop();
          }

          // Interpolate to maintain continuity during rapid cursor flicks
          const steps = Math.min(8, Math.max(1, Math.floor(speed / 7)));
          for (let i = 1; i <= steps; i++) {
            const t = i / steps;
            const interpX = prevHeadX + (headX - prevHeadX) * t;
            const interpY = prevHeadY + (headY - prevHeadY) * t;
            spawnInk(interpX, interpY, vx, vy, speed, proximityAlpha);
          }
        }

        prevHeadX = headX;
        prevHeadY = headY;
      } else {
        if (trailPoints.length > 0) {
          trailPoints.pop();
        }
      }

      // 2. Render Continuous Viscous Ink Ribbon (connecting liquid body)
      if (trailPoints.length > 2) {
        ctx.save();
        for (let i = 0; i < trailPoints.length - 1; i++) {
          const pt = trailPoints[i];
          const nextPt = trailPoints[i + 1];
          const xc = (pt.x + nextPt.x) / 2;
          const yc = (pt.y + nextPt.y) / 2;

          const ratio = 1 - i / trailPoints.length;
          const ribbonWidth = Math.max(1.5, (pt.speed * 0.75 + 3.5) * ratio);
          const ribbonAlpha = pt.alpha * ratio * 0.6;

          ctx.beginPath();
          ctx.moveTo(pt.x, pt.y);
          ctx.quadraticCurveTo(pt.x, pt.y, xc, yc);
          ctx.strokeStyle = `rgba(10, 10, 12, ${ribbonAlpha})`;
          ctx.lineWidth = ribbonWidth;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();

          pt.alpha *= 0.92;
        }
        ctx.restore();
      }

      // 3. Render Organic Ink Diffusion Particles (feathered radial bleeding)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Viscous deceleration & expansion
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.92;
        p.vy *= 0.92;
        p.radius += p.growth;
        p.alpha *= p.decay;

        if (p.alpha <= 0.003) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.scale(p.stretch, 1 / Math.min(1.2, p.stretch));

        // Feathered pure black radial gradient
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, p.radius);
        g.addColorStop(0, `rgba(8, 8, 10, ${p.alpha})`);
        g.addColorStop(0.35, `rgba(10, 10, 12, ${p.alpha * 0.72})`);
        g.addColorStop(0.7, `rgba(16, 17, 20, ${p.alpha * 0.24})`);
        g.addColorStop(1, 'rgba(28, 29, 32, 0)');

        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 4. Power saving: pause RAF loop when completely settled or outside
      if ((!isInside || isStationary) && particles.length === 0 && trailPoints.length === 0) {
        animId = null;
        return;
      }

      animId = requestAnimationFrame(renderLoop);
    };

    return () => {
      if (animId) cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      heroEl.removeEventListener('mousemove', onMouseMove);
      heroEl.removeEventListener('mouseenter', onMouseEnter);
      heroEl.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [containerRef]);

  return (
    <canvas
      ref={canvasRef}
      className="hero-fluid-canvas"
      aria-hidden="true"
    />
  );
};
