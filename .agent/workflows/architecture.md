---
description: Project architecture and codebase map for the Ordered Quran website
---

# Architecture Overview

## Tech Stack

- **Framework**: Next.js 15 (App Router) with TypeScript
- **Styling**: CSS Modules + CSS Custom Properties (no SCSS/Tailwind)
- **Theming**: `next-themes` with `data-theme` attribute
- **Data**: alquran.cloud REST API (fetched on-demand with ISR caching)
- **Package Manager**: pnpm
- **Deployment**: Vercel

## Directory Structure

```
orderedquran/
├── .agent/workflows/          # ← You are here. All dev workflows
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── layout.tsx         # Root layout (ThemeProvider, fonts, metadata)
│   │   ├── globals.css        # Design tokens + theme definitions + reset
│   │   ├── page.tsx           # Home page (surah grid)
│   │   ├── page.module.css    # Home page styles
│   │   └── surah/
│   │       └── [order]/       # Dynamic surah reading page
│   │           ├── page.tsx   # Surah page (Arabic + English verses)
│   │           └── page.module.css
│   ├── components/            # Reusable UI components
│   │   ├── Navbar.tsx         # Sticky nav with theme toggle
│   │   ├── Navbar.module.css
│   │   ├── SurahCard.tsx      # Card for surah grid
│   │   └── SurahCard.module.css
│   ├── data/
│   │   └── revelation-order.json  # Source of truth: 114 surahs in revelation order
│   └── lib/
│       ├── api.ts             # alquran.cloud API client (fetchWithRetry)
│       └── types.ts           # TypeScript interfaces
├── public/
│   └── fonts/                 # Self-hosted fonts (Arabic, UI)
├── package.json               # Dependencies (next, react, next-themes)
├── tsconfig.json              # TypeScript config with @/* path alias
├── next.config.ts             # Next.js config
└── revelationorderofquran.md  # Original scholarly source data
```

## Data Flow

```
1. Build time:
   revelation-order.json → defines all surah metadata
   No API calls — build completes instantly

2. First visit to a surah page:
   api.ts → alquran.cloud/v1/surah/{number} → Arabic + English text
   Page is server-rendered and cached (ISR, revalidate: 24h)

3. Subsequent visits:
   Served from cache until revalidation window expires
```

## Key Patterns

### Component Pattern

- Each component = `ComponentName.tsx` + `ComponentName.module.css`
- All colors via CSS variables (theme-aware automatically)
- Server components by default; `"use client"` only when needed (e.g. Navbar for theme toggle)

### Routing Pattern

- `/` → Home page (server component, fetches all surah names at build)
- `/surah/[order]` → Surah reader (server component, ISR, `order` = revelation order 1–114)
- Navigation: prev/next uses revelation order, NOT surah number

### Styling Pattern

- `globals.css` defines ALL design tokens as CSS variables
- Individual components use CSS Modules that reference those variables
- Themes switch by changing `data-theme` attribute on `<html>`
- No inline styles, no `!important`, no utility classes

### Data ID Mapping

- `revelationOrder` (1–114): Our internal ordering, used in URLs
- `surahNumber` (1–114): Standard mushaf order, used for API calls
- Example: Revelation #1 → Surah 96 (Al-Alaq), Revelation #87 → Surah 2 (Al-Baqarah)
