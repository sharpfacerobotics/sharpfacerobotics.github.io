import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { outreach, RELATIVE_ONLY, unit, type OutreachPoint } from '@/data/outreach';
import { members, outreachCount } from '@/data/team';
import { Reveal } from '@/components/Motion';
import './Outreach.css';

/* Validated against the dark surface #0b0d11 with the dataviz palette
   validator: lightness band, chroma floor, CVD separation (ΔE 15.2 protan),
   normal-vision floor (ΔE 21.9) and 3:1 contrast all pass. */
const SERIES = '#0f7d78';
const MARK = '#b4611a';

const W = 1000;
const H = 340;
const PAD = { t: 28, r: 24, b: 44, l: 24 };

function buildPath(pts: OutreachPoint[]) {
  const iw = W - PAD.l - PAD.r;
  const ih = H - PAD.t - PAD.b;
  const x = (i: number) => PAD.l + (i / (pts.length - 1)) * iw;
  const y = (w: number) => PAD.t + (1 - w) * ih;

  // monotone-ish cubic through the points — no overshoot, so the curve
  // never implies a peak the data doesn't have
  let d = `M ${x(0)} ${y(pts[0].weight)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const x0 = x(i), y0 = y(pts[i].weight);
    const x1 = x(i + 1), y1 = y(pts[i + 1].weight);
    const cx = (x0 + x1) / 2;
    d += ` C ${cx} ${y0}, ${cx} ${y1}, ${x1} ${y1}`;
  }
  return { d, x, y, area: `${d} L ${x(pts.length - 1)} ${PAD.t + ih} L ${x(0)} ${PAD.t + ih} Z` };
}

export default function Outreach() {
  const gid = useId().replace(/:/g, '');
  const [active, setActive] = useState<number | null>(null);
  /* The line draws itself and the area lifts when the section first appears,
     so entering the tab shows the shape being built rather than a static plot. */
  const [drawn, setDrawn] = useState(false);
  const figRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setDrawn(true); return; }
    const el = figRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setDrawn(true); io.disconnect(); }
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const { d, x, y, area } = useMemo(() => buildPath(outreach), []);
  const ih = H - PAD.t - PAD.b;

  const cur = active === null ? null : outreach[active];

  return (
    <section className="band fitview" id="outreach">
      <div className="wrap">
        <header className="sec-head">
          <div className="sec-index"><b>05</b><span>Outreach</span></div>
          <h2 className="d2">Where the season actually goes</h2>
          <p className="lede outreach__lede">
            A competition season is not one weekend. This is the rhythm of our outreach across
            a year — recruiting, build, league play, then the community work that carries into summer.
          </p>
          <p className="mono outreach__stat">
            <b>{outreachCount}</b> of {members.length} on the build team also run outreach
          </p>
        </header>

        <Reveal><figure className="chart ticked" ref={figRef as never}>
          <figcaption className="chart__cap">
            <span className="mono">Outreach activity · by month</span>
          </figcaption>

            <div className={`chart__plot${drawn ? ' is-drawn' : ''}`}>
              <svg
                viewBox={`0 0 ${W} ${H}`}
                role="img"
                aria-label="Area chart of outreach activity across the season, shown as relative shape only. Activity rises from recruiting in August through league play in February and continues into community work over the summer."
                onMouseLeave={() => setActive(null)}
              >
                <defs>
                  <linearGradient id={`fill-${gid}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={SERIES} stopOpacity="0.34" />
                    <stop offset="100%" stopColor={SERIES} stopOpacity="0.02" />
                  </linearGradient>
                </defs>

                {/* recessive baseline + quartile rules, deliberately unlabelled */}
                {[0, 0.25, 0.5, 0.75, 1].map(t => (
                  <line
                    key={t}
                    x1={PAD.l} x2={W - PAD.r}
                    y1={PAD.t + t * ih} y2={PAD.t + t * ih}
                    stroke="rgba(20,22,27,0.10)" strokeWidth="1"
                    strokeDasharray={t === 1 ? undefined : '2 6'}
                  />
                ))}

                <path className="chart__area" d={area} fill={`url(#fill-${gid})`} />
                {/* a highlight that runs the length of the series, forever */}
                <path className="chart__spark" d={d} pathLength={1} />
                <path className="chart__line" d={d} fill="none" stroke={SERIES} strokeWidth="2.5" strokeLinecap="round" pathLength={1} />

                {/* milestones get the second validated hue + a direct label */}
                {outreach.map((p, i) =>
                  p.milestone ? (
                    <g key={p.month} className="chart__mile" style={{ '--mi': i } as React.CSSProperties}>
                      <line x1={x(i)} x2={x(i)} y1={y(p.weight)} y2={PAD.t + ih} stroke={MARK} strokeWidth="1" strokeDasharray="2 4" opacity="0.5" />
                      <circle cx={x(i)} cy={y(p.weight)} r="5" fill="#fff" stroke={MARK} strokeWidth="2.5" />
                    </g>
                  ) : null
                )}

                {/* hover targets — bigger than the marks */}
                {outreach.map((p, i) => (
                  <rect
                    key={p.month}
                    x={x(i) - (W - PAD.l - PAD.r) / (outreach.length * 2)}
                    y={PAD.t}
                    width={(W - PAD.l - PAD.r) / outreach.length}
                    height={ih}
                    fill="transparent"
                    onMouseEnter={() => setActive(i)}
                  />
                ))}

                {active !== null && (
                  <g pointerEvents="none">
                    <line x1={x(active)} x2={x(active)} y1={PAD.t} y2={PAD.t + ih} stroke="rgba(20,22,27,0.30)" strokeWidth="1" />
                    <circle cx={x(active)} cy={y(outreach[active].weight)} r="5.5" fill={SERIES} stroke="#fff" strokeWidth="2" />
                  </g>
                )}

                {outreach.map((p, i) => (
                  <text
                    key={p.month}
                    x={x(i)} y={H - 16}
                    textAnchor="middle"
                    className={`chart__xlab${active === i ? ' is-on' : ''}`}
                  >
                    {p.month}
                  </text>
                ))}
              </svg>

              <div className="chart__read" aria-live="polite">
                {cur ? (
                  <>
                    <b>{cur.month}</b>
                    <span>{cur.phase}</span>
                    {cur.milestone && <em style={{ color: MARK }}>{cur.milestone}</em>}
                    {!RELATIVE_ONLY && cur.value != null && <span><b>{cur.value.toLocaleString()}</b> {unit}</span>}
                  </>
                ) : (
                  <span className="chart__hint">Hover the chart to read a month</span>
                )}
              </div>
            </div>
        </figure></Reveal>

        {RELATIVE_ONLY && (
          <p className="chart__note mono-sm">
            Relative shape only — the vertical axis is intentionally unlabelled and no totals are published.
          </p>
        )}
      </div>
    </section>
  );
}
