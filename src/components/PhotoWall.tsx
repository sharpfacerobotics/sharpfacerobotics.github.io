import { useEffect, useRef, useState } from 'react';
import './PhotoWall.css';

/* A living mosaic that reacts to the pointer. Each tile holds two stacked layers and cross-fades between
   them, so the wall slowly cycles the whole photo set rather than showing a
   fixed twelve. Swaps are staggered per tile — a synchronised flip would read
   as a glitch — and each tile drifts with a slow Ken Burns pan. */
export default function PhotoWall({
  photos,
  tiles = 12,
  interval = 3200,
  className = '',
}: {
  photos: string[];
  tiles?: number;
  /** ms between one tile swapping; the wall as a whole changes far more often */
  interval?: number;
  className?: string;
}) {
  // which photo index each tile is currently showing
  const [slots, setSlots] = useState<number[]>(() =>
    Array.from({ length: tiles }, (_, i) => i % Math.max(1, photos.length))
  );
  const [flip, setFlip] = useState<boolean[]>(() => Array.from({ length: tiles }, () => false));
  const ref = useRef<HTMLDivElement>(null);

  /* Advance one specific tile to a photo not already on the wall. */
  const advance = (t: number) => {
    setSlots(prev => {
      if (photos.length <= tiles) return prev;
      const used = new Set(prev);
      let next = (prev[t] + tiles) % photos.length;
      let guard = 0;
      while (used.has(next) && guard < photos.length) {
        next = (next + 1) % photos.length;
        guard += 1;
      }
      const out = [...prev];
      out[t] = next;
      return out;
    });
    setFlip(prev => {
      const out = [...prev];
      out[t] = !out[t];
      return out;
    });
  };

  /* Pointer-driven: sweeping the cursor across the wall turns over whichever
     tile is underneath. The wall keeps pointer-events:none so it can never
     swallow a click meant for the contact links — the tile under the cursor is
     worked out from geometry on a window-level listener instead. */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover)').matches) return;

    let last = -1;
    let lock = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) return;
      const cols = window.matchMedia('(max-width: 900px)').matches ? 4 : 6;
      const rows = Math.ceil(tiles / cols);
      const col = Math.min(cols - 1, Math.floor(((e.clientX - r.left) / r.width) * cols));
      const row = Math.min(rows - 1, Math.floor(((e.clientY - r.top) / r.height) * rows));
      const t = row * cols + col;
      if (t < 0 || t >= tiles || t === last) return;
      // throttle: a fast sweep should not fire a swap every frame
      const now = performance.now();
      if (now - lock < 140) return;
      lock = now;
      last = t;
      advance(t);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photos.length, tiles]);

  useEffect(() => {
    if (photos.length <= tiles) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let tick = 0;
    const id = window.setInterval(() => {
      // advance ONE tile per tick, round-robin, so the wall never flips at once
      const t = tick % tiles;
      tick += 1;
      advance(t);
    }, interval);
    return () => window.clearInterval(id);
  }, [photos.length, tiles, interval]);

  return (
    <div className={`wall ${className}`} ref={ref} aria-hidden="true">
      {slots.map((photoIdx, i) => (
        <span className="wall__tile" key={i} style={{ '--d': `${(i % 5) * 1.7}s` } as React.CSSProperties}>
          <span
            className={`wall__layer${flip[i] ? '' : ' is-on'}`}
            style={{ backgroundImage: `url(${photos[photoIdx]})` }}
          />
          <span
            className={`wall__layer${flip[i] ? ' is-on' : ''}`}
            style={{ backgroundImage: `url(${photos[(photoIdx + 1) % photos.length]})` }}
          />
        </span>
      ))}
    </div>
  );
}
