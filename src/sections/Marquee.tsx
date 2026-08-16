import CurvedLoop from '@/components/reactbits/CurvedLoop';
import './Marquee.css';

/* React Bits CurvedLoop — the wordmark runs along a curve and can be dragged. */
export default function Marquee() {
  return (
    <div className="mq" aria-hidden="true">
      <CurvedLoop
        marqueeText="SHARP FACE ROBOTICS ✦ FTC 30450 ✦ DESIGN ✦ BUILD ✦ PROGRAM ✦ COMPETE ✦"
        speed={1.4}
        curveAmount={220}
        direction="left"
        interactive
        className="mq__text"
      />
    </div>
  );
}
