/* Logos point at /assets/sponsors/cutout-ink/ — backgrounds removed and the marks
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
  /** monochrome white cutout — the resting state on a dark page */
  logo: string;
  /** same cutout with the brand colour kept — revealed on hover */
  logoColor: string;
  href: string | null;
  note: string | null;
};

export const sponsors: Sponsor[] = [
  { name: 'Altair',           logo: '/assets/sponsors/cutout-ink/altair.png', logoColor: '/assets/sponsors/cutout-color/altair.png',        href: 'https://www.altair.com/',        note: 'Simulation and engineering software' },
  { name: 'EHS PFSO',         logo: '/assets/sponsors/cutout-ink/EHSpfso.png', logoColor: '/assets/sponsors/cutout-color/EHSpfso.png',       href: 'https://www.ehspfso.org/',       note: 'Our school’s parent, faculty and student organisation' },
  { name: 'FabWorks',         logo: '/assets/sponsors/cutout-ink/fabworks.png', logoColor: '/assets/sponsors/cutout-color/fabworks.png',       href: 'https://www.fabworks.com/',      note: 'Sheet-metal fabrication' },
  { name: 'FIRST',            logo: '/assets/sponsors/cutout-ink/first.png', logoColor: '/assets/sponsors/cutout-color/first.png',          href: 'https://www.firstinspires.org/', note: 'Runs the FIRST Tech Challenge' },
  { name: 'goBILDA',          logo: '/assets/sponsors/cutout-ink/gobilda.png', logoColor: '/assets/sponsors/cutout-color/gobilda.png',        href: 'https://www.gobilda.com/',       note: 'FTC drivetrain and odometry hardware' },
  { name: 'Kaleido Effect',   logo: '/assets/sponsors/cutout-ink/KaleidoEffect.png', logoColor: '/assets/sponsors/cutout-color/KaleidoEffect.png', href: null,                             note: null },
  { name: 'Northrop Grumman', logo: '/assets/sponsors/cutout-ink/NorthropGrumman.png', logoColor: '/assets/sponsors/cutout-color/NorthropGrumman.png',href: 'https://www.northropgrumman.com/',note: 'Aerospace and defence engineering' },
  { name: 'Online Metals',    logo: '/assets/sponsors/cutout-ink/onlineMetals.png', logoColor: '/assets/sponsors/cutout-color/onlineMetals.png',   href: 'https://www.onlinemetals.com/',  note: 'Aluminium and polycarbonate stock' },
  { name: 'Workday',          logo: '/assets/sponsors/cutout-ink/workday.png', logoColor: '/assets/sponsors/cutout-color/workday.png',        href: 'https://www.workday.com/',       note: 'Enterprise software' },
];
