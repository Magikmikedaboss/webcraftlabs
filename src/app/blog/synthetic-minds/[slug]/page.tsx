import { notFound } from "next/navigation";
import Episode1 from "@/content/synthetic-minds/episode-1";
import Episode2 from "@/content/synthetic-minds/episode-2";
import SeriesNav from "@/components/SeriesNav";
import type { FC } from "react";

const episodes: Record<string, FC> = {
  "episode-1-first-spark": Episode1,
  "episode-2-alien-ideas": Episode2,
};


export default function EpisodePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const Component = episodes[slug];

  if (!Component) return notFound();

  return (
    <main className="editorial min-h-screen px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <SeriesNav />
        <article className="prose">
          <Component />
        </article>
      </div>
    </main>
  );
}
