/**
 * Single source of truth for every piece of copy on the site.
 * Content is carried over verbatim from the previous static build.
 */

export const profile = {
  name: "Rajan Lamichhane",
  role: "Robotics & Mechatronics Engineer",
  location: "Pokhara, Nepal",
  eyebrow: "Robotics · Mechatronics — Pokhara, Nepal",
  headline: ["I build machines,", "then teach kids to", "build their own"],
  lede: "Mechanical engineering student focused on robotics and mechatronics — designing hardware, wiring the electronics, and writing the code that makes it move. Co-founder of a robotics program that puts the same tools in the hands of school students.",
  rotatingWords: [
    "Robotics",
    "Mechatronics",
    "Machine Learning",
    "Arduino",
    "Python",
    "Fusion 360",
    "Electronics",
    "C",
  ],
  email: "rajanlami8@gmail.com",
  phone: "+977 981-411-1921",
  phoneHref: "tel:+9779814111921",
  linkedin: "https://linkedin.com/in/rajan0/",
  linkedinLabel: "linkedin.com/in/rajan0",
  resume: "/assets/Rajan_Lamichhane_Resume.pdf",
  photo: "/assets/images/rajan_photo.jpg",
  tagline:
    "Robotics & mechatronics engineer, building hardware and teaching it forward from Pokhara, Nepal.",
} as const;

export const readout: { label: string; value: string; highlight?: boolean }[] = [
  { label: "Status", value: "Exploring opportunities", highlight: true },
  { label: "Based", value: "Pokhara, Nepal" },
  { label: "Degree", value: "B.E. Mechanical, 2023–present" },
  { label: "Focus", value: "Robotics · Mechatronics · ML" },
  { label: "Teaching", value: "Co-founder, Dhruva Academy" },
];

export const aboutTitle = "Mechanical engineer, robotics builder, occasional teacher.";
export const aboutBody =
  "I'm a Bachelor's student in Mechanical Engineering at Pashchimanchal Campus, Pokhara, focused on robotics and mechatronics. I like understanding how systems work from the ground up — the mechanics, the electronics, and the code that ties them together — and I'm just as interested in passing that understanding on to students who are only starting to ask the same questions.";

export const stats = [
  { num: 6, label: "Projects built" },
  { num: 3, label: "First-place wins" },
  { num: 2, label: "Techfest selections" },
  { num: 4, label: "Programs taught" },
] as const;

export type ProjectCategory = "Hardware" | "Software" | "Teaching";
export type ProjectStatus = "Shipped" | "In progress" | "Ongoing";

export type Project = {
  id: string;
  title: string;
  spec: string;
  category: ProjectCategory;
  status: ProjectStatus;
  statusNote: string;
  summary: string;
  detail: string;
  tags: string[];
  result: string;
  year: string;
  /** Key/value spec sheet shown in the detail view. */
  specs: { label: string; value: string }[];
};

