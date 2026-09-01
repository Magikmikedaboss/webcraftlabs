import Link from "next/link";
import { getAllResources, ACTIVE_LEARNING_PATHS } from "@/lib/resources";

export default function ResourceHero() {
  const totalResources = getAllResources().length;
  const activePathCount = ACTIVE_LEARNING_PATHS.length;

  return (
    <section className="rc-canvas rc-hero px-6 pb-14 pt-16 md:pb-20 md:pt-24">
      <div className="mx-auto max-w-6xl">
        <span className="rc-eyebrow">WebCraft Resource Center</span>
        <h1 className="rc-h1 mt-5 max-w-4xl">
          Learn how modern digital products are designed, built, and improved.
        </h1>
        <p className="rc-lede mt-6 max-w-3xl">
          Practical guides, technical tutorials, project breakdowns, and tools for developers, founders,
          business owners, and teams exploring AI automation.
        </p>

        {/* Jump links point only at sections that exist on the page. The
            former Topic Map (#discover) and audience (#for-you) targets
            were removed along with those sections. */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="#start-here" className="rc-pill-link">
            Start here
          </Link>
          <Link href="#paths" className="rc-pill-link">
            Learning Paths
          </Link>
          <Link href="#all-resources" className="rc-pill-link">
            All Resources
          </Link>
          <Link href="#tools" className="rc-pill-link">
            Tools
          </Link>
        </div>

        {/* Honest counts only — no fabricated stats. */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rc-stat-card">
            <div className="rc-stat-label">Learning paths</div>
            <div className="rc-stat-value">{activePathCount}</div>
            <p className="rc-stat-body">Active, with real published resources on each.</p>
          </div>
          <div className="rc-stat-card">
            <div className="rc-stat-label">Published resources</div>
            <div className="rc-stat-value">{totalResources}</div>
            <p className="rc-stat-body">Guides, tutorials, essays, and project notes, counted live.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
