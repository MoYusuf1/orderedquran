// Revelation order data shape (from src/data/revelation-order.json)
export interface SurahMeta {
  revelationOrder: number;
  surahNumber: number;
  name: string;
  totalVerses: number;
  revelationPlace: "Meccan" | "Medinan";
}

// API response from alquran.cloud
export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  page: number;
}

export interface SurahData {
  number: number;
  name: string; // Arabic name
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
  ayahs: Ayah[];
  bismillahPre?: string;
}

export interface ApiResponse<T> {
  code: number;
  status: string;
  data: T;
}

// Combined data for a surah page
export interface SurahPageData {
  meta: SurahMeta;
  arabic: SurahData;
  translation: SurahData;
  prev: SurahMeta | null;
  next: SurahMeta | null;
}
