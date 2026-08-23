import Link from "next/link";

export default function FinalCta() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20">
      <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-600 p-8 text-center shadow-xl md:p-12">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Ready to talk about your project?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-white/90">
          Tell us what you&apos;re building — a website, a piece of software, or an automation — and we&apos;ll tell you straight what it takes.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-900 shadow-lg transition hover:bg-blue-50"
          >
            Start Your Project
          </Link>
          <Link
            href="/build"
            className="inline-flex items-center justify-center rounded-xl border-2 border-white bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            Get a Quick Estimate
          </Link>
        </div>
      </div>
    </section>
  );
}
