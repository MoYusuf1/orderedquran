---
description: Coding conventions and style guidelines for the Ordered Quran project
---

# Code Conventions

## File Naming

- Components: `PascalCase.tsx` + `PascalCase.module.css` (e.g., `SurahCard.tsx`)
- Utilities/lib: `kebab-case.ts` or `camelCase.ts` (e.g., `api.ts`, `types.ts`)
- Data files: `kebab-case.json` (e.g., `revelation-order.json`)
- Pages: `page.tsx` + `page.module.css` (Next.js convention)

## TypeScript

- **Strict mode**: Always enabled (`strict: true` in tsconfig)
- **Interfaces > Types**: Use `interface` for object shapes, `type` for unions/intersections
- **No `any`**: Use `unknown` if type is uncertain, narrow with type guards
- **Explicit return types on exports**: Every exported function should have an explicit return type
- **Use `@/*` imports**: Always use the path alias, never relative paths beyond one level

```typescript
// ✅ Good
import { SurahMeta } from "@/lib/types";
import styles from "./SurahCard.module.css";

// ❌ Bad
import { SurahMeta } from "../../lib/types";
```

## Components

- **Server components by default**: Only add `"use client"` when you need browser APIs, hooks, or event handlers
- **No prop drilling beyond 2 levels**: If data needs to go deeper, restructure or use context
- **Co-locate styles**: Every component's CSS Module lives next to its `.tsx` file
- **Semantic HTML**: Use `<article>`, `<section>`, `<nav>`, `<header>`, `<footer>` appropriately
- **Accessibility**: All interactive elements need `aria-label` or visible label text

## CSS

- **Variables only**: Never hardcode colors, spacing, or font sizes — always use `var(--token-name)`
- **No `!important`**: If specificity is an issue, restructure selectors
- **Mobile-first**: Base styles = mobile, then `@media (min-width: ...)` for larger screens
- **Transitions**: Use CSS variable transitions (`var(--transition-fast)`, etc.)
- **Class naming**: Use camelCase in CSS Modules (e.g., `.surahName`, `.arabicText`)

```css
/* ✅ Good */
.cardTitle {
  font-size: var(--font-size-large);
  color: var(--color-text-primary);
  transition: color var(--transition-fast);
}

/* ❌ Bad */
.card-title {
  font-size: 18px;
  color: #272727;
  transition: color 0.2s ease;
}
```

## Arabic Text

1. Always set `direction: rtl` and `text-align: right`
2. Always use `unicode-bidi: isolate` when mixing with LTR content
3. Use `font-family: var(--font-family-arabic)` — never a generic font
4. Set `line-height: 2.4` minimum for readability
5. **Never modify Quranic text programmatically** — always render exactly as received from the API
6. Add `lang="ar"` attribute to Arabic text containers

## Git Commit Messages

Use conventional commits:

```
feat: add search functionality
fix: correct Arabic text alignment on mobile
style: improve surah card hover animation
refactor: extract verse component from surah page
data: update revelation order source
docs: add deployment instructions
chore: update dependencies
```
