# ⚡ Rajana Durga Pavan Kumar — AI & ML Engineering Portfolio v2.0

[![CI](https://github.com/DurgaPavan0923/pavan_portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/DurgaPavan0923/pavan_portfolio/actions/workflows/ci.yml)
[![Next.js 15](https://img.shields.io/badge/Next.js-15.1.11-black?logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0.0-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)

A high-performance, accessible AI/ML engineer portfolio architected with **Next.js 15 App Router**, **React 19**, **TypeScript**, and **Tailwind CSS**. Showcases production machine learning applications, multi-agent RAG systems, cloud architectures, live GitHub telemetry via GraphQL, an interactive continuous photographic retrospective, a 5-card "Why Work With Me" bento grid, a macOS-style mobile navigation dock, focus mode, and an integrated streaming Neural Assistant powered by Google Gemini.

🌐 **Live Production Deployment:** [https://pavan-portfolio-gamma-six.vercel.app/](https://pavan-portfolio-gamma-six.vercel.app/)

---

## 🚀 Key Highlights & Architecture

- **Next.js 15 App Router & React 19**: Full static generation with edge streaming APIs, dynamic metadata, and OpenGraph card generation (`/opengraph-image`).
- **Core Value Proposition ("Why Work With Me")**: 5-card responsive bento layout highlighting RAG & Graph RAG Engineering, Dual-Cloud Certification (Azure + GCP Diamond), 100+ Member Leadership, Full-Stack AI Delivery, and Neo4j Professional credentials with an infinite tech-tooling marquee.
- **Continuous Photographic Retrospective ("Moments")**: Auto-moving right-to-left GPU-accelerated infinite strip showcasing 22 documented event moments with pause-on-hover/touch, accessible manual buttons, and full-screen lightbox.
- **macOS-Style Interaction Layer**:
  - **Mobile Bottom Dock (`MobileDock`)**: Floating glass quick-action dock on mobile/tablet devices (`Jump to Top`, `Moments`, `Projects`, `Contact`, `⌘K Search`, `AI Chatbot`, `Theme Toggle`).
  - **Focus Mode**: Hides chrome and floating assistants for distraction-free reading of case studies and technical articles.
  - **Command Palette (`CommandPalette`)**: Keyboard-driven command shortcuts (`⌘K`, `Esc`, `↑↓`, `↵`) with quick section jumps and direct actions.
- **Real-Time GitHub GraphQL Telemetry (`/api/github`)**: Live contributions calendar, commit metrics, byte-weighted languages, and featured repositories with resilient offline snapshot caching.
- **Resilient Contact Delivery Pipeline (`/api/contact`)**: Dual delivery engine utilizing **Resend** as primary with **Nodemailer Gmail SMTP** automatic fallback, delivering inquiries directly to `rdpkumar2308@gmail.com`. Includes Zod validation, honeypot traps, and time-trap checks.
- **AI Neural Assistant (`/api/chat`)**: Google Gemini 1.5 streaming conversational copilot grounded in verified profile data with prompt injection defenses and offline fallback.
- **60fps Neural Canvas**: Lightweight, battery-efficient particle graph visualization with automatic viewport intersection culling and tab-visibility pause.
- **Cognitive Decluttering**: Purged decorative category pills and filter bars across all sections for clean typography, generous whitespace, and focused visual rhythm.

---

## 🧭 Portfolio Sections Breakdown

1. **`01 // HERO`**: Animated identity headline, rotating roles, live availability indicator, magnetic CTAs (*Download Resume*, *Explore Work*, *Talk to AI*), and 60fps neural particle canvas.
2. **`02 // ABOUT & FOCUS`**: Concise personal story, education card (B.Tech CSE at SOA ITER), core leadership focus, and current technical commitments.
3. **`03 // MOMENTS IN ACTION`**: Continuous auto-moving photo retrospective highlighting 22 documented event moments with lightbox modal.
4. **`04 // VALUE PROPOSITION`**: "Why Work With Me" bento grid (Graph RAG, Dual Cloud, Leadership, Full-Stack Delivery, Neo4j) + infinite tech marquee.
5. **`05 // TOOLKIT`**: Grouped technical skills (Languages, ML/DL, GenAI/LLM/RAG, Cloud/DevOps, Full Stack, Graph Databases) with clean contrast.
6. **`06 // FEATURED WORK`**: Flagship AI/ML applications (**FactLens AI**, **InsightAI**, **IRA**, **AGORA**, **Seq2Seq Summarizer**) with interactive case study modals.
7. **`07 // OPEN SOURCE METRICS`**: Live GitHub telemetry displaying repository activity, contribution streaks, commit counts, and language breakdown fetched via GitHub GraphQL API.
8. **`08 // EXPERIENCE`**: Interactive timeline tracking roles at **TIH IIT Guwahati** (Research Intern), **GDGoC ITER** (Club Coordinator), **Microsoft Elevate** (Azure Intern), and **Edunet IBM SkillsBuild** (AI Intern).
9. **`09 // RESEARCH FOCUS`**: Academic inquiries in Explainable AI & Misinformation Research, and Graph RAG architectures.
10. **`10 // CREDENTIALS & HONORS`**: Verified credentials including **Neo4j Certified Professional**, **Azure Data Scientist Associate (DP-100)**, **Google Cloud Arcade Diamond League** (98 badges), and national hackathons.
11. **`11 // LEADERSHIP & SERVICE`**: GDGoC ITER Coordinator leading 100+ members and Chakravyuh Genesis, NCC Sergeant rank, and Governor recognition.
12. **`12 // TECHNICAL WRITING`**: Architectural breakdowns on Graph RAG, multi-agent verification loops, and sequence learning with full-screen reader modals.
13. **`13 // GET IN TOUCH`**: Direct contact gateway with one-click email copying and resilient dual-engine contact form.
14. **`14 // CLOSING & CONNECT`**: Warm personal closing note ("Thank You for Visiting") with prominent contact grid and smooth back-to-top button.

---

## 📁 Repository Structure

```text
pavan_portfolio/
├── .github/workflows/       # GitHub Actions CI pipeline (lint, typecheck, build)
├── docs/
│   ├── COMPARISON.md        # Architectural & UX benchmark comparison (vs. vivekrs.in)
│   ├── CONTENT_CHANGES.md   # Content audit log, claim neutralization & open items
│   ├── PLAN.md              # Modernization specification
│   └── AUDIT.md             # Security, QA, and verification audit report
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
│   │   └── page.tsx         # Main page composing all sections
│   ├── components/
│   │   ├── 3d/              # 60fps Neural background canvas
│   │   ├── ai/              # Neural streaming chatbot
│   │   ├── layout/          # Navbar, MobileDock, MobileMenu, CommandPalette, ThemeProvider
│   │   └── sections/        # Hero, About, Gallery, WhyWorkWithMe, Skills, Projects, etc.
│   ├── data/                # Strongly-typed data modules
│   ├── lib/                 # Rate-limiting, Gemini AI, GitHub GraphQL, contact delivery
│   └── types/               # TypeScript interfaces & domain types
└── tests/                   # Vitest unit and component test suite
```

---

## 🛠️ Environment Variables Configuration

Copy `.env.example` to `.env.local` to configure optional server integrations:

```bash
cp .env.example .env.local
```

| Variable | Required | Default / Description |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | No | `https://pavan-portfolio-gamma-six.vercel.app` (Canonical domain) |
| `GEMINI_API_KEY` | No | Google Gemini API key for live streaming AI chat (gracefully falls back offline) |
| `GITHUB_TOKEN` | No | Personal Access Token for GitHub GraphQL API (gracefully falls back to public REST/snapshot) |
| `RESEND_API_KEY` | No | Resend API key for primary contact email delivery |
| `CONTACT_EMAIL_TO` | No | Recipient email address (defaults to `rdpkumar2308@gmail.com`) |
| `SMTP_HOST` | No | SMTP host for secondary contact fallback (e.g., `smtp.gmail.com`) |
| `SMTP_PORT` | No | SMTP port (`465` or `587`) |
| `SMTP_USER` | No | SMTP authentication username / email |
| `SMTP_PASS` | No | SMTP app password |

---

## 🧪 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts Next.js development server with Turbopack |
| `npm run build` | Builds optimized production static bundle |
| `npm run start` | Starts Next.js production server |
| `npm run lint` | Runs ESLint checks across `src/` (0 warnings, 0 errors) |
| `npm run typecheck` | Runs `tsc --noEmit` to verify TypeScript types (0 errors) |
| `npm run test` | Runs Vitest unit & component test suite (41 tests across 10 suites) |
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
