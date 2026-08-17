import { team } from '@/data/site';
import { members, coaches } from '@/data/team';
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
    <section className="band" id="team">
      <div className="wrap">
        <header className="sec-head">
          <div className="sec-index"><b>01</b><span>Who we are</span></div>
          {/* The stem stays put and the tail types, so the heading is always
              readable and only the claim changes. */}
          <h2 className="d2">
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
          </h2>
        </header>

        {/* The team's own photographs, high on the page where they are the
            first thing seen — a skewed drifting carousel, draggable. */}
        <div className="team__reel">
          <SkewedCarousel items={outreachPhotos.filter(p => !excludedPhotos.includes(p.src))} speed={38} skew={-7} rotate={-1.6} />
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
      </div>
    </section>
  );
}
