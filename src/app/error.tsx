"use client";

import { useEffect } from "react";
import styles from "./page.module.css";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.main} style={{ justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column", minHeight: "60vh", padding: "2rem" }}>
      <h2 style={{ fontSize: "var(--font-size-jumbo)", color: "var(--color-text-primary)", marginBottom: "1rem" }}>
        Something went wrong!
      </h2>
      <p style={{ color: "var(--color-text-secondary)", marginBottom: "2rem", textAlign: "center", maxWidth: "400px" }}>
        We encountered an unexpected error. Do not worry, your progress is safe.
      </p>
      <button
        onClick={reset}
        style={{
          background: "var(--color-accent)",
          color: "white",
          border: "none",
          padding: "12px 24px",
          borderRadius: "var(--border-radius-default)",
          fontSize: "var(--font-size-normal)",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Try again
      </button>
    </div>
  );
}
