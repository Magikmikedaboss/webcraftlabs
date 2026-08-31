import Link from "next/link";

/**
 * The single source of affiliate disclosure copy on the site.
 *
 * Authors never write this text — EditorialTemplateV2 renders it
 * automatically whenever an article sets `affiliate: true` in its
 * frontmatter, so the wording is identical on every article and cannot be
 * omitted, paraphrased, or buried at the bottom of a page.
 *
 * Deliberately styled as a quiet editorial note (hairline border, muted
 * body text, no fill, no button) rather than a callout or banner: it has
 * to be conspicuous enough to actually read before the links it covers,
 * without reading as promotional furniture.
 */
export default function AffiliateDisclosure({ className = "" }: { className?: string }) {
  return (
    <aside
      aria-label="Affiliate disclosure"
      className={`mt-7 max-w-3xl rounded-xl border border-slate-300 px-4 py-3.5 sm:mt-9 sm:px-5 ${className}`}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
        Affiliate disclosure
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        This article may contain affiliate links. If you sign up or buy through one, WebCraft Labz may
        earn a commission at no additional cost to you. Not every link here is an affiliate link,
        and affiliate status never determines what we recommend — tools are chosen for usefulness
        and fit.{" "}
        <Link
          href="/disclosure"
          className="font-semibold text-slate-700 underline underline-offset-2 transition hover:text-indigo-700"
        >
          How this works
        </Link>
        .
      </p>
    </aside>
  );
}
