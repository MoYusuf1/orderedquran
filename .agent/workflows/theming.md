---
description: How to modify themes or add a new theme to the Ordered Quran website
---

# Theming Guide

## How Themes Work

```
html[data-theme="light"]  →  CSS variables  →  component styles
html[data-theme="dark"]   →  CSS variables  →  component styles
html[data-theme="sepia"]  →  CSS variables  →  component styles
```

- All theme colors are CSS custom properties defined in `src/app/globals.css`
- The `next-themes` package handles the `data-theme` attribute on `<html>`
- Theme choice is persisted in `localStorage` automatically
- Components never reference specific colors — only CSS variables

## Modifying an Existing Theme

1. Open `src/app/globals.css`
2. Find the theme block: `[data-theme='dark'] { ... }`
3. Change any CSS variable value
4. Save — hot reload shows changes instantly

### Key Variables to Customize

```css
--color-background         /* Main page background */
--color-background-card    /* Card surfaces */
--color-text-primary       /* Main text color */
--color-text-secondary     /* Muted text (translations, metadata) */
--color-accent             /* Primary teal — buttons, links, badges */
--color-accent-hover       /* Accent hover state */
--color-accent-faded       /* Accent tint background */
--color-border             /* Lines and dividers */
--shadow-card-hover        /* Card elevation on hover */
```

## Adding a New Theme

Example: adding a "midnight" theme

1. **Add CSS variables** in `src/app/globals.css`:

```css
[data-theme="midnight"] {
  --color-background: #0a0e27;
  --color-background-secondary: #111638;
  --color-background-card: #151b42;
  --color-background-hover: #1c2350;
  --color-text-primary: #c8cef0;
  --color-text-secondary: #7a82aa;
  --color-text-tertiary: #4d5580;
  --color-accent: #6366f1;
  --color-accent-hover: #818cf8;
  --color-accent-faded: #1e1b4b;
  --color-accent-faint: #312e81;
  /* ... define ALL theme variables */
  --color-border: #252d5a;
  --shadow-card: 0px 1px 3px rgba(0, 0, 0, 0.5);
  --shadow-card-hover: 0px 8px 24px rgba(0, 0, 0, 0.6);
}
```

2. **Register the theme** in `src/app/layout.tsx`:

```tsx
<ThemeProvider
  themes={["light", "dark", "sepia", "midnight"]}  // ← add here
  ...
>
```

3. **Update the Navbar** cycle in `src/components/Navbar.tsx`:

```tsx
const themes = ["light", "dark", "sepia", "midnight"]; // ← add here
```

4. **Add an icon** for the new theme in the Navbar's `themeIcon` logic

5. **Test** — cycle through all themes, check every page:
   - Arabic text readability (contrast ratio must pass WCAG AA)
   - Card borders visible
   - Accent color stands out against background
   - Shadows visible but not harsh

## Testing Theme Changes

Run the dev server and switch themes:
// turbo

```bash
pnpm dev
```

In DevTools console:

```javascript
document.documentElement.setAttribute("data-theme", "midnight");
```

### Contrast Checker

Arabic text must have **4.5:1 contrast ratio minimum** against its background. Check at:
https://webaim.org/resources/contrastchecker/
