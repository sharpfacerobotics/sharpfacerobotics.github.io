import { sponsors } from '@/data/sponsors';
import LogoLoop from '@/components/reactbits/LogoLoop';
import './PartnerStrip.css';

/* A quiet recognition strip directly under the hero. This is NOT a duplicate of
   the partners grid further down: this is instant recognition at the top of the
   page (which is what sponsors are actually buying), the grid below is the
   detail. React Bits' LogoLoop, used where a marquee is genuinely the right form. */
export default function PartnerStrip() {
  const logos = sponsors.map(s => ({ src: s.logo, alt: s.name, href: s.href ?? undefined }));

  return (
    <aside className="strip" aria-label="Our partners">
      <div className="wrap strip__in">
        <p className="mono-sm strip__label">Supported by</p>
        <div className="strip__loop">
          <LogoLoop
            logos={logos}
            speed={30}
            direction="left"
            logoHeight={30}
            gap={64}
            pauseOnHover
            scaleOnHover
            fadeOut
            fadeOutColor="#08090c"
            ariaLabel="Our partners"
          />
        </div>
      </div>
    </aside>
  );
}
