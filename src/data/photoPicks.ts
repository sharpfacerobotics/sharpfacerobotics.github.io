/* Hand-curated picks, identified by eye from a contact sheet of every photo.
   Kept SEPARATE from outreachPhotos.ts, which is generated — a blind
   slice(0,4) there put a podium speech on the Robot page. */

/** Frames where KG itself is clearly the subject. */
export const robotPhotos = [
  '/assets/outreach/outreach-01.jpg', // exposed chassis at the display board
  '/assets/outreach/outreach-04.jpg', // front-on at the Pack 986 banquet
  '/assets/outreach/outreach-17.jpg', // chassis open on the table
  '/assets/outreach/outreach-25.jpg', // KG on the floor being worked on
];

/** Frames excluded from the carousel and the Contact wall.
    13 is the controller CAD drawing, not a photograph — the looser crop
    detector let it through. 22 is a crop of torsos with no faces. */
export const excludedPhotos = [
  '/assets/outreach/outreach-13.jpg',
  '/assets/outreach/outreach-22.jpg',
];
