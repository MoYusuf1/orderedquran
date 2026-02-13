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

1. **Build time**: `generateStaticParams()` iterates over all 114 entries in `revelation-order.json`
2. For each surah, call `/surah/{surahNumber}/editions/quran-uthmani,en.sahih`
3. Parse the response and pass to the page component via `getStaticProps` / server component
4. Pages are pre-rendered as static HTML — zero API calls at runtime

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

- All data is fetched at **build time only** (SSG)
- If the API is down during build, the build fails — add retry logic:
  ```typescript
  async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
    for (let i = 0; i < retries; i++) {
      const res = await fetch(url);
      if (res.ok) return res;
      await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
    }
    throw new Error(`Failed to fetch ${url} after ${retries} retries`);
  }
  ```

## Adding a New Translation

1. Find the edition identifier: `GET /edition?language={lang}&type=translation`
2. Add the edition to the `fetchSurahBilingual` function
3. Rebuild the site: `npm run build`
