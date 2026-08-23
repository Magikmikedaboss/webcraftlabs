import Link from "next/link";

export default function FeaturedTool() {
  return (
    <section className="rc-canvas mx-auto max-w-7xl px-6 py-14">
      <div className="mb-8 max-w-3xl">
        <span className="rc-eyebrow">Featured Tool</span>
        <h2 className="rc-h2 mt-4">Build Calculator</h2>
      </div>

      <div className="rc-panel flex flex-col gap-6 lg:flex-row lg:items-center">
        <div className="flex-1">
          <p className="rc-body">
            An interactive estimator for scoping a website project. Choose page count, design level,
            content readiness, timeline, and add-ons, and it calculates a live price range and
            timeline — the same tool our own project-scoping process uses.
          </p>
          <p className="rc-body mt-3">
            It doesn&apos;t generate downloadable files or templates — it&apos;s a live calculator you use
            directly on the page.
          </p>
        </div>
        <div className="flex-none">
          <Link href="/build" className="rc-pill-link-solid">
            Open the Build Calculator →
          </Link>
        </div>
      </div>
    </section>
  );
}
