---
description: How to add a new feature or page to the Ordered Quran site
---

# Adding a New Feature

## Decision Framework

Before building, classify the feature:

| Type                     | SSG?    | Client JS? | Example                             |
| ------------------------ | ------- | ---------- | ----------------------------------- |
| **Static content**       | Yes     | No         | New info page, about page           |
| **Interactive UI**       | Yes     | Yes        | Search, settings modal, font slider |
| **Data-dependent**       | Depends | Maybe      | New translation, audio player       |
| **External integration** | No      | Yes        | Analytics, donation widget          |

## Adding a New Static Page

1. Create `src/app/{route}/page.tsx`:

```typescript
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Page Title — Ordered Quran",
  description: "Page description for SEO",
};

export default function NewPage() {
  return (
    <>
      <Navbar />
      <main className="container">
        {/* Page content */}
      </main>
    </>
  );
}
```

2. Add a CSS Module: `src/app/{route}/page.module.css`
3. Link to it from the Navbar or relevant page

## Adding an Interactive Feature

1. Create the component: `src/components/FeatureName.tsx`
   - Add `"use client"` directive at the top
   - Import its CSS Module
   - Keep state management local unless shared across pages

2. Create styles: `src/components/FeatureName.module.css`
   - Use CSS variables only
   - Test with all 3 themes

3. Import and place the component in the appropriate page

## Common Features Roadmap

### Search

- Create `src/components/SearchModal.tsx` (`"use client"`)
- Build a lightweight client-side search index from `revelation-order.json`
- Trigger with keyboard shortcut (Ctrl+K / Cmd+K)
- Filter by surah name (English + Arabic), verse count, Meccan/Medinan

### Font Size Slider

- Create `src/components/FontSizeControl.tsx` (`"use client"`)
- Store preference in `localStorage`
- Apply via CSS variable: `document.documentElement.style.setProperty('--font-size-arabic', '...')`
- Range: 20px → 40px, default 28px

### Reading Progress

- Create `src/components/ReadingProgress.tsx` (`"use client"`)
- Use `IntersectionObserver` to track which verse is in viewport
- Store progress in `localStorage`: `{ surahNumber: lastVerseRead }`
- Show visual indicator on surah cards (home page)

### Bookmarks

- Store in `localStorage`: `[{ surahNumber, verseNumber, timestamp }]`
- Display as a list in a sidebar or dedicated page
- Add bookmark icon to each verse's action area

## Checklist Before Merging

- [ ] Component uses CSS variables (no hardcoded colors)
- [ ] Works in light, dark, and sepia themes
- [ ] Responsive on mobile (375px), tablet (768px), desktop (1280px)
- [ ] Arabic text respects RTL direction
- [ ] Accessible (keyboard navigable, aria-labels on interactive elements)
- [ ] No console errors or warnings
- [ ] Build still succeeds: `pnpm build`
