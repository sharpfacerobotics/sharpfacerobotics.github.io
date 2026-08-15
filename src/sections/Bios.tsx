import { useState } from 'react';
import { captain, coaches, members, type Member } from '@/data/team';
import AnimatedContent from '@/components/reactbits/AnimatedContent';
import './Bios.css';

type Filter = 'All' | 'Mechanical' | 'Software' | 'Outreach';
const FILTERS: Filter[] = ['All', 'Mechanical', 'Software', 'Outreach'];

const match = (m: Member, f: Filter) =>
  f === 'All' ? true : f === 'Outreach' ? m.outreach : m.group === f;

function Initials({ name }: { name: string }) {
  const i = name.split(' ').map(p => p[0]).slice(0, 2).join('');
  return <span className="bio__initials" aria-hidden="true">{i}</span>;
}

function Card({ m }: { m: Member }) {
  return (
    <li className="bio">
      <div className="bio__img">
        {m.photo ? <img src={m.photo} alt={m.name} loading="lazy" /> : <Initials name={m.name} />}
      </div>
      <div className="bio__body">
        <h4 className="bio__name">{m.name}</h4>
        <p className="mono-sm bio__meta">
          <span className={`bio__tag bio__tag--${m.group.toLowerCase()}`}>{m.group}</span>
          {m.outreach && <span className="bio__tag bio__tag--outreach">Outreach</span>}
          <span>{m.grade}</span>
        </p>
        {m.favorite && <p className="bio__quote">“{m.favorite}”</p>}
      </div>
    </li>
  );
}

export default function Bios() {
  const [f, setF] = useState<Filter>('All');
  const list = members.filter(m => match(m, f));

  return (
    <section className="band" id="bios">
      <div className="wrap">
        <header className="sec-head">
          <div className="sec-index"><b>03</b><span>Roster</span></div>
          <h2 className="d2">The people who build it</h2>
        </header>

        <div className="lead-row">
          <article className="lead lead--captain ticked">
            <div className="lead__img">
              <img src={captain.photo} alt={captain.name} loading="lazy" />
            </div>
            <div>
              <p className="mono lead__role">{captain.title}</p>
              <h3 className="d3">{captain.name}</h3>
              <p className="mono-sm lead__grade">{captain.grade}</p>
              {captain.favorite && <p className="bio__quote">“{captain.favorite}”</p>}
            </div>
          </article>

          <div className="coaches">
            <p className="mono coaches__label">Coaches</p>
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

        <AnimatedContent distance={30} duration={0.6} threshold={0.05}>
          <ul className="bios__grid">
            {list.map(m => <Card key={m.name} m={m} />)}
          </ul>
        </AnimatedContent>
      </div>
    </section>
  );
}
