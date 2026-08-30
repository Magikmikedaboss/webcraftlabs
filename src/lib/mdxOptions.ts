import remarkGfm from "remark-gfm";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";

/**
 * Shared `<MDXRemote>` options for the site's trusted, first-party MDX routes
 * (Blog, News, Archive). All three render `.mdx` files that live in
 * `src/content/` — authored in this repository and reviewed through git. None
 * of them render public or user-submitted content.
 *
 * ── Why `blockJS: false` ────────────────────────────────────────────────────
 * next-mdx-remote v6 enables `blockJS` by default, which runs a remark plugin
 * that strips *all* JSX expression attributes — `<Component prop={value} />` —
 * before compilation. It fails silently: the MDX still compiles, the component
 * still mounts, and the prop simply never arrives.
 *
 * That breaks every component in `mdxComponents` that takes a non-string prop:
 * `<Chapter number={3} />` fell back to its default of 1 (so every chapter
 * rendered "01"), and `<Checklist items={[…]} />`, `<SplitCompare left={[…]}
 * right={[…]} />`, `<Takeaways items={[…]} />` and `<DiagnosticScore
 * anchors={[…]} />` all received empty arrays and rendered nothing at all.
 *
 * Disabling it is safe here precisely because the content is trusted
 * first-party repo MDX, and it is required because these components rely on
 * JSX expression props such as arrays and numbers.
 *
 * `blockDangerousJS` is deliberately NOT set: it defaults to `true`, which
 * keeps next-mdx-remote's guard against `eval`, `Function`, `process` and
 * other dangerous globals in place. Do not disable it.
 *
 * ── Why `remarkPlugins: [remarkGfm]` ────────────────────────────────────────
 * MDX does not support GitHub-Flavoured Markdown tables out of the box, so
 * pipe tables were rendering as literal `| a | b |` paragraph text. remark-gfm
 * restores tables (plus strikethrough, task lists and autolinks).
 *
 * Add future remark plugins to this array rather than per-route, so Blog, News
 * and Archive cannot drift apart.
 */
export const TRUSTED_MDX_OPTIONS: MDXRemoteProps["options"] = {
  blockJS: false,
  mdxOptions: {
    remarkPlugins: [remarkGfm],
  },
};

export default TRUSTED_MDX_OPTIONS;
