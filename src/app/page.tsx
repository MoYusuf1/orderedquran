import Navbar from "@/components/Navbar";
import SurahCard from "@/components/SurahCard";
import revelationOrder from "@/data/revelation-order.json";
import { SurahMeta } from "@/lib/types";
import { fetchSurahArabic } from "@/lib/api";
import styles from "./page.module.css";

// Fetch Arabic names for all surahs at build time
async function getSurahNames(): Promise<
  Record<number, { arabicName: string; englishTranslation: string }>
> {
  const names: Record<
    number,
    { arabicName: string; englishTranslation: string }
  > = {};

  // Fetch in batches of 10 to avoid overwhelming the API
  const surahs = revelationOrder as SurahMeta[];
  for (let i = 0; i < surahs.length; i += 10) {
    const batch = surahs.slice(i, i + 10);
    const results = await Promise.all(
      batch.map(async (s) => {
        try {
          const data = await fetchSurahArabic(s.surahNumber);
          return {
            surahNumber: s.surahNumber,
            arabicName: data.name,
            englishTranslation: data.englishNameTranslation,
          };
        } catch {
          return {
            surahNumber: s.surahNumber,
            arabicName: "",
            englishTranslation: s.name,
          };
        }
      })
    );
    results.forEach((r) => {
      names[r.surahNumber] = {
        arabicName: r.arabicName,
        englishTranslation: r.englishTranslation,
      };
    });
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
