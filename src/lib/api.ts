import { SurahData } from "./types";

const BASE_URL = "https://api.alquran.cloud/v1";

/**
 * Fetch with retry and exponential backoff.
 * Uses Next.js fetch caching with 24-hour ISR revalidation.
 */
async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, { next: { revalidate: 86400 } });
      if (res.ok) return res;
    } catch {
      /* network error — will retry */
    }
    if (i < retries - 1) {
      await new Promise((r) => setTimeout(r, 2000 * (i + 1)));
    }
  }
  throw new Error(`Failed to fetch ${url} after ${retries} retries`);
}

export async function fetchSurahArabic(
  surahNumber: number
): Promise<SurahData> {
  const res = await fetchWithRetry(`${BASE_URL}/surah/${surahNumber}`);
  const json = await res.json();

  /* 
    Extract Bismillah from the first verse of all surahs except Al-Fatihah (1).
    We use a robust word-splitting strategy (first 4 words) instead of brittle Regex.
    See docs/data-handling.md for details.
  */
  if (surahNumber !== 1 && surahNumber !== 9 && json.data.ayahs.length > 0) {
    // Robust extraction: Bismillah is always the first 4 words.
    // "Bismi Allahi Ar-Rahmani Ar-Rahimi"
    const firstVerse = json.data.ayahs[0].text;
    const parts = firstVerse.split(" ");
    if (parts.length >= 4) {
        json.data.bismillahPre = parts.slice(0, 4).join(" ").trim();
        json.data.ayahs[0].text = parts.slice(4).join(" ").trim();
    }
  }

  return json.data as SurahData;
}

export async function fetchSurahTranslation(
  surahNumber: number,
  edition = "en.sahih"
): Promise<SurahData> {
  const res = await fetchWithRetry(
    `${BASE_URL}/surah/${surahNumber}/${edition}`
  );
  const json = await res.json();
  return json.data as SurahData;
}

export async function fetchSurahBilingual(
  surahNumber: number,
  edition = "en.sahih"
): Promise<{ arabic: SurahData; translation: SurahData }> {
  // Fetch sequentially to be gentle on the API during static generation
  const arabic = await fetchSurahArabic(surahNumber);
  const translation = await fetchSurahTranslation(surahNumber, edition);
  return { arabic, translation };
}
