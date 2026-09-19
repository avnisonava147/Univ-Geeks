import Reveal from "./Reveal";

interface OurPurposeProps {
  heading: string;
  description: string;
}

export default function OurPurpose({
  heading,
  description,
}: OurPurposeProps) {
  return (
    <section className="bg-blue-50 px-6 py-16 sm:py-20 lg:py-24">

      <div className="mx-auto max-w-5xl">

        <Reveal>

          <div className="rounded-3xl border border-blue-100 bg-white p-8 text-center shadow-sm sm:p-12">

            {/* Small label */}
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              Our Mission
            </p>

            {/* Heading */}
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              {heading}
            </h2>

            {/* Mission */}
            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              {description}
            </p>

          </div>

        </Reveal>

      </div>
    </section>
  );
}