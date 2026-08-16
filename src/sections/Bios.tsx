import { captain, coaches, members, type Member } from '@/data/team';
import ChromaGrid from '@/components/reactbits/ChromaGrid';
import { Reveal } from '@/components/Motion';
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

export default function Bios() {
  return (
    <section className="band" id="roster">
      <div className="wrap">
        <header className="sec-head">
          <div className="sec-index"><b>03</b><span>Roster</span></div>
          <h2 className="d2">The people who build it</h2>
        </header>

        {/* ── Leadership ─────────────────────────────────────────── */}
        <Reveal>
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
        </Reveal>

        {/* ── Working groups ─────────────────────────────────────── */}
        {GROUPS.map((g, gi) => {
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
    </section>
  );
}
