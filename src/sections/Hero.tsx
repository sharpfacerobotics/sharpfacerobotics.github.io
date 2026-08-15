import { team, awards } from '@/data/site';
import DotGrid from '@/components/reactbits/DotGrid';
import CountUp from '@/components/reactbits/CountUp';
import { members } from '@/data/team';
import './Hero.css';

export default function Hero() {
  return (
    <header className="hero" id="top">
      {/* ReactBits DotGrid — a grid, not a gradient blob. It reacts to the
          pointer, which makes the ground feel like a surface rather than art. */}
      <div className="hero__field" aria-hidden="true">
        <DotGrid
          dotSize={2}
          gap={30}
          baseColor="#1b2029"
          activeColor="#3fd0c9"
          proximity={130}
          shockRadius={220}
          shockStrength={4}
          resistance={760}
          returnDuration={1.5}
        />
      </div>

      <div className="wrap hero__in">
        <div className="hero__copy">
          <p className="mono hero__eyebrow">
            <span className="hero__dot" aria-hidden="true" />
            FTC {team.number} · {team.school} · {team.city}
          </p>

          <h1 className="d1 hero__h1">
            Sharp Face<br />
            <span className="hero__accent">Robotics</span>
          </h1>

          <p className="lede hero__lede">
            We are a FIRST Tech Challenge team from {team.school} in Dublin, California.
            We design, build and program a competition robot every season — and we write
            down what we learn so the next team does not start from zero.
          </p>

          <div className="hero__ctas">
            <a className="btn btn--solid" href="#robot">See the robot</a>
            <a className="btn" href="#contact">Get in touch</a>
          </div>
        </div>

        {/* The team's own photograph, framed like a plate in a build log —
            registration marks, a caption, a plate number. Nothing generated. */}
        <figure className="plate">
          <div className="plate__frame ticked">
            <img src="/assets/team.png" alt="The Sharp Face Robotics team with their robot" />
            <span className="plate__reg plate__reg--tl" aria-hidden="true" />
            <span className="plate__reg plate__reg--br" aria-hidden="true" />
          </div>
          <figcaption className="plate__cap mono-sm">
            <span>Plate 01 — Team {team.number}</span>
            <span>{team.season}</span>
          </figcaption>
        </figure>
      </div>

      {/* A readout strip instead of a row of glowing "feature cards" */}
      <div className="readout">
        <div className="wrap readout__in">
          <div className="readout__cell">
            <span className="mono-sm">Roster</span>
            <b><CountUp to={members.length} duration={1.1} className="tab" />&nbsp;on the build team</b>
          </div>
          <div className="readout__cell">
            <span className="mono-sm">Robot</span>
            <b>{team.robot}</b>
          </div>
          {awards.map(a => (
            <div className="readout__cell" key={a.title}>
              <span className="mono-sm">{a.detail}</span>
              <b>{a.title}</b>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
