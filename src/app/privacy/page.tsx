import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { getBaseUrl, SITE } from "@/lib/site";

const PRIVACY_DESCRIPTION =
  "What WebCraft Labz collects, where it goes, and what we don't do — written from what this site actually runs, not from a template.";

/**
 * Single source for the revision date. Rendered on the page and reused by
 * the metadata description-adjacent copy, so the two can't drift.
 */
export const PRIVACY_LAST_UPDATED = "2026-08-31";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: PRIVACY_DESCRIPTION,
  openGraph: {
    title: `Privacy Policy | ${SITE.name}`,
    description: PRIVACY_DESCRIPTION,
    type: "website",
    url: `${getBaseUrl()}/privacy`,
  },
  twitter: {
    card: "summary_large_image",
    title: `Privacy Policy | ${SITE.name}`,
    description: PRIVACY_DESCRIPTION,
  },
  alternates: {
    canonical: `${getBaseUrl()}/privacy`,
  },
};

function Section({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold tracking-tight text-[var(--text)] sm:text-2xl">
        {heading}
      </h2>
      <div className="mt-3 flex flex-col gap-3 text-[15px] leading-7 text-[var(--muted)]">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <SiteShell
      background="bg"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      title="Privacy Policy"
      intro="What this site collects, where it goes, and what it doesn't do."
    >
      {/* Same mx-auto max-w-7xl px-6 wrapper SiteShell uses for the title
          block, so the body copy lines up with the h1 above it. Mirrors
          /disclosure exactly. */}
      <div className="mx-auto max-w-7xl px-6 pb-16">
        <div className="max-w-3xl">
          <p className="mt-8 text-[15px] leading-7 text-[var(--muted)]">
            Last updated:{" "}
            <time dateTime={PRIVACY_LAST_UPDATED}>August 31, 2026</time>
          </p>

          <Section heading="The short version">
            <p>
              This is a small business website. It has no accounts, no logins, no shopping cart,
              and no advertising. The only information you actively send us comes from the contact
              form, and it arrives as an email. Beyond that, we use Google Analytics to understand
              which pages people read.
            </p>
            <p>
              The rest of this page explains that in more detail, and is written from what the
              site actually does rather than from a template.
            </p>
          </Section>

          <Section heading="What we collect">
            <p>
              <strong className="text-[var(--text)]">Information you send us.</strong> Our contact
              form asks for your name, your email address, and a description of your project. That
              is the whole form. We do not ask for a phone number, a mailing address, or payment
              details anywhere on this site.
            </p>
            <p>
              <strong className="text-[var(--text)]">Information that stays in your browser.</strong>{" "}
              The Build Calculator runs entirely on your device. The details you enter there —
              including your name and email — are not transmitted to us when you use it. They are
              saved in your browser&apos;s local storage so the contact form can pre-fill them if
              you choose to continue, and they only reach us if you then submit that form. We also
              store your light/dark theme preference the same way.
            </p>
            <p>
              <strong className="text-[var(--text)]">Usage information.</strong> Google Analytics
              records which pages are viewed, along with the general device and browser information
              it collects by default.
            </p>
            <p>
              <strong className="text-[var(--text)]">Technical information.</strong> When you submit
              the contact form, our server reads the IP address your request arrives from and uses
              it to limit how many submissions can come from one source in a short window. Our
              hosting provider also keeps standard server request logs, as any web host does.
            </p>
          </Section>

          <Section heading="The contact form">
            <p>
              A submission is validated, checked against a rate limit and a hidden anti-spam field,
              and then sent to us as an email. It is not written to a database — we do not run one.
              We use it to reply to you and to discuss the work you asked about.
            </p>
            <p>
              The IP address used for rate limiting is held in the server&apos;s memory for about a
              minute and is not written to a database or included in the email we receive. Our own
              application log of a submission deliberately records only whether the optional fields
              were filled in and when it happened — not your name, email, or message.
            </p>
          </Section>

          <Section heading="Analytics">
            <p>
              We use Google Analytics 4. It loads only on the live site, not in local development,
              and it collects usage information such as the pages you visit and the general
              device, browser, and approximate location information Google derives from your
              request — including your IP address, which Google receives as part of how the service
              works.
            </p>
            <p>
              Google Analytics sets its own cookies in your browser to tell repeat visits from new
              ones. We have not configured any additional identifiers, we do not send Google your
              name or email address, and we do not use Google Analytics for advertising, remarketing,
              or audience targeting.
            </p>
            <p>
              Alongside page views, we record a small number of specific events: that a contact form
              was submitted, that someone finished configuring a build in the Build Calculator (the
              configuration choices only — no name or email), and that an outbound email link was
              clicked.
            </p>
          </Section>

          <Section heading="Affiliate link tracking">
            <p>
              This site has the infrastructure for affiliate links, and no published article
              currently uses one. If and when affiliate links do appear, clicking one may record an
              analytics event containing a short vendor identifier, the destination website&apos;s
              hostname, and the path of the article you clicked from.
            </p>
            <p>
              That event deliberately does not include the full affiliate URL or its query string,
              so referral and tracking codes attached to the link are not sent into analytics. Any
              article containing affiliate links carries a disclosure near the top of the page — see
              our{" "}
              <Link
                href="/disclosure"
                className="font-semibold text-[var(--primary)] underline underline-offset-2 transition hover:opacity-80"
              >
                affiliate disclosure
              </Link>
              . Once you follow an outbound link, the destination site&apos;s own privacy policy
              applies.
            </p>
          </Section>

          <Section heading="Cookies and local storage">
            <p>
              This site does not set any cookies of its own. The cookies present on the live site
              are set by Google Analytics, as described above.
            </p>
            <p>
              We do use your browser&apos;s local storage for two things, both of which stay on your
              device: your theme preference, and the Build Calculator details described earlier.
              Those calculator values are cleared automatically once a contact form submission
              succeeds, and you can clear them yourself at any time through your browser&apos;s site
              data controls.
            </p>
            <p>
              We do not currently show a cookie consent banner. If you would rather not be included
              in analytics at all, the options in &ldquo;Your choices&rdquo; below apply.
            </p>
          </Section>

          <Section heading="Third-party services">
            <p>
              <strong className="text-[var(--text)]">Google Analytics</strong> — measures site usage,
              as described above. The analytics script is loaded from Google&apos;s servers, so
              Google receives the request that loads it.
            </p>
            <p>
              <strong className="text-[var(--text)]">Vercel</strong> — hosts and serves this site.
              Requests to the site pass through their infrastructure, and they keep standard server
              logs as part of operating it.
            </p>
            <p>
              <strong className="text-[var(--text)]">Gmail (Google)</strong> — delivers contact form
              submissions to our inbox. The contents of your submission travel through and are
              stored in that email account.
            </p>
            <p>
              We do not use advertising networks, remarketing pixels, social media tracking pixels,
              session-recording tools, chat widgets, or embedded third-party content on this site.
              The fonts this site uses are served from our own domain, not fetched from a font
              provider while you browse.
            </p>
          </Section>

          <Section heading="How we use information">
            <p>We use what we collect to:</p>
            <ul className="ml-5 list-disc space-y-1.5">
              <li>reply to you and discuss the project you contacted us about;</li>
              <li>operate the site and diagnose errors;</li>
              <li>understand which pages and guides people actually find useful;</li>
              <li>limit automated spam submissions to the contact form;</li>
              <li>
                measure engagement with outbound affiliate links, if and when any are published.
              </li>
            </ul>
            <p>
              We do not use your information to build advertising profiles, and we do not send
              marketing email to people who contact us — there is no mailing list on this site to
              subscribe to.
            </p>
          </Section>

          <Section heading="Sharing">
            <p>
              We do not sell personal information, and we do not share it with third parties for
              their own marketing.
            </p>
            <p>
              The service providers listed above process information on our behalf so the site can
              function — hosting it, delivering our email, and measuring usage. That is different
              from selling data, and their handling of it is governed by their own terms and privacy
              policies. We may also disclose information if we are legally required to, or where it
              is necessary to protect the site against abuse.
            </p>
          </Section>

          <Section heading="How long we keep information">
            <p>
              We do not operate an automated deletion schedule, and it would be misleading to quote
              a specific number of days. In practice: contact form submissions live in our email
              inbox, and we keep them only as long as reasonably necessary for the purpose they were
              collected — replying to you, and any follow-on work — unless a longer period is
              needed for legal, security, or operational reasons.
            </p>
            <p>
              Analytics data is retained according to the settings in our Google Analytics account,
              which Google controls. The IP address used for rate limiting is transient, as
              described above. Anything held in your browser&apos;s local storage stays there until
              it is cleared.
            </p>
          </Section>

          <Section heading="Your choices">
            <p>
              <strong className="text-[var(--text)]">About what you sent us.</strong> If you have
              submitted the contact form and want to know what we hold, or want it deleted, email us
              and we will handle it by hand. We do not have an automated export or deletion tool,
              and we are not going to pretend otherwise.
            </p>
            <p>
              <strong className="text-[var(--text)]">About analytics.</strong> You can block or
              delete cookies through your browser settings, use your browser&apos;s tracking
              protection, or install Google&apos;s official browser add-on to opt out of Google
              Analytics. Any of those will keep you out of our analytics; none of them will stop the
              site from working.
            </p>
            <p>
              <strong className="text-[var(--text)]">About browser storage.</strong> Clearing site
              data for this domain removes the theme preference and any saved Build Calculator
              details.
            </p>
            <p>
              Depending on where you live, you may have additional rights over your personal
              information. We will do our best to honour any reasonable request — just ask.
            </p>
          </Section>

          <Section heading="Children">
            <p>
              This site is aimed at businesses and the people who run them. It is not directed to
              children, and we do not knowingly collect information from children. If you believe a
              child has sent us information through the contact form, tell us and we will delete it.
            </p>
          </Section>

          <Section heading="Changes to this policy">
            <p>
              We may update this policy as the site changes. When we do, we will revise the
              &ldquo;last updated&rdquo; date at the top of this page. Because this policy describes
              what the site actually does, a meaningful change to the site is what would prompt a
              change here.
            </p>
          </Section>

          <Section heading="Contact">
            <p>
              Questions about any of this, or about information you have sent us?{" "}
              <Link
                href="/contact"
                className="font-semibold text-[var(--primary)] underline underline-offset-2 transition hover:opacity-80"
              >
                Get in touch
              </Link>
              .
            </p>
          </Section>
        </div>
      </div>
    </SiteShell>
  );
}
