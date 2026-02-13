---
description: How to add a new Quran translation language to the website
---

# Adding a Translation

## Overview

The alquran.cloud API provides 100+ translations in 40+ languages. Adding a new one is straightforward.

## Steps

### 1. Find the Edition Identifier

Browse available editions:

```
GET https://api.alquran.cloud/v1/edition?language=en&type=translation
```

Common useful editions:
| Edition | Language | Translator |
|---|---|---|
| `en.sahih` | English | Sahih International (current default) |
| `en.pickthall` | English | Pickthall |
| `en.yusufali` | English | Yusuf Ali |
| `fr.hamidullah` | French | Hamidullah |
| `de.aburida` | German | Abu Rida |
| `tr.ates` | Turkish | Süleyman Ateş |
| `id.indonesian` | Indonesian | Indonesian Ministry |
| `ur.ahmedali` | Urdu | Ahmed Ali |
| `bn.bengali` | Bengali | Muhiuddin Khan |
| `ml.abdulhameed` | Malayalam | Abdul Hameed |

### 2. Test the Edition

Verify it returns data:

```
GET https://api.alquran.cloud/v1/surah/1/{edition-id}
```

### 3. Update the API Client

In `src/lib/api.ts`, the `fetchSurahBilingual` function accepts an `edition` parameter:

```typescript
// Already supports any edition:
const { arabic, translation } = await fetchSurahBilingual(96, "fr.hamidullah");
```

### 4. Add a Translation Selector (UI)

To let users pick translations at runtime:

1. Create `src/components/TranslationSelector.tsx`
2. Store the selected edition in `localStorage`
3. Pass the edition to the page's data fetching

> [!IMPORTANT]
> If you add runtime translation switching, the page can no longer be fully SSG.
> Consider using ISR (Incremental Static Regeneration) or client-side fetching for the translation layer.

### 5. For Build-Time Multi-Translation

To pre-render multiple translations as static pages:

1. Add the edition to `generateStaticParams`:

```typescript
export function generateStaticParams() {
  const editions = ["en.sahih", "fr.hamidullah"];
  return surahs.flatMap((s) =>
    editions.map((edition) => ({
      order: String(s.revelationOrder),
      edition,
    })),
  );
}
```

2. Create a new route: `src/app/surah/[order]/[edition]/page.tsx`

### 6. RTL Languages

For Arabic, Urdu, Farsi, or Hebrew translations:

- Add `dir="rtl"` to the translation text container
- Set `font-family` to an appropriate font for that script
- Test bidirectional text layout carefully

### 7. Rebuild

// turbo

```bash
pnpm build
```