export const projects: Project[] = [
  {
    id: "smart-safety-helmet",
    title: "Smart safety helmet",
    spec: "helmet / iot + ml",
    category: "Hardware",
    status: "Shipped",
    statusNote: "Competed — Techfest IIT-B",
    summary:
      "A wearable safety system for industrial workers that tracks health and location in real time, then uses machine learning to flag abnormalities before they escalate.",
    detail:
      "A wearable safety system for industrial workers. It tracks health and location in real time, then uses machine learning to predict and alert on abnormalities or accidents before they happen. Built as a team entry and taken through selection to compete at Techfest, IIT Bombay.",
    tags: ["ML", "sensors", "location tracking", "safety"],
    result: "Selected to compete at Techfest, IIT Bombay",
    year: "2024",
    specs: [
      { label: "Domain", value: "Industrial safety / IoT" },
      { label: "Sensing", value: "Health vitals + GPS location" },
      { label: "Intelligence", value: "ML accident prediction" },
      { label: "Outcome", value: "Techfest IIT-B selection" },
    ],
  },
  {
    id: "5-dof-robotic-arm",
    title: "5 DOF robotic arm",
    spec: "robotic arm / mechanical",
    category: "Hardware",
    status: "In progress",
    statusNote: "Final year project",
    summary:
      "Base, links and outer structure designed in Fusion 360, with cycloidal and planetary gear reduction and an aluminum-profile body.",
    detail:
      "Designing the base, links and outer structure in Fusion 360, with cycloidal and planetary gears chosen for the reduction stage and an aluminum-profile body with 3D-printed parts. This is my final year project and the most mechanically involved thing I've built.",
    tags: ["Fusion 360", "gear design", "aluminum profile", "CAD"],
    result: "Feb 2026 — ongoing",
    year: "2025–26",
    specs: [
      { label: "Degrees of freedom", value: "5" },
      { label: "CAD", value: "Autodesk Fusion 360" },
      { label: "Reduction", value: "Cycloidal + planetary" },
      { label: "Structure", value: "Aluminum profile + 3D print" },
    ],
  },
  {
    id: "dhruva-academy",
    title: "Dhruva Academy",
    spec: "education / robotics",
    category: "Teaching",
    status: "Ongoing",
    statusNote: "Operational",
    summary:
      "A co-founded robotics program for grades 7–9, structured around hands-on project sessions rather than lectures.",
    detail:
      "Co-founded a robotics education program for grades 7–9, structured around hands-on, project-based sessions rather than lectures — built around local, relatable examples to hook students early. It's the work I care about most.",
    tags: ["curriculum design", "mentoring", "STEM outreach"],
    result: "Ongoing — the project I'm most invested in",
    year: "Ongoing",
    specs: [
      { label: "Audience", value: "Grades 7–9" },
      { label: "Format", value: "Project-based sessions" },
      { label: "Role", value: "Co-founder & instructor" },
      { label: "Status", value: "Running" },
    ],
  },
  {
    id: "line-following-bot",
    title: "Line following bot",
    spec: "line following bot / mechatronics",
    category: "Software",
    status: "Shipped",
    statusNote: "1st place",
    summary:
      "Sensor-based navigation and control logic for an autonomous line-following platform, built in my first semester.",
    detail:
      "Built in my first semester of college — sensor-based navigation and control logic for an autonomous line-following platform. First competition, first win.",
    tags: ["sensors", "control logic", "autonomy"],
    result: "Won first position, first semester competition",
    year: "2023",
    specs: [
      { label: "Navigation", value: "IR sensor array" },
      { label: "Control", value: "Closed-loop line tracking" },
      { label: "Built", value: "Semester 1, 2023" },
      { label: "Outcome", value: "1st place" },
    ],
  },
  {
    id: "rc-airplane",
    title: "RC airplane",
    spec: "rc airplane / aerodynamics",
    category: "Hardware",
    status: "Shipped",
    statusNote: "1st place — endurance",
    summary:
      "Researched, fabricated and flight-tested an RC plane with a team, using a Clark-Y airfoil and locally sourced styrofoam.",
    detail:
      "Researched, fabricated and flight-tested an RC plane with a team, selecting a Clark-Y airfoil and building the wing and body from locally sourced styrofoam. Iterated through several rounds of testing to fly and land it safely.",
    tags: ["airfoil design", "fabrication", "flight testing"],
    result: "Passed selection at Techfest · 1st in endurance at Mechtrix",
    year: "2024",
    specs: [
      { label: "Airfoil", value: "Clark-Y" },
      { label: "Material", value: "Locally sourced styrofoam" },
      { label: "Process", value: "Iterative flight testing" },
      { label: "Outcome", value: "1st — endurance, Mechtrix" },
    ],
  },
  {
    id: "robotics-outreach",
    title: "Robotics mentorship & outreach",
    spec: "outreach / mentoring",
    category: "Teaching",
    status: "Ongoing",
    statusNote: "Multiple cohorts",
    summary:
      "Mentoring across the campus Robotics Club, Engineers Without Borders intensives, school programs, and UNDP's GCRU e-waste initiative.",
    detail:
      "Mentored students on microcontrollers, soldering and electronics through the campus Robotics Club, taught robotics and 3D printing intensives with Engineers Without Borders, instructed grades 10–12 at Birethanti Secondary School, and trained e-waste reuse as part of UNDP's GCRU initiative.",
    tags: ["Robotics Club", "EWB", "UNDP GCRU"],
    result: "Multiple cohorts, 2024–2025",
    year: "2024–25",
    specs: [
      { label: "Programs", value: "4 organisations" },
      { label: "Topics", value: "Microcontrollers, 3D printing" },
      { label: "Levels", value: "Grades 7–12" },
      { label: "Period", value: "2024–2025" },
    ],
  },
];

