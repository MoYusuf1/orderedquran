# Project Architecture

## Overview

**Ordered Quran** is a Next.js 14+ application using the App Router, TypeScript, and standard web platform features.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: CSS Modules + Global CSS Variables (Theming)
- **Data**: alquran.cloud API + Static JSON (Revelation Order)
- **Deployment**: Vercel (Static Export compatible, but using Node.js runtime for ISR)

## Core Systems

### 1. Data Layer (`src/lib/api.ts`)

- **Source**: Fetches from `api.alquran.cloud`
- **Caching**: Uses Next.js `fetch` cache with `revalidate: 86400` (24h ISR).
- **Resilience**: Implements `fetchWithRetry` for network stability.
- **Sanitization**: Handles BOM stripping and Bismillah extraction logic centrally.

### 2. Theming System

- **Engine**: `next-themes`
- **Storage**: `localStorage`
- **Themes**: Light, Dark, Sepia, AMOLED.
- **Implementation**: CSS Variables defined in `globals.css` (`:root`, `[data-theme="dark"]`, etc.).
- **Flash Prevention**: `suppressHydrationWarning` on `<html>`.

### 3. Fonts

- **English**: `Figtree` (Google Fonts) via `next/font/google`.
- **Arabic**:
  - `Amiri` (Google Fonts) via `next/font/google` (Fallback/Body).
  - `KFGQPC Uthmanic Script HAFS` (CDN) via non-blocking `<link>` preload (Heading/Specific).

### 4. Build Strategy (`src/app/page.tsx`)

- **Parallelization**: Fetches data for all 114 surahs in batches (size 20) using `Promise.all`.
- **Fault Tolerance**: Individual API failures are caught and return fallback data instead of crashing the build.

### 5. Safety Net

- **`error.tsx`**: React Error Boundary for route segments (e.g. valid routes that crash).
- **`global-error.tsx`**: Root barrier for layout-level crashes.
- **`not-found.tsx`**: Custom UI for 404s.

## Directory Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── globals.css      # Design tokens & global styles
│   ├── layout.tsx       # Root layout (Providers + Fonts)
│   ├── error.tsx        # Segment error boundary
│   └── surah/[order]/   # Dynamic surah reading routes
├── components/          # React components (Client & Server)
├── lib/                 # Utilities (API, Types)
└── data/                # Static data (revelation-order.json)
docs/
├── architecture.md      # This file
├── data-handling.md     # Text processing rules
└── styling.md          # CSS variables reference
```
