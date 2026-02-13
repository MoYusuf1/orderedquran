---
description: How to fetch and cache Quran text data from the alquran.cloud API
---

# Fetching Quran Data

## API Reference

- **Base URL**: `https://api.alquran.cloud/v1`
- **Auth**: None required
- **Rate Limits**: None

## Key Endpoints

### Get a Surah (Arabic Uthmani text)

```
GET /surah/{surahNumber}
```

Returns Arabic text in Uthmani script by default.

### Get a Surah with Translation

```
GET /surah/{surahNumber}/{edition}
```

Common editions:

- `en.sahih` — Sahih International (English)
- `en.pickthall` — Pickthall (English)
- `en.yusufali` — Yusuf Ali (English)

### Get Both Arabic + Translation in One Call

```
GET /surah/{surahNumber}/editions/quran-uthmani,en.sahih
```

Returns both editions in a single response.

### List All Available Editions

```
GET /edition?language=en&type=translation
```

## Data Flow

1. **First visit**: When a user visits a surah page, the server fetches from `/surah/{surahNumber}/editions/quran-uthmani,en.sahih`
2. The page is server-rendered and cached via ISR (revalidate: 24 hours)
3. Subsequent visitors receive the cached page until the revalidation window expires
4. **No API calls happen at build time** — the build completes instantly

## Response Shape

```json
{
  "code": 200,
  "data": {
    "number": 96,
    "name": "سُورَةُ العَلَقِ",
    "englishName": "Al-Alaq",
    "englishNameTranslation": "The Clot",
    "revelationType": "Meccan",
    "numberOfAyahs": 19,
    "ayahs": [
      {
        "number": 6107,
        "text": "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ ٱقْرَأْ بِٱسْمِ رَبِّكَ ٱلَّذِى خَلَقَ",
        "numberInSurah": 1,
        "juz": 30,
        "page": 597
      }
    ]
  }
}
```

## API Client Location

`src/lib/api.ts` — contains typed functions:

- `fetchSurah(surahNumber: number)` → Arabic text
- `fetchSurahWithTranslation(surahNumber: number, edition: string)` → Translation
- `fetchSurahBilingual(surahNumber: number)` → Arabic + English

## Caching Strategy

- Data is fetched **on-demand at runtime** with ISR (Incremental Static Regeneration)
- `revalidate = 86400` (24 hours) — pages regenerate after this interval
- `fetch()` calls use `{ next: { revalidate: 86400 } }` for Next.js fetch cache
- If the API is down, retry logic in `fetchWithRetry` handles transient failures:
  ```typescript
  async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
    for (let i = 0; i < retries; i++) {
      const res = await fetch(url, { next: { revalidate: 86400 } });
      if (res.ok) return res;
      await new Promise((r) => setTimeout(r, 2000 * (i + 1)));
    }
    throw new Error(`Failed to fetch ${url} after ${retries} retries`);
  }
  ```

## Adding a New Translation

1. Find the edition identifier: `GET /edition?language={lang}&type=translation`
2. Add the edition to the `fetchSurahBilingual` function
3. Rebuild the site: `npm run build`
