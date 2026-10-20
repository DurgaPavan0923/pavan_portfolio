# ⚡ Rajana Durga Pavan Kumar — AI & ML Engineering Portfolio v2.0

[![CI](https://github.com/DurgaPavan0923/pavan_portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/DurgaPavan0923/pavan_portfolio/actions/workflows/ci.yml)
[![Next.js 15](https://img.shields.io/badge/Next.js-15.1.11-black?logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0.0-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)

A high-performance, accessible AI/ML engineer portfolio architected with **Next.js 15 App Router**, **React 19**, **TypeScript**, and **Tailwind CSS**. Showcases production machine learning applications, multi-agent RAG systems, cloud architectures, live GitHub telemetry via GraphQL, and an integrated streaming Neural Assistant powered by Google Gemini.

🌐 **Live Production Deployment:** [https://pavan-portfolio-gamma-six.vercel.app/](https://pavan-portfolio-gamma-six.vercel.app/)

---

## 🚀 Key Highlights & Architecture

- **Next.js 15 App Router & React 19**: Full static generation with edge streaming APIs, dynamic metadata, and OpenGraph card generation (`/opengraph-image`).
- **Real-Time GitHub GraphQL Telemetry (`/api/github`)**: Live contributions calendar, commit metrics, byte-weighted languages, and featured repositories with resilient offline snapshot caching.
- **Resilient Contact Delivery Pipeline (`/api/contact`)**: Dual delivery engine utilizing **Resend** as primary with **Nodemailer Gmail SMTP** automatic fallback, delivering inquiries directly to `rdpkumar2308@gmail.com`. Includes Zod validation, honeypot traps, time-trap checks, and optional sender auto-replies.
- **AI Neural Assistant (`/api/chat`)**: Google Gemini 1.5 streaming conversational copilot grounded in verified profile data with prompt injection defenses and offline fallback.
- **60fps Neural Canvas**: Lightweight, battery-efficient particle graph visualization with automatic viewport intersection culling and tab-visibility pause.
- **Fluid Accessibility & Global UX**:
  - `Cmd+K` / `Ctrl+K` interactive Command Palette
  - Lenis smooth inertial scrolling with `prefers-reduced-motion` fallbacks
  - Dark-first design system with zero-flash theme persistence
  - Interactive case study modals with deep architectural breakdowns
  - ATS-friendly resume download (`/Rajana.pdf`)

---

## 📁 Repository Structure

```text
pavan_portfolio/
├── .github/workflows/       # GitHub Actions CI pipeline (lint, typecheck, build)
├── archive/                 # Preserved legacy v1 static files
├── docs/
│   ├── PLAN.md              # Full portfolio modernization specification
│   ├── AUDIT.md             # Security, QA, and verification audit report
│   └── CONTENT_CHANGES.md   # Complete content audit log and verification trail
├── public/
│   ├── Pavan.jpeg           # Profile portrait
│   └── Rajana.pdf           # ATS-optimized Curriculum Vitae
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/        # Gemini 1.5 streaming assistant endpoint
│   │   │   ├── contact/     # Resend + Nodemailer SMTP contact pipeline
│   │   │   └── github/      # GitHub GraphQL telemetry endpoint
│   │   ├── globals.css      # Design tokens, keyframe animations, glass effects
│   │   ├── layout.tsx       # Root layout with JSON-LD Schema & meta tags
│   │   ├── opengraph-image.tsx # Dynamic 1200x630 OG social preview card
│   │   ├── not-found.tsx    # Styled 404 error page
│   │   ├── page.tsx         # Main page composing all sections
│   │   ├── robots.ts        # Dynamic search crawler rules
│   │   └── sitemap.ts       # Dynamic XML sitemap generator
│   ├── components/
│   │   ├── 3d/              # NeuralBackground particle canvas
│   │   ├── ai/              # Neural Assistant ChatBot widget
│   │   ├── layout/          # Navbar, Footer, CommandPalette, MobileMenu, etc.
│   │   └── sections/        # Hero, About, Skills, Projects, Experience, Contact, etc.
│   ├── data/                # Strongly typed master profile data layer & snapshot
│   ├── lib/                 # Gemini, GitHub, validators, and utility functions
│   └── types/               # TypeScript definitions
├── .env.example             # Documented environment variable template
├── next.config.ts           # Next.js security headers and compilation configuration
├── package.json             # Dependencies and npm scripts
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

| Variable | Description | Default / Required |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site origin | `https://pavan-portfolio-gamma-six.vercel.app` |
| `GEMINI_API_KEY` | Google Gemini API key for Neural Assistant | *Optional* (falls back to offline mode) |
| `GITHUB_TOKEN` | GitHub Personal Access Token (read-only) | *Optional* (falls back to cached snapshot) |
| `RESEND_API_KEY` | Resend API key for primary email delivery | *Optional* (falls back to Gmail SMTP) |
| `CONTACT_TO_EMAIL` | Target email for contact form submissions | `rdpkumar2308@gmail.com` |
| `CONTACT_FROM_EMAIL` | Sender email identity for Resend | `Portfolio Contact <onboarding@resend.dev>` |
| `SEND_AUTOREPLY` | Enable automated confirmation email to senders | `false` |
| `GMAIL_USER` | Gmail address for SMTP fallback | *Optional* |
| `GMAIL_APP_PASSWORD` | 16-character Gmail App Password | *Optional* |

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## ☁️ Vercel Deployment Instructions

To ensure all real-time features and delivery pipelines operate in production on Vercel:

1. Navigate to your project on the [Vercel Dashboard](https://vercel.com/dashboard).
2. Go to **Settings** → **Environment Variables**.
3. Add the following keys:
   - `NEXT_PUBLIC_SITE_URL` = `https://pavan-portfolio-gamma-six.vercel.app`
   - `GEMINI_API_KEY` = *(Your Gemini API Key)*
   - `GITHUB_TOKEN` = *(Your GitHub Personal Access Token)*
   - `RESEND_API_KEY` = *(Your Resend API Key)*
   - `CONTACT_TO_EMAIL` = `rdpkumar2308@gmail.com`
   - `CONTACT_FROM_EMAIL` = `Portfolio Contact <onboarding@resend.dev>`
   - `GMAIL_USER` = *(Optional Gmail fallback address)*
   - `GMAIL_APP_PASSWORD` = *(Optional Gmail App password)*
4. Trigger a deployment.

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

## 🔒 Security & Privacy

- **Zero Secrets Committed**: Strict `.gitignore` preventing exposure of `.env` or credential files.
- **Server-Side API Operations**: All API keys (`GEMINI_API_KEY`, `GITHUB_TOKEN`, `RESEND_API_KEY`) run strictly in Node.js server routes and are never bundled into client JavaScript.
- **Sanitization & Escape**: Inbound contact forms HTML-escape all user inputs to prevent XSS.
- **Anti-Spam & Rate Limiting**: Multi-layered defense incorporating hidden honeypot traps, client time-trap latency checks, and IP sliding window limits.

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
