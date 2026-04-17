
import Link from "next/link";
import { EPISODES } from "@/content/synthetic-minds/episodes";

export default function Page() {
  return (
    <main className="editorial min-h-screen px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">🧠 Synthetic Minds</h1>

        <p className="dek mb-12">
          A cinematic series exploring when intelligence begins inventing.
        </p>

        <div className="space-y-6">
          {EPISODES.map((ep) => (
            <Link
              key={ep.slug}
              href={`/blog/synthetic-minds/${ep.slug}`}
              className="block p-6 rounded-xl border border-white/10 hover:bg-white/5"
            >
              {ep.title}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
