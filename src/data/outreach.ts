/* ---------------------------------------------------------------
   Outreach — SHAPE ONLY.

   We deliberately publish no counts here. `weight` is a relative
   0–1 value describing the *rhythm* of a season, not a measurement,
   and the chart renders no y-axis values while RELATIVE_ONLY is true.

   To publish real figures later: add a `value` (and a unit) to each
   point and flip RELATIVE_ONLY to false. The chart will then label
   the axis, show values in the tooltip, and drop the relative note.
   Until then it claims nothing.
   --------------------------------------------------------------- */

export const RELATIVE_ONLY = true;

export type OutreachPoint = {
  month: string;
  /** relative activity, 0–1. Rhythm, not a count. */
  weight: number;
  /** real, non-numeric context — safe to state */
  phase: string;
  /** optional milestone worth marking on the axis */
  milestone?: string;
  /** fill this in to publish an actual figure */
  value?: number;
};

export const unit = 'people reached';

export const outreach: OutreachPoint[] = [
  { month: 'Aug', weight: 0.18, phase: 'Recruiting' },
  { month: 'Sep', weight: 0.34, phase: 'Kickoff', milestone: 'Season kickoff' },
  { month: 'Oct', weight: 0.46, phase: 'Build' },
  { month: 'Nov', weight: 0.58, phase: 'Build' },
  { month: 'Dec', weight: 0.52, phase: 'League play', milestone: 'First league meet' },
  { month: 'Jan', weight: 0.67, phase: 'League play' },
  { month: 'Feb', weight: 0.83, phase: 'Championship push', milestone: 'League tournament' },
  { month: 'Mar', weight: 0.74, phase: 'Off-season' },
  { month: 'Apr', weight: 0.88, phase: 'Community' },
  { month: 'May', weight: 0.95, phase: 'Community', milestone: 'Summer workshops' },
  { month: 'Jun', weight: 1.0,  phase: 'Community' },
];
