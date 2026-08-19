// Grades advanced one year for the new school year (Freshman->Sophomore,
// Sophomore->Junior, Junior->Senior, Incoming Freshman->Freshman).
// Source of truth: the LIVE Firestore content (siteContent/main, written
// 2026-06-13), NOT the repo's old index.html — the two had drifted. The live
// copy carries the Outreach role assignments and Ishita's corrected quote.
// Names, grades and quotes are the team's own words — do not paraphrase them.

export type Member = {
  name: string;
  group: 'Mechanical' | 'Software';
  grade: string;
  favorite: string;
  /** also works on community outreach */
  outreach: boolean;
  photo: string | null;
};

export const captain = {
  name: "Varun Vasishta",
  title: "Team Captain",
  grade: "Senior",
  favorite: "Crashing into the Fadhil wall with no regret",
  photo: "/assets/hi/varun.jpg",
};

export const coaches = [
  {
    "name": "Coach Jagadish",
    "title": "Head Coach",
    "note": "Watching students grow as engineers and leaders"
  },
  {
    "name": "Coach Vijay",
    "title": "Assistant Coach",
    "note": "Mentoring students through technical challenges"
  }
];

export const members: Member[] = [
  {
    "name": "Guhan Bala",
    "group": "Mechanical",
    "grade": "Junior",
    "favorite": "Being able to help the team from the ground up, learn engineering skills, meeting people from different teams and their approach to the season",
    "outreach": true,
    "photo": "/assets/hi/guhan.jpg"
  },
  {
    "name": "Rithik Kesani",
    "group": "Mechanical",
    "grade": "Sophomore",
    "favorite": "Designing and building the robot",
    "outreach": false,
    "photo": "/assets/hi/rithik.jpg"
  },
  {
    "name": "Vivaan Brar",
    "group": "Mechanical",
    "grade": "Sophomore",
    "favorite": "The challenge and how it forced us to improvise solutions quickly. Last years challenge was a great learning experience for a rookie team and we are preparing to do our best this season",
    "outreach": true,
    "photo": "/assets/hi/vivaan.jpg"
  },
  {
    "name": "Kevin Sun",
    "group": "Mechanical",
    "grade": "Junior",
    "favorite": "Watching the bot successfully have a 12 ball auto",
    "outreach": false,
    "photo": "/assets/hi/kevin.jpg"
  },
  {
    "name": "Deep Shah",
    "group": "Mechanical",
    "grade": "Junior",
    "favorite": "Learning throughout the season with my peers as well as creating nicknames for the entire team",
    "outreach": true,
    "photo": "/assets/hi/deep.jpg"
  },
  {
    "name": "Hussam Bajwa",
    "group": "Mechanical",
    "grade": "Junior",
    "favorite": "Meeting other teams and cheering on our team during games",
    "outreach": true,
    "photo": "/assets/hi/hussam.jpg"
  },
  {
    "name": "Fadhil Kudbudeen",
    "group": "Mechanical",
    "grade": "Junior",
    "favorite": "Getting Team Sponsors",
    "outreach": true,
    "photo": null
  },
  {
    "name": "Arnav Gupta",
    "group": "Software",
    "grade": "Senior",
    "favorite": "Programming donut routes",
    "outreach": false,
    "photo": "/assets/hi/arnav.jpg"
  },
  {
    "name": "Gautham Ramalingam",
    "group": "Software",
    "grade": "Junior",
    "favorite": "Optimizing robot performance",
    "outreach": false,
    "photo": null
  },
  {
    "name": "Vivek Vasishta",
    "group": "Software",
    "grade": "Freshman",
    "favorite": "Driving and learning more code",
    "outreach": true,
    "photo": null
  },
  {
    "name": "Alex Xu",
    "group": "Software",
    "grade": "Sophomore",
    "favorite": "Joining a competetive yet friendly community",
    "outreach": false,
    "photo": "/assets/hi/alex.jpg"
  },
  {
    "name": "Ryan Hoang",
    "group": "Software",
    "grade": "Junior",
    "favorite": "Cheering on the team",
    "outreach": false,
    "photo": null
  },
  {
    "name": "David Zhang",
    "group": "Software",
    "grade": "Sophomore",
    "favorite": "Seeing the robot make a shot",
    "outreach": false,
    "photo": "/assets/hi/david.jpg"
  },
  {
    "name": "Ishita Singh",
    "group": "Software",
    "grade": "Sophomore",
    "favorite": "Cooperating with QUEST",
    "outreach": true,
    "photo": null
  }
];

export const outreachCount = members.filter(m => m.outreach).length;
