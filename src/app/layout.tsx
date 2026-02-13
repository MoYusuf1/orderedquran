import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="light"
          themes={["light", "dark", "sepia"]}
          enableSystem={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
