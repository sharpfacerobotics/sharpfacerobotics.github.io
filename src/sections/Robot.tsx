import { team, specs, subsystems } from '@/data/site';
import MagicBento from '@/components/reactbits/MagicBento';
import './Robot.css';

export default function Robot() {
  /* MagicBento renders the spotlight/particle/tilt grid; feed it the real
     subsystems instead of its shipped demo data. */
  const cards = subsystems.map(s => ({
    label: s.n,
    title: s.h,
    description: s.p,
    color: 'rgba(14, 17, 24, 0.62)',
  }));

  return (
    <section className="band" id="robot">
      <div className="wrap">
        <header className="sec-head">
          <div className="sec-index"><b>02</b><span>The robot</span></div>
          <h2 className="d2">
            <span className="iris-text">{team.robot}</span>
            <span className="robot__sub"> — {team.season}</span>
          </h2>
          <p className="lede">
            Built around reliability, cycle speed and being serviceable between matches.
            An integrated mecanum drivetrain, a dual-compliant intake, a short transfer path
            and a tuned single-flywheel launcher.
          </p>
        </header>

        <div className="robot__top">
          <figure className="robot__plate">
            <div className="plate__frame pane">
              <img
                src="/assets/explodedCad.png"
                alt="Exploded CAD view of robot KG showing the shooter, transfer, intake, drivetrain and electronics assemblies."
                loading="lazy"
              />
            </div>
            <figcaption className="plate__cap mono-sm">
              <span>Exploded assembly</span>
              <span>{team.robot}</span>
            </figcaption>
          </figure>

          <dl className="spec-list robot__specs pane">
            {specs.map(s => (
              <div className="spec" key={s.k}>
                <dt>{s.k}</dt>
                <dd>{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="robot__bento">
          <MagicBento
            cards={cards}
            textAutoHide={false}
            enableStars
            enableSpotlight
            enableBorderGlow
            enableTilt
            enableMagnetism
            clickEffect
            spotlightRadius={340}
            particleCount={10}
            glowColor="63, 208, 201"
          />
        </div>
      </div>
    </section>
  );
}
