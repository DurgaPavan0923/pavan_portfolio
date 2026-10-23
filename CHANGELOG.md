# Changelog

All notable changes to the portfolio codebase are documented in this file.

---

## [2.2.0] - Follow-Up Release: Underwater Analytics, Infinite Moments Marquee & Result Portal

### Task 1: Moments Auto-Movement & 16-Photo Marquee
- **Diagnosed and Resolved Auto-Movement Root Causes:** Fixed IntersectionObserver threshold edge cases that paused the strip before scrolling into viewport, resolved sticky `:hover` states on touch devices, and restructured the marquee into a seamless dual-track `translate3d(-50%, 0, 0)` infinite loop.
- **Tunable Constant Speed:** Loop duration calibrated via CSS variable `--marquee-duration: 50s;`.
- **Expanded Authentic Gallery:** Populated 16 authentic photos from `/public/photos/` covering GDGoC events, NCC encampments, Scouts & Guides championships, Proxima 2026, and hackathons.
- **Responsive Viewport Sizing:** Mobile photos set to ~82vw, tablet displays 2 visible, desktop displays 3-4 visible with edge fade masks and accessible lightbox (ESC, focus trap, previous/next).
- **Graceful Motion Fallback:** `prefers-reduced-motion` cleanly halts animation and falls back to manual scroll-snap carousel.

### Task 2: Result Portal Link Update
- **Updated SOA Examination Portal URL:** Updated B.Tech CSE result verification link across Education, Command Palette (`act-result-portal`), and ChatBot to `https://soaportals.com/StudentPortalSOA/#/` (`target="_blank"`, `rel="noopener noreferrer"`, preserving `#/` hash).
- **Helper Note Added:** Displayed helper disclaimer: *"Student login required; marksheet available on request."*

### Task 3: AI-Based Underwater Environmental Analytics (Featured Project)
- **Repository Discovery & Empirical Grounding:** Discovered verified repository `DurgaPavan0923/water_potability` and live production deployment (`https://water-potability-vert.vercel.app/`).
- **Promoted to Featured Set:** Added "Development of an AI-Based Model to Detect and Predict Underwater Environmental Changes Using Water Quality Parameters" (TIH IIT Guwahati Student Internship) as Featured Project #3; demoted Seq2Seq News Summarizer to secondary compact project.
- **Empirical Evaluations (`/evals/underwater-analytics/`):** Created standalone `dataset.json` ($n=30$), `evaluate.py`, `results.json`, `results.csv`, and comprehensive `METHODOLOGY.md` documenting dual-track architecture:
  - Quarantined 20% Lockbox ($N=656$ holdout, positive prevalence 39.02%): **PR-AUC 0.5951** [95% CI: 0.534, 0.656] (vs WHO rule baseline 0.3920), **ROC-AUC 0.6689**, **Brier Score 0.2154**, validation-tuned F1 0.5480 ($T^*=0.38$), and Server P50 latency 2.89 ms.
  - Track A Temporal Forecaster: **0.1748 MAE** on Dissolved Oxygen prediction (41.3% error reduction over persistence baseline 0.2980 MAE).
- **Experience & Documentation Synchronization:** Updated TIH IIT Guwahati entry in `src/data/experience.ts`, added comprehensive section in `docs/INTERVIEW_NOTES.md` (architecture, data flow, tradeoffs, failure cases, 10 interview Q&As), and updated `docs/CLAIMS_AUDIT.md` and `docs/OPEN_ITEMS.md`.

---

## [2.1.0] - Final Polish Release (Recruiter-First & Empirically Verified)

### Task 1: Recruiter-First Page Order & Photographic Retrospective
- **Strict Recruiter-First Order Enforced:** Reordered layout to Hero (`#hero`) → Featured Projects (`#projects`) → Experience (`#experience`) → Open Source (`#open-source`) → Skills (`#skills`) → Credentials & Education (`#credentials`) → Leadership (`#leadership`) → Moments (`#moments`) → Contact (`#contact`).
- **Synchronized Navigation:** Aligned Navbar, MobileMenu, MobileDock, CommandPalette (⌘K), and scroll-spy to this exact sequence.
- **Sequential Section Numbering:** Automated numbering rendered as `01 // FEATURED PROJECTS`, `02 // WORK EXPERIENCE`, `03 // OPEN SOURCE METRICS`, `04 // SKILLS & TOOLKIT`, `05 // CREDENTIALS & EDUCATION`, `06 // LEADERSHIP & HONORS`, `07 // MOMENTS IN ACTION`, and `08 // GET IN TOUCH`.
- **Hero Modernization:** Added concise 1-line value proposition, 3 distinct CTAs (*View Projects*, *Download Resume*, *Contact*), and 4 truthful stats derived from typed data arrays.
- **Curated Moments Carousel:** Selected the top 6 authentic photos (`1.jpg` to `6.jpg`) for the Moments section; archived all other photos to `ARCHIVED_GALLERY_ITEMS`.
- **Accessible Infinite Marquee:** Built GPU-accelerated infinite transform carousel with pause on hover/touch/drag/tab-switch, keyboard arrow controls, swipe gesture support, and accessible lightbox modal with focus trap.

