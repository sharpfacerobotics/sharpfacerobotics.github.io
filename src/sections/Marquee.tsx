import ScrollVelocity from '@/components/reactbits/ScrollVelocity';
import './Marquee.css';

/* Scroll-reactive band. Speed and direction respond to scroll velocity,
   so it registers as a physical thing rather than a looping GIF. */
export default function Marquee() {
  return (
    <div className="mq" aria-hidden="true">
      <ScrollVelocity
        texts={['SHARP FACE ROBOTICS — FTC 30450 — ', 'DESIGN · BUILD · PROGRAM · COMPETE — ']}
        velocity={58}
        damping={48}
        stiffness={340}
        numCopies={6}
        className="mq__text"
      />
    </div>
  );
}
