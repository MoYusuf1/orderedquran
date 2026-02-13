---
description: Design system tokens and CSS variable reference for the Ordered Quran UI
---

# Design System Reference

## Overview

The Ordered Quran design system is derived from quran.com's open-source frontend. All styling uses CSS custom properties (variables) defined in `src/styles/globals.css`.

## Theme System

Themes are controlled via `data-theme` attribute on `<html>`:

- `light` (default)
- `dark`
- `sepia`

Implementation uses the `next-themes` package for SSR-safe switching.

## Quick Reference

### Colors — Use These Variables

```
Primary accent:     var(--color-success-medium)     /* #2ca4ab teal */
Accent hover:       var(--color-success-deep)       /* #258c91 */
Accent background:  var(--color-success-faded)      /* #ebf9fa */
Accent light fill:  var(--color-success-faint)      /* #c2edef */

Body text:          var(--color-text-default)        /* #272727 / #e7e9ea */
Faded text:         var(--color-text-faded)          /* #666 / #777 */
Link text:          var(--color-text-link)           /* #2ca4ab */

Page background:    var(--color-background-default)  /* #fff / #1f2125 */
Card background:    var(--color-background-elevated) /* #fff / #1f2125 */
Alt background:     var(--color-background-alternative-faint)

Borders:            var(--color-borders-hairline)
Separators:         var(--color-separators)
```

### Spacing

```
var(--spacing-xxsmall)     6px
var(--spacing-xsmall)      10px
var(--spacing-small)       13px
var(--spacing-medium)      16px
var(--spacing-medium2)     20px
var(--spacing-mega)        32px
var(--spacing-max)         48px
```

### Font Sizes

```
var(--font-size-xsmall)    12px    metadata, badges
var(--font-size-small)     14px    verse numbers, captions
var(--font-size-normal)    16px    body, translations
var(--font-size-large)     18px    surah names in list
var(--font-size-xlarge)    24px    headers
var(--font-size-jumbo)     32px    surah page header
```

### Fonts

```
UI text:        font-family: 'Figtree', sans-serif
Arabic Quran:   font-family: 'UthmanicHafs', serif
Arabic general: font-family: 'NotoNastaliq', serif
```

### Border Radius

```
var(--border-radius-default)     4px
var(--border-radius-small-px)    10px
var(--border-radius-large-px)    20px
var(--border-radius-pill)        20rem   (for badges, search bar)
var(--border-radius-circle)      50%
```

### Shadows

```
var(--shadow-small)     subtle card shadow
var(--shadow-normal)    card hover
var(--shadow-large)     elevated elements
var(--shadow-hover)     dramatic hover effect
```

### Transitions

```
var(--transition-fast)       0.16s
var(--transition-moderate)   0.2s
var(--transition-regular)    0.4s
var(--transition-slow)       0.6s
```

## Arabic Text Rules

1. Always wrap Arabic text in `dir="rtl"` container
2. Use `font-family: 'UthmanicHafs'` for Quran verses
3. Set `line-height: 2.5` minimum for Arabic script readability
4. Never programmatically modify Arabic Quran text
5. Use `unicode-bidi: isolate` when mixing RTL/LTR in same element
6. Test on: Chrome, Firefox, Safari, Edge, and mobile browsers
