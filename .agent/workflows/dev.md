---
description: How to run the project locally for development
---

// turbo-all

# Run Dev Server

## Quick Start

1. Install dependencies (if not done):

```bash
pnpm install
```

2. Start the development server:

```bash
pnpm dev
```

3. Open `http://localhost:3000` in your browser

## Hot Reload

The dev server automatically reloads when you save changes to:

- `.tsx` / `.ts` files (components, pages, utilities)
- `.css` / `.module.css` files (styles)
- `revelation-order.json` (data)

## Common Dev Tasks

### Test a specific surah page

Navigate to: `http://localhost:3000/surah/{revelationOrder}`
Example: `http://localhost:3000/surah/1` → Al-Alaq (first revealed)

### Test theme switching

Open browser DevTools console and run:

```javascript
document.documentElement.setAttribute("data-theme", "dark");
document.documentElement.setAttribute("data-theme", "sepia");
document.documentElement.setAttribute("data-theme", "light");
```

### Test responsive design

Use Chrome DevTools → Toggle Device Toolbar (Ctrl+Shift+M) and test:

- iPhone SE (375px)
- iPad (768px)
- Desktop (1280px)

### Test Arabic rendering

Check these pages specifically (they have long verses):

- `/surah/39` → A'Raf (206 verses)
- `/surah/87` → Baqarah (286 verses)

## Troubleshooting

### Arabic text shows boxes/tofu

- Check that font files exist in `public/fonts/arabic/`
- Verify `@font-face` declarations in `src/styles/globals.css`
- Clear browser cache

### API fetch fails during build

- Check internet connection
- Verify `https://api.alquran.cloud/v1/surah/1` returns data
- The API has no rate limits, but may occasionally be slow

### Port 3000 in use

```bash
pnpm dev -- -p 3001
```
