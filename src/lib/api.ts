import { ApiResponse, SurahData } from "./types";

const BASE_URL = "https://api.alquran.cloud/v1";

async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, { next: { revalidate: false } });
      if (res.ok) return res;
    } catch {
      // Network error, retry
    }
    if (i < retries - 1) {
      await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
    }
  }
  throw new Error(`Failed to fetch ${url} after ${retries} retries`);
}

export async function fetchSurahArabic(
  surahNumber: number
): Promise<SurahData> {
  const res = await fetchWithRetry(`${BASE_URL}/surah/${surahNumber}`);
  const json: ApiResponse<SurahData> = await res.json();
  return json.data;
}

export async function fetchSurahTranslation(
  surahNumber: number,
  edition = "en.sahih"
): Promise<SurahData> {
  const res = await fetchWithRetry(
    `${BASE_URL}/surah/${surahNumber}/${edition}`
  );
  const json: ApiResponse<SurahData> = await res.json();
  return json.data;
}

export async function fetchSurahBilingual(
  surahNumber: number,
  edition = "en.sahih"
): Promise<{ arabic: SurahData; translation: SurahData }> {
  const [arabic, translation] = await Promise.all([
    fetchSurahArabic(surahNumber),
    fetchSurahTranslation(surahNumber, edition),
  ]);
  return { arabic, translation };
}
