import Reveal from "./Reveal";

interface WhoWeAreProps {
  heading: string;
  description: string;
}

export default function WhoWeAre({
  heading,
  description,
}: WhoWeAreProps) {
  return (
    <section className="px-6 py-16 sm:py-20 lg:py-24">

      <div className="mx-auto max-w-4xl">

        <Reveal>
          <div className="text-center">

            <p className="text-sm font-semibold uppercase tracking-widest text-teal-600">
              About Us
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              {heading}
            </h2>

            <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
              {description}
            </p>

          </div>
        </Reveal>

      </div>
    </section>
  );
}