import CurvedLoop from '@/components/reactbits/CurvedLoop';
import './Marquee.css';

/* React Bits CurvedLoop — the wordmark runs along a curve and can be dragged. */
export default function Marquee() {
  return (
    <div className="mq" aria-hidden="true">
      <CurvedLoop
        marqueeText="EMERALD HIGH SCHOOL ROBOTICS ✦ FTC 30450 ✦ FTC 36705 ✦ DESIGN ✦ BUILD ✦ PROGRAM ✦ COMPETE ✦"
        speed={1.4}
        curveAmount={90}
        direction="left"
        interactive
        className="mq__text"
      />
    </div>
  );
}
