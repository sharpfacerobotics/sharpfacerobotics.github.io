// Source of truth: the BioBuzz 2026-27 team rosters posted by Varun on
// 2026-08-24. That posting assigns every person to ONE team (SFR or DFR) and
// ONE group, which replaced the old model where Outreach was a boolean worn on
// top of Mechanical or Software.
//
// Fifteen of the thirty are new and were given as first names only, so they
// carry a name and their assignment and nothing else. Empty grade/favorite
// means NOT SUPPLIED, never unknown-so-guessed: names, grades and quotes are
// the team's own words and are not invented or paraphrased here.
//
// Grades on the returning members were advanced one year for the new school
// year (Freshman->Sophomore, Sophomore->Junior, Junior->Senior).
// The roster is marked subject to change until two weeks before competition.

export type Member = {
  name: string;
  /** Sharp Face Robotics or Dark Force Robotics */
  team: 'SFR' | 'DFR';
  group: 'Mechanical' | 'Software' | 'Outreach';
  /** empty when the team has not supplied it yet */
  grade: string;
  /** empty when the team has not supplied it yet */
  favorite: string;
  photo: string | null;
};

export const captain = {
  name: "Varun Vasishta",
  title: "Team Captain",
  team: "SFR" as const,
  group: "Mechanical" as const,
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
    "team": "SFR",
    "group": "Mechanical",
    "grade": "Junior",
    "favorite": "Being able to help the team from the ground up, learn engineering skills, meeting people from different teams and their approach to the season",
    "photo": "/assets/hi/guhan.jpg"
  },
  {
    "name": "Nithya",
    "team": "SFR",
    "group": "Mechanical",
    "grade": "",
    "favorite": "",
    "photo": null
  },
  {
    "name": "Arpit",
    "team": "SFR",
    "group": "Mechanical",
    "grade": "",
    "favorite": "",
    "photo": null
  },
  {
    "name": "Arnav Gupta",
    "team": "SFR",
    "group": "Software",
    "grade": "Senior",
    "favorite": "Programming donut routes",
    "photo": "/assets/hi/arnav.jpg"
  },
  {
    "name": "Alex Xu",
    "team": "SFR",
    "group": "Software",
    "grade": "Sophomore",
    "favorite": "Joining a competetive yet friendly community",
    "photo": "/assets/hi/alex.jpg"
  },
  {
    "name": "Vaibhav",
    "team": "SFR",
    "group": "Software",
    "grade": "",
    "favorite": "",
    "photo": null
  },
  {
    "name": "Vivek Vasishta",
    "team": "SFR",
    "group": "Software",
    "grade": "Freshman",
    "favorite": "Driving and learning more code",
    "photo": null
  },
  {
    "name": "Gautham Ramalingam",
    "team": "SFR",
    "group": "Software",
    "grade": "Junior",
    "favorite": "Optimizing robot performance",
    "photo": null
  },
  {
    "name": "Ryan Hoang",
    "team": "SFR",
    "group": "Software",
    "grade": "Junior",
    "favorite": "Cheering on the team",
    "photo": null
  },
  {
    "name": "Hussam Bajwa",
    "team": "SFR",
    "group": "Outreach",
    "grade": "Junior",
    "favorite": "Meeting other teams and cheering on our team during games",
    "photo": "/assets/hi/hussam.jpg"
  },
  {
    "name": "Fadhil Kudbudeen",
    "team": "SFR",
    "group": "Outreach",
    "grade": "Junior",
    "favorite": "Getting Team Sponsors",
    "photo": null
  },
  {
    "name": "Rithik Kesani",
    "team": "DFR",
    "group": "Mechanical",
    "grade": "Sophomore",
    "favorite": "Designing and building the robot",
    "photo": "/assets/hi/rithik.jpg"
  },
  {
    "name": "Varshil",
    "team": "DFR",
    "group": "Mechanical",
    "grade": "",
    "favorite": "",
    "photo": null
  },
  {
    "name": "Vivaan Brar",
    "team": "DFR",
    "group": "Mechanical",
    "grade": "Sophomore",
    "favorite": "The challenge and how it forced us to improvise solutions quickly. Last years challenge was a great learning experience for a rookie team and we are preparing to do our best this season",
    "photo": "/assets/hi/vivaan.jpg"
  },
  {
    "name": "Sidhak",
    "team": "DFR",
    "group": "Mechanical",
    "grade": "",
    "favorite": "",
    "photo": null
  },
  {
    "name": "Rishi",
    "team": "DFR",
    "group": "Mechanical",
    "grade": "",
    "favorite": "",
    "photo": null
  },
  {
    "name": "Raghav",
    "team": "DFR",
    "group": "Mechanical",
    "grade": "",
    "favorite": "",
    "photo": null
  },
  {
    "name": "Advait",
    "team": "DFR",
    "group": "Mechanical",
    "grade": "",
    "favorite": "",
    "photo": null
  },
  {
    "name": "Dhriti",
    "team": "DFR",
    "group": "Mechanical",
    "grade": "",
    "favorite": "",
    "photo": null
  },
  {
    "name": "Ishita Singh",
    "team": "DFR",
    "group": "Software",
    "grade": "Junior",
    "favorite": "Cooperating with QUEST",
    "photo": null
  },
  {
    "name": "David Zhang",
    "team": "DFR",
    "group": "Software",
    "grade": "Sophomore",
    "favorite": "Seeing the robot make a shot",
    "photo": "/assets/hi/david.jpg"
  },
  {
    "name": "Corey",
    "team": "DFR",
    "group": "Software",
    "grade": "",
    "favorite": "",
    "photo": null
  },
  {
    "name": "Adharsh",
    "team": "DFR",
    "group": "Software",
    "grade": "",
    "favorite": "",
    "photo": null
  },
  {
    "name": "Aryan",
    "team": "DFR",
    "group": "Software",
    "grade": "",
    "favorite": "",
    "photo": null
  },
  {
    "name": "Irya",
    "team": "DFR",
    "group": "Software",
    "grade": "",
    "favorite": "",
    "photo": null
  },
  {
    "name": "Leo",
    "team": "DFR",
    "group": "Software",
    "grade": "",
    "favorite": "",
    "photo": null
  },
  {
    "name": "Viraj",
    "team": "DFR",
    "group": "Software",
    "grade": "",
    "favorite": "",
    "photo": null
  },
  {
    "name": "Kevin Sun",
    "team": "DFR",
    "group": "Outreach",
    "grade": "Junior",
    "favorite": "Watching the bot successfully have a 12 ball auto",
    "photo": "/assets/hi/kevin.jpg"
  },
  {
    "name": "Deep Shah",
    "team": "DFR",
    "group": "Outreach",
    "grade": "Junior",
    "favorite": "Learning throughout the season with my peers as well as creating nicknames for the entire team",
    "photo": "/assets/hi/deep.jpg"
  }
];

/* The BioBuzz roster makes Outreach its own group rather than a second hat
   worn by build-team members, so this counts group membership. */
export const outreachCount = members.filter(m => m.group === 'Outreach').length;
