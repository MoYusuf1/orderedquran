import type { Metadata } from "next";
import { Figtree, Amiri } from "next/font/google";
import { ThemeProvider } from "next-themes";
import ClientLayout from "@/components/ClientLayout";
import "./globals.css";

import FontLoader from "@/components/FontLoader";

/* ── Fonts (self-hosted at build time by next/font) ── */
const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

/* ── Metadata + Open Graph ── */
const siteUrl = "https://orderedquran.vercel.app";

export const metadata: Metadata = {
  title: "Ordered Quran — Read the Quran in Revelation Order",
  description:
    "Read the Holy Quran arranged in the chronological order of revelation, with Arabic text and English translation side by side.",
  keywords: [
    "Quran",
    "revelation order",
    "chronological",
    "Arabic",
    "English translation",
    "Islamic",
  ],
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Ordered Quran — Read the Quran in Revelation Order",
    description:
      "Experience the Holy Quran in the chronological order of revelation with Arabic text and English translation.",
    url: siteUrl,
    siteName: "Ordered Quran",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ordered Quran",
    description:
      "Read the Holy Quran in revelation order with Arabic text and English translation.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${amiri.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Non-blocking preload for UthmanicHafs Arabic font (CDN) */}
        <FontLoader />
      </head>
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="light"
          themes={["light", "dark", "sepia", "amoled"]}
          enableSystem={false}
        >
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
