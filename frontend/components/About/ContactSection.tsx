import Reveal from "./Reveal";

interface ContactSectionProps {
  heading: string;
  description: string;
  email: string;
  buttonText: string;
}

export default function ContactSection({
  heading,
  description,
  email,
  buttonText,
}: ContactSectionProps) {
  return (
    <section className="bg-slate-50 px-6 py-16 sm:py-20 lg:py-24">

      <div className="mx-auto max-w-3xl">

        <Reveal>

          <div className="text-center">

            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              Get In Touch
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              {heading}
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              {description}
            </p>

            <a
              href={`mailto:${email}`}
              className="mt-8 inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {buttonText}
            </a>

          </div>

        </Reveal>

      </div>
    </section>
  );
}