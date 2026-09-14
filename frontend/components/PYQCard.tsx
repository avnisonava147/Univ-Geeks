type PYQCardProps = {
  subject: string;
  className?: string;
  years: number[];
  thumbnail: string;
};

export default function PYQCard({
  subject,
  className = "Class 12",
  years,
  thumbnail,
}: PYQCardProps) {
  const latestYear = Math.max(...years);
  const oldestYear = Math.min(...years);

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      
      {/* Thumbnail */}
    <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-100">
  <img
    src={thumbnail}
    alt={`${className} ${subject} PYQ`}
    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
  />
        

        {/* Class Badge */}
        <div className="absolute bottom-4 right-4 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-900 shadow-md">
          {className}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        
        <h2 className="text-xl font-bold text-slate-900">
          {className} {subject}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          RBSE | Previous Year Question Papers
        </p>

        {/* Years Info */}
        <div className="mt-5 flex items-center justify-between rounded-xl bg-blue-50 px-4 py-4">
          
          <div>
            <p className="text-sm font-bold text-slate-900">
              {years.length} Years of PYQs
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {oldestYear} - {latestYear}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-slate-500">
              Latest
            </p>

            <p className="text-lg font-bold text-blue-600">
              {latestYear}
            </p>
          </div>

        </div>

        {/* Button */}
        <button
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700"
        >
          View Papers
          <span className="text-lg transition-transform group-hover:translate-x-1">
            →
          </span>
        </button>

      </div>
    </div>
  );
}