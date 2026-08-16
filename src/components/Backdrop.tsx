import { useEffect, useRef } from 'react';
import './Backdrop.css';

/* Replaces the LiquidChrome field. That was a churning WebGL smear — busy,
   expensive, and it fought every panel on top of it.

   This is the Linear/Stripe approach instead: a near-black ground, two very
   slow low-opacity drifts, a fine grain plate to kill gradient banding, and
   one soft light that follows the pointer. Cheap, calm, and it reads as depth
   rather than decoration. */
export default function Backdrop() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover)').matches) return;

    let raf = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--px', `${(e.clientX / window.innerWidth) * 100}%`);
        el.style.setProperty('--py', `${(e.clientY / window.innerHeight) * 100}%`);
      });
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
    };
  }, []);

  return (
    <div className="bd" ref={ref} aria-hidden="true">
      <div className="bd__drift bd__drift--a" />
      <div className="bd__drift bd__drift--b" />
      <div className="bd__pointer" />
      <div className="bd__grain" />
    </div>
  );
}
