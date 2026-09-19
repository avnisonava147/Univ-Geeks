import Reveal from "./Reveal";

interface FounderProps {
  heading: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
}

export default function Founder({
  heading,
  name,
  role,
  bio,
  image,
}: FounderProps) {
  return (
    <section className="bg-slate-50 px-6 py-16 sm:py-20 lg:py-24">

      <div className="mx-auto max-w-5xl">

        {/* Heading */}
        <Reveal>
          <div className="mb-10 text-center">

            <p className="text-sm font-semibold uppercase tracking-widest text-teal-600">
              The Person Behind The Platform
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              {heading}
            </h2>

          </div>
        </Reveal>

        {/* Founder card */}
        <Reveal delay={100}>

          <div className="grid overflow-hidden rounded-3xl bg-white shadow-sm md:grid-cols-2">

            {/* Photo */}
            <div className="flex min-h-80 items-center justify-center bg-teal-50">

              {image ? (
                <img
                  src={image}
                  alt={name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="text-center">

                  <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-white text-6xl shadow-sm">
                    👤
                  </div>

                  <p className="mt-4 text-sm text-slate-500">
                    Founder Photo
                  </p>

                </div>
              )}

            </div>

            {/* Founder information */}
            <div className="flex flex-col justify-center p-8 sm:p-10">

              <p className="text-sm font-semibold uppercase tracking-wider text-teal-600">
                {role}
              </p>

              <h3 className="mt-3 text-3xl font-bold text-slate-900">
                {name}
              </h3>

              <p className="mt-5 leading-8 text-slate-600">
                {bio}
              </p>

            </div>

          </div>

        </Reveal>

      </div>
    </section>
  );
}