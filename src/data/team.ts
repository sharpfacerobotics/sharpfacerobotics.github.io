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
  favorite: "Seeing our club build from the ground up",
  photo: "/assets/members/varun-vasishta.webp",
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
    "favorite": "Learning about robotics applications, seeing our robot on the field, and building skills across engineering and communication",
    "outreach": true,
    "photo": "/assets/members/guhan-bala.webp"
  },
  {
    "name": "Rithik Reddy Kesani",
    "group": "Mechanical",
    "grade": "Sophomore",
    "favorite": "Making novel mechanical designs",
    "outreach": false,
    "photo": "/assets/members/rithik-reddy-kesani.webp"
  },
  {
    "name": "Varun Vasishta",
    "group": "Mechanical",
    "grade": "Senior",
    "favorite": "Seeing our club build from the ground up",
    "outreach": false,
    "photo": "/assets/members/varun-vasishta.webp"
  },
  {
    "name": "Fadhil Kudbudeen",
    "group": "Mechanical",
    "grade": "Junior",
    "favorite": "Expanding our team",
    "outreach": true,
    "photo": "/assets/members/fadhil-kudbudeen.webp"
  },
  {
    "name": "Hussam Bajwa",
    "group": "Mechanical",
    "grade": "Junior",
    "favorite": "Talking to others and collaborating",
    "outreach": true,
    "photo": "/assets/members/hussam-bajwa.webp"
  },
  {
    "name": "Arpit Panda",
    "group": "Mechanical",
    "grade": "Junior",
    "favorite": "Applying engineering to a physical robot",
    "outreach": false,
    "photo": "/assets/members/arpit-panda.webp"
  },
  {
    "name": "Raghav Shah",
    "group": "Mechanical",
    "grade": "Sophomore",
    "favorite": "Putting together outreach events for families and students interested in learning more about robotics",
    "outreach": true,
    "photo": "/assets/members/raghav-shah.webp"
  },
  {
    "name": "Varshil Kaipu",
    "group": "Mechanical",
    "grade": "Sophomore",
    "favorite": "Communicating with other teams and planning alliance strategy during competitions",
    "outreach": false,
    "photo": "/assets/members/varshil-kaipu.webp"
  },
  {
    "name": "Nithya Ganni",
    "group": "Mechanical",
    "grade": "Freshman",
    "favorite": "Collaborating with the team and bringing a design to life",
    "outreach": false,
    "photo": "/assets/members/nithya-ganni.webp"
  },
  {
    "name": "Aryan Guddala",
    "group": "Software",
    "grade": "Sophomore",
    "favorite": "Expanding my coding knowledge",
    "outreach": false,
    "photo": "/assets/members/aryan-guddala.webp"
  },
  {
    "name": "David Zhang",
    "group": "Software",
    "grade": "Sophomore",
    "favorite": "Coding paths and winning",
    "outreach": false,
    "photo": "/assets/members/david-zhang.webp"
  },
  {
    "name": "Gautham Ramalingam",
    "group": "Software",
    "grade": "Junior",
    "favorite": "The freedom to code creatively and work with my teammates to make the best possible robot",
    "outreach": false,
    "photo": "/assets/members/gautham-ramalingam.webp"
  },
  {
    "name": "Viraj Jaura",
    "group": "Software",
    "grade": "Sophomore",
    "favorite": "Finding the coding experience calming",
    "outreach": false,
    "photo": "/assets/members/viraj-jaura.webp"
  },
  {
    "name": "Vivek Vasishta",
    "group": "Software",
    "grade": "Freshman",
    "favorite": "Seeing the robots move",
    "outreach": false,
    "photo": "/assets/members/vivek-vasishta.webp"
  },
  {
    "name": "Corey Wan",
    "group": "Software",
    "grade": "Sophomore",
    "favorite": "Learning more and going further than where I started",
    "outreach": false,
    "photo": "/assets/members/corey-wan.webp"
  },
  {
    "name": "Ryan Hoang",
    "group": "Software",
    "grade": "Junior",
    "favorite": "Spending time with the team",
    "outreach": false,
    "photo": "/assets/members/ryan-hoang.webp"
  },
  {
    "name": "Arnav Gupta",
    "group": "Software",
    "grade": "Senior",
    "favorite": "Driving the robot and coding autonomous routines",
    "outreach": false,
    "photo": "/assets/members/arnav-gupta.webp"
  },
  {
    "name": "Alex Xu",
    "group": "Software",
    "grade": "Sophomore",
    "favorite": "Being part of a competitive yet friendly community",
    "outreach": false,
    "photo": "/assets/members/alex-xu.webp"
  },
  {
    "name": "Ishita Singh",
    "group": "Software",
    "grade": "Junior",
    "favorite": "Working with others",
    "outreach": true,
    "photo": "/assets/members/ishita-singh.webp"
  }
];

export const outreachCount = members.filter(m => m.outreach).length;
