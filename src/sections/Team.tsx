import { team, teams } from '@/data/site';
import { coaches } from '@/data/team';
import { Reveal, Spotlight } from '@/components/Motion';
import SkewedCarousel from '@/components/SkewedCarousel';
import TextType from '@/components/reactbits/TextType';
import { outreachPhotos } from '@/data/outreachPhotos';
import { excludedPhotos } from '@/data/photoPicks';
import './Team.css';

const PILLARS = [
  { k: 'Design',   h: 'Built to be serviced', p: 'A custom mecanum drivetrain, dual-compliant intake and an iterated flywheel shooter — chosen for reliability across a whole season, not for one good match.' },
  { k: 'Software', h: 'Autonomy that holds up', p: 'Pedro Pathing, AprilTag vision and voltage compensation. Routes recover instead of failing when the field is not exactly where the code expected.' },
  { k: 'Teamwork', h: 'One team, three benches', p: 'Mechanical, software and strategy sit in on each other’s design reviews, test cycles and competitions. Nobody hands work over a wall.' },
];

export default function Team() {
  return (
    <section className="band team-tab" id="team">
      {/* Photo-led. Every other tab opens with the same eyebrow/heading stack;
          this one opens with the team itself, full-bleed, heading over it. */}
      <div className="team__lead">
        <img className="team__lead-img" src="/assets/hi/team.jpg" alt="The Sharp Face Robotics team with their robot" />
        <div className="team__lead-scrim" aria-hidden="true" />
        <div className="wrap team__lead-copy">
          <div className="sec-index"><b>01</b><span>Who we are</span></div>
          <h1 className="d2 team__lead-h">
            A rookie team that{' '}
            <TextType
              as="span"
              className="head__typed"
              text={[
                'wrote everything down.',
                'keeps its notes.',
                'documents the mistakes.',
                'hands it forward.',
              ]}
              typingSpeed={48}
              deletingSpeed={24}
              pauseDuration={2400}
              initialDelay={600}
              loop
              showCursor
              cursorCharacter="_"
              textColors={['#4fe0d8']}
            />
          </h1>
        </div>
      </div>

      <div className="wrap">
        {/* The team's own photographs, high on the page where they are the
            first thing seen — a skewed drifting carousel, draggable. */}
        <div className="team__reel">
          <SkewedCarousel items={outreachPhotos.filter(p => !excludedPhotos.includes(p.src))} speed={38} skew={-7} rotate={-1.6} label="Photographs of Sharp Face Robotics at competitions and outreach events" />
        </div>

        <div className="team__grid">
          <div className="team__lead">
            <p className="lede">
              Sharp Face Robotics is a FIRST Tech Challenge team at {team.school} in {team.city}.
              We design, build and program a competition robot — and along the way we build the
              engineering habits that outlast any one season.
            </p>

            {/* Two teams run out of the same school, so the page says so
                rather than presenting one as the whole programme. */}
            <div className="teams">
              <p className="mono teams__label">Two teams · {team.school}</p>
              <ul className="teams__list">
                {teams.map(t => (
                  <li className="teams__item" key={t.name} style={{ '--accent-team': t.accent } as React.CSSProperties}>
                    <div className="teams__head">
                      <h2 className="teams__name">{t.name}</h2>
                      {t.number && <span className="mono teams__num">FTC {t.number}</span>}
                    </div>
                    <p className="teams__blurb">{t.blurb}</p>
                  </li>
                ))}
              </ul>
              <p className="mono-sm teams__foot">
                {team.season} · {coaches.map(c => c.name).join(' · ')}
              </p>
            </div>
          </div>

          <Spotlight className="pillars-wrap"><ol className="pillars">
            {PILLARS.map((p, i) => (
              <Reveal key={p.k} as="li" className="pillar" delay={i * 70}>
                  <span className="mono pillar__k">{p.k}</span>
                  <h2 className="d3">{p.h}</h2>
                  <p>{p.p}</p>
              </Reveal>
            ))}
          </ol></Spotlight>
        </div>
      </div>
    </section>
  );
}
