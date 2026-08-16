import { sponsors } from '@/data/sponsors';
import './PartnerStrip.css';

/* A rotational partner wheel. Each mark rides a continuous turn — scaling up
   and brightening as it comes through the front, receding as it leaves — so
   the bar reads as a rotating carousel rather than a flat slider. Two stacked
   images per mark (mono at rest, brand colour on hover), which LogoLoop's
   single-image API cannot express. */
export default function PartnerStrip() {
  const row = [...sponsors, ...sponsors];

  return (
    <aside className="strip" aria-label="Our partners">
      <div className="wrap strip__in">
        <p className="mono-sm strip__label">Supported by</p>
        <div className="strip__mask">
          <ul className="strip__track">
            {row.map((s, i) => (
              <li
                key={`${s.name}-${i}`}
                className="strip__item"
                style={{ '--turn': `${(i / sponsors.length) * -100}%` } as React.CSSProperties}
              >
                <a
                  href={s.href ?? undefined}
                  target={s.href ? '_blank' : undefined}
                  rel={s.href ? 'noopener noreferrer' : undefined}
                  aria-hidden={i >= sponsors.length}
                  tabIndex={i >= sponsors.length ? -1 : 0}
                  title={s.name}
                >
                  <img className="strip__mono" src={s.logo} alt={i < sponsors.length ? s.name : ''} loading="lazy" />
                  <img className="strip__color" src={s.logoColor} alt="" aria-hidden="true" loading="lazy" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
