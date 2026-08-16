import { team } from '@/data/site';
import { members, coaches } from '@/data/team';
import { Reveal, Spotlight } from '@/components/Motion';
import { Suspense, lazy, useEffect, useState } from 'react';
import SkewedCarousel from '@/components/SkewedCarousel';

/* three.js — its own chunk, desktop only. */
const FluidGlass = lazy(async () => {
  const mod = await import('@/components/reactbits/FluidGlass');
  // hand the scene every photograph before it mounts
  mod.setLensPhotos(outreachPhotos.map(p => p.src));
  return mod;
});
import { outreachPhotos } from '@/data/outreachPhotos';
import './Team.css';

const PILLARS = [
  { k: 'Design',   h: 'Built to be serviced', p: 'A custom mecanum drivetrain, dual-compliant intake and an iterated flywheel shooter — chosen for reliability across a whole season, not for one good match.' },
  { k: 'Software', h: 'Autonomy that holds up', p: 'Pedro Pathing, AprilTag vision and voltage compensation. Routes recover instead of failing when the field is not exactly where the code expected.' },
  { k: 'Teamwork', h: 'One team, three benches', p: 'Mechanical, software and strategy sit in on each other’s design reviews, test cycles and competitions. Nobody hands work over a wall.' },
];

export default function Team() {
  const [rich, setRich] = useState(false);
  useEffect(() => {
    setRich(
      window.matchMedia('(min-width: 1000px)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }, []);

  return (
    <section className="band" id="team">
      <div className="wrap">
        <header className="sec-head">
          <div className="sec-index"><b>01</b><span>Who we are</span></div>
          <h2 className="d2">A rookie team that wrote everything down</h2>
        </header>

        {/* The team's own photographs, high on the page where they are the
            first thing seen — a skewed drifting carousel, draggable. */}
        <div className="team__reel">
          <SkewedCarousel items={outreachPhotos} speed={38} skew={-7} rotate={-1.6} />
        </div>

        <div className="team__grid">
          <div className="team__lead">
            <p className="lede">
              Sharp Face Robotics is a FIRST Tech Challenge team at {team.school} in {team.city}.
              We design, build and program a competition robot — and along the way we build the
              engineering habits that outlast any one season.
            </p>

            <dl className="spec-list">
              <div className="spec"><dt>Build team</dt><dd><b>{members.length}</b> students across mechanical and software</dd></div>
              <div className="spec"><dt>Coaches</dt><dd>{coaches.map(c => c.name).join(' · ')}</dd></div>
              <div className="spec"><dt>Season</dt><dd>{team.season}</dd></div>
              <div className="spec"><dt>Home</dt><dd>{team.school}, {team.city}</dd></div>
            </dl>
          </div>

          <Spotlight className="pillars-wrap"><ol className="pillars">
            {PILLARS.map((p, i) => (
              <Reveal key={p.k} as="li" className="pillar" delay={i * 70}>
                  <span className="mono pillar__k">{p.k}</span>
                  <h3 className="d3">{p.h}</h3>
                  <p>{p.p}</p>
              </Reveal>
            ))}
          </ol></Spotlight>
        </div>

        {/* React Bits FluidGlass. It renders its OWN three.js scene rather than
            refracting the page, so it only works as a standalone moment — here
            its scene is the team's own photographs and wordmark, and you drag a
            real glass lens across them. */}
        {rich && (
          <Reveal className="team__lens">
            <p className="mono team__lens-label">Drag the lens · {outreachPhotos.length} photos</p>
            <div className="team__lens-stage">
              <Suspense fallback={null}>
                <FluidGlass
                  mode="lens"
                  lensProps={{
                    scale: 0.22, ior: 1.16, thickness: 4, chromaticAberration: 0.09,
                    anisotropy: 0.01, transmission: 1, roughness: 0,
                    color: '#ffffff', attenuationColor: '#4fe0d8', attenuationDistance: 0.5,
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
