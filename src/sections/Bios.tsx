import { useState } from 'react';
import { captain, coaches, members, type Member } from '@/data/team';
import ChromaGrid from '@/components/reactbits/ChromaGrid';
import { Reveal } from '@/components/Motion';
import OptionWheel from '@/components/reactbits/OptionWheel';
import './Bios.css';

/* Grouped roster. A person appears under every group they work in, so the
   seven who also run outreach show up twice — that is the point of the
   Outreach group, not a duplication bug. */
const GROUPS = [
  { key: 'Mechanical', label: 'Mechanical', blurb: 'Design and build',
    tint: '#f0a03c', pick: (m: Member) => m.group === 'Mechanical' },
  { key: 'Software', label: 'Software', blurb: 'Programming and controls',
    tint: '#3fd0c9', pick: (m: Member) => m.group === 'Software' },
  { key: 'Outreach', label: 'Outreach', blurb: 'Community and sponsorship',
    tint: '#8b7bff', pick: (m: Member) => m.outreach },
] as const;

const monogram = (name: string) => {
  const initials = name.split(' ').map(p => p[0]).slice(0, 2).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500">
    <rect width="400" height="500" fill="#0f131b"/>
    <text x="50%" y="52%" font-family="Archivo, sans-serif" font-size="150" font-weight="700"
      fill="#3a4356" text-anchor="middle" dominant-baseline="middle">${initials}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const toItem = (m: Member, tint: string) => ({
  image: m.photo ?? monogram(m.name),
  title: m.name,
  subtitle: m.group,
  handle: m.grade,
  location: m.favorite,
  borderColor: tint,
  gradient: `linear-gradient(160deg, ${tint}66, rgba(10,12,17,0.92))`,
});

const WHEEL = ['Everyone', 'Mechanical', 'Software', 'Outreach'] as const;

export default function Bios() {
  const [pick, setPick] = useState<string>('Everyone');
  const shown = GROUPS.filter(g => pick === 'Everyone' || g.key === pick);
  const showLeadership = pick === 'Everyone';

  return (
    <section className="band" id="roster">
      <div className="wrap">
        <header className="sec-head">
          <div className="sec-index"><b>03</b><span>Roster</span></div>
          <h2 className="d2">The people who build it</h2>
        </header>

        {/* ── Leadership: tier 01 when the wheel is on Everyone ─────── */}
        <div className={`lead-wrap${showLeadership ? ' is-open' : ''}`} aria-hidden={!showLeadership}>
          <div className="lead-wrap__inner">
          <div className="tier">
            <div className="tier__head">
              <h3 className="mono tier__label" style={{ color: '#8b7bff' }}>Leadership</h3>
              <p className="tier__blurb">Captain and coaching staff</p>
            </div>
            <div className="lead-row">
              <article className="lead pane">
                <div className="lead__img">
                  <img src={captain.photo} alt={captain.name} loading="lazy" />
                </div>
                <div>
                  <p className="mono lead__role">{captain.title}</p>
                  <h4 className="d3">{captain.name}</h4>
                  <p className="mono-sm lead__grade">{captain.grade}</p>
                  {captain.favorite && <p className="bio__quote">“{captain.favorite}”</p>}
                </div>
              </article>

              {coaches.map(c => (
                <article className="lead lead--coach pane" key={c.name}>
                  <div>
                    <p className="mono lead__role">{c.title}</p>
                    <h4 className="d3">{c.name}</h4>
                    {c.note && <p className="bio__quote">“{c.note}”</p>}
                  </div>
                </article>
              ))}
            </div>
          </div>
          </div>
        </div>

        {/* ── Working groups ─────────────────────────────────────── */}
        <div className="roster__body">
        {/* React Bits OptionWheel — a physical dial for the working groups. */}
        <div className="roster__wheel">
          <p className="mono roster__wheel-label">
            Show
            <span className="roster__wheel-hint">drag</span>
          </p>
          <div className="roster__wheel-stage">
          <OptionWheel
            items={[...WHEEL]}
            defaultSelected={0}
            onChange={(_i, item) => setPick(item)}
            textColor="#6d7583"
            activeColor="#4fe0d8"
            /* fontSize is in REM and spacing is a MULTIPLIER
               (rowH = fontSize * spacing * 16px), not pixels. */
            fontSize={0.95}
            spacing={1.85}
            curve={18}
            tilt={12}
            blur={1.2}
            fade={0.7}
            minOpacity={0.2}
            inset={18}
            loop
            draggable
            className="roster__wheel-ctl"
          />
          {/* affordances live inside the stage so they centre on the wheel */}
          <span className="roster__wheel-band" aria-hidden="true" />
          <span className="roster__wheel-arrow roster__wheel-arrow--up" aria-hidden="true">
            <svg viewBox="0 0 16 16" width="14" height="14"><path d="M4 10l4-4 4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
          <span className="roster__wheel-arrow roster__wheel-arrow--down" aria-hidden="true">
            <svg viewBox="0 0 16 16" width="14" height="14"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
          </div>
          <p className="mono-sm roster__wheel-keys">
            <kbd>↑</kbd><kbd>↓</kbd> arrow keys
          </p>
        </div>

        <div className="roster__groups">
        {shown.map((g, gi) => {
          const list = members.filter(g.pick);
          if (!list.length) return null;
          return (
            <Reveal key={g.key} delay={gi * 60}>
              <div className="tier">
                <div className="tier__head">
                  <h3 className="mono tier__label" style={{ color: g.tint }}>{g.label}</h3>
                  <p className="tier__blurb">{g.blurb}</p>
                  <span className="mono tier__count">{String(list.length).padStart(2, '0')}</span>
                </div>
                <ChromaGrid
                  items={list.map(m => toItem(m, g.tint))}
                  className="bios__chroma"
                  radius={320}
                  damping={0.42}
                  fadeOut={0.55}
                />
              </div>
            </Reveal>
          );
        })}
        </div>
        </div>
      </div>
    </section>
  );
}
