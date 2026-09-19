import Reveal from "./Reveal";

interface Stat {
  number: string;
  label: string;
}

interface StatsProps {
  stats: Stat[];
}

export default function Stats({ stats }: StatsProps) {
  return (
    <section className="px-6 py-16 sm:py-20">

      <div className="mx-auto max-w-6xl">

        <Reveal>

          <div className="grid grid-cols-2 gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 md:grid-cols-4 md:p-10">

            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center"
              >

                <div className="text-3xl font-bold text-blue-600 sm:text-4xl">
                  {stat.number}
                </div>

                <p className="mt-2 text-sm text-slate-500 sm:text-base">
                  {stat.label}
                </p>

              </div>
            ))}

          </div>

        </Reveal>

      </div>
    </section>
  );
}