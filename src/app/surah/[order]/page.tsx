import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import revelationOrder from "@/data/revelation-order.json";
import { SurahMeta } from "@/lib/types";
import { fetchSurahBilingual } from "@/lib/api";
import styles from "./page.module.css";

const surahs = revelationOrder as SurahMeta[];

export function generateStaticParams() {
  return surahs.map((s) => ({
    order: String(s.revelationOrder),
  }));
}

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
    <>
      <Navbar />
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

        {/* Bismillah (skip for At-Tawbah, surah 9) */}
        {meta.surahNumber !== 9 && (
          <div className={styles.bismillah}>
            بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
          </div>
        )}

        {/* Verses */}
        <section className={styles.verses}>
          {arabic.ayahs.map((ayah, i) => {
            // For Al-Fatihah and surahs that include Bismillah in verse 1,
            // we still show it since the API includes it in the text
            const translationText =
              translation.ayahs[i]?.text || "";

            return (
              <article key={ayah.numberInSurah} className={styles.verse}>
                <div className={styles.verseNumber}>
                  <span>{ayah.numberInSurah}</span>
                </div>
                <div className={styles.verseContent}>
                  <p className={styles.arabicText}>{ayah.text}</p>
                  <p className={styles.translationText}>{translationText}</p>
                </div>
              </article>
            );
          })}
        </section>

        {/* Navigation */}
        <nav className={styles.navigation}>
          {prev ? (
            <a
              href={`/surah/${prev.revelationOrder}`}
              className={styles.navButton}
            >
              <span className={styles.navDirection}>← Previous</span>
              <span className={styles.navName}>{prev.name}</span>
            </a>
          ) : (
            <div />
          )}
          {next ? (
            <a
              href={`/surah/${next.revelationOrder}`}
              className={`${styles.navButton} ${styles.navNext}`}
            >
              <span className={styles.navDirection}>Next →</span>
              <span className={styles.navName}>{next.name}</span>
            </a>
          ) : (
            <div />
          )}
        </nav>
      </main>
    </>
  );
}
