import "@/app/blog/editorial.css";
import { notFound } from "next/navigation";
import { EPISODE_MAP, EPISODES } from "@/content/synthetic-minds/episodes";

export function generateStaticParams() {
  return EPISODES.map((ep) => ({ slug: ep.slug }));
}
import SeriesNav from "@/components/SeriesNav";




export default async function EpisodePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = EPISODE_MAP[slug];
  const Component = meta?.component;

  if (!Component) return notFound();

  return (
    <main className="editorial min-h-screen px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <SeriesNav />
        <div className="prose prose-custom max-w-none">
          <Component />
        </div>
      </div>
    </main>
  );
}
