import Reveal from "./Reveal";

interface OurStoryProps {
  heading: string;
  paragraphs: string[];
}

export default function OurStory({
  heading,
  paragraphs,
}: OurStoryProps) {
  return (
    <section className="px-6 py-16 sm:py-20 lg:py-24">

      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">

        {/* Story visual */}
        <Reveal>

          <div className="flex min-h-80 items-center justify-center rounded-3xl bg-linear-to-br from-blue-50 to-slate-50">

            <div className="text-center">

              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-white text-5xl shadow-sm">
                📖
              </div>

              <p className="mt-5 font-semibold text-slate-800">
                The UNIV-GEEKS Journey
              </p>

            </div>

          </div>

        </Reveal>

        {/* Story text */}
        <Reveal delay={100}>

          <div>

            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              Our Journey
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              {heading}
            </h2>

            <div className="mt-6 space-y-4">

              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="leading-8 text-slate-600"
                >
                  {paragraph}
                </p>
              ))}

            </div>

          </div>

        </Reveal>

      </div>
    </section>
  );
}