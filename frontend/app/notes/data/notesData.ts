
export type ClassName = "10" | "11" | "12";

export type Stream = "Science" | "Commerce" | "Arts";

export type Chapter = {
  id: string;
  name: string;
  pdf: string;
  hindiPdf?: string | null;
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
    description: "Physics, Chemistry, Mathematics, Biology and more.",
    style: "bg-blue-50 text-blue-600",
  },
  Commerce: {
    icon: "▥",
    description: "Accountancy, Business Studies, Economics and more.",
    style: "bg-green-50 text-green-600",
  },
  Arts: {
    icon: "●",
    description: "History, Political Science, Geography, Sociology and more.",
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

export const class10Subjects: Subject[] = [
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
      "Carbon and its Compounds",
      "Life Processes",
      "Control and Co-ordination",
      "How do Organisms Reproduce?",
      "Heredity",
      "Light: Reflection and Refraction",
      "Human Eye and Colourful World",
      "Electricity",
      "Magnetic Effects of Electric Current",
      "Our Environment",
    ]),
  },
  {
    name: "Social Science",
    icon: "◎",
    style: "bg-orange-50 text-orange-600",
    chapters: makeChapters("class-10/social-science", [
      "History: The Rise of Nationalism in Europe",
      "History: Nationalism in India",
      "History: The Making of a Global World",
      "History: The Age of Industrialisation",
      "History: Print Culture and the Modern World",
      "Geography: Resources and Development",
      "Geography: Forest and Wildlife Resources",
      "Geography: Water Resources",
      "Geography: Agriculture",
      "Geography: Minerals and Energy Resources",
      "Geography: Manufacturing Industries",
      "Geography: Lifelines of National Economy",
      "Political Science: Power Sharing",
      "Political Science: Federalism",
      "Political Science: Gender, Religion and Caste",
      "Political Science: Political Parties",
      "Political Science: Outcomes of Democracy",
      "Economics: Development",
      "Economics: Sectors of the Indian Economy",
      "Economics: Money and Credit",
      "Economics: Globalisation and the Indian Economy",
      "Economics: Consumer Rights",
    ]),
  },
  {
    name: "English",
    icon: "A",
    style: "bg-purple-50 text-purple-600",
    chapters: makeChapters("class-10/english", [
      "First Flight (Prose): A Letter to God",
      "First Flight (Prose): Nelson Mandela: Long Walk to Freedom",
      "First Flight (Prose): Two Stories About Flying",
      "First Flight (Prose): From the Diary of Anne Frank",
      "First Flight (Prose): Glimpses of India",
      "First Flight (Prose): Mijbil the Otter",
      "First Flight (Prose): Madam Rides the Bus",
      "First Flight (Prose): The Sermon at Benares",
      "First Flight (Prose): The Proposal",
      "First Flight (Poem): Dust of Snow",
      "First Flight (Poem): Fire and Ice",
      "First Flight (Poem): A Tiger in the Zoo",
      "First Flight (Poem): How to Tell Wild Animals",
      "First Flight (Poem): The Ball Poem",
      "First Flight (Poem): Amanda!",
      "First Flight (Poem): The Trees",
      "First Flight (Poem): Fog",
      "First Flight (Poem): The Tale of Custard the Dragon",
      "First Flight (Poem): For Anne Gregory",
      "Footprints Without Feet: A Triumph of Surgery",
      "Footprints Without Feet: The Thief's Story",
      "Footprints Without Feet: The Midnight Visitor",
      "Footprints Without Feet: A Question of Trust",
      "Footprints Without Feet: Footprints Without Feet",
      "Footprints Without Feet: The Making of a Scientist",
      "Footprints Without Feet: The Necklace",
      "Footprints Without Feet: Bholi",
      "Footprints Without Feet: The Book That Saved the Earth",
    ]),
  },
  {
    name: "Hindi",
    icon: "अ",
    style: "bg-pink-50 text-pink-600",
    chapters: makeChapters("class-10/hindi", [
      "क्षितिज (काव्य): पद",
      "क्षितिज (काव्य): राम-लक्ष्मण-परशुराम संवाद",
      "क्षितिज (काव्य): आत्मकथ्य",
      "क्षितिज (काव्य): उत्साह और अट नहीं रही है",
      "क्षितिज (काव्य): यह दंतुरित मुस्कान और फसल",
      "क्षितिज (काव्य): संगतकार",
      "क्षितिज (गद्य): नेताजी का चश्मा",
      "क्षितिज (गद्य): बालगोबिन भगत",
      "क्षितिज (गद्य): लखनवी अंदाज़",
      "क्षितिज (गद्य): एक कहानी यह भी",
      "क्षितिज (गद्य): नौबतखाने में इबादत",
      "क्षितिज (गद्य): संस्कृति",
      "कृतिका: माता का अँचल",
      "कृतिका: साना-साना हाथ जोड़ि...",
      "कृतिका: मैं क्यों लिखता हूँ?",
    ]),
  },

  {
    name: "Sanskrit",
    icon: "🕉",
    style: "bg-emerald-50 text-emerald-600",
    chapters: makeChapters("class-10/sanskrit", [
      "शुचिपर्यावरणम्",
      "बुद्धिर्बलवती सदा",
      "शिशुलालनम्",
      "जननी तुल्यवत्सला",
      "सुभाषितानि",
      "सौहार्दं प्रकृतेः शोभा",
      "विचित्रः साक्षी",
      "सूक्तयः",
      "भूकम्पविभीषिका",
      "अन्योक्तयः",
    ]),
  },
  {
    name: "Class 10 Syllabus",
    icon: "💻",
    style: "bg-blue-50 text-blue-600",
    chapters: [],
  },
];

