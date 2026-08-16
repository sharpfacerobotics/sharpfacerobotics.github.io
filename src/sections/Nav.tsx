import { useEffect, useState } from 'react';
import { team } from '@/data/site';
import './Nav.css';

export const TABS = [
  { id: 'home',     label: 'Home' },
  { id: 'team',     label: 'Team' },
  { id: 'robot',    label: 'Robot' },
  { id: 'roster',   label: 'Roster' },
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

  return (
    <nav className={`nav${stuck ? ' is-stuck' : ''}`} aria-label="Primary">
      <div className="wrap nav__in">
        <button className="nav__brand" onClick={() => { onTab('home'); setOpen(false); }}>
          <img src="/assets/SharpFace.png" alt="" width="34" height="34" />
          <span>
            <b>Sharp Face Robotics</b>
            <em className="mono-sm">FTC {team.number}</em>
          </span>
        </button>

        <ul className="nav__links" role="tablist">
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
    </nav>
  );
}
