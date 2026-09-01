import Link from "next/link";
import { ACTIVE_LEARNING_PATHS, getResourcesByPath } from "@/lib/resources";
import { LEARNING_PATH_META } from "@/lib/resourcePathMeta";

export default function LearningPaths() {
  const pathCount: number = ACTIVE_LEARNING_PATHS.length;
  const pathCountLabel = pathCount === 1 ? "One active path" : `${pathCount} active paths`;

  return (
    <section id="paths" className="rc-canvas mx-auto max-w-7xl px-6 py-14">
      <div className="mb-8 max-w-3xl">
        <span className="rc-eyebrow">Learning Paths</span>
        <h2 className="rc-h2 mt-4">Follow a path that matches what you&apos;re building</h2>
        <p className="rc-body mt-3">
          {pathCountLabel}, each built entirely from real, published resources — no filler.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {ACTIVE_LEARNING_PATHS.map((path) => {
          const meta = LEARNING_PATH_META[path];
          const count = getResourcesByPath(path).length;
          return (
            <Link key={path} href={`/knowledge/paths/${path}`} className="rc-card rc-card-link">
              <h3 className="rc-card-title">{meta.label}</h3>
              <p className="rc-card-body">{meta.description}</p>
              <div className="rc-card-count">
                {count} {count === 1 ? "resource" : "resources"}
              </div>
              <span className="rc-card-cta">Start learning →</span>
            </Link>
          );
        })}
      </div>

    </section>
  );
}
