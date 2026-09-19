interface HeroProps {
  title: string;
  tagline: string;
  badge: string;
}

export default function Hero({
  title,
  tagline,
  badge,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-slate-50 px-6 py-20 sm:py-24 lg:py-32">
      
      {/* Decorative background shapes */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-teal-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-5xl text-center">

        {/* Small badge */}
        <span className="inline-flex rounded-full border border-teal-100 bg-white px-4 py-2 text-sm font-medium text-teal-700 shadow-sm">
          {badge}
        </span>

        {/* Main heading */}
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          {title}
        </h1>

        {/* Tagline */}
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
          {tagline}
        </p>

      </div>
    </section>
  );
}