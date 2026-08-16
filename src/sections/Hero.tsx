import { team, awards } from '@/data/site';
import { members } from '@/data/team';
import SplitText from '@/components/reactbits/SplitText';
import CountUp from '@/components/reactbits/CountUp';
import { Magnetic } from '@/components/Motion';
import './Hero.css';

export default function Hero({ onTab }: { onTab: (t: 'robot' | 'contact') => void }) {
  return (
    <header className="hero" id="top">
      <div className="wrap hero__in">
        <p className="mono hero__eyebrow">
          <span className="hero__dot" aria-hidden="true" />
          FTC {team.number} · {team.school} · {team.city}
        </p>

        <h1 className="d1 hero__h1">
          <SplitText
            text="Sharp Face Robotics"
            tag="span"
            className="hero__line"
            splitType="words"
            delay={70}
            duration={0.9}
            ease="power4.out"
            from={{ opacity: 0, y: 46 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.05}
          />
        </h1>

        <div className="hero__meta">
          <p className="lede">
            A FIRST Tech Challenge team at {team.school} in Dublin, California. We design,
            build and program a competition robot every season — and write down what we
            learn so the next team does not start from zero.
          </p>
          <div className="hero__ctas">
            <Magnetic><button className="btn btn--solid" onClick={() => onTab('robot')}>See the robot</button></Magnetic>
            <Magnetic><button className="btn" onClick={() => onTab('contact')}>Get in touch</button></Magnetic>
          </div>
        </div>
      </div>

      {/* The plate is the hero — cosmos leads with the image, full width. */}
      <div className="wrap">
        <figure className="hero__plate card">
          <img src="/assets/hi/team.jpg" alt="The Sharp Face Robotics team with their robot" />
          <figcaption className="hero__cap glass glass--spec">
            <span className="mono-sm">Team {team.number}</span>
            <span className="mono-sm">{team.season}</span>
          </figcaption>
        </figure>
      </div>

      <div className="wrap">
        <dl className="hero__stats">
          <div className="hero__stat">
            <dt className="mono-sm">Build team</dt>
            <dd><CountUp to={members.length} duration={1.2} className="tab" /></dd>
          </div>
          <div className="hero__stat">
            <dt className="mono-sm">Robot</dt>
            <dd>{team.robot}</dd>
          </div>
          {awards.map(a => (
            <div className="hero__stat" key={a.title}>
              <dt className="mono-sm">{a.detail}</dt>
              <dd className="hero__stat--sm">{a.title}</dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}
