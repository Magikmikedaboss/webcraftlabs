import Link from "next/link";

const PATHS = [
  {
    title: "Websites & Local Growth",
    description:
      "Fast, conversion-focused websites and local SEO for service businesses that need more calls and booked work.",
    href: "/las-vegas-web-design",
    cta: "Explore website services",
  },
  {
    title: "Custom Software & SaaS",
    description:
      "Custom web applications, internal tools, and SaaS platforms built from MVP to production.",
    href: "/services/saas-platform-development",
    cta: "Explore software services",
  },
  {
    title: "AI & Automation",
    description:
      "Practical workflow automation and AI-assisted systems for teams that want less manual work, not more hype.",
    href: "/services/ai-automation",
    cta: "Explore automation services",
  },
] as const;

export default function AudiencePaths() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10 max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight text-[var(--text)]">
          Three ways we help businesses grow
        </h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {PATHS.map((path) => (
          <Link
            key={path.title}
            href={path.href}
            className="group flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <h3 className="text-xl font-semibold text-[var(--text)]">{path.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-6 text-[var(--muted)]">{path.description}</p>
            <span className="mt-5 inline-flex items-center text-sm font-semibold text-[var(--primary)] transition group-hover:translate-x-1">
              {path.cta} →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
