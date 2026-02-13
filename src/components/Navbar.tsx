"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const cycleTheme = () => {
    const themes = ["light", "dark", "sepia"];
    const current = themes.indexOf(theme || "light");
    setTheme(themes[(current + 1) % themes.length]);
  };

  const themeIcon = !mounted
    ? "◑"
    : theme === "dark"
    ? "☀️"
    : theme === "sepia"
    ? "📜"
    : "🌙";

  const themeLabel = !mounted
    ? "Toggle theme"
    : theme === "dark"
    ? "Switch to sepia"
    : theme === "sepia"
    ? "Switch to light"
    : "Switch to dark";

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <a href="/" className={styles.logo}>
          <span className={styles.logoIcon}>☪</span>
          <span className={styles.logoText}>Ordered Quran</span>
        </a>

        <div className={styles.actions}>
          <button
            onClick={cycleTheme}
            className={styles.themeButton}
            aria-label={themeLabel}
            title={themeLabel}
          >
            {themeIcon}
          </button>
        </div>
      </div>
    </nav>
  );
}
