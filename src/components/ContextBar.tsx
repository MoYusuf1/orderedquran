"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./ContextBar.module.css";

const EDITIONS = [
  { id: "en.sahih", label: "Sahih International", lang: "English" },
  { id: "en.pickthall", label: "Pickthall", lang: "English" },
  { id: "en.yusufali", label: "Yusuf Ali", lang: "English" },
  { id: "en.asad", label: "Muhammad Asad", lang: "English" },
  { id: "fr.hamidullah", label: "Hamidullah", lang: "French" },
  { id: "de.aburida", label: "Abu Rida", lang: "German" },
  { id: "es.cortes", label: "Julio Cortes", lang: "Spanish" },
  { id: "tr.diyanet", label: "Diyanet İşleri", lang: "Turkish" },
  { id: "ur.jalandhry", label: "Jalandhry", lang: "Urdu" },
  { id: "id.indonesian", label: "Indonesian Ministry", lang: "Indonesian" },
];

interface ContextBarProps {
  surahNumber: number;
  totalVerses: number;
  edition: string;
  onEditionChange: (edition: string) => void;
  readingMode: "verse" | "reading";
  onReadingModeChange: (mode: "verse" | "reading") => void;
}

export default function ContextBar({
  edition,
  onEditionChange,
  readingMode,
  onReadingModeChange,
}: ContextBarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentEdition = EDITIONS.find((e) => e.id === edition) || EDITIONS[0];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen]);

  return (
    <div className={styles.bar}>
      <div className={styles.inner}>
        {/* Reading Mode Toggle */}
        <div className={styles.modeToggle}>
          <button
            className={`${styles.modeButton} ${readingMode === "verse" ? styles.modeActive : ""}`}
            onClick={() => onReadingModeChange("verse")}
            title="Verse by verse"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="15" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            <span>Verse</span>
          </button>
          <button
            className={`${styles.modeButton} ${readingMode === "reading" ? styles.modeActive : ""}`}
            onClick={() => onReadingModeChange("reading")}
            title="Reading mode"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            </svg>
            <span>Reading</span>
          </button>
        </div>

        {/* Translation Selector - only show in verse mode */}
        {readingMode === "verse" && (
          <div className={styles.translationSelector} ref={dropdownRef}>
            <button
              className={styles.translationButton}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span className={styles.translationLabel}>{currentEdition.label}</span>
              <svg
                className={`${styles.chevron} ${dropdownOpen ? styles.chevronOpen : ""}`}
                width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className={styles.dropdown}>
                {EDITIONS.map((ed) => (
                  <button
                    key={ed.id}
                    className={`${styles.dropdownItem} ${edition === ed.id ? styles.dropdownItemActive : ""}`}
                    onClick={() => {
                      onEditionChange(ed.id);
                      setDropdownOpen(false);
                    }}
                  >
                    <span className={styles.editionLabel}>{ed.label}</span>
                    <span className={styles.editionLang}>{ed.lang}</span>
                    {edition === ed.id && (
                      <svg className={styles.checkIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
