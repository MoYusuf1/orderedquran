"use client";

import { useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import revelationOrder from "@/data/revelation-order.json";
import { SurahMeta } from "@/lib/types";
import { useSidebar } from "./SidebarProvider";
import styles from "./Sidebar.module.css";

const surahs = revelationOrder as SurahMeta[];

export default function Sidebar() {
  const { isOpen, close } = useSidebar();
  const pathname = usePathname();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return surahs;
    const q = search.toLowerCase();
    return surahs.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        String(s.revelationOrder).includes(q) ||
        String(s.surahNumber).includes(q)
    );
  }, [search]);

  // Extract current revelation order from URL
  const currentOrder = pathname.startsWith("/surah/")
    ? parseInt(pathname.split("/surah/")[1], 10)
    : null;

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className={styles.backdrop}
          onClick={close}
          aria-hidden="true"
        />
      )}

      <aside
        className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}
        aria-label="Surah navigation"
      >
        {/* Search */}
        <div className={styles.searchWrapper}>
          <svg
            className={styles.searchIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search surah..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search surahs"
          />
          {search && (
            <button
              className={styles.clearButton}
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {/* Surah List */}
        <nav className={styles.list} role="navigation">
          {filtered.map((surah) => {
            const isActive = currentOrder === surah.revelationOrder;
            return (
              <Link
                key={surah.revelationOrder}
                href={`/surah/${surah.revelationOrder}`}
                className={`${styles.item} ${isActive ? styles.active : ""}`}
                onClick={() => {
                  // Close sidebar on mobile after navigating
                  if (window.innerWidth < 1024) close();
                }}
              >
                <div className={styles.itemNumber}>
                  <span>{surah.revelationOrder}</span>
                </div>
                <div className={styles.itemInfo}>
                  <span className={styles.itemName}>{surah.name}</span>
                  <span className={styles.itemMeta}>
                    {surah.totalVerses} verses • {surah.revelationPlace}
                  </span>
                </div>
                <span className={styles.itemSurahNum}>
                  {surah.surahNumber}
                </span>
              </Link>
            );
          })}

          {filtered.length === 0 && (
            <p className={styles.empty}>No surahs found</p>
          )}
        </nav>
      </aside>
    </>
  );
}
