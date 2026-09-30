export type ClassName = "10" | "11" | "12";

export type Stream = "Science" | "Commerce" | "Arts";

export type Chapter = {
  id: string;
  name: string;
  pdf: string;
};

export type Subject = {
  name: string;
  icon: string;
  style: string;
  chapters: Chapter[];
};

export const classes: ClassName[] = ["10", "11", "12"];

export const streams: Stream[] = [
  "Science",
  "Commerce",
  "Arts",
];

export const classInfo = {
  "10": {
    color: "#F2A63D",
    lightColor: "#FFF7ED",
    description: "All Subjects",
  },

  "11": {
    color: "#7B5CE8",
    lightColor: "#F5F3FF",
    description: "Science  |  Arts  |  Commerce",
  },

  "12": {
    color: "#E8604C",
    lightColor: "#FFF1EF",
    description: "Science  |  Arts  |  Commerce",
  },
};

export const streamInfo = {
  Science: {
    icon: "⚗",
    description:
      "Physics, Chemistry, Mathematics, Biology and more.",
    style: "bg-blue-50 text-blue-600",
  },

  Commerce: {
    icon: "▥",
    description:
      "Accountancy, Business Studies, Economics and more.",
    style: "bg-green-50 text-green-600",
  },

  Arts: {
    icon: "●",
    description:
      "History, Political Science, Geography, Sociology and more.",
    style: "bg-red-50 text-red-600",
  },
};

function makeChapters(
  subjectSlug: string,
  chapters: string[],
): Chapter[] {
  return chapters.map((name, index) => ({
    id: `${subjectSlug}-${index + 1}`,
    name,
    pdf: `/pdfs/${subjectSlug}/${index + 1}.pdf`,
  }));
}

/* =========================================================
   CLASS 10
========================================================= */

const class10Subjects: Subject[] = [
  {
    name: "Mathematics",
    icon: "π",
    style: "bg-blue-50 text-blue-600",
    chapters: makeChapters("class-10/mathematics", [
      "Real Numbers",
      "Polynomials",
      "Pair of Linear Equations in Two Variables",
      "Quadratic Equations",
      "Arithmetic Progressions",
      "Triangles",
      "Coordinate Geometry",
      "Introduction to Trigonometry",
      "Some Applications of Trigonometry",
      "Circles",
      "Areas Related to Circles",
      "Surface Areas and Volumes",
      "Statistics",
      "Probability",
    ]),
  },

  {
    name: "Science",
    icon: "⚗",
    style: "bg-cyan-50 text-cyan-600",
    chapters: makeChapters("class-10/science", [
      "Chemical Reactions and Equations",
      "Acids, Bases and Salts",
      "Metals and Non-metals",
      "Carbon and Its Compounds",
      "Life Processes",
      "Control and Coordination",
      "How Do Organisms Reproduce?",
      "Heredity",
      "Light",
      "Human Eye and the Colourful World",
      "Electricity",
      "Magnetic Effects of Electric Current",
      "Our Environment",
    ]),
  },

  {
    name: "Social Science",
    icon: "◎",
    style: "bg-orange-50 text-orange-600",
    chapters: [],
  },

  {
    name: "English",
    icon: "A",
    style: "bg-purple-50 text-purple-600",
    chapters: [],
  },

  {
    name: "Hindi",
    icon: "अ",
    style: "bg-pink-50 text-pink-600",
    chapters: [],
  },

  {
    name: "Computer Applications",
    icon: "💻",
    style: "bg-blue-50 text-blue-600",
    chapters: [],
  },
];

/* =========================================================
   CLASS 11
========================================================= */

const class11Subjects: Record<Stream, Subject[]> = {
  Science: [
    {
      name: "Physics",
      icon: "⚛",
      style: "bg-purple-50 text-purple-600",
      chapters: [],
    },
    {
      name: "Chemistry",
      icon: "⚗",
      style: "bg-cyan-50 text-cyan-600",
      chapters: [],
    },
    {
      name: "Mathematics",
      icon: "π",
      style: "bg-orange-50 text-orange-600",
      chapters: [],
    },
    {
      name: "Biology",
      icon: "⌁",
      style: "bg-green-50 text-green-600",
      chapters: [],
    },
  ],

  Commerce: [
    {
      name: "Accountancy",
      icon: "₹",
      style: "bg-blue-50 text-blue-600",
      chapters: [],
    },
    {
      name: "Business Studies",
      icon: "▥",
      style: "bg-indigo-50 text-indigo-600",
      chapters: [],
    },
    {
      name: "Economics",
      icon: "↗",
      style: "bg-green-50 text-green-600",
      chapters: [],
    },
  ],

  Arts: [
    {
      name: "History",
      icon: "◷",
      style: "bg-orange-50 text-orange-600",
      chapters: [],
    },
    {
      name: "Political Science",
      icon: "⚖",
      style: "bg-red-50 text-red-600",
      chapters: [],
    },
    {
      name: "Geography",
      icon: "◎",
      style: "bg-cyan-50 text-cyan-600",
      chapters: [],
    },
    {
      name: "Sociology",
      icon: "○",
      style: "bg-pink-50 text-pink-600",
      chapters: [],
    },
  ],
};

/* =========================================================
   CLASS 12
========================================================= */

const class12Subjects: Record<Stream, Subject[]> = {
  Science: [
    {
      name: "Physics",
      icon: "⚛",
      style: "bg-purple-50 text-purple-600",
      chapters: [],
    },
    {
      name: "Chemistry",
      icon: "⚗",
      style: "bg-cyan-50 text-cyan-600",
      chapters: [],
    },
    {
      name: "Mathematics",
      icon: "π",
      style: "bg-orange-50 text-orange-600",
      chapters: [],
    },
    {
      name: "Biology",
      icon: "⌁",
      style: "bg-green-50 text-green-600",
      chapters: [],
    },
  ],

  Commerce: [
    {
      name: "Accountancy",
      icon: "₹",
      style: "bg-blue-50 text-blue-600",
      chapters: [],
    },
    {
      name: "Business Studies",
      icon: "▥",
      style: "bg-indigo-50 text-indigo-600",
      chapters: [],
    },
    {
      name: "Economics",
      icon: "↗",
      style: "bg-green-50 text-green-600",
      chapters: [],
    },
  ],

  Arts: [
    {
      name: "History",
      icon: "◷",
      style: "bg-orange-50 text-orange-600",
      chapters: [],
    },
    {
      name: "Political Science",
      icon: "⚖",
      style: "bg-red-50 text-red-600",
      chapters: [],
    },
    {
      name: "Geography",
      icon: "◎",
      style: "bg-cyan-50 text-cyan-600",
      chapters: [],
    },
    {
      name: "Sociology",
      icon: "○",
      style: "bg-pink-50 text-pink-600",
      chapters: [],
    },
  ],
};

export function getSubjects(
  selectedClass: ClassName,
  selectedStream: Stream,
): Subject[] {
  if (selectedClass === "10") {
    return class10Subjects;
  }

  if (selectedClass === "11") {
    return class11Subjects[selectedStream];
  }

  return class12Subjects[selectedStream];
}