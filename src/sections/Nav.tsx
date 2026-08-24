import { useEffect, useRef, useState } from 'react';
import { team } from '@/data/site';
import GlassSurface from '@/components/reactbits/GlassSurface';
import './Nav.css';

export const TABS = [
  { id: 'home',     label: 'Home' },
  { id: 'team',     label: 'Team' },
  { id: 'robot',    label: 'Robot' },
  { id: 'roster',   label: 'Members' },
  { id: 'services', label: 'Services' },
  { id: 'outreach', label: 'Outreach' },
  { id: 'partners', label: 'Partners' },
  { id: 'contact',  label: 'Contact' },
] as const;

export type TabId = (typeof TABS)[number]['id'];

export default function Nav({ tab, onTab, onAdmin }: { tab: TabId; onTab: (t: TabId) => void; onAdmin: () => void }) {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  /* Admin is staff-only, so it is no longer advertised in the public nav.
     Reachable via #admin or ⌘/Ctrl-Shift-A. */
  useEffect(() => {
    const viaHash = () => { if (window.location.hash === '#admin') onAdmin(); };
    viaHash();
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        onAdmin();
      }
    };
    window.addEventListener('hashchange', viaHash);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('hashchange', viaHash);
      window.removeEventListener('keydown', onKey);
    };
  }, [onAdmin]);

  /* Measure the active tab so the glass pill can slide onto it. */
  const listRef = useRef<HTMLUListElement>(null);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);
  useEffect(() => {
    const measure = () => {
      const list = listRef.current;
      if (!list) return;
      const el = list.querySelector<HTMLElement>('.nav__link.is-active');
      if (!el) return setPill(null);
      const lb = list.getBoundingClientRect();
      const eb = el.getBoundingClientRect();
      setPill({ x: eb.left - lb.left, w: eb.width });
    };
    measure();
    const id = window.setTimeout(measure, 60);
    window.addEventListener('resize', measure);
    return () => { window.clearTimeout(id); window.removeEventListener('resize', measure); };
  }, [tab]);

  return (
    <>
    <nav className={`nav${stuck ? ' is-stuck' : ''}`} aria-label="Primary">
      <div className="wrap nav__in">
        <button className="nav__brand" onClick={() => { onTab('home'); setOpen(false); }}>
          <img src="/assets/SharpFace.png" alt="" width="34" height="34" />
          <span>
            <b>Sharp Face Robotics</b>
            <em className="mono-sm">FTC {team.number}</em>
          </span>
        </button>

        <ul className="nav__links" role="tablist" ref={listRef}>
          {/* React Bits GlassSurface as the active-tab indicator — it slides
              between tabs and genuinely refracts the bar behind it. */}
          {pill && (
            <li className="nav__pill" aria-hidden="true"
                style={{ transform: `translateX(${pill.x}px)`, width: pill.w }}>
              {/* Gentle. A strong displacement over a near-uniform dark
                  backdrop just drags the bar's own edges into smears, and the
                  RGB offsets split them into rainbow fringes — it reads as a
                  dirty lens, not glass. Displacement and chroma are off here;
                  the component runs as a clean blur and the pill's edge light,
                  tint and sheen carry the glass. */}
              <GlassSurface
                width="100%" height="100%" borderRadius={999}
                blur={6} displace={0} distortionScale={0}
                redOffset={0} greenOffset={0} blueOffset={0}
                brightness={62} opacity={0.6} backgroundOpacity={0.04} saturation={1.3}
                className="nav__pill-glass"
              />
            </li>
          )}
          {TABS.map(l => (
            <li key={l.id}>
              <button
                role="tab"
                aria-selected={tab === l.id}
                className={`mono nav__link${tab === l.id ? ' is-active' : ''}`}
                onClick={() => onTab(l.id)}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="nav__end">
          <button
            className="nav__burger"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(o => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

    </nav>

    {/* Deliberately a SIBLING of <nav>, not a child. .nav sets
        pointer-events:none so the space around the floating pill does not
        block the page, and the sheet used to sit inside it and restore
        pointer-events:auto on itself. The CSS minifier strips that
        declaration as a redundant default -- it cannot see that it is
        overriding an INHERITED none -- so on the deployed build the menu
        opened, looked correct, and every tap fell through to the hero.
        Out here it never inherits none, so there is nothing to override
        and nothing for a minifier to remove. */}
    {open && (
      <div className="nav__sheet">
        {TABS.map(l => (
          <button
            key={l.id}
            className={`d3 nav__sheet-item${tab === l.id ? ' is-active' : ''}`}
            onClick={() => { onTab(l.id); setOpen(false); }}
          >
            {l.label}
          </button>
        ))}
      </div>
    )}
    </>
  );
}
