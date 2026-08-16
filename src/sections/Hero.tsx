import { team, awards } from '@/data/site';
import { members } from '@/data/team';
import SplitText from '@/components/reactbits/SplitText';
import ShinyText from '@/components/reactbits/ShinyText';
import GlowButton from '@/components/GlowButton';
import GlassSurface from '@/components/reactbits/GlassSurface';
import CountUp from '@/components/reactbits/CountUp';
import './Hero.css';

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="wrap hero__in">
        <div className="hero__copy">
          <p className="mono hero__eyebrow">
            <span className="hero__dot" aria-hidden="true" />
            <ShinyText text={`FTC ${team.number} · ${team.school} · ${team.city}`} speed={4} />
          </p>

          <h1 className="d1 hero__h1">
            <SplitText
              text="Sharp Face"
              tag="span"
              className="hero__line"
              splitType="chars"
              delay={28}
              duration={0.85}
              ease="power4.out"
              from={{ opacity: 0, y: 64, rotateX: -70 }}
              to={{ opacity: 1, y: 0, rotateX: 0 }}
              threshold={0.05}
            />
            <SplitText
              text="Robotics"
              tag="span"
              className="hero__line hero__line--iris"
              splitType="chars"
              delay={34}
              duration={0.9}
              ease="power4.out"
              from={{ opacity: 0, y: 64, rotateX: -70 }}
              to={{ opacity: 1, y: 0, rotateX: 0 }}
              threshold={0.05}
            />
          </h1>

          <p className="lede hero__lede">
            We are a FIRST Tech Challenge team from {team.school} in Dublin, California.
            We design, build and program a competition robot every season — and we write
            down what we learn so the next team does not start from zero.
          </p>

          <div className="hero__ctas">
            <GlowButton href="#robot">See the robot</GlowButton>
            <GlowButton href="#contact" tone="violet">Get in touch</GlowButton>
          </div>
        </div>

        <figure className="plate">
          <div className="plate__frame pane">
            <img src="/assets/team.png" alt="The Sharp Face Robotics team with their robot" />
            <span className="plate__sheen" aria-hidden="true" />
          </div>
          <figcaption className="plate__cap mono-sm">
            <span>Team {team.number}</span>
            <span>{team.season}</span>
          </figcaption>
        </figure>
      </div>

      <GlassSurface
        width="100%"
        height={92}
        borderRadius={0}
        blur={14}
        displace={1.2}
        distortionScale={-160}
        redOffset={2}
        greenOffset={8}
        blueOffset={14}
        brightness={58}
        opacity={0.9}
        backgroundOpacity={0.06}
        saturation={1.4}
        className="readout"
      >
        <div className="wrap readout__in">
          <div className="readout__cell">
            <span className="mono-sm">Roster</span>
            <b><CountUp to={members.length} duration={1.2} className="tab" /> on the build team</b>
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
      </GlassSurface>
    </header>
  );
}
