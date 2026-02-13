---
description: Git workflow and branching strategy for the Ordered Quran project
---

# Git Workflow

## Initial Setup

```bash
cmd /c "git init && git add . && git commit -m "feat: initial project setup with Next.js 15""
```

## Branch Strategy (Trunk-Based)

```
main ─────────●────●────●────●────●───→
               \  /      \  /
                feat/     fix/
```

- **`main`**: Production-ready. Deploys automatically to Vercel on push.
- **`feat/*`**: Feature branches. Short-lived (1-3 days max).
- **`fix/*`**: Bug fix branches.

### Creating a Feature Branch

```bash
cmd /c "git checkout -b feat/search-modal"
```

### Publishing Changes

```bash
cmd /c "git add . && git commit -m "feat: add surah search modal" && git push origin feat/search-modal"
```

### Merging Back

```bash
cmd /c "git checkout main && git merge feat/search-modal && git push origin main && git branch -d feat/search-modal"
```

## Commit Convention

```
<type>: <short description>

Optional longer body explaining WHY, not WHAT.
```

### Types

| Type       | When to use                             |
| ---------- | --------------------------------------- |
| `feat`     | New feature or page                     |
| `fix`      | Bug fix                                 |
| `style`    | CSS/UI changes (no logic)               |
| `refactor` | Code restructuring (no behavior change) |
| `data`     | Changes to revelation-order.json or API |
| `docs`     | Documentation, workflows, README        |
| `chore`    | Dependencies, config, tooling           |
| `perf`     | Performance improvements                |

### Examples

```
feat: add dark mode toggle to navbar
fix: correct verse numbering for Al-Fatihah
style: improve surah card hover animation
refactor: extract AyahDisplay into separate component
data: fix revelation order for surah 68
docs: add troubleshooting workflow
chore: update next.js to 15.6
perf: lazy-load surah Arabic names on home page
```

## Before Every Commit

// turbo

```bash
pnpm build
```

If the build fails, fix errors before committing.

## Deploying

### Automatic (Recommended)

Connect the GitHub repo to Vercel. Every push to `main` triggers a deploy.

### Manual

```bash
cmd /c "npx vercel --prod"
```

## .gitignore

The project already has a `.gitignore` that excludes:

- `node_modules/`, `.next/`, `out/`
- Environment files (`.env*.local`)
- Build artifacts, debug logs
