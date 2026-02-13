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
