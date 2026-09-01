import Link from "next/link";
import { ARCHIVE_FOOTER_LINK } from "@/lib/site";

/**
 * Replaces the former Projects & Experiments section.
 *
 * Creative and speculative work is pointed at, not promoted: one restrained
 * block, no individual article cards. The Resource Center is for practical
 * guides, technical education, and tools; the Archive is where the creative
 * side lives. No content moved and no URL changed — those articles are
 * still published exactly where they were, and still appear once in All
 * Resources.
 */
export default function ArchivePointer() {
  return (
    <section className="rc-canvas mx-auto max-w-7xl px-6 pb-16">
      <div className="rc-panel-muted">
        <p className="rc-body-muted">
          Looking for experiments, speculative work, and creative projects?{" "}
          <Link href={ARCHIVE_FOOTER_LINK.href} className="rc-inline-link">
            Explore the Archive
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
