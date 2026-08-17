import { useEffect, useRef, useState } from 'react';
import { subsystems, specs, team } from '@/data/site';
import './RobotScroll.css';

/* Scroll-driven disassembly of KG.

   The robot starts stacked, flies apart into its assemblies as you scroll,
   holds exploded while each part is named, then reassembles on the way out.
   Every layer is a real cut-out from the team's own CAD.

   PERFORMANCE: transforms are written STRAIGHT TO THE DOM through refs. The
   previous version called setState on every scroll frame to drive a progress
   bar, forcing a React re-render per frame and holding the section at 45fps.
   State now changes only when the FEATURED PART changes — five times, not
   sixty times a second. */

type Part = {
  key: string;
  img: string;
  /** where this assembly flies to when exploded, in % of its own box */
  to: { x: number; y: number };
  z: number;
  title: string;
  body: string;
  spec?: string;
};

const sub = (i: number) => subsystems[i];

const PARTS: Part[] = [
  { key: 'Drivetrain',  img: '/assets/robot/drivetrain.png',  to: { x:   2, y:  62 }, z: 1,
    title: sub(0).h, body: sub(0).p, spec: 'Drivebase' },
  { key: 'Transfer',    img: '/assets/robot/transfer.png',    to: { x: -66, y:  -6 }, z: 2,
    title: 'Transfer path',
    body: 'A short handoff from intake to shooter: flicker plus a passive ramp, kept compact so nothing stalls between stages.',
    spec: 'Transfer' },
  { key: 'Intake',      img: '/assets/robot/intake.png',      to: { x: -62, y: -58 }, z: 3,
    title: sub(1).h, body: sub(1).p, spec: 'Intake' },
  { key: 'Shooter',     img: '/assets/robot/shooter.png',     to: { x:  66, y: -54 }, z: 4,
    title: sub(2).h, body: sub(2).p, spec: 'Launcher' },
  { key: 'Electronics', img: '/assets/robot/electronics.png', to: { x:  72, y:  40 }, z: 5,
    title: sub(3).h, body: sub(3).p, spec: 'Controls' },
];

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

export default function RobotScroll() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLImageElement | null)[]>([]);
  const barRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(-1);   // -1 = assembled, nothing featured
  const activeRef = useRef(-1);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      layerRefs.current.forEach((el, i) => {
        if (!el) return;
        el.style.transform = `translate3d(${PARTS[i].to.x}%, ${PARTS[i].to.y}%, 0)`;
        el.style.opacity = '1';
      });
      setActive(0);
      return;
    }

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = wrap.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        if (total <= 0) return;
        const p = clamp01(-r.top / total);

        /* 0 – .30   fly apart
           .30 – .72 held apart, each assembly named in turn
           .72 – 1   back together */
        let spread: number;
        if (p < 0.30) spread = easeInOut(p / 0.30);
        else if (p < 0.72) spread = 1;
        else spread = 1 - easeInOut((p - 0.72) / 0.28);

        let next = -1;
        if (p >= 0.30 && p < 0.72) {
          next = Math.min(PARTS.length - 1, Math.floor(((p - 0.30) / 0.42) * PARTS.length));
        }

        for (let i = 0; i < PARTS.length; i++) {
          const el = layerRefs.current[i];
          if (!el) continue;
          const part = PARTS[i];
          const s = 1 - 0.06 * spread;
          el.style.transform =
            `translate3d(${part.to.x * spread}%, ${part.to.y * spread}%, 0) scale(${s})`;
          el.style.opacity = next === -1 || next === i ? '1' : '0.26';
        }

        if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;

        if (next !== activeRef.current) {
          activeRef.current = next;
          setActive(next);
        }
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const part = active >= 0 ? PARTS[active] : null;
  const spec = part?.spec ? specs.find(s => s.k === part.spec) : undefined;

  return (
    <div className="rw" ref={wrapRef}>
      <div className="rw__pin">
        <div className="rw__progress" aria-hidden="true"><span ref={barRef} /></div>

        <div className="rw__stage">
          <div className="rw__art">
            {PARTS.map((p, i) => (
              <img
                key={p.key}
                ref={el => { layerRefs.current[i] = el; }}
                className="rw__layer"
                style={{ zIndex: p.z }}
                src={p.img}
                alt={i === 0 ? `${team.robot}, exploded into its assemblies` : ''}
                loading={i < 2 ? 'eager' : 'lazy'}
              />
            ))}
            <span className="rw__grid" aria-hidden="true" />
          </div>

          <aside className="rw__panel">
            <ol className="rw__rail">
              {PARTS.map((p, i) => (
                <li key={p.key} className={i === active ? 'is-on' : ''}>
                  <span className="rw__mark" />
                  <span className="mono">{p.key}</span>
                </li>
              ))}
            </ol>

            <div className="rw__copy" key={part ? part.key : 'assembled'}>
              {part ? (
                <>
                  <p className="mono rw__idx">
                    {String(active + 1).padStart(2, '0')}<i>/</i>{String(PARTS.length).padStart(2, '0')}
                  </p>
                  <h3 className="rw__title">{part.title}</h3>
                  <p className="rw__body">{part.body}</p>
                  {spec && (
                    <dl className="rw__spec">
                      <dt className="mono">{spec.k}</dt>
                      <dd>{spec.v}</dd>
                    </dl>
                  )}
                </>
              ) : (
                <>
                  <p className="mono rw__idx">{team.robot}</p>
                  <h3 className="rw__title">Take it apart</h3>
                  <p className="rw__body">
                    Keep scrolling — {team.robot} comes apart into its five assemblies,
                    then goes back together.
                  </p>
                </>
              )}
            </div>

            <p className="mono-sm rw__hint">{team.robot} · {team.season}</p>
          </aside>
        </div>
      </div>
    </div>
  );
}
