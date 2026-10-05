import Link from "next/link";

export default function AchievementsPage() {
  return (
    <main>
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[75vh] overflow-hidden bg-[#061A40] text-white">

        {/* Background Glow */}
        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

        {/* Decorative Rings */}
        <div className="absolute -right-20 top-10 h-72 w-72 rounded-full border border-white/10" />
        <div className="absolute -right-8 top-24 h-56 w-56 rounded-full border border-white/10" />

        {/* Decorative Stars */}
        <div className="achievement-pulse absolute left-[10%] top-[25%] text-3xl text-blue-200/50">
          ✦
        </div>

        <div className="achievement-pulse absolute left-[18%] bottom-[25%] text-xl text-cyan-200/40">
          ✧
        </div>

        <div className="achievement-pulse absolute right-[18%] top-[30%] text-4xl text-yellow-200/50">
          ✦
        </div>

        <div className="achievement-pulse absolute right-[10%] bottom-[25%] text-2xl text-blue-200/40">
          ✧
        </div>

        {/* Floating Trophy */}
        <div className="achievement-float absolute right-[12%] top-[22%] hidden text-7xl opacity-80 sm:block">
          🏆
        </div>

        {/* Hero Content */}
        <div className="relative mx-auto flex min-h-[75vh] max-w-6xl items-center justify-center px-6 text-center">

          <div className="achievement-fade max-w-4xl">

            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.35em] text-blue-200">
              Our Students • Their Journey • Their Success
            </p>

            <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Celebrating
              <span className="block bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                Every Achievement
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-blue-100/80 sm:text-lg">
              From first milestones to remarkable accomplishments,
              every achievement represents dedication, growth, and a
              story worth celebrating.
            </p>

            {/* Achievement Highlights */}
            <div className="mt-10 flex flex-wrap justify-center gap-4">

              <div className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm backdrop-blur-sm">
                ✦ Hard Work
              </div>

              <div className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm backdrop-blur-sm">
                ✦ Growth
              </div>

              <div className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm backdrop-blur-sm">
                ✦ Success
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg
            className="relative block h-[80px] w-full"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,70 C200,120 350,20 600,65 C850,110 1000,25 1200,70 L1200,120 L0,120 Z"
              className="fill-white"
            />
          </svg>
        </div>
      </section>


      {/* ================= FEATURED ACHIEVERS ================= */}
<section className="bg-[#f4faff] px-6 py-20">

  <div className="mx-auto max-w-6xl px-6 lg:px-10">

    {/* Heading */}
    <div className="mb-14 text-center">

      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-600">
        Our Star Achievers
      </p>

      <h2 className="mt-3 text-4xl font-bold text-[#063b56] sm:text-5xl">
        Celebrating Our Students
      </h2>

      <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
        Real students. Real achievements. Every milestone is a story of
        dedication, growth, and hard work.
      </p>

      <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-cyan-500" />

    </div>


    {/* Featured Cards */}
    <div className="grid gap-7 md:grid-cols-3 lg:gap-8">

      {/* Card 1 */}
      <div className="achievement-card group overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-slate-200 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">

        <div className="relative h-[390px] overflow-hidden bg-[#062d68]">

          {/* Rank Badge */}
          <div className="absolute left-5 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400 text-lg font-bold text-slate-900 shadow-lg">
            ♛
          </div>

          <img
            src="/achievements/1.png"
            alt="Featured student achievement"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

        </div>

        <div className="border-t-4 border-yellow-400 px-6 py-6 text-center">

          <p className="text-4xl font-extrabold text-yellow-600">
            98%
          </p>

          <h3 className="mt-2 text-xl font-bold text-slate-900">
            Shruti Ranawat
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            RBSE 2026
          </p>

        </div>

      </div>


      {/* Card 2 */}
      <div className="achievement-card group overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-slate-200 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">

        <div className="relative h-[390px] overflow-hidden bg-[#062d68]">

          <div className="absolute left-5 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-lg font-bold text-slate-800 shadow-lg">
            2
          </div>

          <img
            src="/achievements/2.png"
            alt="Featured student achievement"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

        </div>

        <div className="border-t-4 border-slate-300 px-6 py-6 text-center">

          <p className="text-4xl font-extrabold text-slate-500">
            97.8%
          </p>

          <h3 className="mt-2 text-xl font-bold text-slate-900">
            Nupur Rathor
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            RBSE 2026
          </p>

        </div>

      </div>


      {/* Card 3 */}
      <div className="achievement-card group overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-slate-200 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">

        <div className="relative h-[390px] overflow-hidden bg-[#062d68]">

          <div className="absolute left-5 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-orange-400 text-lg font-bold text-white shadow-lg">
            3
          </div>

          <img
            src="/achievements/3.png"
            alt="Featured student achievement"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

        </div>

        <div className="border-t-4 border-orange-400 px-6 py-6 text-center">

          <p className="text-4xl font-extrabold text-orange-600">
            97.4%
          </p>

          <h3 className="mt-2 text-xl font-bold text-slate-900">
            Jyoti Shekhawat
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            RBSE 2026
          </p>

        </div>

      </div>

    </div>

  </div>

</section>

{/* ================= ACHIEVEMENT HIGHLIGHT ================= */}
<section className="bg-[#f4faff] px-6 py-12">

  <div className="mx-auto flex max-w-6xl items-center gap-6">

    {/* Left Line */}
    <div className="hidden h-px flex-1 bg-slate-200 sm:block" />

    {/* Highlight Pill */}
    <div className="achievement-fade flex items-center gap-3 rounded-full bg-[#063b56] px-7 py-3 text-center text-sm font-bold uppercase tracking-wide text-white shadow-lg sm:text-base">

      <span className="text-lg text-cyan-300">
        ✦
      </span>

      <span>
        30+ Students Scored More Than 90%
      </span>

    </div>

    {/* Right Line */}
    <div className="hidden h-px flex-1 bg-slate-200 sm:block" />

  </div>

</section>
{/* ================= ALL ACHIEVERS ================= */}
<section className="bg-[#f4faff] px-6 pb-24 pt-10">

  <div className="mx-auto max-w-6xl px-6 lg:px-10">

    {/* Heading */}
    <div className="mb-12 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-600">
        More Achievements
      </p>

      <h2 className="mt-3 text-3xl font-bold text-[#063b56] sm:text-4xl">
        Our Achievers
      </h2>
    </div>

    {/* Student Cards */}
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

      {Array.from({ length: 15 }, (_, index) => {
        const imageNumber = index + 4;

        return (
          <div
            key={imageNumber}
            className="achievement-pop group overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-slate-200 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
          >

            {/* Student Image */}
            <div className="relative aspect-[5/4] overflow-hidden bg-slate-100">

              <img
                src={`/achievements/${imageNumber}.png`}
                alt={`Student achievement ${imageNumber}`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

            </div>

            {/* Student Details */}
            <div className="border-t-2 border-cyan-400 px-2 py-3 text-center">

              <p className="text-xl font-extrabold text-cyan-500">
                90%+
              </p>

              <h3 className="mt-1 text-xs font-bold text-slate-900">
                Student Name
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                RBSE 2026
              </p>

            </div>

          </div>
        );
      })}

    </div>

  </div>

</section>

{/* ================= YOUR STORY STARTS HERE ================= */}
<section className="relative overflow-hidden bg-[#063b56] px-6 py-14 text-white sm:py-16">

  {/* Background Glows */}
  <div className="absolute -left-28 top-0 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

  <div className="absolute -right-28 bottom-0 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />

  {/* Decorative Stars */}
  <div className="absolute left-[8%] top-[30%] animate-pulse text-2xl text-cyan-300/40">
    ✦
  </div>

  <div className="absolute right-[8%] bottom-[25%] animate-pulse text-3xl text-yellow-200/40">
    ✦
  </div>

  <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-between gap-10 lg:flex-row">

    {/* LEFT CONTENT */}
    <div className="text-center lg:text-left">

      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
        Your Journey
      </p>

      <h2 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
        Your Story
        <span className="block text-cyan-300">
          Starts Here
        </span>
      </h2>

      <p className="mt-5 max-w-lg text-base leading-7 text-blue-100/75 sm:text-lg">
        Every achiever was once a student taking their next step.
      </p>

    </div>


    {/* RIGHT JOURNEY */}
    <div className="flex items-center gap-4 sm:gap-7">

      {/* LEARN */}
      <Link
  href="/notes"
  className="group text-center"
>

        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-cyan-300/40 bg-white/10 backdrop-blur-sm transition-all duration-500 group-hover:-translate-y-3 group-hover:scale-110 group-hover:border-cyan-300 sm:h-24 sm:w-24">

          <span className="text-3xl sm:text-4xl">
            📖
          </span>

        </div>

        <p className="mt-3 text-xs font-bold tracking-wider text-cyan-300 sm:text-sm">
          LEARN
        </p>

      </Link>


      <span className="text-xl text-cyan-300/50 sm:text-2xl">
        →
      </span>


      {/* PRACTICE */}
      <Link
  href="/pyqs"
  className="group text-center"
>

        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-cyan-300/40 bg-white/10 backdrop-blur-sm transition-all duration-500 group-hover:-translate-y-3 group-hover:scale-110 group-hover:border-cyan-300 sm:h-24 sm:w-24">

          <span className="text-3xl sm:text-4xl">
            ✏️
          </span>

        </div>

        <p className="mt-3 text-xs font-bold tracking-wider text-cyan-300 sm:text-sm">
          PRACTICE
        </p>

      </Link>


      <span className="text-xl text-cyan-300/50 sm:text-2xl">
        →
      </span>


      {/* ACHIEVE */}
      <div className="group text-center">

        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-yellow-300/40 bg-white/10 backdrop-blur-sm transition-all duration-500 group-hover:-translate-y-3 group-hover:scale-110 group-hover:border-yellow-300 sm:h-24 sm:w-24">

          <span className="text-3xl sm:text-4xl">
            🏆
          </span>

        </div>

        <p className="mt-3 text-xs font-bold tracking-wider text-yellow-300 sm:text-sm">
          ACHIEVE
        </p>

      </div>

    </div>

  </div>

</section>


</main>
  );
}