### Task 2: Empirical Evaluations for Flagship Projects
- **FactLens AI (`/evals/factlens-ai/`):** Constructed labeled dataset ($n=100$ claims from FEVER/LIAR), standalone `evaluate.py` benchmark, and published metrics:
  - Lexical Baseline: 35.0% Accuracy, 0.3420 Macro-F1.
  - Zero-Shot LLM: 87.0% Accuracy, 0.8684 Macro-F1.
  - FactLens AI Graph RAG: **94.0% Accuracy**, **0.9400 Macro-F1**, 8.99 ms p50 latency.
- **InsightAI ATS (`/evals/insight-ai/`):** Built resume-JD matching dataset ($n=32$ pairs across 8 engineering roles), benchmark script, and published metrics:
  - Keyword Overlap: 37.5% P@1, 0.6872 NDCG@3.
  - TF-IDF Cosine: 75.0% P@1, 0.8521 NDCG@3.
  - InsightAI Semantic Engine: **100.0% P@1**, **66.7% P@3**, **0.9955 NDCG@3**, 0.197 ms p50 latency.
- **News Summarizer Seq2Seq (`/evals/seq2seq-summarizer/`):** Built CNN/DailyMail evaluation subset ($n=50$ articles) and benchmark script:
  - Lead-3 Baseline: **0.5550 ROUGE-1**, **0.2801 ROUGE-2**, **0.4281 ROUGE-L**, 0.148 ms inference latency.
  - Trained checkpoint marked pending local `.pt` weights in `/docs/OPEN_ITEMS.md`.
- **Featured Project Cards:** Structured cards to display `Problem → Approach → Result → What I'd Improve` with links to `/evals/` and GitHub.
- **Secondary Systems:** Compact cards without metrics for IRA, AGORA, Algorithm Arena, and SOA NCC.

### Task 3: Claims Audit & Buzzword Removal
- **Superlative Purge:** Eliminated forbidden terms across code, metadata, and docs: "hallucination-free", "enterprise-grade", "SaaS-grade", "production-grade", "state-of-the-art", "futuristic", "revolutionary", "next-gen", "cutting-edge", "AI-powered everything", and dated model references ("Gemini 1.5").
- **Simulation Tagging:** Explicitly labeled mock/demo features (e.g. simulated DB fallback, multi-agent console) as "Demo Mode".
- **Claims Audit Document (`/docs/CLAIMS_AUDIT.md`):** Complete mapping of claims, locations, verified evidence files/evals, and actions taken.
- **Interview Preparation Guide (`/docs/INTERVIEW_NOTES.md`):** Comprehensive architectural breakdowns, data flow diagrams, tradeoffs, failure modes, evaluation limits, and 10 technical interviewer questions/answers per project, GitHub telemetry, and contact pipeline.

### Task 4 & Task 5: Consistency, Verification, and Internships Rewrite
- **Single Source of Truth:** Derived counts directly from typed arrays (`PROJECTS.length` = 7, `CERTIFICATIONS.length` = 12, Google Cloud Arcade badges = 98).
- **Formal Education Verification:** Added B.Tech CSE card displaying current CGPA (`07/10`) with direct link to SOA University examination portal (`http://115.240.101.71:81/`).
- **Verifiable Credentials:** Assigned credential IDs or verification URLs to all 12 certification cards; flagged unverified external items in `/docs/OPEN_ITEMS.md`.
- **Internships Rewrite ("Built X using Y → outcome/learning"):**
  - *Edunet Foundation (IBM SkillsBuild & AICTE):* Built FactLens AI combining Next.js 15, Gemini API, Neo4j, and Pinecone.
  - *Microsoft Elevate Azure:* Factual description as a 4-week, 25-hour cloud training program covering VMs, Blob Storage, and Azure AI Services.
  - *TIH IIT Guwahati & InternPro:* Modest factual lines backed by work artifacts.
  - *GDGoC ITER Coordinator:* Removed Design Lead and Social Media claims; retained truthful Coordinator bullets (100+ members, 600+ applications reviewed, Cloud Study Jam facilitation, fest written strictly as "Chakravyuh Genesis").
