import { useEffect, useRef, useState, type ReactNode } from 'react';
import './Motion.css';

const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ───────────────────────────────────────────────────────────────
   Reveal — Linear's scroll entrance: short travel, fast, no bounce.
   Fires at rootMargin -8% so a card is never still blank while the
   one beside it is already readable, and content is visible by
   default if JS never runs.
   ─────────────────────────────────────────────────────────────── */
export function Reveal({
  children, delay = 0, y = 18, className = '', as: Tag = 'div',
}: {
  children: ReactNode; delay?: number; y?: number; className?: string;
  as?: 'div' | 'li' | 'section' | 'article';
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (reduced()) { setShown(true); return; }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`rv${shown ? ' is-in' : ''} ${className}`}
      style={{ '--rv-delay': `${delay}ms`, '--rv-y': `${y}px` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}

/* ───────────────────────────────────────────────────────────────
   Magnetic — the Linear/Stripe button that leans toward the cursor
   and snaps back. Translation is capped so it never detaches from
   its hit area.
   ─────────────────────────────────────────────────────────────── */
export function Magnetic({
  children, strength = 0.32, cap = 10, className = '',
}: { children: ReactNode; strength?: number; cap?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced() || !window.matchMedia('(hover: hover)').matches) return;

    let raf = 0;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = Math.max(-cap, Math.min(cap, dx * strength));
        const y = Math.max(-cap, Math.min(cap, dy * strength));
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    };
    const leave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = 'translate3d(0,0,0)';
    };

    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, [strength, cap]);

  return <span ref={ref} className={`mag ${className}`}>{children}</span>;
}

/* ───────────────────────────────────────────────────────────────
   Spotlight — Stripe/Cosmos surface light. Writes pointer position
   to CSS vars on a container; children read them. One listener for
   a whole grid rather than one per card.
   ─────────────────────────────────────────────────────────────── */
export function Spotlight({
  children, className = '',
}: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--sx', `${e.clientX - r.left}px`);
        el.style.setProperty('--sy', `${e.clientY - r.top}px`);
        el.style.setProperty('--so', '1');
      });
    };
    const leave = () => el.style.setProperty('--so', '0');
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, []);

  return <div ref={ref} className={`spot ${className}`}>{children}</div>;
}
