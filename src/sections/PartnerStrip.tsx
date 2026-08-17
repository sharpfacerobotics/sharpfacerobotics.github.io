import { sponsors } from '@/data/sponsors';
import LogoLoop from '@/components/reactbits/LogoLoop';
import './PartnerStrip.css';

/* React Bits LogoLoop for the bottom bar — a proper seamless marquee.

   LogoLoop takes ONE image per logo, so the two-layer mono/colour hover cannot
   be expressed through it. Instead the COLOUR cutout is passed and desaturated
   in CSS at rest; hover simply drops the filter, which gets the same reveal
   from a single image. */
export default function PartnerStrip() {
  const logos = sponsors.map(s => ({
    src: s.logoColor,
    alt: s.name,
    title: s.name,
    href: s.href ?? undefined,
  }));

  return (
    <aside className="strip" aria-label="Our partners">
      <div className="wrap strip__in">
        <p className="mono-sm strip__label">Supported by</p>
        <div className="strip__loop">
          <LogoLoop
            logos={logos}
            speed={42}
            direction="left"
            logoHeight={30}
            gap={72}
            pauseOnHover
            scaleOnHover
            ariaLabel="Our partners"
          />
        </div>
      </div>
    </aside>
  );
}
