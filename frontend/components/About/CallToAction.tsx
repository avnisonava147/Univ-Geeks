import Reveal from "./Reveal";

interface CallToActionProps {
  heading: string;
  description: string;
  notesButton: string;
  notesLink: string;
  pyqButton: string;
  pyqLink: string;
}

export default function CallToAction({
  heading,
  description,
  notesButton,
  notesLink,
  pyqButton,
  pyqLink,
}: CallToActionProps) {
  return (
    <section className="px-6 py-16 sm:py-20 lg:py-24">

      <div className="mx-auto max-w-5xl">

        <Reveal>

          <div className="rounded-3xl bg-blue-600 px-6 py-12 text-center shadow-lg sm:px-10 sm:py-16">

            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {heading}
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-blue-50">
              {description}
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">

              <a
                href={notesLink}
                className="rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-md"
              >
                {notesButton}
              </a>

              <a
                href={pyqLink}
                className="rounded-xl border border-white px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-blue-700"
              >
                {pyqButton}
              </a>

            </div>

          </div>

        </Reveal>

      </div>
    </section>
  );
}