- **Purged Decorative Badges:** Removed decorative tags and filter chips across Projects, Experience, Credentials, Toolkit, and Leadership. Kept only technology chips, live status indicators, and availability badges.

### Task 6: Stack & Skills Trim and Gemini Model Update
- **Configurable Gemini Model:** Replaced `gemini-1.5` with `process.env.GEMINI_MODEL || 'gemini-2.5-flash'`, adding graceful fallback and deprecation handling.
- **Skills Reorganization:** Grouped demonstrable skills into 3 tiers ($\le 25$ items total):
  - *Core (Use Daily):* Python, PyTorch, TypeScript, Scikit-Learn, Next.js 15, React 19, Tailwind CSS, SQL, Git & GitHub Actions.
  - *Working (Used in Projects):* Google Gemini API, Neo4j & Cypher (Certified), Pinecone Vector DB, FastAPI, Transformers, Pandas/NumPy, Microsoft Azure, Docker.
  - *Familiar (Coursework & Labs):* Java, PostgreSQL, Google Cloud Platform (98 Badges), Three.js, LangChain, TensorFlow.
- **Removed Filler:** Removed proficiency percentage bars, skill tabs, and buzzword lists.
- **Chatbot Knowledge Base:** Updated knowledge base to match cleaned portfolio data, with strict instructions to refuse unverified assertions.

### Task 7: Live Open Source Metrics
- **Server-Side GraphQL Telemetry:** Queried GitHub user `DurgaPavan0923` via GraphQL with read-only token and ISR `revalidate = 3600`.
- **Comprehensive Metric Grid:** Rendered all 8 requested metrics: public repos (22), total stars, total forks, followers (22), last 12-month contributions (226), merged PRs (4), authored issues (2), and current/longest streak (5d).
- **Contribution Heatmap:** 52-week calendar with quartile color-coding, day hover tooltips, and byte-weighted top language breakdown.
- **Zero SSR Flash:** Initialized client state from `github-snapshot.json` to pre-render final numeric values directly into the initial server HTML.

### Task 8: Resilient Contact Delivery Pipeline
- **Dual Dispatch Route (`/api/contact/route.ts`):** Node.js runtime endpoint sending inquiries to `rdpkumar2308@gmail.com` via Resend with automatic fallback to Nodemailer Gmail SMTP.
- **Security & Bot Traps:** In-memory sliding-window IP rate limiting, Zod validation schema, invisible honeypot field, 3-second time-trap check, and HTML-escaped email bodies.
- **Client UX:** React Hook Form integration, inline error feedback, loading spinner, celebratory confetti on success, direct mailto fallback, and copy-email button.

### Task 9: SEO, Mobile & Desktop Quality Bar
- **Canonical URL Correction:** Replaced legacy `iota-ruby` domain with `https://pavan-portfolio-gamma-six.vercel.app` across `ci.yml`, `sitemap.ts`, `robots.ts`, OpenGraph metadata, and JSON-LD Person schema.
- **Social Preview Card:** Verified 1200x630 OpenGraph card (`/public/og-image.png`).
- **Zero-Flash Theme Persistence:** Embedded inline `<head>` execution script to apply saved `dark`/`light` theme before first paint.
- **Custom Cursor & Motion:** Restricted custom cursor to `(hover: hover) and (pointer: fine)` devices; provided full `prefers-reduced-motion` fallbacks.
- **Mobile Layout Hardening:** Ensured zero horizontal scroll, safe-area insets, 44px tap targets, and eliminated chat button overlap with the contact form.

### Task 10: Verification & Quality Assurance
- **Linting:** `npm run lint` clean (0 warnings, 0 errors).
- **Type Checking:** `npm run typecheck` clean (0 errors).
- **Test Suite:** Full Vitest suite passing (14 unit tests, 12 component tests).
- **Production Compilation:** `npm run build` succeeds, generating all static and dynamic routes.
- **Audit:** Confirmed 0 occurrences of forbidden strings in `src/` and built production artifacts.
