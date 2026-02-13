import Navbar from "@/components/Navbar";
import SurahCard from "@/components/SurahCard";
import revelationOrder from "@/data/revelation-order.json";
import { SurahMeta } from "@/lib/types";
import { fetchSurahArabic } from "@/lib/api";
import styles from "./page.module.css";

// ISR: render on first visit, cache for 24 hours
export const revalidate = 86400;

// Fetch Arabic names for all surahs at build time
async function getSurahNames(): Promise<
  Record<number, { arabicName: string; englishTranslation: string }>
> {
  const names: Record<
    number,
    { arabicName: string; englishTranslation: string }
  > = {};

  // Fetch sequentially to avoid overwhelming the API during static generation
  const surahs = revelationOrder as SurahMeta[];
  for (const s of surahs) {
    try {
      const data = await fetchSurahArabic(s.surahNumber);
      names[s.surahNumber] = {
        arabicName: data.name,
        englishTranslation: data.englishNameTranslation,
      };
    } catch {
      names[s.surahNumber] = {
        arabicName: "",
        englishTranslation: s.name,
      };
    }
  }

  return names;
}

export default async function HomePage() {
  const surahs = revelationOrder as SurahMeta[];
  const surahNames = await getSurahNames();

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <h1 className={styles.title}>
            The Noble Quran
            <span className={styles.subtitle}>in Revelation Order</span>
          </h1>
          <p className={styles.description}>
            Read the Holy Quran arranged in the chronological order of
            revelation — from the first verses revealed to Prophet Muhammad ﷺ
            to the last.
          </p>
        </section>

        {/* Surah Grid */}
        <section className={styles.grid}>
          {surahs.map((surah) => (
            <SurahCard
              key={surah.revelationOrder}
              surah={surah}
              arabicName={surahNames[surah.surahNumber]?.arabicName}
              englishTranslation={
                surahNames[surah.surahNumber]?.englishTranslation
              }
            />
          ))}
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          <p>
            Revelation order based on the traditional Islamic scholarly
            consensus.
          </p>
          <p>
            Quran text sourced from{" "}
            <a
              href="https://alquran.cloud"
              target="_blank"
              rel="noopener noreferrer"
            >
              alquran.cloud
            </a>
          </p>
        </footer>
      </main>
    </>
  );
}
