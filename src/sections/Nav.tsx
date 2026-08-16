import { useEffect, useState } from 'react';
import { team } from '@/data/site';
import './Nav.css';

const LINKS = [
  { id: 'team',     label: 'Team' },
  { id: 'robot',    label: 'Robot' },
  { id: 'bios',     label: 'Roster' },
  { id: 'services', label: 'Services' },
  { id: 'outreach', label: 'Outreach' },
  { id: 'sponsors', label: 'Partners' },
  { id: 'contact',  label: 'Contact' },
];

export default function Nav({ onAdmin }: { onAdmin: () => void }) {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const els = LINKS.map(l => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      entries => {
        const vis = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5] }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
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
        <a className="nav__brand" href="#top" onClick={() => setOpen(false)}>
          <img src="/assets/SharpFace.png" alt="" width="34" height="34" />
          <span>
            <b>Sharp Face Robotics</b>
            <em className="mono-sm">FTC {team.number}</em>
          </span>
        </a>

        <ul className="nav__links">
          {LINKS.map(l => (
            <li key={l.id}>
              <a href={`#${l.id}`} className={`mono nav__link${active === l.id ? ' is-active' : ''}`}>
                {l.label}
              </a>
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
          {LINKS.map(l => (
            <a key={l.id} href={`#${l.id}`} className="d3" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
