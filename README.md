# ⚡ Rajana Durga Pavan Kumar — AI & ML Engineering Portfolio v2.0

[![CI](https://github.com/DurgaPavan0923/pavan_portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/DurgaPavan0923/pavan_portfolio/actions/workflows/ci.yml)
[![Next.js 15](https://img.shields.io/badge/Next.js-15.1.11-black?logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0.0-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)

A high-performance, responsive AI/ML engineer portfolio architected with **Next.js 15 App Router**, **React 19**, **TypeScript**, and **Tailwind CSS**. Showcases production machine learning applications, multi-agent RAG systems, cloud architectures, live GitHub telemetry, and an integrated streaming Neural Assistant powered by Google Gemini.

🌐 **Live Production Deployment:** [https://pavan-portfolio-iota-ruby.vercel.app/](https://pavan-portfolio-iota-ruby.vercel.app/)

---

## 🚀 Key Highlights & Architecture

- **Next.js 15 App Router & React 19**: Full static generation (SSG) with on-demand edge API streaming and ISR caching.
- **60fps Neural Canvas**: Lightweight, battery-efficient particle graph visualization with automatic viewport intersection culling and tab-visibility pause.
- **AI Neural Assistant (`/api/chat`)**: Google Gemini 1.5 streaming assistant with strict profile grounding, prompt injection defenses, and offline fallback.
- **Live GitHub Intelligence (`/api/github`)**: Automated commit metrics, repo stars, and language telemetry with 1-hour ISR revalidation.
- **Validated Contact Dispatch (`/api/contact`)**: Type-safe Zod schema validation, hidden honeypot spam traps, IP rate limiting, and optional Resend dispatch.
- **Fluid Accessibility & Global UX**:
  - `Cmd+K` / `Ctrl+K` interactive Command Palette
  - Lenis smooth inertial scrolling with reduced-motion fallbacks
  - Dark-first design system with zero-flash theme persistence
  - Interactive case study modals with deep architectural breakdowns
  - ATS-friendly resume download (`/Rajana.pdf`)

---

## 📁 Repository Structure

```text
pavan_portfolio/
├── .github/workflows/       # GitHub Actions CI pipeline (lint, typecheck, build)
├── archive/                 # Preserved legacy v1 index.html
├── docs/
│   ├── PLAN.md              # Full portfolio modernization specification
│   └── AUDIT.md             # Security, QA, and verification audit report
├── public/
│   ├── Pavan.jpeg           # Profile portrait
│   └── Rajana.pdf           # ATS-optimized Curriculum Vitae
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/        # Gemini 1.5 streaming assistant endpoint
│   │   │   ├── contact/     # Zod-validated contact handler with honeypot
│   │   │   └── github/      # GitHub API proxy with ISR caching
│   │   ├── globals.css      # Design tokens, keyframe animations, glass effects
│   │   ├── layout.tsx       # Root layout with JSON-LD Schema & meta tags
│   │   ├── not-found.tsx    # Styled 404 error page
│   │   ├── page.tsx         # Main page composing all sections
│   │   ├── robots.ts        # Search crawler rules
│   │   └── sitemap.ts       # Dynamic XML sitemap generator
│   ├── components/
│   │   ├── 3d/              # NeuralBackground particle canvas
│   │   ├── ai/              # Neural Assistant ChatBot widget
│   │   ├── layout/          # Navbar, Footer, CommandPalette, MobileMenu, etc.
│   │   └── sections/        # Hero, About, Skills, Projects, Experience, Contact, etc.
│   ├── data/                # Strongly typed master profile data layer
│   ├── lib/                 # Gemini, GitHub, validators, and utility functions
│   └── types/               # TypeScript definitions
├── tests/
│   ├── components/          # Component interaction tests
│   └── unit/                # Validators, Gemini, and GitHub unit tests
├── .env.example             # Documented environment variable template
├── next.config.ts           # Next.js security headers and compilation configuration
├── package.json             # Dependencies and npm scripts
├── tailwind.config.ts       # Custom Tailwind theme and design tokens
└── tsconfig.json            # Strict TypeScript configuration
```

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js**: v18.18.0 or higher (v20+ recommended)
- **npm**: v9+ (or pnpm / yarn)

### 1. Clone & Install

```bash
git clone https://github.com/DurgaPavan0923/pavan_portfolio.git
cd pavan_portfolio
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in the optional environment variables:

| Variable | Description | Default / Required |
| :--- | :--- | :--- |
| `GEMINI_API_KEY` | Google Gemini API key for Neural Assistant | *Optional* (falls back to offline mode) |
| `RESEND_API_KEY` | Resend API key for automatic email delivery | *Optional* (logs submissions to server) |
| `CONTACT_RECIPIENT_EMAIL` | Target email for contact form submissions | `rdpkumar2308@gmail.com` |
| `GITHUB_TOKEN` | GitHub personal token to avoid rate limits | *Optional* |
| `NEXT_PUBLIC_SITE_URL` | Canonical site origin | `https://pavan-portfolio-iota-ruby.vercel.app` |

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🧪 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts Next.js development server with Turbopack |
| `npm run build` | Builds optimized production static bundle |
| `npm run start` | Starts Next.js production server |
| `npm run lint` | Runs ESLint checks across `src/` |
| `npm run typecheck` | Runs `tsc --noEmit` to verify TypeScript types |
| `npm run test` | Runs Vitest unit & component test suite |
| `npm run format` | Formats codebase with Prettier |

---

## 🔒 Security Hardening

- **Zero Secrets Committed**: Strict `.gitignore` preventing exposure of `.env` or credential files.
- **Patched Next.js Runtime**: Upgraded to `15.1.11` to patch React Server Components CVE vulnerabilities.
- **Content Security & Rate Limiting**: In-memory rate limiting and request payload sanitization on `/api/chat` and `/api/contact`.
- **Honeypot Anti-Spam**: Invisible form field traps automated web crawlers without impacting human users.

---

## 👨‍💻 Author

**Rajana Durga Pavan Kumar**  
AI & ML Engineer | SOA University (ITER), Bhubaneswar  
- **Email:** [rdpkumar2308@gmail.com](mailto:rdpkumar2308@gmail.com)  
- **LinkedIn:** [linkedin.com/in/rajana-durga-pavan-kumar-432248298](https://www.linkedin.com/in/rajana-durga-pavan-kumar-432248298)  
- **GitHub:** [github.com/DurgaPavan0923](https://github.com/DurgaPavan0923)

---

## 📄 License

This repository is licensed under the [MIT License](LICENSE).
