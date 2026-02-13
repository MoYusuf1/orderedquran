---
description: Common issues and their fixes for the Ordered Quran project
---

# Troubleshooting Guide

## Build Issues

### ❌ `pnpm build` fails with API errors

**Cause**: alquran.cloud API is down or rate-limited during build.
**Fix**:

- Wait a few minutes and retry
- Check API status: `curl https://api.alquran.cloud/v1/surah/1`
- The `fetchWithRetry` function in `src/lib/api.ts` retries 3 times automatically
- If persistent, increase retry count or add longer delays

### ❌ TypeScript errors after editing types

**Cause**: Type changes weren't propagated to all consumers.
**Fix**:
// turbo

```bash
pnpm build
```

Read the error output — it will point to the exact file and line.

### ❌ `Module not found: @/lib/...`

**Cause**: Path alias not resolving.
**Fix**: Check `tsconfig.json` has `"@/*": ["./src/*"]` in `paths`.

---

## Styling Issues

### ❌ Theme colors don't change

**Cause**: CSS variable was hardcoded instead of using `var(--token)`.
**Fix**: Search for hardcoded hex values in CSS Modules:

```bash
cmd /c "findstr /r "#[0-9a-fA-F]" src\components\*.css src\app\*.css"
```

Replace any hardcoded colors with the corresponding CSS variable.

### ❌ Component styles bleed into other components

**Cause**: Using global CSS class names instead of CSS Modules.
**Fix**: Always import styles as `import styles from './Component.module.css'` and use `className={styles.myClass}`.

### ❌ Dark mode flash on page load

**Cause**: Theme is applied by JavaScript after initial render.
**Fix**: The `suppressHydrationWarning` attribute on `<html>` and `next-themes`' `attribute="data-theme"` handle this. If it still flashes, add:

```html
<script>
  /* inline theme detection script */
</script>
```

to `layout.tsx`'s `<head>`.

---

## Arabic Text Issues

### ❌ Arabic text shows squares/tofu (□□□)

**Cause**: Arabic font failed to load.
**Fix**:

1. Check browser DevTools → Network tab for font 404s
2. Verify font files exist in `public/fonts/arabic/`
3. Check `@font-face` declaration in `globals.css`
4. Try clearing browser cache (Ctrl+Shift+Delete)

### ❌ Arabic text is LTR instead of RTL

**Cause**: Missing `direction: rtl` on the container.
**Fix**: Add to the CSS:

```css
.arabicText {
  direction: rtl;
  text-align: right;
  unicode-bidi: isolate;
}
```

### ❌ Arabic diacritics (tashkeel) are cut off

**Cause**: Line height too small for Arabic script.
**Fix**: Set `line-height: 2.4` or higher on Arabic text containers.

### ❌ Mixed RTL/LTR text looks jumbled

**Cause**: Bi-directional text algorithm confusion.
**Fix**: Wrap Arabic text in an element with `unicode-bidi: isolate` and `dir="rtl"`.

---

## Dev Server Issues

### ❌ Port 3000 already in use

**Fix**:

```bash
cmd /c "pnpm dev -- -p 3001"
```

Or kill the process using port 3000:

```bash
cmd /c "netstat -ano | findstr :3000"
cmd /c "taskkill /PID {PID} /F"
```

### ❌ Hot reload not working

**Cause**: File watcher limit or OneDrive sync interference.
**Fix**:

- Restart dev server
- If on OneDrive, the sync can lock files. Consider moving the project outside OneDrive for dev

### ❌ `pnpm` command not found

**Fix**:

```bash
cmd /c "npm install -g pnpm"
```

---

## Data Issues

### ❌ Surah shows wrong revelation order

**Cause**: Mismatch between `revelation-order.json` and the URL.
**Fix**: Check `src/data/revelation-order.json` — the `revelationOrder` field drives URLs, the `surahNumber` field drives API calls. These are different!

### ❌ Translation missing for some verses

**Cause**: API edition doesn't cover all verses (rare).
**Fix**: Switch to `en.sahih` (most complete) or add a fallback.

### ❌ Verse text appears duplicated

**Cause**: Some API responses include Bismillah in verse 1 text.
**Fix**: This is expected behavior for most surahs. The separate Bismillah display is cosmetic.
