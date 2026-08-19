import type { ReactNode } from 'react';
import { Magnetic } from './Motion';
import './GlowButton.css';

/* A conic-gradient border that rotates behind the button face — the uiverse.io
   "animated gradient border" pattern, rebuilt on this palette with an
   @property-animated angle so it runs on the compositor instead of
   re-rasterising a background every frame. */
export default function GlowButton({
  children, href, onClick, tone = 'teal', className = '',
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  tone?: 'teal' | 'violet';
  className?: string;
}) {
  const inner = (
    <span className="gb__face">
      <span className="gb__label">{children}</span>
      <svg className="gb__arrow" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );

  const cls = `gb gb--${tone} ${className}`;

  return (
    <Magnetic>
      {href
        ? <a className={cls} href={href}>{inner}</a>
        : <button type="button" className={cls} onClick={onClick}>{inner}</button>}
    </Magnetic>
  );
}
