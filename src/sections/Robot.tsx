import { team, specs, subsystems } from '@/data/site';
import SpotlightCard from '@/components/reactbits/SpotlightCard';
import AnimatedContent from '@/components/reactbits/AnimatedContent';
import './Robot.css';

export default function Robot() {
  return (
    <section className="band" id="robot">
      <div className="wrap">
        <header className="sec-head">
          <div className="sec-index"><b>02</b><span>The robot</span></div>
          <h2 className="d2">
            {team.robot} <span className="robot__sub">— {team.season}</span>
          </h2>
          <p className="lede">
            Built around reliability, cycle speed and being serviceable between matches.
            An integrated mecanum drivetrain, a dual-compliant intake, a short transfer path
            and a tuned single-flywheel launcher.
          </p>
        </header>

        <div className="robot__top">
          <figure className="robot__plate">
            <div className="plate__frame ticked">
              <img
                src="/assets/explodedCad.png"
                alt="Exploded CAD view of robot KG showing the shooter, transfer, intake, drivetrain and electronics assemblies."
                loading="lazy"
              />
            </div>
            <figcaption className="plate__cap mono-sm">
              <span>Plate 02 — Exploded assembly</span>
              <span>{team.robot}</span>
            </figcaption>
          </figure>

          <dl className="spec-list robot__specs">
            {specs.map(s => (
              <div className="spec" key={s.k}>
                <dt>{s.k}</dt>
                <dd>{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <ol className="subsys">
          {subsystems.map((s, i) => (
            <AnimatedContent key={s.n} distance={36} duration={0.65} delay={(i % 3) * 0.07} threshold={0.12}>
              <li>
                <SpotlightCard className="subsys__card" spotlightColor="rgba(63, 208, 201, 0.12)">
                  <span className="mono subsys__n">{s.n}</span>
                  <h3 className="d3">{s.h}</h3>
                  <p>{s.p}</p>
                </SpotlightCard>
              </li>
            </AnimatedContent>
          ))}
        </ol>
      </div>
    </section>
  );
}
