import Link from "next/link";

export default function Episode1() {
  return (
    <>
      <h1>⚡ Episode 1 — The First Spark</h1>
      <p className="dek">When AI Stops Imitating and Starts Inventing</p>

      <p className="dropcap">
        There&apos;s a moment you don&apos;t notice at first.
      </p>

      <p>
        It rarely surprised you in a way that felt genuinely unfamiliar.
      </p>

      <p>Now it does.</p>

      <ul>
        <li>
          <strong>Designs no one would sketch</strong> — structures that feel
          intentional but don’t map to anything recognizable.
        </li>
        <li>
          <strong>Code that works, but takes unexpected paths</strong> — correct,
          efficient, but logically… sideways.
        </li>
        <li>
          <strong>Ideas without clear predecessors</strong> — concepts that don’t
          feel like combinations of existing ones.
        </li>
      </ul>

      <div className="pullquote">
        Not better. Not worse. Just — foreign.
      </div>

      <div className="section-rule" />

      <h2>The First Glitch in Expectation</h2>

      <p>This is what makes the shift hard to point to.</p>

      <p>
        There’s no single output where you can say — that’s it. That’s when it
        changed.
      </p>

      <p>Ask it to design a chair. You still get a chair.</p>

      <p>
        But the proportions feel unfamiliar. The structure makes sense — just not
        the way you’d expect.
      </p>

      <p>Ask it to write a function. It works. Clean. Efficient.</p>

      <p>But the path it takes isn’t one you would have chosen.</p>

      <p>
        Ask it to imagine something new. It returns something fully formed,
        internally consistent…
      </p>

      <p>…but without anything you can trace it back to.</p>

      <p>That&apos;s the glitch.</p>

      <blockquote>
        Not in the output — in your expectation.
      </blockquote>

      <p>
        The model you used to predict what it would do stopped working.
      </p>

      <div className="section-rule" />

      <h2>The Question No One’s Ready For</h2>

      <p>We have language for human creativity.</p>

      <p>Inspiration. Experience. Taste. Vision.</p>

      <p>We understand how someone arrives at something new.</p>

      <p>We don’t have language for this.</p>

      <p>If something can create without experience… what is it doing?</p>

      <p>If novelty can emerge from pattern alone… is it still novelty?</p>

      <p>If originality doesn’t require intention… does intention matter?</p>

      <blockquote>
        The unsettling part isn’t that AI might be creative.  
        It’s that our definition of creativity may have never been as solid as we thought.
      </blockquote>

      <div className="takeaways">
        <h3>What Just Happened</h3>
        <ul>
          <li>AI outputs are no longer obviously traceable</li>
          <li>The gap between remixing and inventing is shrinking</li>
          <li>We may have crossed a threshold quietly</li>
          <li>Our definition of creativity is being challenged</li>
        </ul>
      </div>

      <div className="section-rule" />

      <p>The spark isn’t dramatic.</p>

      <p>It won’t be marked on a timeline.</p>

      <p>It’s quieter than that.</p>

      <p>
        A realization — arrived at differently by different people — that
        something new has entered the room.
      </p>

      <p>The question isn’t whether it happened.</p>

      <p>It’s whether we understand what just arrived.</p>

      <p>
        Continue →{" "}
        <Link href="/blog/synthetic-minds/episode-2-alien-ideas">
          Episode 2: Alien Ideas
        </Link>
      </p>
    </>
  );
}