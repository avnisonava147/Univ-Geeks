
import Link from "next/link";
import Image from "next/image";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

const streams = [
  {
    name: "Science",
    subtitle: "Explore Science Subjects",
    description:
      "Prepare for your board exams with Physics, Chemistry, Mathematics, Biology and more.",
    icon: "🔬",
    thumbnail: "/science-thumbnail.png",
    subjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
    href: "/pyqs/class-12/science",
    available: true,
  },
  {
    name: "Commerce",
    subtitle: "Explore Commerce Subjects",
    description:
      "Build strong concepts with Commerce stream study resources and previous year questions.",
    icon: "💼",
    thumbnail: "/commerce-thumbnail.png",
    subjects: ["Accountancy", "Business Studies", "Economics"],
    href: "#",
    available: false,
  },
  {
    name: "Arts",
    subtitle: "Explore Arts Subjects",
    description:
      "Explore Arts stream subjects and strengthen your board examination preparation.",
    icon: "🎨",
    thumbnail: "/arts-thumbnail.png",
    subjects: ["History", "Geography", "Political Science"],
    href: "#",
    available: false,
  },
];

export default function PYQsPage() {
  return (
    <main className="class12-page min-h-screen overflow-hidden bg-white">
      <Navbar />

      {/* STREAM SELECTION */}
      <section className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="class12-section-heading mb-12 text-center">
          <span className="class12-section-label inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.25em] text-blue-700 sm:text-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            Explore Your Options
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
          </span>

          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Select Your Stream
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
            Choose the stream you are studying in and
            start your preparation journey with UnivGeeks.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-7 md:grid-cols-3">
          {streams.map((stream, index) => {
            const CardContent = (
              <div
                className={`class12-stream-card group relative flex h-full flex-col overflow-hidden rounded-[28px] p-6 sm:p-7 ${
                  stream.available
                    ? "class12-card-active"
                    : "class12-card-coming"
                }`}
                style={{ animationDelay: `${index * 180}ms` }}
              >
                <div className="class12-card-glow" />

                {/* STREAM THUMBNAIL */}
                <div className="relative z-10 mb-5 aspect-[16/9] w-full overflow-hidden rounded-2xl">
                  <Image
                    src={stream.thumbnail}
                    alt={`${stream.name} stream`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Stream Name on Image */}
                  <div className="absolute bottom-3 left-4 text-xl font-black text-white drop-shadow-lg">
                    {stream.name}
                  </div>

                  {/* Status Badge */}
                  <div className="absolute right-3 top-3">
                    {stream.available ? (
                      <span className="class12-status-available rounded-full px-3.5 py-2 text-xs font-bold">
                        <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
                        Available
                      </span>
                    ) : (
                      <span className="class12-status-coming rounded-full px-3.5 py-2 text-xs font-bold">
                        Coming Soon
                      </span>
                    )}
                  </div>
                </div>

                {/* CARD INFORMATION */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-black tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-blue-700">
                    {stream.name}
                  </h3>

                  <p className="mt-1.5 text-sm font-bold text-blue-700">
                    {stream.subtitle}
                  </p>

                  <p className="mt-4 min-h-[72px] text-sm leading-6 text-slate-600">
                    {stream.description}
                  </p>
                </div>

                {/* SUBJECTS */}
                <div className="relative z-10 mt-7 border-t border-slate-200/80 pt-5">
                  <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.15em] text-slate-400">
                    Subjects Preview
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {stream.subjects.map((subject) => (
                      <span
                        key={subject}
                        className="class12-subject-tag rounded-lg px-3 py-2 text-xs font-semibold"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ACTION */}
                <div className="relative z-10 mt-auto mt-7 flex items-center justify-between border-t border-slate-200/80 pt-6">
                  <span
                    className={`text-sm font-extrabold ${
                      stream.available
                        ? "text-blue-700"
                        : "text-slate-400"
                    }`}
                  >
                    {stream.available ? "Explore Stream" : "Coming Soon"}
                  </span>

                  <span
                    className={`class12-card-arrow flex h-10 w-10 items-center justify-center rounded-full ${
                      stream.available
                        ? "class12-arrow-active"
                        : "class12-arrow-disabled"
                    }`}
                  >
                    →
                  </span>
                </div>
              </div>
            );

            return stream.available ? (
              <Link
                key={stream.name}
                href={stream.href}
                className="block h-full rounded-[28px] outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-4"
              >
                {CardContent}
              </Link>
            ) : (
              <div
                key={stream.name}
                className="h-full cursor-default"
              >
                {CardContent}
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}
