'use client';

import { useEffect, useRef } from 'react';

const RINGS = [
  { radius: 0.19, speed: -0.12, size: 7.4, words: ['ASSEMBLY', 'SECURE SYSTEMS', 'MULTI-AGENT AI', 'RESEARCH'] },
  { radius: 0.29, speed: 0.085, size: 6.3, words: ['APPLICATION SECURITY', 'FULL-STACK ENGINEERING', 'SYSTEM DESIGN'] },
  { radius: 0.4, speed: -0.055, size: 5.6, words: ['CYBERSECURITY', 'OPEN SOURCE', 'BUILD WITH INTENT', 'APPLIED AI'] },
  { radius: 0.52, speed: 0.034, size: 5.0, words: ['THREAT ANALYSIS', 'SOFTWARE ENGINEERING', 'RESEARCH & DEVELOPMENT'] },
  { radius: 0.66, speed: -0.022, size: 4.6, words: ['ANUBHAB DAS', 'KOLKATA, INDIA', 'DESIGN • BUILD • SECURE'] },
  { radius: 0.81, speed: 0.014, size: 4.2, words: ['PYTHON', 'TYPESCRIPT', 'REACT', 'FASTAPI', 'WEB SECURITY', 'ARTIFICIAL INTELLIGENCE'] },
];

function drawRingText(
  ctx: CanvasRenderingContext2D,
  words: string[],
  radius: number,
  rotation: number,
  fontSize: number,
  alpha: number,
) {
  const text = words.join('     /     ') + '     /     ';
  ctx.save();
  ctx.translate(0, 0);
  ctx.rotate(rotation);
  ctx.font = `500 ${fontSize}px "JetBrains Mono", monospace`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = `rgba(238, 239, 229, ${alpha})`;
  const circumference = Math.PI * 2 * radius;
  const measured = ctx.measureText(text).width;
  const repeats = Math.max(1, Math.ceil(circumference / measured));
  const line = text.repeat(repeats);
  const chars = Array.from(line);
  const widths = chars.map((char) => ctx.measureText(char).width);
  let distance = 0;
  for (let i = 0; i < chars.length; i += 1) {
    const charWidth = widths[i];
    const angle = distance / radius;
    ctx.save();
    ctx.rotate(angle);
    ctx.fillText(chars[i], radius, 0);
    ctx.restore();
    distance += charWidth;
    if (distance >= circumference) break;
  }
  ctx.restore();
}

export default function HeroTypographyField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { alpha: true });
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let lastTime = 0;
    let elapsed = 0;
    let visible = document.visibilityState === 'visible';
s    let host: HTMLElement | null = canvas.parentElement?.parentElement ?? null;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const render = (time: number) => {
      if (!visible) return;
      if (!lastTime) lastTime = time;
      const delta = Math.min(48, time - lastTime);
      lastTime = time;
      if (!reduceMotion.matches) elapsed += delta * 0.001;
      ctx.clearRect(0, 0, width, height);

      const scale = Math.min(width, height);
      const cx = width * 0.53;
      const cy = height * 0.51;
      const pointer = pointerRef.current;
      const px = pointer.active ? (pointer.x - cx) / Math.max(1, width) : 0;
      const py = pointer.active ? (pointer.y - cy) / Math.max(1, height) : 0;
      const maxRadius = scale * 0.79;

      ctx.save();
      ctx.translate(cx + px * 22, cy + py * 16);
      ctx.globalCompositeOperation = 'source-over';

      for (let index = RINGS.length - 1; index >= 0; index -= 1) {
        const ring = RINGS[index];
        const radius = maxRadius * ring.radius;
        const rotation = elapsed * ring.speed + index * 0.43 + (px - py) * (0.12 + index * 0.018);
        const alpha = 0.18 - index * 0.018;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(230, 234, 222, ${0.12 - index * 0.012})`;
        ctx.lineWidth = index % 2 === 0 ? 0.8 : 0.55;
        ctx.setLineDash(index % 2 === 0 ? [1, 8] : [2, 13]);
        ctx.stroke();
        ctx.setLineDash([]);
        drawRingText(ctx, ring.words, radius, rotation, Math.max(5.5, (scale / 900) * ring.size), alpha);
      }

      const coreRadius = maxRadius * 0.105;
      const coreGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, coreRadius * 1.8);
      coreGlow.addColorStop(0, 'rgba(238, 240, 229, .18)');
      coreGlow.addColorStop(0.45, 'rgba(238, 240, 229, .045)');
      coreGlow.addColorStop(1, 'rgba(238, 240, 229, 0)');
      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(0, 0, coreRadius * 1.8, 0, Math.PI * 2);
      ctx.fill();

      for (let i = 0; i < 90; i += 1) {
        const angle = i * 2.399963 + elapsed * (i % 2 ? 0.11 : -0.085);
        const radial = coreRadius * (0.25 + ((i * 37) % 71) / 100);
        const x = Math.cos(angle) * radial;
        const y = Math.sin(angle) * radial;
        const dot = i % 7 === 0 ? 1.45 : 0.7;
        ctx.beginPath();
        ctx.arc(x, y, dot, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(235, 239, 225, ${0.12 + (i % 5) * 0.045})`;
        ctx.fill();
      }

      ctx.restore();

      if (!reduceMotion.matches) frame = window.requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top, active: true };
    };
    const onPointerLeave = () => { pointerRef.current.active = false; };
    const onVisibility = () => {
      visible = document.visibilityState === 'visible';
      if (visible && !reduceMotion.matches) {
        lastTime = 0;
        frame = window.requestAnimationFrame(render);
      } else if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();
    host?.addEventListener('pointermove', onPointerMove, { passive: true });
    host?.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibility);

    if (reduceMotion.matches) render(0);
    else frame = window.requestAnimationFrame(render);

    const onMotionChange = () => {
      if (frame) window.cancelAnimationFrame(frame);
      lastTime = 0;
      if (reduceMotion.matches) render(0);
      else frame = window.requestAnimationFrame(render);
    };
    reduceMotion.addEventListener('change', onMotionChange);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      host?.removeEventListener('pointermove', onPointerMove);
      host?.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      reduceMotion.removeEventListener('change', onMotionChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="lab-hero-typography-field" aria-hidden="true" />;
}
