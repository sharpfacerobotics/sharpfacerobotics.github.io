import { useEffect, useRef } from 'react';
import Aurora from '@/components/reactbits/Aurora';
import './Backdrop.css';

/* React Bits' Aurora, run deliberately quiet: low amplitude, low blend, and
   masked to the top of the page so it reads as atmosphere behind the content
   rather than as the content. A pointer light and a grain plate sit over it —
   the grain is what stops a big dark gradient from banding. */
export default function Backdrop({ quiet = false }: { quiet?: boolean }) {
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
    return () => { cancelAnimationFrame(raf); window.removeEventListener('pointermove', move); };
  }, []);

  return (
    <div className="bd" ref={ref} aria-hidden="true">
      {/* Aurora is WebGL and measurably the frame-rate ceiling: 54fps with it,
          98fps without, measured during the robot walkthrough. It is dropped on
          scroll-driven pages, which need the frames more than the atmosphere. */}
      {!quiet && (
        <div className="bd__aurora">
          <Aurora colorStops={['#0e5d5a', '#4fe0d8', '#5b4bd6']} amplitude={0.9} blend={0.42} speed={0.4} />
        </div>
      )}
      {quiet && <div className="bd__quiet" aria-hidden="true" />}
      <div className="bd__pointer" />
      <div className="bd__grain" />
    </div>
  );
}
