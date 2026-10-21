# ⚡ Rajana Durga Pavan Kumar — AI & ML Engineering Portfolio v2.0

[![CI](https://github.com/DurgaPavan0923/pavan_portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/DurgaPavan0923/pavan_portfolio/actions/workflows/ci.yml)
[![Next.js 15](https://img.shields.io/badge/Next.js-15.1.11-black?logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0.0-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)

A high-performance, accessible AI/ML engineer portfolio architected with **Next.js 15 App Router**, **React 19**, **TypeScript**, and **Tailwind CSS**. Showcases production machine learning applications, multi-agent RAG systems, cloud architectures, live GitHub telemetry via GraphQL, an interactive 22-moment photographic retrospective, and an integrated streaming Neural Assistant powered by Google Gemini.

🌐 **Live Production Deployment:** [https://pavan-portfolio-gamma-six.vercel.app/](https://pavan-portfolio-gamma-six.vercel.app/)

---

## 🚀 Key Highlights & Architecture

- **Next.js 15 App Router & React 19**: Full static generation with edge streaming APIs, dynamic metadata, and OpenGraph card generation (`/opengraph-image`).
- **Real-Time GitHub GraphQL Telemetry (`/api/github`)**: Live contributions calendar, commit metrics, byte-weighted languages, and featured repositories with resilient offline snapshot caching.
- **Resilient Contact Delivery Pipeline (`/api/contact`)**: Dual delivery engine utilizing **Resend** as primary with **Nodemailer Gmail SMTP** automatic fallback, delivering inquiries directly to `rdpkumar2308@gmail.com`. Includes Zod validation, honeypot traps, time-trap checks, and optional sender auto-replies.
- **Moments in Action / Photo Gallery (`#gallery`)**: Curated photographic archive of 22 real moments across **Hackathons & Tech**, **NCC & Discipline**, and **Community Leadership**, featuring a responsive masonry layout and a full-screen Lightbox modal with keyboard navigation (`←`/`→`/`ESC`), touch swipe, and a thumbnail carousel strip.
- **AI Neural Assistant (`/api/chat`)**: Google Gemini 1.5 streaming conversational copilot grounded in verified profile data with prompt injection defenses and offline fallback.
- **60fps Neural Canvas**: Lightweight, battery-efficient particle graph visualization with automatic viewport intersection culling and tab-visibility pause.
- **Fluid Accessibility & Global UX**:
  - `Cmd+K` / `Ctrl+K` interactive Command Palette
  - Lenis smooth inertial scrolling with `prefers-reduced-motion` fallbacks
  - Dark-first design system with zero-flash theme persistence
  - Interactive case study modals with deep architectural breakdowns
  - ATS-friendly resume download (`/Rajana.pdf`)

---

## 🧭 Portfolio Sections Breakdown

1. **`01 // HERO`**: Animated identity headline, rotating roles, live availability indicator, magnetic CTAs (*Download Resume*, *Explore Work*, *Talk to AI*), and 60fps neural particle canvas.
2. **`02 // ABOUT & FOCUS`**: Concise personal story, education card (B.Tech CSE at SOA ITER, CGPA 8.78), core leadership focus, and current technical commitments.
3. **`03 // TOOLKIT`**: Categorized technical skills (Languages, ML/DL, GenAI/LLM/RAG, Cloud/DevOps, Full Stack, Graph Databases) with interactive hover details.
4. **`04 // FEATURED WORK`**: Filterable production AI/ML applications (**FactLens AI**, **InsightAI**, **IRA**, **AGORA**, **Seq2Seq Summarizer**, **Fake News Classifier**) featuring interactive case study modals detailing architecture, challenges, and measurable impact.
5. **`05 // OPEN SOURCE METRICS`**: Live GitHub telemetry displaying repository activity, contribution streaks, commit counts, and language breakdown fetched via GitHub GraphQL API.
6. **`06 // EXPERIENCE`**: Interactive timeline tracking roles at **TIH IIT Guwahati** (Research Intern), **GDGoC ITER** (Club Coordinator), **Microsoft Elevate** (Azure Intern), and **Edunet IBM SkillsBuild** (AI Intern).
7. **`07 // RESEARCH FOCUS`**: Academic inquiries in Explainable AI, Linguistic Misinformation Detection, and Graph RAG architectures.
8. **`08 // CREDENTIALS & HONORS`**: Verified credentials including **Neo4j Certified Professional**, **Google Cloud Arcade Diamond League** (98 badges), **IBM Machine Learning**, and national hackathon qualifiers.
9. **`09 // LEADERSHIP & SERVICE`**: 5+ years of National Cadet Corps discipline, NCC Sergeant rank, and Odisha State Gubernatorial recognition.
10. **`10 // MOMENTS IN ACTION`**: 22 documented event moments spanning Smart India Hackathon, Proxima IRA showcase, Odisha Foundation Day honors, CATC military camps, DevFest, and GDGoC freshers orientation.
11. **`11 // TECHNICAL WRITING`**: Architectural breakdowns on Graph RAG, multi-agent verification loops, and sequence learning.
12. **`12 // GET IN TOUCH`**: Direct contact gateway with one-click email copying and a resilient dual-engine contact form (Resend + SMTP fallback).

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
│   ├── photos/              # 22 normalized high-res event moments
│   ├── og-image.png         # Static 1200x630 social preview card
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
│   │   ├── layout/          # Navbar, Footer, CommandPalette, MobileMenu, ThemeProvider
│   │   └── sections/        # Hero, About, Skills, Projects, Experience, Gallery, Contact, etc.
│   ├── data/                # Strongly typed master profile data layer & snapshot
│   │   ├── gallery.ts       # 22 categorized photographic moments with narrative stories
│   │   ├── projects.ts      # Flagship and featured production AI/ML projects
│   │   └── ...
│   ├── lib/                 # Gemini, GitHub, validators, and utility functions
│   └── types/               # TypeScript definitions
├── tests/                   # Vitest unit & component test suites (35 tests passing)
│   ├── components/          # Projects, ChatBot, Contact, Gallery tests
│   └── unit/                # Validators, Gemini, GitHub telemetry, utilities
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
| `npm run test` | Runs Vitest unit & component test suite (35 tests) |
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
