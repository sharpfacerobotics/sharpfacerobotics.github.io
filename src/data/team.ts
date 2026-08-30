// Source of truth: the BioBuzz 2026-27 team rosters Varun posted on
// 2026-08-24, reconciled with the portrait/roster commits pushed to main the
// same day. Where both had a person, the pushed record wins: it carries the
// full name, the new portrait and the freshest quote. Three people the pushed
// roster dropped (Vivaan, Kevin, Deep) are still on Varun's roster, so their
// existing records were kept rather than deleted.
//
// The posting assigns every person to ONE team and ONE group, which replaced
// the old model where Outreach was a boolean worn on top of Mechanical or
// Software. Eight people were given as first names only and carry a name and
// an assignment and nothing else; empty grade/favorite means NOT SUPPLIED,
// never unknown-so-guessed. Names, grades and quotes are the team's own words.
//
// Grades on returning members were advanced one year for the new school year.
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
    "team": "SFR",
    "group": "Mechanical",
    "grade": "Junior",
    "favorite": "Learning about robotics applications, seeing our robot on the field, and building skills across engineering and communication",
    "photo": "/assets/members/guhan-bala.webp"
  },
  {
    "name": "Nithya Ganni",
    "team": "SFR",
    "group": "Mechanical",
    "grade": "Freshman",
    "favorite": "Collaborating with the team and bringing a design to life",
    "photo": "/assets/members/nithya-ganni.webp"
  },
  {
    "name": "Arpit Panda",
    "team": "SFR",
    "group": "Mechanical",
    "grade": "Junior",
    "favorite": "Applying engineering to a physical robot",
    "photo": "/assets/members/arpit-panda.webp"
  },
  {
    "name": "Arnav Gupta",
    "team": "SFR",
    "group": "Software",
    "grade": "Senior",
    "favorite": "Driving the robot and coding autonomous routines",
    "photo": "/assets/members/arnav-gupta.webp"
  },
  {
    "name": "Alex Xu",
    "team": "SFR",
    "group": "Software",
    "grade": "Sophomore",
    "favorite": "Being part of a competitive yet friendly community",
    "photo": "/assets/members/alex-xu.webp"
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
    "favorite": "Driving during the season",
    "photo": "/assets/members/vivek-vasishta.webp"
  },
  {
    "name": "Gautham Ramalingam",
    "team": "SFR",
    "group": "Software",
    "grade": "Junior",
    "favorite": "The freedom to code creatively and work with my teammates to make the best possible robot",
    "photo": "/assets/members/gautham-ramalingam.webp"
  },
  {
    "name": "Ryan Hoang",
    "team": "SFR",
    "group": "Software",
    "grade": "Junior",
    "favorite": "Spending time with the team",
    "photo": "/assets/members/ryan-hoang.webp"
  },
  {
    "name": "Hussam Bajwa",
    "team": "SFR",
    "group": "Outreach",
    "grade": "Junior",
    "favorite": "Talking to others and collaborating",
    "photo": "/assets/members/hussam-bajwa.webp"
  },
  {
    "name": "Fadhil Kudbudeen",
    "team": "SFR",
    "group": "Outreach",
    "grade": "Junior",
    "favorite": "Expanding our team",
    "photo": "/assets/members/fadhil-kudbudeen.webp"
  },
  {
    "name": "Rithik Reddy Kesani",
    "team": "DFR",
    "group": "Mechanical",
    "grade": "Sophomore",
    "favorite": "Making novel mechanical designs",
    "photo": "/assets/members/rithik-reddy-kesani.webp"
  },
  {
    "name": "Varshil Kaipu",
    "team": "DFR",
    "group": "Mechanical",
    "grade": "Sophomore",
    "favorite": "Communicating with other teams and planning alliance strategy during competitions",
    "photo": "/assets/members/varshil-kaipu.webp"
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
    "name": "Raghav Shah",
    "team": "DFR",
    "group": "Mechanical",
    "grade": "Sophomore",
    "favorite": "Putting together outreach events for families and students interested in learning more about robotics",
    "photo": "/assets/members/raghav-shah.webp"
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
    "favorite": "Working with others",
    "photo": "/assets/members/ishita-singh.webp"
  },
  {
    "name": "David Zhang",
    "team": "DFR",
    "group": "Software",
    "grade": "Sophomore",
    "favorite": "Coding paths and winning",
    "photo": "/assets/members/david-zhang.webp"
  },
  {
    "name": "Corey Wan",
    "team": "DFR",
    "group": "Software",
    "grade": "Sophomore",
    "favorite": "Learning more and going further than where I started",
    "photo": "/assets/members/corey-wan.webp"
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
    "name": "Aryan Guddala",
    "team": "DFR",
    "group": "Software",
    "grade": "Sophomore",
    "favorite": "Expanding my coding knowledge",
    "photo": "/assets/members/aryan-guddala.webp"
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
    "name": "Viraj Jaura",
    "team": "DFR",
    "group": "Software",
    "grade": "Sophomore",
    "favorite": "Finding the coding experience calming",
    "photo": "/assets/members/viraj-jaura.webp"
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
