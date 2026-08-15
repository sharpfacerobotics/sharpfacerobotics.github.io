// Extracted from the legacy site, then hand-checked.
// Names, grades and quotes are the team's own words — do not paraphrase them.

export type Member = {
  name: string;
  group: 'Mechanical' | 'Software';
  grade: string;
  favorite: string;
  photo: string | null;
};

export const captain = {
  name: "Varun Vasishta",
  title: "Team Captain",
  grade: "Junior",
  favorite: "Crashing into the Fadhil wall with no regret",
  photo: "/assets/varun.png",
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
    "grade": "Sophomore",
    "favorite": "Being able to help the team from the ground up, learn engineering skills, meeting people from different teams and their approach to the season",
    "photo": "/assets/guhan.png"
  },
  {
    "name": "Rithik Kesani",
    "group": "Mechanical",
    "grade": "Freshman",
    "favorite": "Designing and building the robot",
    "photo": "/assets/rithik.png"
  },
  {
    "name": "Vivaan Brar",
    "group": "Mechanical",
    "grade": "Freshman",
    "favorite": "The challenge and how it forced us to improvise solutions quickly. Last years challenge was a great learning experience for a rookie team and we are preparing to do our best this season",
    "photo": "/assets/vivaan.png"
  },
  {
    "name": "Kevin Sun",
    "group": "Mechanical",
    "grade": "Sophomore",
    "favorite": "Watching the bot successfully have a 12 ball auto",
    "photo": "/assets/kevin.png"
  },
  {
    "name": "Deep Shah",
    "group": "Mechanical",
    "grade": "Sophomore",
    "favorite": "Learning throughout the season with my peers as well as creating nicknames for the entire team",
    "photo": "/assets/deep.png"
  },
  {
    "name": "Hussam Bajwa",
    "group": "Mechanical",
    "grade": "Sophomore",
    "favorite": "Meeting other teams and cheering on our team during games",
    "photo": "/assets/hussam.png"
  },
  {
    "name": "Fadhil Kudbudeen",
    "group": "Mechanical",
    "grade": "Sophomore",
    "favorite": "Getting Team Sponsors",
    "photo": null
  },
  {
    "name": "Arnav Gupta",
    "group": "Software",
    "grade": "Junior",
    "favorite": "Programming donut routes",
    "photo": "/assets/arnav.png"
  },
  {
    "name": "Gautham Ramalingam",
    "group": "Software",
    "grade": "Sophomore",
    "favorite": "Optimizing robot performance",
    "photo": null
  },
  {
    "name": "Vivek Vasishta",
    "group": "Software",
    "grade": "Incoming Freshman",
    "favorite": "Driving and learning more code",
    "photo": null
  },
  {
    "name": "Alex Xu",
    "group": "Software",
    "grade": "Freshman",
    "favorite": "Joining a competetive yet friendly community",
    "photo": "/assets/alex.png"
  },
  {
    "name": "Ryan Hoang",
    "group": "Software",
    "grade": "Sophomore",
    "favorite": "Cheering on the team",
    "photo": null
  },
  {
    "name": "David Zhang",
    "group": "Software",
    "grade": "Freshman",
    "favorite": "Seeing the robot make a shot",
    "photo": "/assets/david.png"
  },
  {
    "name": "Ishita Singh",
    "group": "Software",
    "grade": "Freshman",
    "favorite": "Cooperating with partners",
    "photo": null
  }
];
