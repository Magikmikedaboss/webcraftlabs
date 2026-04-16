import Link from "next/link";

export default function Page() {
  return (
    <main className="editorial min-h-screen px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">🧠 Synthetic Minds</h1>

        <p className="dek mb-12">
          A cinematic series exploring when intelligence begins inventing.
        </p>

        <div className="space-y-6">
          <Link
            href="/blog/synthetic-minds/episode-1-first-spark"
            className="block p-6 rounded-xl border border-white/10 hover:bg-white/5"
          >
            ⚡ Episode 1 — The First Spark
          </Link>

          <Link
            href="/blog/synthetic-minds/episode-2-alien-ideas"
            className="block p-6 rounded-xl border border-white/10 hover:bg-white/5"
          >
            ⚡ Episode 2 — Alien Ideas
          </Link>
        </div>
      </div>
    </main>
  );
}
