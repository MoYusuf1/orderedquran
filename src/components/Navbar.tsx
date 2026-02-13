"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { useSidebar } from "./SidebarProvider";
import styles from "./Navbar.module.css";

const THEMES = [
  { id: "light", label: "Light", icon: "☀️" },
  { id: "dark", label: "Dark", icon: "🌙" },
  { id: "sepia", label: "Sepia", icon: "📜" },
  { id: "amoled", label: "AMOLED", icon: "🖤" },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { toggle } = useSidebar();
  const [mounted, setMounted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen]);

  // Close dropdown on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropdownOpen(false);
    };
    if (dropdownOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [dropdownOpen]);

  const currentTheme = THEMES.find((t) => t.id === theme) || THEMES[0];

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <div className={styles.leftGroup}>
          <button
            onClick={toggle}
            className={styles.menuButton}
            aria-label="Toggle sidebar"
            title="Toggle sidebar"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <Link href="/" className={styles.logo}>
            <span className={styles.logoIcon}>☪</span>
            <span className={styles.logoText}>Ordered Quran</span>
          </Link>
        </div>

        <div className={styles.actions}>
          {/* Theme Dropdown */}
          <div className={styles.themeDropdown} ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={styles.themeButton}
              aria-label="Change theme"
              title="Change theme"
              aria-expanded={dropdownOpen}
            >
              {mounted ? currentTheme.icon : "◑"}
              <span className={styles.themeLabel}>
                {mounted ? currentTheme.label : "Theme"}
              </span>
              <svg
                className={`${styles.chevron} ${dropdownOpen ? styles.chevronOpen : ""}`}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className={styles.dropdownMenu}>
                {THEMES.map((t) => (
                  <button
                    key={t.id}
                    className={`${styles.dropdownItem} ${
                      theme === t.id ? styles.dropdownItemActive : ""
                    }`}
                    onClick={() => {
                      setTheme(t.id);
                      setDropdownOpen(false);
                    }}
                  >
                    <span className={styles.dropdownIcon}>{t.icon}</span>
                    <span>{t.label}</span>
                    {theme === t.id && (
                      <svg
                        className={styles.checkIcon}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
