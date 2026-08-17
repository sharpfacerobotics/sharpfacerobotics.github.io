import { useEffect, useRef, useState } from 'react';
import { subsystems, specs, team } from '@/data/site';
import './RobotScroll.css';

/* Full-bleed, scroll-driven walkthrough of the assembly.

   Each stop is its OWN image, cut from the team's real CAD export and
   upscaled — not one picture being zoomed. Scroll cross-fades between them
   while the copy, spec and tick rail track along. */
type Stop = {
  key: string;
  img: string;
  title: string;
  body: string;
  spec?: string;
};

const specOf = (k: string) => specs.find(s => s.k === k);
const subOf = (i: number) => subsystems[i];

const STOPS: Stop[] = [
  { key: 'Whole robot', img: '/assets/robot/whole.png', title: 'KG, exploded',
    body: 'Every assembly separated along its build axis. Scroll to walk through them one at a time.' },
  { key: 'Intake', img: '/assets/robot/intake.png', title: subOf(1).h, body: subOf(1).p, spec: 'Intake' },
  { key: 'Transfer', img: '/assets/robot/transfer.png', title: 'Transfer path',
    body: 'A short handoff from intake to launcher: flicker plus a passive ramp, kept compact so nothing stalls between stages.', spec: 'Transfer' },
  { key: 'Shooter', img: '/assets/robot/shooter.png', title: subOf(2).h, body: subOf(2).p, spec: 'Launcher' },
  { key: 'Drivetrain', img: '/assets/robot/drivetrain.png', title: subOf(0).h, body: subOf(0).p, spec: 'Drivebase' },
  { key: 'Electronics', img: '/assets/robot/electronics.png', title: subOf(5).h, body: subOf(5).p, spec: 'Controls' },
];

export default function RobotScroll() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = wrap.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        if (total <= 0) return;
        const p = Math.min(1, Math.max(0, -r.top / total));
        setProgress(p);
        setActive(Math.min(STOPS.length - 1, Math.floor(p * STOPS.length * 0.999)));
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

  const stop = STOPS[active];
  const spec = stop.spec ? specOf(stop.spec) : undefined;

  return (
    <div className="rw" ref={wrapRef}>
      <div className="rw__pin">
        {/* progress rail across the top of the viewport */}
        <div className="rw__progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${progress})` }} />
        </div>

        <div className="rw__stage">
          <div className="rw__art">
            {STOPS.map((s, i) => (
              <img
                key={s.key}
                src={s.img}
                alt={i === active ? `${s.title} — ${team.robot}` : ''}
                aria-hidden={i !== active}
                className={`rw__img${i === active ? ' is-on' : ''}`}
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            ))}
            <span className="rw__grid" aria-hidden="true" />
          </div>

          <aside className="rw__panel">
            <ol className="rw__rail">
              {STOPS.map((s, i) => (
                <li key={s.key} className={i === active ? 'is-on' : ''}>
                  <span className="rw__mark" />
                  <span className="mono">{s.key}</span>
                </li>
              ))}
            </ol>

            <div className="rw__copy" key={stop.key}>
              <p className="mono rw__idx">
                {String(active + 1).padStart(2, '0')}<i>/</i>{String(STOPS.length).padStart(2, '0')}
              </p>
              <h3 className="rw__title">{stop.title}</h3>
              <p className="rw__body">{stop.body}</p>
              {spec && (
                <dl className="rw__spec">
                  <dt className="mono">{spec.k}</dt>
                  <dd>{spec.v}</dd>
                </dl>
              )}
            </div>

            <p className="mono-sm rw__hint">{active === 0 ? 'Scroll to continue' : `${team.robot} · ${team.season}`}</p>
          </aside>
        </div>
      </div>
    </div>
  );
}
