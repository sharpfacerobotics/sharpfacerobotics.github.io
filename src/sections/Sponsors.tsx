import { sponsors, tierLabels, type Tier } from '@/data/sponsors';
import LogoLoop from '@/components/reactbits/LogoLoop';
import './Sponsors.css';

const ORDER: Tier[] = ['principal', 'supporting', 'contributing'];

const byTier = (t: Tier) =>
  sponsors.filter(s => s.tier === t).sort((a, b) => a.name.localeCompare(b.name));

function Mark({ s }: { s: (typeof sponsors)[number] }) {
  const inner = (
    <>
      <span className="sp__frame">
        <img src={s.logo} alt="" loading="lazy" />
      </span>
      <span className="sp__meta">
        <span className="sp__name">{s.name}</span>
        {s.note && <span className="sp__note">{s.note}</span>}
      </span>
    </>
  );
  return s.href ? (
    <a className="sp" href={s.href} target="_blank" rel="noopener noreferrer">
      {inner}
      <span className="sp__ext" aria-hidden="true">↗</span>
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  ) : (
    <div className="sp sp--static">{inner}</div>
  );
}

export default function Sponsors() {
  const loopLogos = sponsors.map(s => ({ src: s.logo, alt: s.name, href: s.href ?? undefined }));

  return (
    <section className="band" id="sponsors">
      <div className="wrap">
        <header className="sec-head">
          <div className="sec-index"><b>06</b><span>Partners</span></div>
          <h2 className="d2">Who makes the season possible</h2>
          <p className="lede">
            Competition fees, aluminium, fabrication, software licences, and the tools in our
            shop. Every one of these partners pays for something specific.
          </p>
        </header>

        {ORDER.map(t => {
          const list = byTier(t);
          if (!list.length) return null;
          return (
            <div className={`tier tier--${t}`} key={t}>
              <div className="tier__head">
                <h3 className="mono tier__label">{tierLabels[t].label}</h3>
                <p className="tier__blurb">{tierLabels[t].blurb}</p>
              </div>
              <div className="tier__grid">
                {list.map(s => <Mark key={s.name} s={s} />)}
              </div>
            </div>
          );
        })}
      </div>

      {/* A quiet running strip of every mark — this is the ReactBits LogoLoop,
          used once, where a marquee is actually the right form. */}
      <div className="sp-loop" aria-hidden="true">
        <LogoLoop
          logos={loopLogos}
          speed={38}
          direction="left"
          logoHeight={26}
          gap={72}
          pauseOnHover
          fadeOut
          fadeOutColor="#08090c"
          ariaLabel="Our partners"
        />
      </div>

      <div className="wrap">
        <div className="become ticked">
          <div>
            <h3 className="d3">Support the team</h3>
            <p className="lede" style={{ marginTop: '0.65rem' }}>
              Sponsorship pays for parts, competition entry and travel — and it puts your name in
              front of the engineers this program is trying to produce.
            </p>
          </div>
          <a className="btn btn--solid" href="#contact">Talk to us</a>
        </div>
      </div>
    </section>
  );
}
