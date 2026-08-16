import { useEffect, useRef, useState } from 'react';
import { subsystems, specs } from '@/data/site';
import './RobotScroll.css';

/* Scroll-driven walk through the exploded assembly.

   This uses the team's OWN CAD export, not generated art. Scroll drives a
   camera (scale + translate) over the real render while the matching subsystem
   copy swaps in. `focus` is the centre of each assembly as a fraction of the
   image, read off the export itself — the plate stacks top-to-bottom:
   intake, transfer, launcher plates, then the base and electronics. */
type Step = { key: string; focus: { x: number; y: number }; zoom: number; spec?: string };

const STEPS: Step[] = [
  { key: 'Whole robot',  focus: { x: 0.5,  y: 0.5  }, zoom: 1.0 },
  { key: 'Intake',       focus: { x: 0.52, y: 0.12 }, zoom: 2.3, spec: 'Intake' },
  { key: 'Transfer',     focus: { x: 0.5,  y: 0.36 }, zoom: 2.2, spec: 'Transfer' },
  { key: 'Launcher',     focus: { x: 0.5,  y: 0.58 }, zoom: 2.2, spec: 'Launcher' },
  { key: 'Drivetrain',   focus: { x: 0.5,  y: 0.78 }, zoom: 2.1, spec: 'Drivebase' },
  { key: 'Electronics',  focus: { x: 0.5,  y: 0.93 }, zoom: 2.3, spec: 'Controls' },
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

export default function RobotScroll() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { setActive(0); return; }

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = wrap.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        if (total <= 0) return;
        // 0..1 across the pinned run
        const p = Math.min(1, Math.max(0, -r.top / total));

        const seg = 1 / (STEPS.length - 1);
        const i = Math.min(STEPS.length - 2, Math.floor(p / seg));
        const t = easeInOut(Math.min(1, Math.max(0, (p - i * seg) / seg)));

        const a = STEPS[i], b = STEPS[i + 1];
        const zoom = lerp(a.zoom, b.zoom, t);
        const fx = lerp(a.focus.x, b.focus.x, t);
        const fy = lerp(a.focus.y, b.focus.y, t);

        // translate the focus point to the centre, then scale about it
        const tx = (0.5 - fx) * 100 * zoom;
        const ty = (0.5 - fy) * 100 * zoom;
        img.style.transform = `translate3d(${tx}%, ${ty}%, 0) scale(${zoom})`;

        setActive(t > 0.5 ? i + 1 : i);
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

  const step = STEPS[active];
  const sub = subsystems.find(s => s.h.toLowerCase().startsWith(step.key.toLowerCase().split(' ')[0]))
    ?? subsystems[Math.min(active, subsystems.length - 1)];
  const specLine = step.spec ? specs.find(s => s.k === step.spec) : undefined;

  return (
    <div className="rs" ref={wrapRef}>
      <div className="rs__pin">
        <div className="rs__stage">
          <figure className="rs__viewport">
            <img
              ref={imgRef}
              src="/assets/explodedCad-cutout.png"
              alt="Exploded CAD of robot KG. Scroll to move through each assembly."
            />
            <span className="rs__scan" aria-hidden="true" />
          </figure>

          <div className="rs__readout">
            <ol className="rs__ticks">
              {STEPS.map((s, i) => (
                <li key={s.key} className={i === active ? 'is-on' : ''}>
                  <span className="rs__tickmark" />
                  <span className="mono">{s.key}</span>
                </li>
              ))}
            </ol>

            <div className="rs__copy" key={step.key}>
              <p className="mono rs__step">
                {String(active + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')}
              </p>
              <h3 className="d3">{active === 0 ? 'KG, exploded' : sub.h}</h3>
              <p className="rs__body">
                {active === 0
                  ? 'Every assembly, separated along its build axis. Keep scrolling to walk through them.'
                  : sub.p}
              </p>
              {specLine && (
                <dl className="rs__spec">
                  <dt className="mono">{specLine.k}</dt>
                  <dd>{specLine.v}</dd>
                </dl>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