export function getClass10Chapters(subject: string): Chapter[] {
  const norm = (subject || "").trim().toLowerCase();
  const sub = class10Subjects.find((s) => {
    const sName = s.name.toLowerCase();
    return sName === norm || sName.replace(/\s+/g, "") === norm.replace(/\s+/g, "");
  });
  return sub?.chapters || [];
}

/* =========================================================
   CLASS 11 — UNCHANGED
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
      name: "Class 11 Syllabus",
      icon: "💻",
      style: "bg-blue-50 text-blue-600",
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
    {
      name: "Class 11 Syllabus",
      icon: "💻",
      style: "bg-blue-50 text-blue-600",
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
    {
      name: "Class 11 Syllabus",
      icon: "💻",
      style: "bg-blue-50 text-blue-600",
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
      chapters: makeChapters("class-12/physics", [
        "Electric Charges and Fields",
        "Electrostatic Potential and Capacitance",
        "Current Electricity",
        "Moving Charges and Magnetism",
        "Magnetism and Matter",
        "Electromagnetic Induction",
        "Alternating Current",
        "Electromagnetic Waves",
        "Ray Optics and Optical Instruments",
        "Wave Optics",
        "Dual Nature of Radiation and Matter",
        "Atoms",
        "Nuclei",
        "Semiconductor Electronics",
      ]),
    },
    {
      name: "Chemistry",
      icon: "⚗",
      style: "bg-cyan-50 text-cyan-600",
      chapters: makeChapters("class-12/chemistry", [
        "Solutions",
        "Electrochemistry",
        "Chemical Kinetics",
        "The d- and f-Block Elements",
        "Coordination Compounds",
        "Haloalkanes and Haloarenes",
        "Alcohols, Phenols and Ethers",
        "Aldehydes, Ketones and Carboxylic Acids",
        "Amines",
        "Biomolecules",
      ]),
    },
    {
      name: "Mathematics",
      icon: "π",
      style: "bg-orange-50 text-orange-600",
      chapters: makeChapters("class-12/mathematics", [
        "Relations and Functions",
        "Inverse Trigonometric Functions",
        "Matrices",
        "Determinants",
        "Continuity and Differentiability",
        "Application of Derivatives",
        "Integrals",
        "Application of Integrals",
        "Differential Equations",
        "Vector Algebra",
        "Three Dimensional Geometry",
        "Linear Programming",
        "Probability",
      ]),
    },
    {
      name: "Biology",
      icon: "⌁",
      style: "bg-green-50 text-green-600",
      chapters: makeChapters("class-12/biology", [
        "Sexual Reproduction in Flowering Plants",
        "Human Reproduction",
        "Reproductive Health",
        "Principles of Inheritance and Variation",
        "Molecular Basis of Inheritance",
        "Evolution",
        "Human Health and Disease",
        "Microbes in Human Welfare",
        "Biotechnology: Principles and Processes",
        "Biotechnology and Its Applications",
        "Organisms and Populations",
        "Ecosystem",
        "Biodiversity and Conservation",
      ]),
    },
    {
      name: "English",
      icon: "A",
      style: "bg-purple-50 text-purple-600",
      chapters: makeChapters("class-12/english", [
        "The Last Lesson",
        "Lost Spring",
        "Deep Water",
        "The Rattrap",
        "Indigo",
        "Poets and Pancakes",
        "The Interview",
        "Going Places",
        "My Mother at Sixty-Six",
        "Keeping Quiet",
        "A Thing of Beauty",
        "A Roadside Stand",
        "Aunt Jennifer's Tigers",
        "The Third Level",
        "The Tiger King",
        "Journey to the End of the Earth",
        "The Enemy",
        "On the Face of It",
        "Memories of Childhood",
      ]),
    },
    {
      name: "Hindi",
      icon: "अ",
      style: "bg-pink-50 text-pink-600",
      chapters: makeChapters("class-12/hindi", [
        "आत्मपरिचय और एक गीत",
        "पतंग",
        "कविता के बहाने और बात सीधी थी पर",
        "कैमरे में बंद अपाहिज",
        "सहर्ष स्वीकारा है",
        "उषा",
        "बादल राग",
        "कवितावली और लक्ष्मण-मूर्छा तथा राम का विलाप",
        "रुबाइयाँ और ग़ज़ल",
        "छोटा मेरा खेत और बगुलों के पंख",
        "भक्तिन",
        "बाज़ार दर्शन",
        "काले मेघा पानी दे",
        "पहलवान की ढोलक",
        "चार्ली चैप्लिन यानी हम सब",
        "नमक",
        "शिरीष के फूल",
        "श्रम-विभाजन और जाति-प्रथा",
      ]),
    },
    {
      name: "Class 12 Syllabus",
      icon: "💻",
      style: "bg-blue-50 text-blue-600",
      chapters: [],
    },
  ],

  Commerce: [
    {
      name: "Accountancy",
      icon: "₹",
      style: "bg-blue-50 text-blue-600",
      chapters: makeChapters("class-12/accountancy", [
        "Accounting for Partnership Firms: Fundamentals",
        "Goodwill: Nature and Valuation",
        "Change in Profit-Sharing Ratio Among Existing Partners",
        "Admission of a Partner",
        "Retirement and Death of a Partner",
        "Dissolution of a Partnership Firm",
        "Accounting for Share Capital",
        "Issue and Redemption of Debentures",
        "Financial Statements of a Company",
        "Analysis of Financial Statements",
        "Accounting Ratios",
        "Cash Flow Statement",
      ]),
    },
    {
      name: "Business Studies",
      icon: "▥",
      style: "bg-indigo-50 text-indigo-600",
      chapters: makeChapters("class-12/business-studies", [
        "Nature and Significance of Management",
        "Principles of Management",
        "Business Environment",
        "Planning",
        "Organising",
        "Staffing",
        "Directing",
        "Controlling",
        "Financial Management",
        "Financial Markets",
        "Marketing Management",
        "Consumer Protection",
      ]),
    },
    {
      name: "Economics",
      icon: "↗",
      style: "bg-green-50 text-green-600",
      chapters: makeChapters("class-12/economics", [
        "Introduction to Macroeconomics",
        "National Income Accounting",
        "Money and Banking",
        "Determination of Income and Employment",
        "Government Budget and the Economy",
        "Open Economy Macroeconomics",
        "Indian Economy on the Eve of Independence",
        "Indian Economy (1950–1990)",
        "Liberalisation, Privatisation and Globalisation",
        "Human Capital Formation in India",
        "Rural Development",
        "Employment: Growth, Informalisation and Other Issues",
        "Environment and Sustainable Development",
        "Comparative Development Experiences of India and Its Neighbours",
      ]),
    },
    {
      name: "Class 12 Syllabus",
      icon: "💻",
      style: "bg-blue-50 text-blue-600",
      chapters: [],
    },
  ],

  Arts: [
    {
      name: "History",
      icon: "◷",
      style: "bg-orange-50 text-orange-600",
      chapters: makeChapters("class-12/history", [
        "Bricks, Beads and Bones",
        "Kings, Farmers and Towns",
        "Kinship, Caste and Class",
        "Thinkers, Beliefs and Buildings",
        "Through the Eyes of Travellers",
        "Bhakti-Sufi Traditions",
        "An Imperial Capital: Vijayanagara",
        "Peasants, Zamindars and the State",
        "Kings and Chronicles",
        "Colonialism and the Countryside",
        "Rebels and the Raj",
        "Mahatma Gandhi and the Nationalist Movement",
        "Framing the Constitution",
      ]),
    },
    {
      name: "Political Science",
      icon: "⚖",
      style: "bg-red-50 text-red-600",
      chapters: makeChapters("class-12/political-science", [
        "The End of Bipolarity",
        "Contemporary Centres of Power",
        "Contemporary South Asia",
        "International Organisations",
        "Security in the Contemporary World",
        "Environment and Natural Resources",
        "Globalisation",
        "Challenges of Nation-Building",
        "Era of One-Party Dominance",
        "Politics of Planned Development",
        "India's External Relations",
        "Challenges to and Restoration of the Congress System",
        "The Crisis of Democratic Order",
        "Regional Aspirations",
        "Recent Developments in Indian Politics",
      ]),
    },
    {
      name: "Geography",
      icon: "◎",
      style: "bg-cyan-50 text-cyan-600",
      chapters: makeChapters("class-12/geography", [
        "Human Geography: Nature and Scope",
        "The World Population: Distribution, Density and Growth",
        "Human Development",
        "Primary Activities",
        "Secondary Activities",
        "Tertiary and Quaternary Activities",
        "Transport and Communication",
        "International Trade",
        "Human Settlements",
        "Population: Distribution, Density, Growth and Composition",
        "Migration: Types, Causes and Consequences",
        "Human Development",
        "Human Settlements",
        "Land Resources and Agriculture",
        "Water Resources",
        "Mineral and Energy Resources",
        "Planning and Sustainable Development in Indian Context",
        "Transport and Communication",
        "International Trade",
      ]),
    },
    {
      name: "Sociology",
      icon: "○",
      style: "bg-pink-50 text-pink-600",
      chapters: makeChapters("class-12/sociology", [
        "The Demographic Structure of Indian Society",
        "Social Institutions: Continuity and Change",
        "The Market as a Social Institution",
        "Patterns of Social Inequality and Exclusion",
        "The Challenges of Cultural Diversity",
        "Suggestions for Project Work",
        "Structural Change",
        "Cultural Change",
        "The Story of Indian Democracy",
        "Change and Development in Rural Society",
        "Change and Development in Industrial Society",
        "Globalisation and Social Change",
        "Mass Media and Communications",
        "Social Movements",
      ]),
    },
    {
      name: "Class 12 Syllabus",
      icon: "💻",
      style: "bg-blue-50 text-blue-600",
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
