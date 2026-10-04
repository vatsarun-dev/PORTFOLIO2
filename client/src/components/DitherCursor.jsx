import React, { useEffect, useRef } from 'react';

/**
 * 8x8 Bayer Dithering Matrix
 * Provides authentic retro digital halftone screentone structure.
 */
const BAYER_8X8 = [
   0, 32,  8, 40,  2, 34, 10, 42,
  48, 16, 56, 24, 50, 18, 58, 26,
  12, 44,  4, 36, 14, 46,  6, 38,
  60, 28, 52, 20, 62, 30, 54, 22,
   3, 35, 11, 43,  1, 33,  9, 41,
  51, 19, 43, 27, 49, 17, 57, 25,
  15, 47,  7, 39, 13, 45,  5, 37,
  63, 31, 55, 23, 61, 29, 53, 21
];

/**
 * Spatially stable deterministic pseudo-random hash for grid coordinates (gx, gy).
 * Eliminates temporal static/flicker while naturally diffusing the dither edges.
 */
function hash2D(x, y) {
  let h = (x * 374761393 + y * 668265263) ^ 0x5bf03635;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

/**
 * Blended Dither Threshold:
 * 60% ordered halftone structure + 40% organic pixel diffusion.
 */
function getThreshold(gx, gy) {
  const bx = ((gx % 8) + 8) % 8;
  const by = ((gy % 8) + 8) % 8;
  const bayer = BAYER_8X8[by * 8 + bx] / 64.0;
  const noise = hash2D(gx, gy);
  return bayer * 0.6 + noise * 0.4;
}

/**
 * Distance squared from point (px, py) to capsule segment between (ax, ay) and (bx, by).
 */
function distToSegmentSquared(px, py, ax, ay, bx, by) {
  const dx = bx - ax;
  const dy = by - ay;
  const l2 = dx * dx + dy * dy;
  if (l2 === 0) {
    const ex = px - ax;
    const ey = py - ay;
    return { d2: ex * ex + ey * ey, t: 0 };
  }
  let t = ((px - ax) * dx + (py - ay) * dy) / l2;
  if (t < 0) t = 0;
  else if (t > 1) t = 1;
  const projX = ax + t * dx;
  const projY = ay + t * dy;
  const ex = px - projX;
  const ey = py - projY;
  return { d2: ex * ex + ey * ey, t };
}

/**
 * DitherCursor
 * Pure HTML5 Canvas 2D Retro Digital Halftone Dither Cursor built from scratch.
 * - Tiny black squares (#000000 only) arranged on a fine grid
 * - Dense mass of hundreds of particles around cursor
 * - Velocity-based flowing dither trail trailing opposite to movement direction
 * - Smooth inertia & spring interpolation
 * - Progressive falloff & natural pixel-dithered borders
 * - Automatically scoped ONLY to hero section with zero interference with page interaction
 */
export const DitherCursor = ({
  containerRef,
  photoRef,
  particleSize = 3.5,
  gridSpacing = 6,
  baseRadius = 140,
  coreRadius = 60,
  maxTrailNodes = 40,
  className = ''
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (typeof window === 'undefined') return;

    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Disable on touch-only devices without a fine mouse pointer
    const hasCoarse = window.matchMedia('(pointer: coarse)').matches;
    const hasFine = window.matchMedia('(pointer: fine)').matches;
    if (hasCoarse && !hasFine) {
      return;
    }

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Canvas dimensions
    let width = 0;
    let height = 0;

    // Cursor tracking state
    const mouse = {
      x: 0,
      y: 0,
      prevX: 0,
      prevY: 0,
      active: false,
      hasEntered: false
    };

    const head = {
      x: 0,
      y: 0
    };

    let smoothSpeed = 0;
    let fadeAlpha = 0;
    const trail = [];

    let animId = null;
    let isRunning = false;

    // Calculate Photo Cutout Rect in local canvas coordinates
    const getPhotoBounds = () => {
      const photoEl = photoRef?.current || document.querySelector('.personal-image-wrap');
      if (!photoEl || !canvas) return null;

      const pRect = photoEl.getBoundingClientRect();
      const cRect = canvas.getBoundingClientRect();

      // Original portrait cutout is 572w x 1024h = 0.5586 aspect ratio
      const imgAspect = 572 / 1024;
      const wrapAspect = pRect.width / pRect.height;
      let imgW, imgH, imgLeft, imgTop;

      if (wrapAspect > imgAspect) {
        imgH = pRect.height;
        imgW = imgH * imgAspect;
        imgLeft = pRect.left + (pRect.width - imgW) / 2;
        imgTop = pRect.top;
      } else {
        imgW = pRect.width;
        imgH = imgW / imgAspect;
        imgLeft = pRect.left;
        imgTop = pRect.bottom - imgH;
      }

      return {
        minX: imgLeft - cRect.left,
        maxX: imgLeft + imgW - cRect.left,
        minY: imgTop - cRect.top,
        maxY: cRect.bottom - cRect.top
      };
    };

    // Check if a client coordinate is directly over the portrait cutout
    const isOverPhoto = (clientX, clientY) => {
      const photoEl = photoRef?.current || document.querySelector('.personal-image-wrap');
      if (!photoEl) return false;

      const pRect = photoEl.getBoundingClientRect();
      const imgAspect = 572 / 1024;
      const wrapAspect = pRect.width / pRect.height;
      let imgW, imgH, imgLeft, imgTop;

      if (wrapAspect > imgAspect) {
        imgH = pRect.height;
        imgW = imgH * imgAspect;
        imgLeft = pRect.left + (pRect.width - imgW) / 2;
        imgTop = pRect.top;
      } else {
        imgW = pRect.width;
        imgH = imgW / imgAspect;
        imgLeft = pRect.left;
        imgTop = pRect.bottom - imgH;
      }

      return (
        clientX >= imgLeft &&
        clientX <= imgLeft + imgW &&
        clientY >= imgTop &&
        clientY <= pRect.bottom
      );
    };

    // Resize canvas to match hero container
    const resize = () => {
      const container = containerRef?.current || canvas.parentElement;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      requestFrame();
    };

    // Start RAF if sleeping
    const requestFrame = () => {
      if (!isRunning) {
        isRunning = true;
        animId = requestAnimationFrame(render);
      }
    };

    // Main animation loop
    const render = () => {
      // Smooth fade in / out when entering/leaving hero
      if (mouse.active) {
        fadeAlpha += (1 - fadeAlpha) * 0.16;
      } else {
        fadeAlpha *= 0.88;
      }

      // Spring-like smoothing of head towards raw mouse position
      const dx = mouse.x - head.x;
      const dy = mouse.y - head.y;
      const dist = Math.hypot(dx, dy);

      // Smooth interpolation so effect feels fluid and premium
      head.x += dx * 0.28;
      head.y += dy * 0.28;

      // Velocity tracking
      smoothSpeed += (dist - smoothSpeed) * 0.18;

      // Base dimensions scale subtly with responsive viewport
      const vScale = Math.min(Math.max(width / 1440, 0.75), 1.3);
      const responsiveBaseRadius = baseRadius * vScale;
      const responsiveCoreRadius = coreRadius * vScale;

      // Dynamic head size based on speed
      const curHeadR = Math.min(responsiveBaseRadius + smoothSpeed * 1.6, 210 * vScale);
      const curCoreR = Math.min(responsiveCoreRadius + smoothSpeed * 0.6, 95 * vScale);

      // Add new trail node if moving or active
      if (mouse.active && (dist > 1.2 || smoothSpeed > 0.8)) {
        trail.unshift({
          x: head.x,
          y: head.y,
          r: Math.min(curHeadR * (0.8 + Math.min(smoothSpeed / 24, 0.45)), 220 * vScale),
          intensity: 1.0,
          life: 1.0,
          age: 0
        });

        if (trail.length > maxTrailNodes) {
          trail.length = maxTrailNodes;
        }
      }

      // Decay and age trail nodes
      // High speed = longer trail (slower decay); stationary = quick evaporation
      const decayRate = smoothSpeed > 2.0 ? 0.024 : 0.07;

      for (let i = trail.length - 1; i >= 0; i--) {
        const node = trail[i];
        node.age++;
        node.life -= decayRate;
        node.intensity = Math.pow(Math.max(0, node.life), 1.35);
        node.r = responsiveBaseRadius * (0.28 + 0.72 * Math.max(0, node.life));

        if (node.life <= 0) {
          trail.splice(i, 1);
        }
      }

      // If faded out and no active trail, clear and sleep
      if (fadeAlpha < 0.008 && trail.length === 0 && !mouse.active) {
        ctx.clearRect(0, 0, width, height);
        isRunning = false;
        animId = null;
        return;
      }

      // Clear previous frame
      ctx.clearRect(0, 0, width, height);

      // Compute bounding box covering head and all active trail segments
      let minX = head.x - curHeadR;
      let maxX = head.x + curHeadR;
      let minY = head.y - curHeadR;
      let maxY = head.y + curHeadR;

      for (let i = 0; i < trail.length; i++) {
        const node = trail[i];
        const nr = node.r;
        if (node.x - nr < minX) minX = node.x - nr;
        if (node.x + nr > maxX) maxX = node.x + nr;
        if (node.y - nr < minY) minY = node.y - nr;
        if (node.y + nr > maxY) maxY = node.y + nr;
      }

      // Add safe padding
      minX = Math.max(0, minX - 12);
      maxX = Math.min(width, maxX + 12);
      minY = Math.max(0, minY - 12);
      maxY = Math.min(height, maxY + 12);

      // Convert to grid cell indices
      const minGX = Math.floor(minX / gridSpacing);
      const maxGX = Math.ceil(maxX / gridSpacing);
      const minGY = Math.floor(minY / gridSpacing);
      const maxGY = Math.ceil(maxY / gridSpacing);

      // Photo cutout exclusion bounds
      const photoBounds = getPhotoBounds();

      // Active trail segments list
      const segmentCount = trail.length > 1 ? trail.length - 1 : 0;

      // Set fill color to pure black (#000000 only per requirement)
      ctx.fillStyle = '#289e9eff';

      // Evaluate grid positions within bounding box
      for (let gy = minGY; gy <= maxGY; gy++) {
        const py = gy * gridSpacing;

        // Skip rows clearly outside vertical bounds
        if (py < 0 || py > height) continue;

        for (let gx = minGX; gx <= maxGX; gx++) {
          const px = gx * gridSpacing;

          // Skip columns clearly outside horizontal bounds
          if (px < 0 || px > width) continue;

          // Photo cutout exclusion: never draw black particles over the portrait
          if (
            photoBounds &&
            px >= photoBounds.minX &&
            px <= photoBounds.maxX &&
            py >= photoBounds.minY &&
            py <= photoBounds.maxY
          ) {
            continue;
          }

          let maxDensity = 0;

          // 1. Head Influence (Dense circular/irregular mass)
          const hdx = px - head.x;
          const hdy = py - head.y;
          const hd2 = hdx * hdx + hdy * hdy;

          if (hd2 < curHeadR * curHeadR) {
            const hd = Math.sqrt(hd2);
            // Subtle noise variation to avoid a sterile geometric circle
            const hAngle = Math.atan2(hdy, hdx);
            const hWobble = 1.0 + Math.sin(hAngle * 5) * 0.05 + Math.cos(hAngle * 3) * 0.04;
            const effHeadR = curHeadR * hWobble;
            const effCoreR = curCoreR * hWobble;

            if (hd <= effCoreR) {
              maxDensity = 1.0; // Solid black core containing hundreds of particles
            } else if (hd < effHeadR) {
              const norm = (hd - effCoreR) / (effHeadR - effCoreR);
              maxDensity = Math.pow(1 - norm, 1.3);
            }
          }

          // 2. Trail Segment Influence (Elongated flowing dither tail)
          if (segmentCount > 0 && maxDensity < 0.96) {
            for (let s = 0; s < segmentCount; s++) {
              const a = trail[s];
              const b = trail[s + 1];

              // Fast AABB check for this individual segment
              const maxR = Math.max(a.r, b.r);
              const segMinX = Math.min(a.x, b.x) - maxR;
              if (px < segMinX) continue;
              const segMaxX = Math.max(a.x, b.x) + maxR;
              if (px > segMaxX) continue;
              const segMinY = Math.min(a.y, b.y) - maxR;
              if (py < segMinY) continue;
              const segMaxY = Math.max(a.y, b.y) + maxR;
              if (py > segMaxY) continue;

              const { d2, t } = distToSegmentSquared(px, py, a.x, a.y, b.x, b.y);
              const segR = a.r + t * (b.r - a.r);

              if (d2 < segR * segR) {
                const d = Math.sqrt(d2);
                const segIntensity = a.intensity + t * (b.intensity - a.intensity);
                const norm = d / segR;
                const dens = segIntensity * Math.pow(1 - norm, 1.45);
                if (dens > maxDensity) {
                  maxDensity = dens;
                  if (maxDensity >= 0.96) break;
                }
              }
            }
          }

          // Overall fade alpha multiplier
          const finalDensity = maxDensity * fadeAlpha;

          if (finalDensity > 0.02) {
            // Compare against authentic blended halftone/dither threshold
            const threshold = getThreshold(gx, gy);

            if (finalDensity >= threshold) {
              // Draw individual crisp tiny black square
              ctx.fillRect(px, py, particleSize, particleSize);
            }
          }
        }
      }

      // Continue animation loop
      animId = requestAnimationFrame(render);
    };

    // Pointer move handler
    const onPointerMove = (e) => {
      const container = containerRef?.current || canvas.parentElement;
      if (!container) return;

      const cRect = container.getBoundingClientRect();
      const clientX = e.clientX;
      const clientY = e.clientY;

      // Strictly check if cursor is inside the hero container bounds
      const isInside =
        clientX >= cRect.left &&
        clientX <= cRect.right &&
        clientY >= cRect.top &&
        clientY <= cRect.bottom;

      if (!isInside) {
        mouse.active = false;
        requestFrame();
        return;
      }

      // Check if cursor is directly hovering over portrait cutout
      if (isOverPhoto(clientX, clientY)) {
        mouse.active = false;
        requestFrame();
        return;
      }

      const localX = clientX - cRect.left;
      const localY = clientY - cRect.top;

      if (!mouse.hasEntered) {
        head.x = localX;
        head.y = localY;
        mouse.hasEntered = true;
      }

      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x = localX;
      mouse.y = localY;
      mouse.active = true;

      requestFrame();
    };

    const onPointerLeave = () => {
      mouse.active = false;
      requestFrame();
    };

    // Attach listeners
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave, { passive: true });
    window.addEventListener('resize', resize);

    // Initial sizing
    resize();

    // Cleanup
    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('resize', resize);
    };
  }, [containerRef, photoRef, particleSize, gridSpacing, baseRadius, coreRadius, maxTrailNodes]);

  return (
    <canvas
      ref={canvasRef}
      className={`hero-dither-canvas ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}
    />
  );
};

export default DitherCursor;
