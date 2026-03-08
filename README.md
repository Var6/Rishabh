<div align="center">

# ✦ Rishabh Ranjan — Portfolio

**Full-Stack Developer & Freelancer · Patna, India**

[![Live Site](https://img.shields.io/badge/Live%20Site-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://var6.github.io)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/rishabhranjan6626/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Var6)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/Rishabh_stark)

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)

</div>

---

## Overview

Personal developer portfolio built with **Next.js 16**, featuring a multi-page architecture, system-aware light/dark theming, scroll-driven animations, a typewriter hero, dynamic GitHub repository fetching, and an EmailJS contact form.

---

## Pages

| Route | Description |
|---|---|
| `/` | Landing — Hero with typewriter, About teaser, Services, Projects preview, Contact |
| `/about` | Full about section, skill bars, Instagram photo gallery |
| `/projects` | Curated projects + live repos fetched from GitHub API |
| `/experience` | Animated work & education timeline |
| `/contact` | EmailJS contact form with all contact details |

---

## Features

- **Typewriter effect** — cycles through roles in the hero section
- **Scroll animations** — Framer Motion `whileInView` reveals on every section
- **System theme** — automatically switches between light and dark based on `prefers-color-scheme` (no JS needed)
- **Dynamic GitHub repos** — fetches public repos from the GitHub REST API with 1-hour cache
- **Instagram gallery** — displays photos via Instagram Basic Display API (falls back to a CTA card if token is absent)
- **EmailJS contact form** — sends email directly from the browser; falls back to `mailto:` if env vars are not set
- **Mobile-first** — every layout is designed for mobile and enhanced for larger screens

---

## Tech Stack

| Category | Tech |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion v12 |
| Email | EmailJS (`@emailjs/browser`) |
| Icons | Lucide React |
| Font | Inter (via `next/font/google`) |

---

## Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/Var6/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.local.example .env.local   # or edit .env.local directly

# 4. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Create a `.env.local` file in the project root (already included as a template):

```env
# ── EmailJS (required for the contact form) ──────────────────────────────────
# https://www.emailjs.com/ → Account → Services / Templates / API Keys
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=

# ── GitHub (optional) ────────────────────────────────────────────────────────
# Raises rate limit from 60 → 5000 req/hr
# https://github.com/settings/tokens  (public_repo scope)
GITHUB_TOKEN=

# ── Instagram Basic Display API (optional) ───────────────────────────────────
# Shows real photos in the /about gallery
# https://developers.facebook.com → Instagram Basic Display
INSTAGRAM_ACCESS_TOKEN=
```

> The contact form falls back to opening your default mail client if EmailJS keys are not set.
> The Instagram section falls back to a styled CTA linking to `@Rishabh_stark` if the token is absent.

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home (landing)
│   ├── about/page.tsx        # About + Skills + Instagram
│   ├── projects/page.tsx     # All projects + dynamic GitHub repos
│   ├── experience/page.tsx   # Work & education timeline
│   ├── contact/page.tsx      # Contact form
│   ├── api/
│   │   ├── github/route.ts   # GitHub repos API route
│   │   └── instagram/route.ts# Instagram media API route
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── Navbar.tsx            # Multi-page nav with active state
│   ├── Hero.tsx              # Typewriter + Framer Motion entrance
│   ├── TypewriterText.tsx    # Typewriter hook component
│   ├── AnimatedSection.tsx   # Scroll-reveal wrapper
│   ├── About.tsx
│   ├── Skills.tsx            # Animated skill bars
│   ├── Experience.tsx        # Vertical timeline
│   ├── Projects.tsx          # FeaturedProjectCard + RepoCard
│   ├── InstagramGallery.tsx  # Instagram photo grid
│   ├── Contact.tsx           # EmailJS form
│   ├── Services.tsx
│   └── Footer.tsx
└── lib/
    └── projects-data.ts      # Shared project data (server + client safe)
```

---

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
```

---

## Contact

| | |
|---|---|
| **Email** | rishabhranjan6626@gmail.com |
| **Phone** | +91 73525 69099 |
| **LinkedIn** | [rishabhranjan6626](https://www.linkedin.com/in/rishabhranjan6626/) |
| **Instagram** | [@Rishabh_stark](https://www.instagram.com/Rishabh_stark) |
| **GitHub** | [Var6](https://github.com/Var6) |

---

<div align="center">

Built with Next.js · Deployed on Vercel

© 2025 Rishabh Ranjan

</div>
