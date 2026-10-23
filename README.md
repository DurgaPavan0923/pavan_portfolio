# ⚡ Rajana Durga Pavan Kumar — AI & ML Engineering Portfolio

[![CI](https://github.com/DurgaPavan0923/pavan_portfolio-main/actions/workflows/ci.yml/badge.svg)](https://github.com/DurgaPavan0923/pavan_portfolio-main/actions/workflows/ci.yml)
[![Next.js 15](https://img.shields.io/badge/Next.js-15.1.11-black?logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0.0-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)

A recruiter-first, interview-defensible engineering portfolio built with **Next.js 15 App Router**, **React 19**, **TypeScript**, and **Tailwind CSS**. Designed under a strict empirical rule: **every number, claim, and technology on the site is backed by code, an empirical benchmark, or a document in this repository**.

🌐 **Live Production Deployment:** [https://pavan-portfolio-gamma-six.vercel.app/](https://pavan-portfolio-gamma-six.vercel.app/)

---

## 🏗️ System Architecture & Data Flow

```text
                                 [ Client Browser ]
                                         │
                 ┌───────────────────────┼───────────────────────┐
                 │ (Responsive Viewport: 360px - 1920px)          │
                 ▼                                               ▼
         [ Static Next.js Shell ]                     [ Interactive Client Layer ]
         • 01 Featured Projects                       • Command Palette (⌘K)
         • 02 Work Experience                         • GPU Transform Carousel
         • 03 Open Source Metrics                     • Accessible Lightbox Modal
         • 04 Skills & Toolkit                        • Fluid Theme Switcher
         • 05 Credentials & Education                 • Bottom Mobile Dock
         • 06 Leadership & Honors                                │
         • 07 Moments in Action                                  │
         • 08 Get in Touch                                       ▼
                 │                                    [ Neural Chatbot Widget ]
                 ▼                                               │
     [ Next.js Node.js API Routes ]                              │
                 │                                               │
    ┌────────────┼───────────────────────────┐                   │
    ▼            ▼                           ▼                   │
/api/contact   /api/github               /api/chat ◄─────────────┘
  (Node.js)    (ISR: 3600s)              (Server-Side)
    │            │                           │
    ├─► Resend   ├─► GraphQL (DurgaPavan)    ├─► Google Gemini API
    │   (Primary)│   (Read-Only Token)       │   (Default: gemini-2.5-flash)
    │            │                           │
    └─► Gmail    └─► Local Snapshot          └─► Grounded Offline
        (SMTP)       (github-snapshot.json)      Fallback Engine
```

---

## 🧭 Recruiter-First Sequential Layout

The visual layout, navigation dock, Command Palette (⌘K), mobile menu, and scroll-spy strictly adhere to an intuitive recruiter review sequence:

| Step | Section Name | Description & Proof Point |
| :---: | :--- | :--- |
| **00** | **Hero** | 1-line value proposition, 3 primary CTAs (*View Projects*, *Download Resume*, *Contact*), and 4 derived stats. |
| **01** | **Featured Projects** | 3 flagship evaluated systems with empirical benchmarks (**FactLens AI**, **InsightAI**, **News Summarizer Seq2Seq**) + 4 compact secondary systems (**IRA**, **AGORA**, **Algorithm Arena**, **SOA NCC**). |
| **02** | **Work Experience** | Hands-on engineering roles rewritten as "Built X using Y → outcome/learning" (**TIH IIT Guwahati**, **GDGoC ITER**, **Edunet IBM SkillsBuild**, **Microsoft Elevate**, **InternPro**). |
| **03** | **Open Source Metrics** | Real-time GitHub telemetry via GraphQL for user `DurgaPavan0923`: 22 repos, 226 contributions, commit streaks, language distribution, and heatmap with tooltips. |
| **04** | **Skills & Toolkit** | Concise 3-tier demonstrable stack ($\le 25$ items): **Core** (use daily), **Working** (used in projects), and **Familiar** (coursework/labs). |
| **05** | **Credentials & Education** | Formal B.Tech CSE degree card (CGPA 07/10 at SOA ITER with portal link) and 12 verifiable industry credentials with IDs. |
| **06** | **Leadership & Honors** | Certified NCC Sergeant service (Alpha/Bravo grades), Governor's Award (Rajya Puraskar), and GDGoC chapter coordination. |
| **07** | **Moments in Action** | Curated 6-photo GPU-accelerated infinite marquee with pause on hover/touch, keyboard navigation, and accessible lightbox. |
| **08** | **Get in Touch** | Resilient contact form dispatching to `rdpkumar2308@gmail.com` via Resend with Nodemailer Gmail SMTP fallback. |

---

## 📊 Empirical Evaluations Summary (`/evals/`)

Every featured project includes reproducible benchmark scripts and datasets located in `/evals/<project>/`. All evaluation scripts are designed with zero third-party pip dependencies, executing deterministically on vanilla Python standard libraries:

| Project | Dataset | Sample Size | Primary Metrics Produced | Latency (p50) | Status |
| :--- | :--- | :---: | :--- | :---: | :---: |
| **FactLens AI** | FEVER / LIAR Claim Sample | $n=100$ | **Accuracy: 94.0%**<br>Macro-F1: 0.9400<br>*(vs. Baseline: 35.0%, Zero-Shot: 87.0%)* | 8.99 ms | ✅ Published |
| **InsightAI ATS** | Synthetic Resume–JD Matching | $n=32$ | **Precision@1: 100.0%**<br>Precision@3: 66.7%<br>NDCG@3: 0.9955 | 0.197 ms | ✅ Published |
| **News Summarizer** | CNN/DailyMail Test Articles | $n=50$ | **ROUGE-1: 0.5550**<br>ROUGE-2: 0.2801<br>ROUGE-L: 0.4281 *(Lead-3 Baseline)* | 0.148 ms | ✅ Published *(Checkpoint weights pending)* |

---

## 🏃 Running Evaluation Scripts Locally

You can run each evaluation script directly from the repository root using standard Python 3:

### 1. FactLens AI Graph RAG Evaluation
```bash
python evals/factlens-ai/evaluate.py
```
**Expected Output:**
```text
Evaluating FactLens AI Graph RAG Pipeline against Baselines (n=100)...
--------------------------------------------------------------------------------
1. Lexical Baseline (Naive Bayes / TF-IDF):
   Accuracy: 35.00% | Macro-F1: 0.3420 | Latency (p50): 0.10 ms
2. Zero-Shot LLM Reasoning:
   Accuracy: 87.00% | Macro-F1: 0.8684 | Latency (p50): 12.01 ms
3. FactLens AI (Dense Vector + Graph RAG):
   Accuracy: 94.00% | Macro-F1: 0.9400 | Latency (p50): 8.99 ms
--------------------------------------------------------------------------------
Benchmark results saved to evals/factlens-ai/results.json and results.csv.
```

### 2. InsightAI ATS Semantic Matching Evaluation
```bash
python evals/insight-ai/evaluate.py
```
**Expected Output:**
```text
Evaluating InsightAI ATS Ranking against Lexical & Vector Baselines (n=32 pairs)...
--------------------------------------------------------------------------------
1. Keyword Overlap:
   Precision@1: 37.50% | Precision@3: 37.50% | NDCG@3: 0.6872 | Latency: 0.052 ms
2. TF-IDF Cosine Similarity:
   Precision@1: 75.00% | Precision@3: 54.17% | NDCG@3: 0.8521 | Latency: 0.098 ms
3. InsightAI Semantic Engine:
   Precision@1: 100.00% | Precision@3: 66.67% | NDCG@3: 0.9955 | Latency: 0.197 ms
--------------------------------------------------------------------------------
Benchmark results saved to evals/insight-ai/results.json and results.csv.
```

### 3. Seq2Seq News Summarizer Evaluation
```bash
python evals/seq2seq-summarizer/evaluate.py
```
**Expected Output:**
```text
Evaluating Summarization on CNN/DailyMail Subset (n=50 articles)...
--------------------------------------------------------------------------------
Lead-3 Heuristic Baseline:
   ROUGE-1: 0.5550 | ROUGE-2: 0.2801 | ROUGE-L: 0.4281 | Latency: 0.148 ms
Trained Seq2Seq Checkpoint:
   [Pending local .pt weights upload - see METHODOLOGY.md and OPEN_ITEMS.md]
--------------------------------------------------------------------------------
Benchmark results saved to evals/seq2seq-summarizer/results.json and results.csv.
```

---

## 💻 Local Development & Testing

### 1. Prerequisites
- **Node.js**: `v20.x` or higher
- **npm**: `v10.x` or higher
- **Python**: `3.10+` (for running evals)

### 2. Installation
```bash
git clone https://github.com/DurgaPavan0923/pavan_portfolio-main.git
cd pavan_portfolio-main
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### 4. Running the Dev Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### 5. Running the Test Suite & Quality Checks
```bash
# Verify ESLint rules
npm run lint

# Verify TypeScript types without emitting files
npm run typecheck

# Run Vitest unit & component test suites
npm run test

# Compile production bundle and generate static pages
npm run build
```

---

## 🔐 Environment Variables Reference

| Variable | Scope | Status | Purpose |
| :--- | :--- | :---: | :--- |
| `NEXT_PUBLIC_SITE_URL` | Client & Server | **Required** | Canonical site URL for metadata, sitemap, robots, and JSON-LD (`https://pavan-portfolio-gamma-six.vercel.app`). |
| `GEMINI_API_KEY` | Server-Side | Optional | API key for Google Gemini assistant (`/api/chat`). Falls back gracefully to offline mode if omitted. |
| `GEMINI_MODEL` | Server-Side | Optional | Configurable Gemini model identifier. Defaults to `gemini-2.5-flash`. |
| `GITHUB_TOKEN` | Server-Side | Optional | Read-only GitHub PAT for live GraphQL telemetry (`/api/github`). Falls back to `github-snapshot.json` if omitted. |
| `RESEND_API_KEY` | Server-Side | Optional | API key for Resend email dispatch (`/api/contact`). |
| `CONTACT_TO_EMAIL` | Server-Side | Optional | Inquiries recipient email. Defaults to `rdpkumar2308@gmail.com`. |
| `CONTACT_FROM_EMAIL` | Server-Side | Optional | Sender address (e.g. `Portfolio Contact <onboarding@resend.dev>`). |
| `GMAIL_USER` | Server-Side | Optional | Gmail SMTP fallback address for Nodemailer. |
| `GMAIL_APP_PASSWORD` | Server-Side | Optional | Gmail 16-character App Password for SMTP fallback. |

---

## 📁 Repository Layout

```text
pavan_portfolio-main/
├── .github/workflows/ci.yml       # Production CI pipeline (lint, typecheck, test, build)
├── docs/
│   ├── CLAIMS_AUDIT.md            # Comprehensive claims audit & evidence table
│   ├── INTERVIEW_NOTES.md         # Architecture walkthroughs, tradeoffs, and Q&A
│   ├── OPEN_ITEMS.md              # External verification requests & pending weights
│   └── CONTENT_CHANGES.md         # Changelog of modified and neutralized content
├── evals/
│   ├── factlens-ai/               # Labeled claims (n=100), evaluate.py, results
│   ├── insight-ai/                # Resume-JD pairs (n=32), evaluate.py, results
│   └── seq2seq-summarizer/        # CNN/DailyMail (n=50), evaluate.py, results
├── public/
│   ├── photos/                    # Curated event moments (1 to 6)
│   ├── og-image.png               # High-res 1200x630 OpenGraph card
│   ├── Pavan.jpeg                 # Profile portrait
│   └── Rajana.pdf                 # ATS-friendly Curriculum Vitae
├── src/
│   ├── app/
│   │   ├── api/chat/route.ts      # Server-side Gemini API route with streaming
│   │   ├── api/contact/route.ts   # Node.js Resend & Nodemailer delivery pipeline
│   │   ├── api/github/route.ts    # ISR 3600s GitHub telemetry endpoint
│   │   ├── layout.tsx             # Root layout with JSON-LD schema & zero-flash theme script
│   │   ├── page.tsx               # Recruiter-first semantic section composition
│   │   ├── robots.ts              # Dynamic robots.txt generator
│   │   └── sitemap.ts             # Dynamic sitemap.xml generator
│   ├── components/
│   │   ├── 3d/NeuralBackground.tsx# 60fps canvas particle graph
│   │   ├── ai/ChatBot.tsx         # Accessible neural chatbot with offline fallback
│   │   ├── layout/                # Navbar, MobileDock, MobileMenu, CommandPalette
│   │   └── sections/              # Hero, Projects, Experience, GitHubActivity, Skills, etc.
│   ├── data/                      # Single source of truth typed arrays (projects, skills, certs)
│   ├── lib/                       # Gemini SDK wrapper, GitHub GraphQL, validators
│   └── types/                     # TypeScript domain models
└── tests/                         # Vitest unit & component test suite
```

---

## 📄 License
This project is open-source under the [MIT License](LICENSE).
