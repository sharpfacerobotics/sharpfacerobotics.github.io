import { useState } from 'react';
import { captain, coaches, members, type Member } from '@/data/team';
import ChromaGrid from '@/components/reactbits/ChromaGrid';
import './Bios.css';

type Filter = 'All' | 'Mechanical' | 'Software' | 'Outreach';
const FILTERS: Filter[] = ['All', 'Mechanical', 'Software', 'Outreach'];

const match = (m: Member, f: Filter) =>
  f === 'All' ? true : f === 'Outreach' ? m.outreach : m.group === f;

/* Fall back to a generated monogram tile when a member has no photograph,
   so ChromaGrid never renders a broken image. */
const monogram = (name: string) => {
  const initials = name.split(' ').map(p => p[0]).slice(0, 2).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">
    <rect width="400" height="400" fill="#11141b"/>
    <text x="50%" y="52%" font-family="Archivo, sans-serif" font-size="140" font-weight="700"
      fill="#4a5364" text-anchor="middle" dominant-baseline="middle">${initials}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const TINT: Record<string, { border: string; gradient: string }> = {
  Mechanical: { border: '#f0a03c', gradient: 'linear-gradient(160deg, rgba(240,160,60,0.5), rgba(10,12,17,0.9))' },
  Software:   { border: '#3fd0c9', gradient: 'linear-gradient(160deg, rgba(63,208,201,0.5), rgba(10,12,17,0.9))' },
};

export default function Bios() {
  const [f, setF] = useState<Filter>('All');
  const list = members.filter(m => match(m, f));

  const captainItem = {
    image: captain.photo,
    title: captain.name,
    subtitle: captain.title,
    handle: captain.grade,
    location: captain.favorite,
    borderColor: '#8b7bff',
    gradient: 'linear-gradient(160deg, rgba(139,123,255,0.55), rgba(10,12,17,0.9))',
  };

  const items = list.map(m => ({
    image: m.photo ?? monogram(m.name),
    title: m.name,
    subtitle: m.group + (m.outreach ? ' · Outreach' : ''),
    handle: m.grade,
    location: m.favorite,
    borderColor: TINT[m.group].border,
    gradient: TINT[m.group].gradient,
  }));

  const grid = f === 'All' || f === 'Software' ? [captainItem, ...items] : items;

  return (
    <section className="band" id="bios">
      <div className="wrap">
        <header className="sec-head">
          <div className="sec-index"><b>03</b><span>Roster</span></div>
          <h2 className="d2">The people who build it</h2>
        </header>

        <div className="coaches pane">
          <p className="mono coaches__label">Coaches</p>
          <div className="coaches__grid">
            {coaches.map(c => (
              <article className="coach" key={c.name}>
                <h4 className="bio__name">{c.name}</h4>
                <p className="mono-sm">{c.title}</p>
                {c.note && <p className="bio__quote">“{c.note}”</p>}
              </article>
            ))}
          </div>
        </div>

        <div className="bios__bar">
          <div className="bios__filters" role="group" aria-label="Filter roster by group">
            {FILTERS.map(x => (
              <button
                key={x}
                className={`mono bios__filter${f === x ? ' is-on' : ''}`}
                aria-pressed={f === x}
                onClick={() => setF(x)}
              >
                {x}
                <em>{members.filter(m => match(m, x)).length}</em>
              </button>
            ))}
          </div>
        </div>

        <ChromaGrid
          items={grid}
          className="bios__chroma"
          radius={330}
          damping={0.42}
          fadeOut={0.55}
        />
      </div>
    </section>
  );
}
