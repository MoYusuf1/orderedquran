import { SurahMeta } from "@/lib/types";
import styles from "./SurahCard.module.css";

interface SurahCardProps {
  surah: SurahMeta;
  arabicName?: string;
  englishTranslation?: string;
}

export default function SurahCard({
  surah,
  arabicName,
  englishTranslation,
}: SurahCardProps) {
  return (
    <a href={`/surah/${surah.revelationOrder}`} className={styles.card}>
      <div className={styles.header}>
        <div className={styles.numberBadge}>
          <span className={styles.number}>{surah.revelationOrder}</span>
        </div>
        <div className={styles.names}>
          <span className={styles.englishName}>{surah.name}</span>
          <span className={styles.translation}>
            {englishTranslation || surah.name}
          </span>
        </div>
        {arabicName && (
          <span className={styles.arabicName}>{arabicName}</span>
        )}
      </div>

      <div className={styles.footer}>
        <span className={styles.verseCount}>{surah.totalVerses} verses</span>
        <span
          className={`${styles.badge} ${
            surah.revelationPlace === "Meccan" ? styles.meccan : styles.medinan
          }`}
        >
          {surah.revelationPlace}
        </span>
      </div>
    </a>
  );
}
