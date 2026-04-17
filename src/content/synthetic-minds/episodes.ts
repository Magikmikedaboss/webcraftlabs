import type { FC } from "react";
import Episode1 from "@/content/synthetic-minds/episode-1";
import Episode2 from "@/content/synthetic-minds/episode-2";

export interface EpisodeMeta {
  slug: string;
  title: string;
  component: FC;
}

export const EPISODES: EpisodeMeta[] = [
  {
    slug: "episode-1-first-spark",
    title: "⚡ Episode 1 — The First Spark",
    component: Episode1,
  },
  {
    slug: "episode-2-alien-ideas",
    title: "⚡ Episode 2 — Alien Ideas",
    component: Episode2,
  },
];

export const EPISODE_MAP: Record<string, EpisodeMeta> = Object.fromEntries(
  EPISODES.map((ep) => [ep.slug, ep])
);
