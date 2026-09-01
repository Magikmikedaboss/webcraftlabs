import Link from "next/link";
import { getResourcesByPath } from "@/lib/resources";
import {
  RESOURCE_GOALS,
  goalDestination,
  isPathBacked,
  recommendedStartFor,
} from "@/lib/resourceGoals";

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
    if (!isPathBacked(goal)) {
      // Hub-backed lane: no published guides to sequence yet, so it shows a
      // factual descriptor instead of a resource count it can't honour.
      return { goal, meta: goal.meta, start: undefined };
    }
    const startSlug = recommendedStartFor(goal);
    const start = getResourcesByPath(goal.path).find((r) => r.slug === startSlug);
    const count = goal.sequence.length;
    return { goal, meta: `${count} ${count === 1 ? "resource" : "resources"}, in order`, start };
  });

  if (goals.length === 0) return null;

  return (
    <section id="goals" className="rc-canvas mx-auto max-w-7xl px-6 py-14">
      <div className="mb-8 max-w-3xl">
        <span className="rc-eyebrow">Browse by Goal</span>
        <h2 className="rc-h2 mt-4">Start from what you&apos;re trying to do</h2>
        <p className="rc-body mt-3">
          Most goals are a short, ordered sequence — read top to bottom and the pieces build on
          each other. Looking for something specific instead? Every resource is listed below.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {goals.map(({ goal, meta, start }) => (
          <Link
            key={goal.id}
            href={goalDestination(goal)}
            className="rc-card rc-card-link flex h-full flex-col"
          >
            <h3 className="rc-card-title">{goal.title}</h3>
            <p className="rc-card-body mt-2">{goal.description}</p>

            <div className="rc-card-count mt-4">{meta}</div>

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


