import { services } from '@/data/site';
import { Suspense, lazy, useEffect, useState } from 'react';
import { Reveal, Spotlight } from '@/components/Motion';

/* three.js — keep it out of the main bundle and off phones. */
const FluidGlass = lazy(() => import('@/components/reactbits/FluidGlass'));
import './Services.css';

export default function Services() {
  const [rich, setRich] = useState(false);
  useEffect(() => {
    setRich(
      window.matchMedia('(min-width: 1000px)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }, []);

  return (
    <section className="band fitview" id="services">
      <div className="wrap">
        <header className="sec-head">
          <div className="sec-index"><b>04</b><span>What we built for everyone else</span></div>
          <h2 className="d2">Tools we wished existed</h2>
        </header>

        <Spotlight><div className="svc__grid">
          {services.map((s, i) => (
            <Reveal as="article" className="svc" key={s.name} delay={i * 80}>
              <div className="svc__head">
                <div className="svc__mark">
                  {s.logo
                    ? <img src={s.logo} alt="" loading="lazy" />
                    : <span className="svc__glyph" aria-hidden="true">S</span>}
                </div>
                <div>
                  <h3 className="d3">{s.name}</h3>
                  <p className="mono-sm">{s.tag}</p>
                </div>
                {s.status && <span className="mono svc__status">{s.status}</span>}
              </div>

              <p className="svc__body">{s.body}</p>

              <a className="btn" href={s.href} target="_blank" rel="noopener noreferrer">
                {s.cta} <span aria-hidden="true">↗</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </Reveal>
          ))}
        </div></Spotlight>

        {/* React Bits FluidGlass — a real glass lens you drag across the team's
            own photographs. The shipped component renders React Bits' demo
            images; it is repointed at our media. */}
        {rich && (
          <Reveal className="svc__lens">
            <p className="mono svc__lens-label">Drag the lens</p>
            <div className="svc__lens-stage">
              <Suspense fallback={null}>
                <FluidGlass
                  mode="lens"
                  lensProps={{
                    scale: 0.26, ior: 1.15, thickness: 5, chromaticAberration: 0.1,
                    anisotropy: 0.01, transmission: 1, roughness: 0,
                    color: '#ffffff', attenuationColor: '#4fe0d8', attenuationDistance: 0.6,
                  }}
                />
              </Suspense>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
