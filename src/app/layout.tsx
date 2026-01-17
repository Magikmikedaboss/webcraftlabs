import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: SITE.name,
  description: SITE.tagline,
  metadataBase: new URL(SITE.url),
  icons: {
    icon: [
      { url: '/images/branding/png/phoenix-icon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/branding/png/phoenix-icon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/images/branding/png/phoenix-icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
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
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/branding/png/phoenix-icon-32.png" sizes="32x32" type="image/png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
