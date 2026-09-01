import Link from "next/link";
import { getResourcesByPath } from "@/lib/resources";
import { RESOURCE_GOALS, recommendedStartFor } from "@/lib/resourceGoals";

/**
 * Browse by Goal — the single primary navigation system above All Resources.
 *
 * Replaces the Learning Paths section. The visible framing is the goal
 * ("Build a Better Website") rather than the taxonomy label; `learningPath`
 * is still the field underneath, and RESOURCE_GOALS is the only place that
 * mapping lives.
 *
 * Cards deliberately show a count and a recommended starting point rather
 * than every article title — the path page is where the full ordered
 * sequence belongs, and cramming it in here would recreate the duplicate
 * listing this whole cleanup removed.
 */
export default function BrowseByGoal() {
  const goals = RESOURCE_GOALS.map((goal) => {
    const onPath = getResourcesByPath(goal.path);
    const startSlug = recommendedStartFor(goal);
    const start = onPath.find((r) => r.slug === startSlug);
    return { goal, count: goal.sequence.length, start };
  });

  if (goals.length === 0) return null;

  return (
    <section id="goals" className="rc-canvas mx-auto max-w-7xl px-6 py-14">
      <div className="mb-8 max-w-3xl">
        <span className="rc-eyebrow">Browse by Goal</span>
        <h2 className="rc-h2 mt-4">Start from what you&apos;re trying to do</h2>
        <p className="rc-body mt-3">
          Each goal is a short, ordered sequence — read top to bottom and the pieces build on each
          other. Looking for something specific instead? Every resource is listed below.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {goals.map(({ goal, count, start }) => (
          <Link
            key={goal.id}
            href={`/knowledge/paths/${goal.path}`}
            className="rc-card rc-card-link flex h-full flex-col"
          >
            <h3 className="rc-card-title">{goal.title}</h3>
            <p className="rc-card-body mt-2">{goal.description}</p>

            <div className="rc-card-count mt-4">
              {count} {count === 1 ? "resource" : "resources"}, in order
            </div>

            {start && (
              <p className="rc-card-body mt-2">
                <span className="font-semibold">Start with:</span>{" "}
                {start.frontmatter.title}
              </p>
            )}

            <span className="rc-card-cta mt-auto pt-4">{goal.ctaLabel} →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/**
 * Exported for tests: the canonical href a goal card points at. Keeps the
 * test from re-deriving the URL shape independently.
 */
export function goalHref(path: string): string {
  return `/knowledge/paths/${path}`;
}
