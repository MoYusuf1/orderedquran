---
description: How to update or modify the revelation order data
---

# Updating Revelation Order Data

## Source of Truth

The revelation order of the Quran is defined in `revelationorderofquran.md` at the project root. This is a scholarly reference document and should NOT be edited casually.

## Data Pipeline

```
revelationorderofquran.md  →  (parse)  →  src/data/revelation-order.json  →  (consumed by)  →  pages
```

### Schema of `revelation-order.json`

```json
[
  {
    "revelationOrder": 1,
    "surahNumber": 96,
    "name": "Alaq",
    "englishNameTranslation": "The Clot",
    "arabicName": "العلق",
    "totalVerses": 19,
    "revelationPlace": "Meccan"
  }
]
```

### Fields

| Field                    | Source                | Notes                                               |
| ------------------------ | --------------------- | --------------------------------------------------- |
| `revelationOrder`        | Column 1 of .md table | 1–114, unique                                       |
| `surahNumber`            | Column 2              | Standard mushaf ordering                            |
| `name`                   | Column 3              | Transliterated surah name                           |
| `englishNameTranslation` | alquran.cloud API     | Fetched from `data.englishNameTranslation`          |
| `arabicName`             | alquran.cloud API     | Fetched from `data.name`                            |
| `totalVerses`            | Column 4              | Verse count                                         |
| `revelationPlace`        | Column 5              | "Meccan" or "Medinan" (normalize from Macca/Madina) |

## When to Update

1. **Scholarly correction**: If a more accurate revelation order source is found
   - Update `revelationorderofquran.md` first
   - Then regenerate `revelation-order.json`
   - Cite the source in the markdown file

2. **Adding new fields**: If we need additional metadata per surah
   - Add the field to the TypeScript interface in `src/lib/types.ts`
   - Add the field to each entry in `revelation-order.json`
   - Update any components that should display the new data

## Regenerating the JSON

After editing `revelationorderofquran.md`:

1. Parse the markdown table (lines 58–171)
2. Normalize "Macca" → "Meccan", "Madina" → "Medinan"
3. Validate: 114 entries, all `revelationOrder` values 1–114, all unique
4. Save to `src/data/revelation-order.json`
5. Rebuild:
   // turbo

```bash
pnpm build
```

## Important Notes

- The revelation order has minor scholarly disagreements — add a disclaimer on the website
- Never reorder entries in the JSON without updating the markdown source
- The `surahNumber` field is what maps to the alquran.cloud API endpoints
