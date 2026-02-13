# ☪ Ordered Quran

**Read the Holy Quran in the chronological order of revelation.**

Experience the Quran as it was revealed — from the first verses sent down to Prophet Muhammad ﷺ in the Cave of Hira to the final revelation. Each surah is presented with Arabic Uthmani text alongside an English translation.

---

## ✨ Features

- 📖 **Revelation Order** — All 114 surahs arranged chronologically, not by the standard mushaf order
- 🕌 **Arabic + English** — Uthmani script with Sahih International translation, verse by verse
- 🌙 **Three Themes** — Light, Dark, and Sepia modes for comfortable reading
- ⚡ **Blazing Fast** — Static site generation pre-renders every page at build time — zero API calls at runtime
- 📱 **Responsive** — Optimized for mobile, tablet, and desktop
- 🔤 **Arabic Typography** — Proper RTL layout with carefully tuned line-heights and font rendering

## 🖼️ Preview

| Home Page                                                                                       | Surah Reader                                                                             |
| ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Responsive surah grid with revelation order badges, Arabic names, and Meccan/Medinan indicators | Arabic text with English translation, verse numbers, bismillah, and prev/next navigation |

## 🛠️ Tech Stack

| Layer           | Technology                                                  |
| --------------- | ----------------------------------------------------------- |
| Framework       | [Next.js 15](https://nextjs.org/) (App Router)              |
| Language        | TypeScript                                                  |
| Styling         | CSS Modules + CSS Custom Properties                         |
| Theming         | [next-themes](https://github.com/pacocoursey/next-themes)   |
| Data            | [alquran.cloud API](https://alquran.cloud/) (at build time) |
| Package Manager | pnpm                                                        |
| Deployment      | Vercel                                                      |

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)

### Install & Run

```bash
# Clone the repository
git clone https://github.com/your-username/orderedquran.git
cd orderedquran

# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm build
pnpm start
```

> **Note:** The build fetches Quran text from the alquran.cloud API and generates all 114 surah pages as static HTML. No environment variables or API keys are needed.

## 📁 Project Structure

```
orderedquran/
├── src/
│   ├── app/                       # Next.js pages
│   │   ├── layout.tsx             # Root layout + ThemeProvider
│   │   ├── globals.css            # Design system tokens + themes
│   │   ├── page.tsx               # Home — surah grid
│   │   └── surah/[order]/
│   │       └── page.tsx           # Surah reader — verses
│   ├── components/                # Reusable components
│   │   ├── Navbar.tsx             # Navigation + theme toggle
│   │   └── SurahCard.tsx          # Surah list card
│   ├── data/
│   │   └── revelation-order.json  # 114 surahs in revelation order
│   └── lib/
│       ├── api.ts                 # alquran.cloud API client
│       └── types.ts               # TypeScript interfaces
├── .agent/workflows/              # Development workflows (14 guides)
└── revelationorderofquran.md      # Scholarly source data
```

## 🎨 Theming

Three built-in themes that affect the entire UI through CSS custom properties:

| Theme    | Background | Best for                  |
| -------- | ---------- | ------------------------- |
| ☀️ Light | `#ffffff`  | Daytime reading           |
| 🌙 Dark  | `#121417`  | Nighttime / low light     |
| 📜 Sepia | `#f4ecd8`  | Extended reading sessions |

Toggle themes using the button in the top-right corner of the navbar.

## 📊 How Revelation Order Works

The Quran in its standard form (mushaf) is ordered roughly by surah length. This project reorders all 114 surahs by their **chronological order of revelation**, which offers a different perspective on the progression of the Quranic message.

| Revelation Order | Surah                             | Standard Number |
| ---------------- | --------------------------------- | --------------- |
| 1                | Al-Alaq (The Clot)                | 96              |
| 2                | Al-Qalam (The Pen)                | 68              |
| 3                | Al-Muzzammil (The Enshrouded One) | 73              |
| ...              | ...                               | ...             |
| 114              | An-Nasr (The Help)                | 110             |

> **Disclaimer:** The revelation order follows the traditional Islamic scholarly consensus. There are minor scholarly differences on the exact ordering of some surahs.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Follow the coding conventions in `.agent/workflows/conventions.md`
4. Ensure `pnpm build` passes
5. Submit a pull request

## 📝 License

This project is open source. Quran text is sourced from [alquran.cloud](https://alquran.cloud/).

---

<div align="center">

**Built with reverence and care** ☪

</div>
