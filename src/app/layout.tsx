import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { getBaseUrl, SITE } from "@/lib/site";
import { ThemeProvider } from "@/components/ThemeProvider";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Prevent FOIT (Flash of Invisible Text)
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ['ui-monospace', 'monospace'],
});

const baseUrl = getBaseUrl();
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  title: {
    default: SITE.name,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.tagline,
  ...(googleSiteVerification
    ? { verification: { google: googleSiteVerification } }
    : {}),
  keywords: [
    "web development",
    "website design",
    "marketing websites",
    "SaaS development",
    "Las Vegas web developer",
    "custom websites",
    "web applications",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  metadataBase: new URL(baseUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.tagline,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}#organization`,
        name: SITE.name,
        url: baseUrl,
        logo: `${baseUrl}/images/branding/180.png`,
        email: SITE.email,
        sameAs: [SITE.social.linkedin, SITE.social.twitter],
        address: {
          "@type": "PostalAddress",
          addressLocality: SITE.address.locality,
          addressRegion: SITE.address.region,
          addressCountry: SITE.address.country,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}#website`,
        url: baseUrl,
        name: SITE.name,
        description: SITE.tagline,
        potentialAction: {
          "@type": "SearchAction",
          target: `${baseUrl}/blog?search={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
        publisher: {
          "@id": `${baseUrl}#organization`,
        },
      },
    ],
  };
  const safeSiteJsonLd = JSON.stringify(siteJsonLd).replace(/</g, "\\u003c");

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('theme') || 'light';
                if (theme === 'dark') {
                  document.documentElement.setAttribute('data-theme', 'dark');
                  document.documentElement.classList.add('dark');
                  document.documentElement.style.colorScheme = 'dark';
                } else {
                  document.documentElement.setAttribute('data-theme', 'light');
                  document.documentElement.classList.remove('dark');
                  document.documentElement.style.colorScheme = 'light';
                }
              } catch(e) {}
            `,
          }}
        />
        {/* Favicon and manifest - Using red phoenix icon (180.png) for all sizes */}
        <link rel="icon" href="/images/branding/180.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/branding/180.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="alternate" type="application/rss+xml" title={`${SITE.name} Updates Feed`} href="/feed.xml" />
        <link rel="alternate" type="application/rss+xml" title={`${SITE.name} Blog Feed`} href="/blog/feed.xml" />
        <link rel="alternate" type="application/rss+xml" title={`${SITE.name} News Feed`} href="/news/feed.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeSiteJsonLd }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
