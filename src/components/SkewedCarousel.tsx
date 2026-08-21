import { useEffect, useRef, useState } from 'react';
import './SkewedCarousel.css';

/* A skewed carousel, hand-built.

   React Bits' SkewedCarousel is a Pro (paid) component — reactbits.dev/r/ returns
   the site shell for it rather than a registry item, so it cannot be installed
   from the public registry. This reproduces the effect: the track sits on a
   skewed, slightly rotated plane, drifts continuously, un-skews the card under
   the pointer, and can be dragged. */
export type SkewedItem = { src: string; caption?: string };

export default function SkewedCarousel({
  items,
  speed = 32,
  skew = -8,
  rotate = -2,
  className = '',
  label = 'Photographs of the team',
}: {
  items: SkewedItem[];
  /** seconds for one full pass */
  speed?: number;
  skew?: number;
  rotate?: number;
  className?: string;
  /* The photographs carry no per-image captions, so each <img> is
     decorative (alt=""). One label on the list is what actually helps:
     a screen reader announces the reel for what it is instead of
     stepping through 25 unnamed images. */
  label?: string;
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [paused, setPaused] = useState(false);
  const drag = useRef<{ down: boolean; startX: number; base: number }>({ down: false, startX: 0, base: 0 });
  const [offset, setOffset] = useState(0);

  // duplicated once so the loop seam is exact
  const row = [...items, ...items];

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onDown = (e: PointerEvent) => {
      drag.current = { down: true, startX: e.clientX, base: offset };
      setPaused(true);
      el.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!drag.current.down) return;
      setOffset(drag.current.base + (e.clientX - drag.current.startX));
    };
    const onUp = (e: PointerEvent) => {
      drag.current.down = false;
      setPaused(false);
      try { el.releasePointerCapture(e.pointerId); } catch { /* pointer already released */ }
    };

    el.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      el.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [offset]);

  return (
    <div
      className={`skew ${className}`}
      style={{ '--skew': `${skew}deg`, '--rot': `${rotate}deg`, '--dur': `${speed}s` } as React.CSSProperties}
    >
      <ul
        ref={trackRef}
        role="list"
        aria-label={label}
        className={`skew__track${paused ? ' is-paused' : ''}`}
        style={{ '--drag': `${offset}px` } as React.CSSProperties}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => { if (!drag.current.down) setPaused(false); }}
      >
        {row.map((it, i) => (
          <li className="skew__item" key={`${it.src}-${i}`} aria-hidden={i >= items.length}>
            <figure className="skew__card">
              <img src={it.src} alt={i < items.length ? (it.caption ?? '') : ''} draggable={false} loading="lazy" />
              {it.caption && <figcaption className="mono-sm skew__cap">{it.caption}</figcaption>}
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
