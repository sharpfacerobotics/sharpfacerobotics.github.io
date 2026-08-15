/* One flat set — the team does not run sponsor tiers, so nothing here ranks
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
  { name: 'Altair',           logo: '/assets/sponsors/altair.webp',        href: 'https://www.altair.com/',        note: 'Simulation and engineering software' },
  { name: 'EHS PFSO',         logo: '/assets/sponsors/EHSpfso.webp',       href: 'https://www.ehspfso.org/',       note: 'Our school’s parent, faculty and student organisation' },
  { name: 'FabWorks',         logo: '/assets/sponsors/fabworks.png',       href: 'https://www.fabworks.com/',      note: 'Sheet-metal fabrication' },
  { name: 'FIRST',            logo: '/assets/sponsors/first.png',          href: 'https://www.firstinspires.org/', note: 'Runs the FIRST Tech Challenge' },
  { name: 'goBILDA',          logo: '/assets/sponsors/gobilda.jpg',        href: 'https://www.gobilda.com/',       note: 'FTC drivetrain and odometry hardware' },
  { name: 'Kaleido Effect',   logo: '/assets/sponsors/KaleidoEffect.webp', href: null,                             note: null },
  { name: 'Northrop Grumman', logo: '/assets/sponsors/NorthropGrumman.png',href: 'https://www.northropgrumman.com/',note: 'Aerospace and defence engineering' },
  { name: 'Online Metals',    logo: '/assets/sponsors/onlineMetals.png',   href: 'https://www.onlinemetals.com/',  note: 'Aluminium and polycarbonate stock' },
  { name: 'Workday',          logo: '/assets/sponsors/workday.png',        href: 'https://www.workday.com/',       note: 'Enterprise software' },
];
