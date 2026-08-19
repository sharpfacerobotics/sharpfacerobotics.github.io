/* The programme runs TWO FTC teams out of Emerald High School.
   `team` stays as the primary/site-owner team so nothing else has to change. */
export const teams = [
  {
    name: 'Sharp Face Robotics',
    number: '30450',
    blurb: 'The founding team. Built KG for DECODE and documents every season so the next one does not start from zero.',
    accent: '#4fe0d8',
    primary: true,
  },
  {
    name: 'Dark Force Robotics',
    // TODO: FTC number not supplied — left null rather than guessed.
    number: null as string | null,
    blurb: 'Our second team out of Emerald High School. BIOBUZZ is their rookie season.',
    accent: '#8b7bff',
    primary: false,
  },
];

/* Headcount across BOTH FTC teams — Sharp Face Robotics and Dark Force
   Robotics. Deliberately not members.length, which only counts the people who
   currently have a card on the site. */
export const memberCount = 45;
export const memberCountLabel = '45+';

export const team = {
  number: '30450',
  name: 'Sharp Face Robotics',
  school: 'Emerald High School',
  city: 'Dublin, California',
  email: 'contact30450@gmail.com',
  season: '2025–26 · DECODE',
  robot: 'KG',
};

export const awards = [
  { title: '2nd Place Inspire', detail: 'League Award' },
  { title: 'Finalist Award', detail: 'Alliance Finalist' },
];

/* Robot specs — lifted verbatim from the legacy Robot page.
   These are the team's own measured figures; do not round or embellish. */
export const specs = [
  { k: 'Drivebase',   v: 'Integrated mecanum, 45° rollers, low friction losses' },
  { k: 'Intake',      v: 'Dual-compliant 3-stage, 1150 RPM, 35° ramp' },
  { k: 'Transfer',    v: 'Flicker + passive ramp handoff, ~0.83 s' },
  { k: 'Launcher',    v: 'Single 3" flywheel, tuned for ~50° scoring shots' },
  { k: 'Autonomous',  v: 'Pedro Pathing, AprilTag + odometry localization' },
  { k: 'Cycle timing',v: 'Structured 1.5 s shot sequence, staged trigger reset' },
  { k: 'Controls',    v: 'State machine, voltage compensation, driver macros' },
];

export const subsystems = [
  { n: '01', img: '/assets/robot/drivetrain.png',  h: 'Drivetrain',       p: 'Evolved from a ladder-drive prototype into a fully integrated mecanum frame — better packaging, more rigidity, easier to service, same omnidirectional control.' },
  { n: '02', img: '/assets/robot/transfer.png',    h: 'Intake + transfer', p: 'A dual-compliant pitching intake and compact transfer chain, tuned through iteration to absorb approach-angle error and stop jamming under match pressure.' },
  { n: '03', img: '/assets/robot/shooter.png',     h: 'Shooter',           p: 'Launcher geometry and compression refined across several versions for shot repeatability, shorter spin-up between cycles, and accuracy from distance.' },
  { n: '04', img: '/assets/robot/electronics.png', h: 'Localization',      p: 'Limelight AprilTag sensing fused with GoBILDA odometry for field awareness — automatic alignment and distance-aware shooting in both auto and TeleOp.' },
  { n: '05', img: '/assets/robot/autonomous.png',  h: 'Autonomous',        p: 'Pedro Pathing and explicit state machines drive repeatable routes with recovery logic, instead of fragile timing-only routines.' },
  { n: '06', img: '/assets/robot/driver.png',      h: 'Driver experience', p: 'Driver-centric mapping and macros keep controls predictable, so operators watch the game while automation handles the timing-sensitive steps.' },
];

export const services = [
  {
    name: 'Sharp',
    tag: 'FTC code LLM',
    href: 'https://sharpftc.pages.dev',
    cta: 'Launch Sharp AI',
    logo: null,
    status: null,
    body: 'As a rookie team we could not find AI tools built for FTC programming, so we wrote our own. Sharp is a language model tuned to generate FTC-ready code — it speeds up our own iteration, and it is open to the wider robotics community.',
  },
  {
    name: 'Telemark',
    tag: 'Master FTC programming',
    href: 'https://sharpfacerobotics.github.io/telemark/',
    cta: 'Visit Telemark',
    logo: '/assets/telemark.png',
    status: null,
    body: 'A place for new members to learn Java for FTC, with a built-in simulator. A structured, level-gated curriculum written by student engineers — from Blocks to Bézier curves, every concept hands-on.',
  },
];

export const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/sharpfacerobotics/' },
  { label: 'GitHub',    href: 'https://github.com/sharpfacerobotics' },
];
