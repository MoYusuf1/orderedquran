---
description: How to add a new UI component following the project's design system
---

# Adding a New Component

## Design System Rules

All components MUST use the CSS variables from the quran.com design system defined in `src/styles/globals.css`. Never hardcode colors, spacing, or font sizes.

## Steps

1. **Create the component file** at `src/components/ComponentName.tsx`:

```tsx
import styles from "./ComponentName.module.css";

interface ComponentNameProps {
  // Define props with TypeScript
}

export default function ComponentName({ ...props }: ComponentNameProps) {
  return <div className={styles.container}>{/* Component content */}</div>;
}
```

2. **Create the CSS Module** at `src/components/ComponentName.module.css`:

```css
.container {
  /* Use CSS variables from globals.css */
  padding: var(--spacing-medium);
  color: var(--color-text-default);
  border-radius: var(--border-radius-small-px);
}
```

3. **CSS Rules to Follow**:
   - Use `var(--color-*)` for ALL colors — this ensures dark/light/sepia themes work
   - Use `var(--spacing-*)` for padding and margins
   - Use `var(--font-size-*)` for font sizes
   - Use `var(--border-radius-*)` for border radii
   - Use `var(--shadow-*)` for box shadows
   - Use `var(--transition-*)` for transitions
   - For Arabic text: set `direction: rtl`, `text-align: right`, `font-family: 'UthmanicHafs'`
   - For mixed RTL/LTR content: use `unicode-bidi: isolate` on Arabic sections

4. **Responsive Design**:
   - Mobile-first: write base styles for mobile, then add `@media` queries for larger screens
   - Breakpoints:
     - `@media (min-width: 768px)` — tablet
     - `@media (min-width: 1024px)` — desktop
     - `@media (min-width: 1280px)` — large desktop

5. **Theme Support**:
   - Components inherit theme automatically via CSS variables
   - Test with all 3 themes: light, dark, sepia
   - Verify by toggling `data-theme` attribute on `<html>`

6. **Verify**:
   // turbo

```bash
pnpm build
```
