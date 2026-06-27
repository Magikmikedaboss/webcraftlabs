import { notFound, permanentRedirect } from "next/navigation";

// All Synthetic Minds episodes migrated to top-level /blog/[slug] MDX posts.
// Redirect known legacy slugs; 404 everything else.
const SLUG_MAP: Record<string, string> = {
  "episode-1-first-spark": "/blog/episode-1-first-spark",
  "episode-2-alien-ideas": "/blog/episode-2-alien-ideas",
  "episode-3-thinking-with-something-else": "/blog/episode-3-thinking-with-something-else",
  "episode-4-the-unexpected": "/blog/episode-4-the-unexpected",
  "episode-5-human-bottleneck": "/blog/episode-5-human-bottleneck",
  "episode-6-the-new-creators": "/blog/episode-6-the-new-creators",
  "what-is-synthetic-minds": "/blog/what-is-synthetic-minds",
  "synthetic-minds-series": "/blog/synthetic-minds-series",
};

export default async function DeprecatedSyntheticMindsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = SLUG_MAP[slug];
  if (destination) {
    permanentRedirect(destination);
  }
  return notFound();
}

export function generateStaticParams() {
  return Object.keys(SLUG_MAP).map((slug) => ({ slug }));
}
