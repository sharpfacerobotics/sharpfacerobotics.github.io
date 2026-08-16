/* Real photographs from the team's own outreach events, extracted from the
   album screenshots the team supplied (scripts/ingest-photos.py crops the
   viewer chrome away). Captions describe only what is visibly happening —
   no attendance numbers or claims are invented. */
export type OutreachPhoto = { src: string; caption: string };

export const outreachPhotos: OutreachPhoto[] = [
  { src: '/assets/outreach/outreach-11.jpg', caption: 'Demoing KG to families' },
  { src: '/assets/outreach/outreach-03.jpg', caption: 'KG on show' },
  { src: '/assets/outreach/outreach-12.jpg', caption: 'Running the field' },
  { src: '/assets/outreach/outreach-05.jpg', caption: 'Talking through the build' },
  { src: '/assets/outreach/outreach-06.jpg', caption: 'Hands on the controls' },
  { src: '/assets/outreach/outreach-04.jpg', caption: 'Community event' },
  { src: '/assets/outreach/outreach-02.jpg', caption: 'Setting up' },
  { src: '/assets/outreach/outreach-08.jpg', caption: 'Explaining the intake' },
  { src: '/assets/outreach/outreach-10.jpg', caption: 'Younger visitors' },
  { src: '/assets/outreach/outreach-01.jpg', caption: 'On the floor' },
  { src: '/assets/outreach/outreach-09.jpg', caption: 'Between demos' },
  { src: '/assets/outreach/outreach-07.jpg', caption: 'The room' },
];
