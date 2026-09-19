import Reveal from "./Reveal";

interface TrustPoint {
  title: string;
  description: string;
}

interface WhyChooseUsProps {
  heading: string;
  description: string;
  points: TrustPoint[];
}

export default function WhyChooseUs({
  heading,
  description,
  points,
}: WhyChooseUsProps) {
  return (
    <section className="bg-slate-50 px-6 py-16 sm:py-20 lg:py-24">

      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">

            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              Why UNIV-GEEKS
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              {heading}
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              {description}
            </p>

          </div>
        </Reveal>

        {/* Trust cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">

          {points.map((point, index) => (
            <Reveal
              key={point.title}
              delay={index * 100}
            >
              <div className="h-full rounded-2xl bg-white p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">

                {/* Check */}
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-xl font-bold text-blue-600">
                  ✓
                </div>

                <h3 className="mt-5 text-xl font-semibold text-slate-900">
                  {point.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {point.description}
                </p>

              </div>
            </Reveal>
          ))}

        </div>
      </div>
    </section>
  );
}