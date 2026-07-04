# Vansh Kumar Patel — Portfolio

Built by a full-stack engineer who ships fast and doesn't do filler. Fully data-driven — every project, skill, and word here is real, not a template.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-EF008F?logo=framer&logoColor=white)

---

## Table of contents

- [About](#about)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Folder structure](#folder-structure)
- [Getting started](#getting-started)
- [Editing content](#editing-content)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [License](#license)

---

## About

This isn't a template-based "About / Work / Contact" portfolio. Every
section here exists because it says something real about how I work —
a terminal-style bio instead of a generic paragraph, a project told as
an actual decision-making story instead of a screenshot grid, a timeline
of what I've actually built and learned, and a section on what didn't
work, because that's part of the job too. Nothing here is filler.

## Features

- 🖥️ **Boot-sequence hero** — page "compiles in" like a terminal starting up, name resolves via a scramble/decode effect
- 📟 **Terminal bio** — typed `whoami` / `cat about.txt` style intro
- 🧭 **Manifesto** — short, opinionated build philosophy, no filler
- 📌 **Now strip** — live "currently building/learning" status
- 🔍 **Deep case study** — one project told as a real story: problem → dead ends → decision → result
- 🕓 **Git-log timeline** — career journey shown as commit messages
- 🧪 **Build log shelf** — smaller side projects and experiments
- ❌ **Failures section** — real misses and what they taught, not just highlights
- 🎮 **Interactive playground** — a small live demo visitors can touch
- 🟢 **Availability badge** — live open-to-work status instead of a contact form
- 🔊 **Ambient sound toggle** — optional, off by default
- 🥚 **Easter egg** — a console message + hidden route for curious devs
- 🖱️ **Custom cursor, magnetic buttons, tilt cards, scroll reveals** — throughout

## Tech stack

| Layer | Choice |
|---|---|
| Framework | React + Vite |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Icons | lucide-react |
| Sound | Howler.js |
| Easter egg | canvas-confetti |
| Deployment | Vercel |

## Folder structure

```
portfolio/
├── public/
│   ├── favicon.svg
│   ├── og-image.png
│   ├── fonts/
│   └── sounds/
│       └── ambient.mp3
│
├── src/
│   ├── main.jsx
│   ├── App.jsx                   # renders sections per config/sections.config.js
│   │
│   ├── config/
│   │   ├── site.config.js        # name, role, email, socials, availability
│   │   ├── theme.config.js       # color tokens, fonts, easing curves
│   │   └── sections.config.js    # section order + on/off flags
│   │
│   ├── data/
│   │   ├── skills.json
│   │   ├── projects.json
│   │   ├── timeline.json
│   │   ├── failures.json
│   │   ├── experiments.json
│   │   └── manifesto.json
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Cursor.jsx
│   │   │   ├── MagneticButton.jsx
│   │   │   ├── Marquee.jsx
│   │   │   ├── RevealOnScroll.jsx
│   │   │   ├── SoundToggle.jsx
│   │   │   ├── StatusBadge.jsx
│   │   │   └── TiltCard.jsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Nav.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ProgressDots.jsx
│   │   │
│   │   └── sections/
│   │       ├── Hero.jsx
│   │       ├── TerminalBio.jsx
│   │       ├── Manifesto.jsx
│   │       ├── NowStrip.jsx
│   │       ├── CaseStudy.jsx
│   │       ├── GitTimeline.jsx
│   │       ├── BuildLog.jsx
│   │       ├── Failures.jsx
│   │       ├── Playground.jsx
│   │       └── Contact.jsx
│   │
│   ├── hooks/
│   │   ├── useScramble.js
│   │   ├── useTypewriter.js
│   │   ├── useMagnetic.js
│   │   ├── useReveal.js
│   │   └── useSound.js
│   │
│   ├── context/
│   │   └── SoundContext.jsx
│   │
│   ├── lib/
│   │   └── utils.js
│   │
│   └── styles/
│       └── globals.css
│
├── .env.example
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── package.json
└── README.md
```

## Getting started

```bash
git clone https://github.com/vansh216/HiiVansh.git 
cd HiiVansh
npm install
cp .env.example .env      # fill in your own values
npm run dev
```

## Editing content

Nothing is hardcoded in components — edit these instead:

| To change... | Edit this file |
|---|---|
| Name, role, email, socials, availability | `src/config/site.config.js` |
| Colors, fonts, easing curves | `src/config/theme.config.js` |
| Section order / show-hide a section | `src/config/sections.config.js` |
| Skills marquee | `src/data/skills.json` |
| Projects (case study + build log) | `src/data/projects.json` |
| Career timeline | `src/data/timeline.json` |
| Failures section | `src/data/failures.json` |
| Manifesto lines | `src/data/manifesto.json` |

Example — adding a project:

```json
// src/data/projects.json
{
  "slug": "ledgerly",
  "name": "Ledgerly",
  "tag": "Product",
  "year": 2026,
  "desc": "Real-time expense tracker with predictive budgeting.",
  "stack": ["React", "Node", "Postgres"],
  "featured": true,
  "link": "https://ledgerly.app"
}
```

`featured: true` → appears in the Case Study section. `featured: false` or
omitted → falls into the Build Log shelf. No component code changes needed.

## Scripts

```bash
npm run dev        # start local dev server
npm run build       # production build
npm run preview     # preview the production build
npm run lint         # run linter
```

## License

Built by **Vansh Kumar Patel**
Project: **HiVansh**