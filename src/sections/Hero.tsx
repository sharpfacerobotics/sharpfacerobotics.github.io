import { team, awards } from '@/data/site';
import { members } from '@/data/team';
import ParticleText from '@/components/reactbits/ParticleText';
import Counter from '@/components/reactbits/Counter';
import RippleDistortion from '@/components/reactbits/RippleDistortion';
import { Magnetic } from '@/components/Motion';
import GlassSurface from '@/components/reactbits/GlassSurface';
import TextType from '@/components/reactbits/TextType';
import './Hero.css';

export default function Hero({ onTab }: { onTab: (t: 'robot' | 'contact') => void }) {
  return (
    <header className="hero fitview" id="top">
      <div className="wrap hero__in">
        <p className="mono hero__eyebrow">
          FTC {team.number} · {team.school} · {team.city}
        </p>

        {/* React Bits ParticleText — the wordmark assembles from particles and
            scatters away from the pointer. */}
        <h1 className="hero__h1">
          <span className="sr-only">Sharp Face Robotics</span>
          <ParticleText
            text="SHARP FACE"
            fontFamily="Archivo, sans-serif"
            fontWeight={700}
            fontSize="clamp(1.6rem, min(4.4vw, 5.6vh), 3.4rem)"
            color="#f2f4f7"
            highlightColor="#4fe0d8"
            particleSize={1.5}
            density={4.2}
            scatter={120}
            gatherDuration={1.5}
            stagger={0.4}
            pointerRepel={38}
            repelRadius={95}
            idleDrift={0.25}
            glow
            className="hero__particles"
          />
          <ParticleText
            text="ROBOTICS"
            fontFamily="Archivo, sans-serif"
            fontWeight={700}
            fontSize="clamp(1.6rem, min(4.4vw, 5.6vh), 3.4rem)"
            color="#4fe0d8"
            highlightColor="#a9f5f0"
            particleSize={1.5}
            density={4.2}
            scatter={120}
            gatherDuration={1.7}
            stagger={0.45}
            pointerRepel={38}
            repelRadius={95}
            idleDrift={0.25}
            glow
            className="hero__particles"
          />
        </h1>

        <div className="hero__meta">
          {/* React Bits TextType on the main white line — the lede types
              itself through several true statements about the team. */}
          <TextType
            as="p"
            className="lede hero__lede-typed"
            text={[
              `A FIRST Tech Challenge team at ${team.school} in Dublin, California.`,
              'We design, build and program a competition robot every season.',
              'We write down what we learn so the next team does not start from zero.',
              `${members.length} students across mechanical, software and outreach.`,
            ]}
            typingSpeed={26}
            deletingSpeed={12}
            pauseDuration={2600}
            initialDelay={500}
            loop
            showCursor
            cursorCharacter="_"
            cursorBlinkDuration={0.7}
          />
          <div className="hero__ctas">
            <Magnetic><button className="btn btn--solid" onClick={() => onTab('robot')}>See the robot</button></Magnetic>
            <Magnetic><button className="btn" onClick={() => onTab('contact')}>Get in touch</button></Magnetic>
          </div>
        </div>
      </div>

      {/* The plate is the hero — cosmos leads with the image, full width. */}
      <div className="wrap">
        <figure className="hero__plate card">
          {/* React Bits RippleDistortion — the photograph ripples under the cursor. */}
          <RippleDistortion
            src="/assets/hi/team.jpg"
            brushSize={0.24}
            strength={0.32}
            swirl={0.5}
            rings={3}
            spread={0.5}
            fade={0.96}
            dispersion={0.3}
            glint={0.25}
            highlightColor="#4fe0d8"
            grayscale={false}
            trigger="hover"
            quality="high"
            className="hero__ripple"
          />
          <span className="sr-only">The Sharp Face Robotics team with their robot</span>
          <figcaption className="hero__cap glass glass--spec">
            <span className="mono-sm">Team {team.number}</span>
            <span className="mono-sm">{team.season}</span>
          </figcaption>
        </figure>
      </div>

      <div className="wrap gs">
        <GlassSurface
          width="100%" height="auto" borderRadius={16}
          blur={8} displace={0.4} distortionScale={-28}
          redOffset={0} greenOffset={1} blueOffset={2}
          brightness={62} opacity={0.9} backgroundOpacity={0.05} saturation={1.5}
        >
        <dl className="hero__stats">
          <div className="hero__stat">
            <dt className="mono-sm">Build team</dt>
            <dd className="hero__count">
              <Counter value={members.length} fontSize={34} places={[10, 1]} gap={2}
                textColor="#f2f4f7" gradientHeight={0} borderRadius={6} horizontalPadding={4} />
            </dd>
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
        </GlassSurface>
      </div>
    </header>
  );
}
