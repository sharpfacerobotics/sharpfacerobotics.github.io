import { useEffect, useState } from 'react';
import './PhotoWall.css';

/* A living mosaic. Each tile holds two stacked layers and cross-fades between
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

  useEffect(() => {
    if (photos.length <= tiles) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let tick = 0;
    const id = window.setInterval(() => {
      // advance ONE tile per tick, round-robin, so the wall never flips at once
      const t = tick % tiles;
      tick += 1;
      setSlots(prev => {
        const used = new Set(prev);
        let next = (prev[t] + tiles) % photos.length;
        // avoid showing the same photo twice on the wall
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
    }, interval);
    return () => window.clearInterval(id);
  }, [photos.length, tiles, interval]);

  return (
    <div className={`wall ${className}`} aria-hidden="true">
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
