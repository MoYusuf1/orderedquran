# Data Handling & Text Processing

This document serves as the single source of truth for handling Quranic text and API data in the Ordered Quran project.

## 1. Text Sanitization (Critical)

The alquran.cloud API data (and text in general) often contains invisible characters that can break string matching and regex logic.

### 1.1 Byte Order Mark (BOM)

API responses may validly start with `\ufeff` (Zero Width No-Break Space).

- **Impact**: Regex anchors like `^` will fail to match. `text.startsWith("foo")` will return false.
- **Rule**: Always sanitize strings before processing.
  ```typescript
  const cleanText = text.replace(/^\ufeff/, "").trim();
  ```

### 1.2 Unicode Normalization

Arabic text has multiple ways to represent the same visual glyph (e.g., Alif with Hamza).

- **Rule**: Avoid strict equality checks on raw text.
- **Impact**: "Sukun" might be `\u0652` or `\u06E1`.

## 2. Bismillah Extraction Strategy

We dynamically extract the "Bismillah" from the first verse of surahs to display it separately or style it.

- **The Logic**: "Bismillah ir-Rahman ir-Rahim" is consistently the **first 4 words** of the Uthmani script provided by the API.
  > `بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ`
- **Why not Regex?**: Regex is brittle due to diacritic variations (Tashkeel) and Unicode normalization. Counting words is strictly robust for this data source.

### Algorithm

1. **Identify**: Check if `surahNumber !== 1` (Al-Fatihah) and `surahNumber !== 9` (At-Tawbah).
2. **Split**: `const parts = firstVerse.split(" ")`
3. **Validate**: If `parts.length >= 4`
4. **Extract**:
   - `bismillah = parts.slice(0, 4).join(" ")`
   - `verseContent = parts.slice(4).join(" ")`

## 3. Resilience & Error Handling

### 3.1 Build-Time Failures

We use `Promise.all` to parallelize data fetching during `next build`.

- **Risk**: Standard `Promise.all` fails fast—one error kills the whole build.
- **Strategy**: We implement a "soft fail" within the map loop:
  ```typescript
  // src/app/page.tsx
  const results = await Promise.all(
    items.map(async (item) => {
      try {
        return await fetchData(item);
      } catch (e) {
        console.error(e);
        return FALLBACK_DATA; // Don't throw!
      }
    }),
  );
  ```

### 3.2 Runtime API Failures

- **Client**: `fetchWithRetry` in `api.ts` retries 3 times with exponential backoff.
- **Server**: Errors bubble up to `error.tsx` (segment error) or `global-error.tsx` (root layout error) to avoid White Screen of Death.
