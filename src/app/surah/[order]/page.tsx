import { notFound } from "next/navigation";
import Link from "next/link";
import revelationOrder from "@/data/revelation-order.json";
import { SurahMeta } from "@/lib/types";
import { fetchSurahBilingual } from "@/lib/api";
import SurahReader from "@/components/SurahReader";
import styles from "./page.module.css";

const surahs = revelationOrder as SurahMeta[];

// ISR: render on first visit, cache for 24 hours
export const revalidate = 86400;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ order: string }>;
}) {
  const { order } = await params;
  const orderNum = parseInt(order, 10);
  const meta = surahs.find((s) => s.revelationOrder === orderNum);
  if (!meta) return { title: "Not Found" };

  return {
    title: `${meta.name} — Ordered Quran`,
    description: `Read Surah ${meta.name} (${meta.totalVerses} verses, ${meta.revelationPlace}) — revelation order #${meta.revelationOrder}`,
  };
}

export default async function SurahPage({
  params,
}: {
  params: Promise<{ order: string }>;
}) {
  const { order } = await params;
  const orderNum = parseInt(order, 10);
  const meta = surahs.find((s) => s.revelationOrder === orderNum);

  if (!meta) notFound();

  const { arabic, translation } = await fetchSurahBilingual(meta.surahNumber);

  const prev = surahs.find((s) => s.revelationOrder === orderNum - 1) || null;
  const next = surahs.find((s) => s.revelationOrder === orderNum + 1) || null;

  return (
    <main className={styles.main}>
      {/* Surah Header */}
      <header className={styles.surahHeader}>
        <div className={styles.headerContent}>
          <span className={styles.orderBadge}>#{meta.revelationOrder}</span>
          <h1 className={styles.surahName}>{arabic.englishName}</h1>
          <p className={styles.arabicTitle}>{arabic.name}</p>
          <p className={styles.surahMeta}>
            {arabic.englishNameTranslation} •{" "}
            <span
              className={
                meta.revelationPlace === "Meccan"
                  ? styles.meccan
                  : styles.medinan
              }
            >
              {meta.revelationPlace}
            </span>{" "}
            • {meta.totalVerses} verses
          </p>
        </div>
      </header>

      {/* Client-side reader with context bar */}
      <SurahReader
        surahNumber={meta.surahNumber}
        totalVerses={meta.totalVerses}
        arabicAyahs={arabic.ayahs}
        defaultTranslationAyahs={translation.ayahs}
        defaultEdition="en.sahih"
        bismillahPre={arabic.bismillahPre}
      />

      {/* Navigation */}
      <nav className={styles.navigation}>
        {prev ? (
          <Link
            href={`/surah/${prev.revelationOrder}`}
            className={styles.navButton}
          >
            <span className={styles.navDirection}>← Previous</span>
            <span className={styles.navName}>{prev.name}</span>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/surah/${next.revelationOrder}`}
            className={`${styles.navButton} ${styles.navNext}`}
          >
            <span className={styles.navDirection}>Next →</span>
            <span className={styles.navName}>{next.name}</span>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </main>
  );
}
