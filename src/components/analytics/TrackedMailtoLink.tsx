"use client";

import { trackEvent } from "@/lib/analytics";

/**
 * A mailto: link that fires a GA4 event on click before the mail client
 * opens. Shared by the footer and the Contact page so both intentional
 * "email us" clicks are tracked the same way.
 */
export default function TrackedMailtoLink({
  email,
  className,
  children,
}: {
  email: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={`mailto:${email}`}
      className={className}
      onClick={() => trackEvent("mailto_click", { contact_method: "email" })}
    >
      {children}
    </a>
  );
}
