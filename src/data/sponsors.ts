/* Logos point at /assets/sponsors/cutout/ — backgrounds removed and the marks
   flattened to monochrome white, generated from the originals. The originals
   are kept alongside. Blend-mode knockout was tried first and is unreliable:
   any backdrop-filter or sticky ancestor isolates the blend and the background
   square reappears.

   One flat set — the team does not run sponsor tiers, so nothing here ranks
   anyone. Order is alphabetical for exactly that reason.

   `note` describes what the organisation IS, not what it gave us. We do not
   publish contribution amounts or imply relative generosity. */

export type Sponsor = {
  name: string;
  logo: string;
  href: string | null;
  note: string | null;
};

export const sponsors: Sponsor[] = [
  { name: 'Altair',           logo: '/assets/sponsors/cutout/altair.png',        href: 'https://www.altair.com/',        note: 'Simulation and engineering software' },
  { name: 'EHS PFSO',         logo: '/assets/sponsors/cutout/EHSpfso.png',       href: 'https://www.ehspfso.org/',       note: 'Our school’s parent, faculty and student organisation' },
  { name: 'FabWorks',         logo: '/assets/sponsors/cutout/fabworks.png',       href: 'https://www.fabworks.com/',      note: 'Sheet-metal fabrication' },
  { name: 'FIRST',            logo: '/assets/sponsors/cutout/first.png',          href: 'https://www.firstinspires.org/', note: 'Runs the FIRST Tech Challenge' },
  { name: 'goBILDA',          logo: '/assets/sponsors/cutout/gobilda.png',        href: 'https://www.gobilda.com/',       note: 'FTC drivetrain and odometry hardware' },
  { name: 'Kaleido Effect',   logo: '/assets/sponsors/cutout/KaleidoEffect.png', href: null,                             note: null },
  { name: 'Northrop Grumman', logo: '/assets/sponsors/cutout/NorthropGrumman.png',href: 'https://www.northropgrumman.com/',note: 'Aerospace and defence engineering' },
  { name: 'Online Metals',    logo: '/assets/sponsors/cutout/onlineMetals.png',   href: 'https://www.onlinemetals.com/',  note: 'Aluminium and polycarbonate stock' },
  { name: 'Workday',          logo: '/assets/sponsors/cutout/workday.png',        href: 'https://www.workday.com/',       note: 'Enterprise software' },
];
