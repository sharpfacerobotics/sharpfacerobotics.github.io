import LogoLoop from '@/components/reactbits/LogoLoop';
import { sponsors } from '@/data/sponsors';
import { team } from '@/data/site';
import './SignOff.css';

/* Closing band: the wordmark at display scale over the partner strip.
   Prospective sponsors land on these pages, so the existing partners get
   visibility at the moment someone is deciding whether to join them. */
export default function SignOff({ direction = 'right' }: { direction?: 'left' | 'right' }) {
  return (
    <div className="signoff">
      <div className="wrap signoff__in">
        <p className="signoff__mark">
          Sharp Face <span className="signoff__accent">Robotics</span>
        </p>
        <p className="mono signoff__meta">
          FTC {team.number} · {team.season} · {team.city}
        </p>
      </div>
      <div className="signoff__loop">
        <LogoLoop
          logos={sponsors.map(sp => ({
            src: sp.logoColor, alt: sp.name, title: sp.name, href: sp.href ?? undefined,
          }))}
          speed={30}
          direction={direction}
          logoHeight={22}
          gap={56}
          pauseOnHover
          ariaLabel="Our partners"
        />
      </div>
    </div>
  );
}