export const timeline = [
  {
    date: "2023 — present",
    title: "B.E. Mechanical Engineering",
    body: "Pashchimanchal Campus, Pokhara-16, Lamachaur.",
    kind: "Education",
  },
  
  {
    date: "2020 — 2022",
    title: "NEB Science, XII",
    body: "Gogan Secondary School, Pokhara-32, Gagangauda.",
    kind: "Education",
  },
  {
    date: "Mar 2024 — Feb 2025",
    title: "General member, Robotics Club — Pashchimanchal Campus",
    body: "Taught classes on mechanical design, electronics, microcontrollers and 3D printing. Mentored the team that placed first in an autonomous boat racing competition, gave feedback across projects like micromouse and line-following bots, and helped organize sponsor-backed club events.",
    kind: "Work",
  },
  {
    date: "Ongoing",
    title: "Co-founder, Dhruva Academy",
    body: "Teaching robotics to grades 7–9 through hands-on, project-based sessions — the initiative I'm most invested in.",
    kind: "Work",
  },
  {
    date: "Jul 2024, 7 days",
    title: "Robotics mentor — Karyasala & Engineers Without Borders",
    body: "Guided students at Motherland Secondary School through a full week of robotics and 3D printing, reviewing code and mentoring a group that built a Bluetooth-controlled car on an ESP32.",
    kind: "Volunteering",
  },
  {
    date: "Feb 2025, 3 days",
    title: "Robotics instructor — Birethanti Secondary School",
    body: "Built and taught a short course on electronics, microcontrollers, motors and drivers for grades 10–12, then helped students build a robotic arm, home automation setup, and line-following bot for their school exhibition.",
    kind: "Volunteering",
  },
  {
    date: "Ongoing",
    title: "E-waste training — GCRU initiative, UNDP",
    body: "Trainer for handling and reusing electronic waste as part of the UNDP-backed GCRU initiative.",
    kind: "Volunteering",
  },
] as const;

export const achievements = [
  {
    date: "Oct – Dec 2024",
    title: "1st place, endurance — Mechtrix",
    body: "RC airplane, built and flight-tested with a team; also passed selection in the Aeromodelling competition at Techfest.",
  },
  {
    date: "Mar 2024 – Feb 2025",
    title: "1st place — autonomous boat racing",
    body: "Mentored the Robotics Club team that won first place in the autonomous boat racing competition.",
  },
  {
    date: "2024",
    title: "Selected — Techfest, IIT Bombay",
    body: "Smart safety helmet project selected to compete, combining IoT health/location tracking with ML-based accident prediction.",
  },
  {
    date: "First semester, 2023",
    title: "1st place — line following bot",
    body: "Won first position with an autonomous line-following bot in my very first semester of college.",
  },
  {
    date: "Ongoing",
    title: "Data analytics certifications — Coursera",
    body: "Multiple certificates covering SQL and data analytics tools.",
  },
] as const;

export const skills = [
  {
    group: "Design & CAD",
    items: ["Fusion 360", "SolidWorks", "AutoCAD"],
  },
  {
    group: "Code & electronics",
    items: ["Arduino", "Python", "C", "Microcontrollers"],
  },
  {
    group: "Data",
    items: ["SQL", "Data analytics"],
  },
  {
    group: "Working with people",
    items: ["Group collaboration", "Problem solving", "Communication", "Presentation"],
  },
] as const;

export const navItems = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
] as const;
