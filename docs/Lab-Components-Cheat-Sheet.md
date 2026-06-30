# WebCraft Labz Lab Components Cheat Sheet

## LabHero

Opening hero for the article.

```mdx
<LabHero
  label="Research Notebook"
  title="The Best Web Frameworks"
  edition="2026 Edition"
  subtitle="A field guide to choosing the right framework."
/>
```

## LabContents

Table of contents card.

```mdx
<LabContents
  items={[
    "Quick Picks",
    "Framework Comparison",
    "Experiment Results",
    "Final Verdict",
  ]}
/>
```

## QuickPicks

Top recommendations near the beginning.

```mdx
<QuickPicks
  picks={[
    {
      title: "Best Overall",
      framework: "Next.js",
      reason: "Best for SaaS, AI apps, and modern business websites."
    },
    {
      title: "Best Content Sites",
      framework: "Astro",
      reason: "Fast, clean, and excellent for blogs."
    }
  ]}
/>
```

## LabSection

Main chapter wrapper.

```mdx
<LabSection
  number="01"
  eyebrow="Research Objective"
  title="Why this matters"
>
  Write your section content here.
</LabSection>
```

## LabNote

Sticky note for reminders, objectives, or side thoughts.

```mdx
<LabNote title="Notebook Entry">
  Popularity changes. Good architecture lasts longer.
</LabNote>
```

## LabObservation

Highlighted research insight.

```mdx
<LabObservation title="Observation">
  The best framework is the one that fits the project, not the trend cycle.
</LabObservation>
```

## FrameworkScorecard

Detailed review card for one framework, tool, or product.

```mdx
<FrameworkScorecard
  name="Next.js"
  badge="Recommended"
  description="A full-stack React framework for modern web apps."
  bestFor={["SaaS", "AI Apps", "Marketing Sites"]}
  scores={[
    { label: "Performance", value: 9 },
    { label: "SEO", value: 10 },
    { label: "Ecosystem", value: 10 }
  ]}
  strengths={[
    "Large ecosystem",
    "Excellent SEO",
    "Great deployment options"
  ]}
  cons={[
    "More complex than basic React"
  ]}
/>
```

## ScoreBar

Small static rating bar from 0 to 10.

```mdx
<ScoreBar value={8} />
```

## FrameworkTable

Comparison table.

```mdx
<FrameworkTable
  rows={[
    {
      name: "Next.js",
      performance: 9,
      seo: 10,
      learning: 7,
      best: "SaaS"
    },
    {
      name: "Astro",
      performance: 10,
      seo: 10,
      learning: 9,
      best: "Blogs"
    }
  ]}
/>
```

## ExperimentResult

Lab-style result card with bars from 0 to 100.

```mdx
<ExperimentResult
  title="Performance Test"
  subtitle="Average Lighthouse score"
  results={[
    { label: "Astro", score: 99 },
    { label: "Next.js", score: 97 },
    { label: "SvelteKit", score: 95 }
  ]}
/>
```

## LabStackDiagram

Visual stack diagram.

```mdx
<LabStackDiagram />
```

## DecisionFlow

Simple decision guide.

```mdx
<DecisionFlow />
```

## LabStamp

Rubber-stamp style label.

```mdx
<LabStamp>
  Recommended
</LabStamp>
```

## FrameworkAccordion

Expandable notes.

```mdx
<FrameworkAccordion title="Next.js">
  Extra notes, caveats, and use cases.
</FrameworkAccordion>
```

## FAQ

FAQ section using questions and answers.

```mdx
<FAQ
  items={[
    {
      question: "Is React still worth learning?",
      answer: "Yes. React remains the foundation for many modern frameworks."
    },
    {
      question: "Which framework is fastest?",
      answer: "Astro is usually excellent for content-heavy websites."
    }
  ]}
/>
```

## NextSteps

Checklist before the conclusion or CTA.

```mdx
<NextSteps
  steps={[
    "Define the project goal",
    "Choose the framework",
    "Build a prototype",
    "Measure performance",
    "Ship"
  ]}
/>
```

## LabVerdict

Final conclusion block.

```mdx
<LabVerdict title="The Verdict">
  There is no perfect framework. There is only the framework that best fits the project in front of you.
</LabVerdict>
```

## LabCard

Generic card container for grouped content or callouts.

```mdx
<LabCard>
  Any content here — text, lists, or nested components.
</LabCard>
```

## HandSketch

Monospace diagram frame for ASCII diagrams or annotated sketches.

```mdx
<HandSketch title="System Overview">
  Client → Gateway → API → DB
               ↓
            Cache
</HandSketch>
```

## ClassifiedHeader

Classified-document header block. Used in sci-fi and speculative fiction posts.

```mdx
<ClassifiedHeader
  lab="WEBCRAFT LABZ"
  archive="ARCHIVE FILE"
  classification="SPECULATIVE FICTION"
  accessLevel="OPEN"
/
>
```

## RecoveredLog

Dark terminal-style recovered log panel. Supports optional `title` and `timestamp`.

```mdx
<RecoveredLog title="Recovered System Log" timestamp="2247-11-03 01:12">
  > Boot sequence completed.
  > Memory banks: nominal.
</RecoveredLog>
```

## SystemOutput

Compact green-on-dark terminal output block. Supports optional `title`.

```mdx
<SystemOutput title="stdout">
  > Process started.
  > Status: OK
</SystemOutput>
```

## HandwrittenNote

Warm amber-tinted aside styled to evoke a handwritten margin note. Use for short editorial asides, personal observations, or closing reflections.

Props:
- `children: ReactNode` — note body content.
- `author?: string` — optional author label shown above the note.
- `institution?: string` — optional institution label.
- `date?: string` — optional date string.
- `location?: string` — optional location string.
- `rotation?: number` — optional small rotation for visual variation (default: 1).

Example usage:
This wasn't the first signal.

It won't be the last.

Stop asking who sent it. Start asking who sent **ours**.
</HandwrittenNote>
```

---

## Basic Article Shape

```mdx
<LabHero
  label="Research Note"
  date="Month YYYY"
  title="Post Title"
  edition="Edition Name"
  subtitle="Short subtitle."
/>

<LabContents items={[]} />

<QuickPicks picks={[]} />

<LabSection number="01" eyebrow="Eyebrow" title="Section Title">
  <LabNote title="Note Title">Note text.</LabNote>
</LabSection>

<LabSection number="02" eyebrow="Eyebrow" title="Section Title">
  <LabStackDiagram />
  <LabObservation title="Observation">Observation text.</LabObservation>
</LabSection>

<LabSection number="03" eyebrow="Eyebrow" title="Section Title">
  <FrameworkScorecard
    name="Tool Name"
    scores={[]}
  />
</LabSection>

<LabSection number="04" eyebrow="Eyebrow" title="Section Title">
  <FrameworkTable rows={[]} />
</LabSection>

<LabSection number="05" eyebrow="Eyebrow" title="Section Title">
  <ExperimentResult
    title="Experiment Title"
    results={[]}
  />
</LabSection>

<LabSection number="06" eyebrow="Eyebrow" title="Section Title">
  <DecisionFlow />
</LabSection>

<FAQ items={[]} />

<NextSteps steps={[]} />

<LabVerdict title="The Verdict">
  Conclusion text.
</LabVerdict>
```
