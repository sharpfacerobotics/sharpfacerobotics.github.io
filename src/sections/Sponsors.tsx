import { sponsors, type Sponsor } from '@/data/sponsors';
import { Reveal, Spotlight } from '@/components/Motion';
import BorderGlow from '@/components/reactbits/BorderGlow';
import './Sponsors.css';

function Mark({ s }: { s: Sponsor }) {
  const inner = (
    <>
      <span className="sp__frame">
        <img className="sp__mono" src={s.logo} alt="" loading="lazy" />
        <img className="sp__color" src={s.logoColor} alt="" loading="lazy" aria-hidden="true" />
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
  return (
    <section className="band" id="sponsors">
      <div className="wrap">
        <header className="sec-head">
          <div className="sec-index"><b>06</b><span>Partners</span></div>
          <h2 className="d2">Who makes the season possible</h2>
          <p className="lede">
            Competition fees, aluminium, fabrication, software licences, and the tools in our shop.
            Listed alphabetically — every one of them matters to a season that would not otherwise happen.
          </p>
        </header>

        <Spotlight>
          <div className="sp-grid">
            {sponsors.map((s, i) => (
              <Reveal key={s.name} delay={i * 45} y={14}>
                {/* React Bits BorderGlow — the edge lights toward the cursor. */}
                <BorderGlow
                  className="sp-glow"
                  glowColor="#4fe0d8"
                  backgroundColor="rgba(18,20,27,0.72)"
                  borderRadius={16}
                  glowRadius={190}
                  glowIntensity={0.9}
                  coneSpread={62}
                  edgeSensitivity={0.42}
                  colors={['#4fe0d8', '#8b7bff']}
                  animated
                >
                  <Mark s={s} />
                </BorderGlow>
              </Reveal>
            ))}
          </div>
        </Spotlight>
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
