---
description: How to set up the Ordered Quran development environment from scratch
---

# Project Setup

## Prerequisites

- Node.js 18+ and npm installed
- Git configured

## Steps

1. Initialize Next.js project with TypeScript and App Router:
   // turbo

```bash
npx -y create-next-app@latest ./ --typescript --app --eslint --src-dir --no-tailwind --import-alias "@/*" --use-pnpm
```

2. Install additional dependencies:
   // turbo

```bash
pnpm add next-themes
```

3. Create project directory structure:
   // turbo

```bash
mkdir -p src\data src\lib src\components src\styles public\fonts\arabic public\fonts\ui
```

4. Convert the revelation order markdown to JSON:

- Read `revelationorderofquran.md` from the project root
- Parse the table (lines 58–171) into a JSON array
- Save to `src/data/revelation-order.json` with this schema:

```json
[
  {
    "revelationOrder": 1,
    "surahNumber": 96,
    "name": "Alaq",
    "arabicName": "العلق",
    "totalVerses": 19,
    "revelationPlace": "Meccan"
  }
]
```

5. Download and self-host Arabic fonts:

- `UthmanicHafs` → `public/fonts/arabic/` (for Quran text)
- `Figtree` → `public/fonts/ui/` (for UI elements)
- Source: quran.com's public font CDN or Google Fonts

6. Create the TypeScript interfaces in `src/lib/types.ts`

7. Set up the API client in `src/lib/api.ts` targeting `https://api.alquran.cloud/v1/`

8. Start the dev server:
   // turbo

```bash
pnpm dev
```

9. Verify at `http://localhost:3000`

## Environment Variables

No environment variables required for MVP — the alquran.cloud API requires no auth.
