import Reveal from "./Reveal";

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface WhatYouGetProps {
  heading: string;
  description: string;
  features: Feature[];
}

export default function WhatYouGet({
  heading,
  description,
  features,
}: WhatYouGetProps) {
  return (
    <section className="px-6 py-16 sm:py-20 lg:py-24">

      <div className="mx-auto max-w-6xl">

        {/* Section heading */}
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">

            <p className="text-sm font-semibold uppercase tracking-widest text-teal-600">
              Resources
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              {heading}
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              {description}
            </p>

          </div>
        </Reveal>

        {/* Feature cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {features.map((feature, index) => (
            <Reveal
              key={feature.title}
              delay={index * 80}
            >
              <div className="group h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg">

                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-2xl transition-transform duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="mt-5 text-xl font-semibold text-slate-900">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="mt-3 leading-7 text-slate-600">
                  {feature.description}
                </p>

              </div>
            </Reveal>
          ))}

        </div>
      </div>
    </section>
  );
}