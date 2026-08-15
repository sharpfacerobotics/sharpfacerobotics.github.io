/* Sponsor tiering.
   `tier` drives size and placement, not the amount given — we do not publish
   contribution figures. Order within a tier is alphabetical, deliberately,
   so nobody has to read placement as ranking. */

export type Tier = 'principal' | 'supporting' | 'contributing';

export type Sponsor = {
  name: string;
  logo: string;
  href: string | null;
  tier: Tier;
  /* One honest line about what the partnership actually provides.
     Left null where we should not guess — fill these in and they render. */
  note: string | null;
};

export const tierLabels: Record<Tier, { label: string; blurb: string }> = {
  principal:    { label: 'Principal partners',   blurb: 'Multi-season support that underwrites the program itself.' },
  supporting:   { label: 'Supporting partners',  blurb: 'Parts, fabrication and materials that get the robot built.' },
  contributing: { label: 'Contributing partners',blurb: 'Community and organisational backing for the season.' },
};

export const sponsors: Sponsor[] = [
  { name: 'Northrop Grumman', logo: '/assets/sponsors/NorthropGrumman.png', href: 'https://www.northropgrumman.com/', tier: 'principal',    note: null },
  { name: 'Workday',          logo: '/assets/sponsors/workday.png',         href: 'https://www.workday.com/',        tier: 'principal',    note: null },
  { name: 'Altair',           logo: '/assets/sponsors/altair.webp',         href: 'https://www.altair.com/',         tier: 'supporting',   note: 'Simulation and engineering software.' },
  { name: 'FabWorks',         logo: '/assets/sponsors/fabworks.png',        href: 'https://www.fabworks.com/',       tier: 'supporting',   note: 'Sheet-metal fabrication for custom parts.' },
  { name: 'goBILDA',          logo: '/assets/sponsors/gobilda.jpg',         href: 'https://www.gobilda.com/',        tier: 'supporting',   note: 'Drivetrain hardware and odometry pods.' },
  { name: 'Online Metals',    logo: '/assets/sponsors/onlineMetals.png',    href: 'https://www.onlinemetals.com/',   tier: 'supporting',   note: 'Raw aluminium and polycarbonate stock.' },
  { name: 'EHS PFSO',         logo: '/assets/sponsors/EHSpfso.webp',        href: 'https://www.ehspfso.org/',        tier: 'contributing', note: 'Our school’s parent, faculty and student organisation.' },
  { name: 'FIRST',            logo: '/assets/sponsors/first.png',           href: 'https://www.firstinspires.org/',  tier: 'contributing', note: 'The program that runs the FIRST Tech Challenge.' },
  { name: 'Kaleido Effect',   logo: '/assets/sponsors/KaleidoEffect.webp',  href: null,                              tier: 'contributing', note: null },
];
