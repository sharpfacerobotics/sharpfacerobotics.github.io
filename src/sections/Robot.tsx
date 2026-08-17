import { team, specs, subsystems } from '@/data/site';
import { Reveal, Spotlight } from '@/components/Motion';
import RobotScroll from './RobotScroll';
import { robotPhotos } from '@/data/photoPicks';
import './Robot.css';

export default function Robot() {
  return (
    <section className="robot-tab band--sunk" id="robot">
      <RobotScroll />

      <div className="band"><div className="wrap">
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

        <Reveal className="robot__top">
          {/* KG in the field, next to the numbers that describe it */}
          <div className="robot__shots">
            {robotPhotos.map(src => (
              <figure key={src} className="robot__shot">
                <img src={src} alt="" loading="lazy" />
              </figure>
            ))}
          </div>
          <dl className="spec-list robot__specs pane">
            {specs.map((s, i) => (
              <Reveal as="div" className="spec" key={s.k} delay={i * 55} y={10}>
                <dt>{s.k}</dt>
                <dd>{s.v}</dd>
              </Reveal>
            ))}
          </dl>
        </Reveal>

        {/* Every card carries the CAD image of the assembly it describes, so
            the reader can see which part is being talked about. */}
        <Spotlight>
          <ol className="subsys">
            {subsystems.map((sub, i) => (
              <Reveal as="li" className="subsys__card" key={sub.n} delay={i * 55}>
                <figure className="subsys__art">
                  <img src={sub.img} alt={`${sub.h} assembly`} loading="lazy" />
                </figure>
                <div className="subsys__text">
                  <span className="mono subsys__n">{sub.n}</span>
                  <h3 className="d3">{sub.h}</h3>
                  <p>{sub.p}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Spotlight>
      </div></div>
    </section>
  );
}
