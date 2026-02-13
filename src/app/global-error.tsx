"use client";

import { Figtree, Amiri } from "next/font/google";
import "./globals.css";

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

export default function GlobalError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className={`${figtree.variable} ${amiri.variable}`}>
      <body>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "100vh",
            backgroundColor: "var(--color-background)",
            color: "var(--color-text-primary)",
            fontFamily: "var(--font-family-ui)",
          }}
        >
          <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
            Application Error
          </h2>
          <p style={{ marginBottom: "2rem", color: "var(--color-text-secondary)" }}>
            A critical error occurred in the root layout.
          </p>
          <button
            onClick={() => reset()}
            style={{
              background: "#2ca4ab",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "0.5rem",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Refresh
          </button>
        </div>
      </body>
    </html>
  );
}
