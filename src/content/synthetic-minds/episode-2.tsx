import Link from "next/link";

export default function Episode2() {
  return (
    <>
      <h1>⚡ Episode 2 — Alien Ideas</h1>
      <p className="dek">Concepts That Don’t Think Like Humans</p>

      <p className="dropcap">Once you notice the shift, you can’t unsee it.</p>

      <p>The outputs feel unfamiliar. Not broken. Not wrong.</p>

      <div className="section-rule" />

      <h2>Ideas Without Ancestry</h2>
      <p>
        Systems are producing solutions that don’t resemble human intuition—but
        they work.
      </p>

      <div className="pullquote">
        These ideas don’t come from our world. They arrive from possibility.
      </div>

      <h2>The Gap</h2>
      <p>
        Humans understand human ideas. These ideas come from somewhere else.
      </p>

      <h2>The Realization</h2>
      <p>
        We are no longer the only source of ideas on this planet.
      </p>

      <div className="flex justify-between mt-10">
        <Link href="/blog/synthetic-minds/episode-1-first-spark">
          ← Episode 1
        </Link>
        <Link href="/blog/synthetic-minds">Series Home →</Link>
      </div>
    </>
  );
}
