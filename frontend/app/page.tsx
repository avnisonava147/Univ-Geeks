import PYQCard from "../components/PYQCard";

const pyqs = [
  {
    subject: "Physics",
    className: "Class 12",
    years: [
      2025, 2024, 2023, 2022, 2021, 2020,
      2019, 2018, 2017, 2016, 2015, 2014, 2013
    ],
    thumbnail:
      "/physics-thumbnail.png",
  },

  {
    subject: "Chemistry",
    className: "Class 12",
    years: [
      2025, 2024, 2023, 2022, 2021, 2020,
      2019, 2018, 2017, 2016, 2015, 2014, 2013
    ],
    thumbnail:
      "/chemistry-thumbnail.png",
  },

  {
    subject: "Mathematics",
    className: "Class 12",
    years: [
      2025, 2024, 2023, 2022, 2021, 2020,
      2019, 2018, 2017, 2016, 2015, 2014, 2013
    ],
    thumbnail:
      "/mathematics-thumbnail.png",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      
      {/* Header */}
   
<header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
  <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

    {/* Logo */}
    <a href="#" className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl overflow-hidden">
  <img
    src="/logo_UnivGeeks.png"
    alt="UnivGeeks Logo"
    className="h-full w-full object-contain"
  />
</div>

      <div>
        <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
          UnivGeeks
        </h1>
        
      </div>
    </a>

    {/* Navigation */}
    <nav className="hidden items-center gap-8 md:flex">

      <a
        href="#"
        className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
      >
        Home
      </a>

      <a
        href="#"
        className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
      >
        Courses
      </a>

      <a
        href="#"
        className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600"
      >
        PYQs
      </a>

      <a
        href="#"
        className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
      >
        Notes
      </a>

      <a
        href="#"
        className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
      >
        About
      </a>

    </nav>

    {/* Right side */}
    <div className="flex items-center gap-3">

      <button className="hidden rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-600 sm:block">
        Login
      </button>

      <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
        Get Started
      </button>

    </div>

  </div>
</header>

      {/* Hero */}
{/* PYQ HERO BANNER */}
<section className="relative overflow-hidden bg-gradient-to-br from-[#061c35] via-[#0a3153] to-[#071526] text-white">
  <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 sm:py-12 lg:px-8 lg:py-14">
    <div className="relative max-w-4xl">
      {/* Breadcrumb */}
      <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-cyan-200">
        <span>Home</span>
        <span>›</span>
        <span>PYQs</span>
        <span>›</span>
        <span className="font-semibold text-white">Class 12</span>
      </div>

      {/* Label */}
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
        📚 Class 12 Resources
      </div>

      {/* Heading */}
      <h1 className="max-w-4xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
        Chapter-Wise RBSE
        <span className="block text-cyan-300">Class 12</span>
        <span className="block">Previous Year Question Papers</span>
      </h1>

      {/* Description */}
      <p className="mt-5 max-w-3xl text-sm leading-6 text-blue-100 sm:text-base">
        Practice with chapter-wise previous year question papers for Physics,
        Chemistry, Mathematics, Biology and more. Prepare smarter with
        previous years’ board questions.
      </p>

      {/* Feature Cards */}
      <div className="mt-8 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
          <div className="text-2xl">📄</div>
          <h3 className="mt-2 font-bold">Chapter-wise PDFs</h3>
          <p className="mt-1 text-sm text-blue-200">Well Organized</p>
        </div>

        <div className="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
          <div className="text-2xl">🗓️</div>
          <h3 className="mt-2 font-bold">13+ Years of PYQs</h3>
          <p className="mt-1 text-sm text-blue-200">2013 – 2025</p>
        </div>

        <div className="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
          <div className="text-2xl">⚡</div>
          <h3 className="mt-2 font-bold">Quick Revision</h3>
          <p className="mt-1 text-sm text-blue-200">Study Smarter</p>
        </div>

        <div className="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
          <div className="text-2xl">🎯</div>
          <h3 className="mt-2 font-bold">Exam Ready</h3>
          <p className="mt-1 text-sm text-blue-200">Score Higher</p>
        </div>
      </div>
    </div>
  </div>
</section>



{/* Subject Filters */}
<section className="border-b border-slate-200 bg-white">
  <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto px-6 py-4">

    <button className="whitespace-nowrap rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm">
      ▦ All Subjects
    </button>

    <button className="whitespace-nowrap rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-600">
      ⚛ Physics
    </button>

    <button className="whitespace-nowrap rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-600">
      🧪 Chemistry
    </button>

    <button className="whitespace-nowrap rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-600">
      ▣ Mathematics
    </button>

    <button className="whitespace-nowrap rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-600">
      🌿 Biology
    </button>

    <button className="whitespace-nowrap rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-600">
      📘 English
    </button>

    <button className="whitespace-nowrap rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-600">
      अ Hindi
    </button>

    <button className="whitespace-nowrap rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-600">
      ••• Other Subjects
    </button>

  </div>
</section>



      {/* PYQ Cards */}
      <section className="mx-auto max-w-7xl px-6 py-8">
        
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

  <div>
    <p className="text-sm font-medium text-slate-500">
      Showing {pyqs.length} subjects
    </p>

    <h2 className="mt-1 text-2xl font-bold text-slate-900">
      Class 12 PYQs
    </h2>
  </div>

  <div className="relative">
    <input
      type="text"
      placeholder="Search subject..."
      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-10 text-sm text-slate-700 outline-none transition focus:border-blue-400 sm:w-64"
    />

    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
      🔍
    </span>
  </div>

</div>

  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
  {pyqs.map((pyq) => (
  <PYQCard
    key={`${pyq.className}-${pyq.subject}`}
    subject={pyq.subject}
    className={pyq.className}
    years={pyq.years}
    thumbnail={pyq.thumbnail}
  />
))}
</div>
</section>

</main>
);
}




