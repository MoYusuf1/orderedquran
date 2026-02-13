"use client";

import { useState, useEffect } from "react";
import { Ayah } from "@/lib/types";
import ContextBar from "./ContextBar";
import styles from "./SurahReader.module.css";

interface SurahReaderProps {
  surahNumber: number;
  totalVerses: number;
  arabicAyahs: Ayah[];
  defaultTranslationAyahs: Ayah[];
  defaultEdition: string;
  bismillahPre?: string;
}

export default function SurahReader({
  surahNumber,
  totalVerses,
  arabicAyahs,
  defaultTranslationAyahs,
  defaultEdition,
  bismillahPre,
}: SurahReaderProps) {
  const [edition, setEdition] = useState(defaultEdition);
  const [translationAyahs, setTranslationAyahs] = useState(defaultTranslationAyahs);
  const [readingMode, setReadingMode] = useState<"verse" | "reading">("verse");
  const [loading, setLoading] = useState(false);

  // Load saved preferences
  useEffect(() => {
    const savedEdition = localStorage.getItem("quran-edition");
    const savedMode = localStorage.getItem("reading-mode") as "verse" | "reading" | null;
    if (savedEdition && savedEdition !== defaultEdition) {
      setEdition(savedEdition);
      // Fetch the saved edition's translation
      fetchTranslation(savedEdition);
    }
    if (savedMode) setReadingMode(savedMode);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save preferences
  useEffect(() => {
    localStorage.setItem("quran-edition", edition);
  }, [edition]);

  useEffect(() => {
    localStorage.setItem("reading-mode", readingMode);
  }, [readingMode]);

  const fetchTranslation = async (editionId: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.alquran.cloud/v1/surah/${surahNumber}/${editionId}`
      );
      const data = await res.json();
      if (data.code === 200) {
        setTranslationAyahs(data.data.ayahs);
      }
    } catch (err) {
      console.error("Failed to fetch translation:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditionChange = (newEdition: string) => {
    setEdition(newEdition);
    fetchTranslation(newEdition);
  };

  return (
    <>
      <ContextBar
        surahNumber={surahNumber}
        totalVerses={totalVerses}
        edition={edition}
        onEditionChange={handleEditionChange}
        readingMode={readingMode}
        onReadingModeChange={setReadingMode}
      />

      {/* Bismillah (extracted from API text) */}
      {bismillahPre && (
        <div className={styles.bismillah}>
          {bismillahPre}
        </div>
      )}

      {/* Loading indicator */}
      {loading && (
        <div className={styles.loadingBar}>
          <div className={styles.loadingBarInner} />
        </div>
      )}

      {/* Verses */}
      {readingMode === "verse" ? (
        <section className={styles.verses}>
          {arabicAyahs.map((ayah, i) => (
            <article key={ayah.numberInSurah} className={styles.verse}>
              <div className={styles.verseNumber}>
                <span>{ayah.numberInSurah}</span>
              </div>
              <div className={styles.verseContent}>
                <p className={styles.arabicText}>{ayah.text}</p>
                <p className={styles.translationText}>
                  {translationAyahs[i]?.text || ""}
                </p>
              </div>
            </article>
          ))}
        </section>
      ) : (
        /* Reading mode: clean Arabic-only */
        <section className={styles.readingMode}>
          <div className={styles.readingText}>
            {arabicAyahs.map((ayah) => (
              <span key={ayah.numberInSurah}>
                {ayah.text}{" "}
                <span className={styles.readingVerseNum}>
                  ﴿{ayah.numberInSurah}﴾
                </span>{" "}
              </span>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
