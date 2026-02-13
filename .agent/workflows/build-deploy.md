---
description: How to build, test, and deploy the Ordered Quran site to Vercel
---

# Build & Deploy

## Local Build

1. Run a production build to verify all 114 surah pages generate:
   // turbo

```bash
pnpm build
```

This will:

- Fetch all Quran data from alquran.cloud API (at build time)
- Pre-render all 114 surah pages as static HTML
- Report any build errors

2. Preview the production build locally:
   // turbo

```bash
pnpm start
```

3. Check the build output for:
   - ✅ All 114 surah routes generated under `/surah/[revelationOrder]`
   - ✅ Home page (`/`) renders the surah list
   - ✅ No console errors
   - ✅ Arabic text renders properly

## Lighthouse Audit

1. Open Chrome DevTools → Lighthouse tab
2. Run audit for: Performance, Accessibility, Best Practices, SEO
3. Target scores:
   - Performance: 90+
   - Accessibility: 95+
   - SEO: 100
4. Key checks:
   - Arabic text has proper `lang="ar"` attribute
   - All images have alt text
   - Color contrast passes WCAG AA
   - Font loading doesn't block render (`font-display: swap`)

## Deploy to Vercel

1. Install Vercel CLI (first time only):

```bash
npm i -g vercel
```

2. Deploy to preview:

```bash
vercel
```

3. Deploy to production:

```bash
vercel --prod
```

4. Or connect the GitHub repo to Vercel for automatic deployments:
   - Go to vercel.com/new
   - Import the repo
   - Framework preset: Next.js (auto-detected)
   - No environment variables needed
   - Deploy

## Post-Deploy Checks

- [ ] Home page loads and surah list displays
- [ ] Click a surah → reading page loads with Arabic + English
- [ ] Dark mode toggle works
- [ ] Mobile layout is responsive
- [ ] Navigation between surahs works (prev/next)
- [ ] Arabic text renders with correct font (not system fallback)
