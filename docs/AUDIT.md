# Comprehensive Engineering & Credibility Audit Report (v4.0)

**Project:** Rajana Durga Pavan Kumar — AI & ML Portfolio  
**Live Baseline:** [https://pavan-portfolio-gamma-six.vercel.app/](https://pavan-portfolio-gamma-six.vercel.app/)  
**Repository:** [https://github.com/DurgaPavan0923/pavan_portfolio.git](https://github.com/DurgaPavan0923/pavan_portfolio.git)  
**Branch:** `feat/final-credibility-pass`  
**Date:** November 2026  
**Auditor:** Senior Frontend Architect, Technical Reviewer, Performance Engineer & QA Lead  

---

## 1. Executive Summary & Objective

The primary objective of this audit is to guarantee that **every single line, number, metric, credential, caption, and technology** on Rajana Durga Pavan Kumar's portfolio is defensible in an interview, verified by empirical evaluations, code in the repo, live GitHub telemetry, or official university and program records.

### Ground Rules Enforced:
1. **Evidence First:** Zero fabricated statistics, testimonials, certifications, or capabilities.
2. **Buzzword Purge:** Removal of ungrounded phrases: *hallucination-free, enterprise-grade, SaaS-grade, production RAG deployments, real-time engineering telemetry, precision & passion, Dispatch Priority Message, Engineered AI Systems, applied research at IITs, verified technologies/moments/credentials*.
3. **No Decorative Chips:** No decorative tags, badges, or filter chips (e.g., *State-Level Honor, SOA University, Technical Leadership*). Retain only functional tech chips, availability badge, live-data badge, and small honesty labels (*Demo mode*, *Offline simulated evaluation*).
4. **Recruiter-First Flow:**
   1. Hero (with concise About & Currently strip)
   2. Featured Projects (empirically backed with limitations & diagrams)
   3. Experience (exactly 3 outcome bullets each, "What I built and where")
   4. GitHub Telemetry & Open Source (live data, real calendar, real merged PRs)
   5. Technical Skills (4 groups, 6 items each = 24 total, Lucide icons)
   6. Education & Certifications (CGPA 7.85/10.0 + Result Portal link, 9 real certs/participations)
   7. Leadership & Civic Service (NCC Sergeant, Bharat Scouts & Guides, GDGoC)
   8. Moments (16 photos, continuous transform-only infinite marquee RTL, factual event+year captions)
   9. Contact (validated, Resend delivery to `rdpkumar2308@gmail.com`)
   *(Blogs section hidden as no external publication URLs or MDX files exist)*.

---

## 2. Audit Findings on the Live Site & Codebase (A1–A12)

### A1: GitHub Section Telemetry & Stale Cache
- **Symptom:** Live site displays "Cached Snapshot · last updated 4h ago". Featured repo cards showed broken date formatting ("00 updated recently") and generic descriptions. "Verified Open-Source Pull Requests" displayed merged PRs within Pavan's own repositories.
- **Root Cause:**
  - Vercel production deployment runs without an authenticated `GITHUB_TOKEN` environment variable or reaches the 60 req/hr unauthenticated rate limit, triggering immediate fallback to `github-snapshot.json`.
  - Date parsing logic formatted day/month tokens with leading zeros or invalid offsets resulting in "00".
  - The PR panel was labeled "Verified Open-Source Pull Requests", implying external OSS contributions when they were PRs in `pavan_portfolio` and academic repos.
- **Remediation:**
  - Server-side GraphQL pipeline with explicit `from = now - 365d` and `to = now`.
  - Route handler cache control: `s-maxage=900, stale-while-revalidate=3600`.
  - Format dates properly (e.g., "Updated Mar 2026" or "Updated recently").
  - Feature 4 verified flagship repos: `AI-Powered-Fake-News-Detector-for-Students`, `AI-Resume-Screening-Job-Match-System`, `RajanaDurgaPavanKumar_C1_ONLINETIHIITG`, and `IRA`.
  - Rename PR panel to: *"Recent Merged Pull Requests (own repositories)"*.
  - Show live indicator only when upstream fetch succeeded within cache TTL; otherwise *"Cached · <timestamp>"*.

### A2: FactLens AI Evaluation Implausibility
- **Symptom:** Card stated 35.0% lexical baseline on a 50/50 balanced dataset (worse than random coin flip) and p50 latency of 8.99 ms, which is impossible with live network calls to Gemini, Pinecone, and Neo4j.
- **Root Cause:** `evals/factlens-ai/evaluate.py` implemented an offline heuristic dictionary check with mocked/simulated keyword sets running strictly in-memory in local Python with zero external API calls.
- **Remediation:**
  - Explicitly label as an **Offline simulated benchmark** on single-claim test samples (FEVER/LIAR corpus, n=100) with zero external network latency.
  - State clearly in `/evals/factlens-ai/METHODOLOGY.md` and on the project card that the 8.99 ms metric measures local heuristic scoring only, and the 35.0% baseline reflects an uncalibrated word-overlap heuristic.
  - Link to canonical repo: `https://github.com/DurgaPavan0923/AI-Powered-Fake-News-Detector-for-Students`.

### A3: InsightAI Evaluation Saturation
- **Symptom:** 100% Precision@1 on a 32-pair, 8-query corpus indicates a saturated, small synthetic benchmark.
- **Root Cause:** Ground truth test set was curated with high lexical similarity to target candidate profiles.
- **Remediation:**
  - Label as **Small synthetic evaluation corpus** (32 resume-job pairs across 8 queries).
  - Explicitly state that latency measures in-memory vector dot product scoring only, excluding document extraction overhead.
  - Document limitations on card: needs hard negative mining and cross-industry testing.

### A4: Underwater Analytics Scope & Naming
- **Symptom:** Title says "Underwater Analytics" but Track B evaluates drinking water potability (9 physicochemical attributes, N=3,276) from the public Kaggle potability dataset, while Track A processes sequential CTD oceanographic buoy streams (N=720).
- **Root Cause:** Project was developed during TIH IIT Guwahati internship with dual tracks: ocean sensor anomaly detection (CTD) and municipal water quality classification.
- **Remediation:**
  - State dataset sources clearly: Track A (CTD oceanographic buoy stream, N=720) and Track B (9 physicochemical attributes drinking water potability, N=3,276).
  - Retain truthful modest metrics: PR-AUC 0.5951 vs 0.3920 baseline (+51.8%), ROC-AUC 0.6689, MAE 0.082 vs 0.140 baseline (-41.3%).
  - Link canonical repo: `https://github.com/DurgaPavan0923/RajanaDurgaPavanKumar_C1_ONLINETIHIITG` and live deployment `https://water-potability-vert.vercel.app/`.

### A5: Unverified Credential IDs & "Verify" Links
- **Symptom:** Certifications contained synthetic IDs (`NEO4J-CERT-PROFESSIONAL`, `AICTE-MS-ELEVATE-2026`, etc.) and generic URLs. Hackathon participation certs (Adobe, Convolve, ICAAIMLS) were presented alongside professional certifications under "12 Verified Credentials".
- **Root Cause:** Placeholders created during initial UI prototyping were never reconciled against verified documents.
- **Remediation:**
  - Retitle section to **Certifications** with true count (9 items).
  - Remove all invented IDs. Use real IDs or mark "Available on request".
  - Clearly label hackathons and conferences as **Participation** on Unstop and university appreciation.
  - Remove fake "Verify" external links; link to actual verification portals only where valid.

### A6: Experience Section Claim Inflations
- **Symptom:** Azure internship claimed CLI deployments of VMs, Blob Storage, and VNets; GDGoC Club Coordinator listed "Sep 2025" and "150+ students"; Campus Ambassador listed "Dec 2025" and "200+ students"; subtitle claimed "applied research at IITs".
- **Root Cause:** Descriptions drifted from confirmed factual timeline.
- **Remediation:**
  - Subtitle updated to: *"What I built and where."*
  - Microsoft Elevate Azure: 20 Jan – 12 Feb 2026, 25-hour course covering Azure cloud architecture (IaaS/PaaS/SaaS), deployment models, and resource management.
  - GDGoC ITER: Club Coordinator since Sep 2026; reviewed 600+ applications; built 100+ member team; facilitated Google Cloud Study Jam with 100+ participants; fest named *"Chakravyuh Genesis"*. Zero mention of Design Lead or Social Media Designer.
  - Cognizance IIT Roorkee: Jan – Mar 2026 (also eDC IIT Delhi ambassador); drop unverified student counts.
  - InternPro: Link to `real-estate-prediction` repo on GitHub.
  - Exactly 3 outcome bullets per role ("Built X using Y → outcome").

### A7: Leadership Section Embellishments
- **Symptom:** Text claimed "Commanded drill contingents", "1,800+ students", "Kendriya Vidyalaya No. 3", "Senior Warrant Rank", and "state gubernatorial honors".
- **Root Cause:** Over-enthusiastic resume phrasing.
- **Remediation:**
  - Kendriya Vidyalaya: Correct to *"Kendriya Vidyalaya"* (drop "No. 3" and "1,800+ students").
  - NCC: Sergeant with A (Alpha), B (Alpha), and C (Bravo) certificates.
  - Bharat Scouts & Guides: Rover since May 2015, Rajya Puraskar Awardee.
  - Proxima 2026: Team Ayush Ranjan Pradhan, Prerna Raut, and Pavan Kumar showcasing IRA at Abinya 3.0.
  - Remove all decorative rank badges and ungrounded honors.

### A8: Moments Marquee Captions & Flow Order
- **Symptom:** Captions fabricated specific locations, dates, and durations ("36-hour SIH", "Silicon University", "Army Encampment Grounds", "Raj Bhavan Apr 2025", "500+ Students", "firing practice"). Moments was positioned after Blogs.
- **Root Cause:** Placeholder captions filled in during gallery component development.
- **Remediation:**
  - Replace every caption with a short factual caption: **Event name + Year only**.
  - Move Moments before Contact (and remove Blogs from main flow).
  - Ensure continuous 60fps RTL infinite marquee using hardware-accelerated `translate3d`, pausing on hover/touch/drag/tab-hidden, with accessible lightbox modal.

### A9: Blogs Section Status
- **Symptom:** Blogs section displayed 3 markdown articles with "Read Full Article" modals, but no external published URLs or standalone MDX files exist in the repo.
- **Root Cause:** Created as client-side mock content.
- **Remediation:**
  - Hide Blogs section from `src/app/page.tsx`.
  - Remove `#blogs` from `Navbar.tsx`, `MobileDock.tsx`, `MobileMenu.tsx`, `CommandPalette.tsx`, and `sitemap.ts`.
  - Section numbering automatically regenerates from 01 to 09.

### A10: Project Cards & Technical Verification
- **Symptom:** Project cards showed emoji icons (🔍📄🌊); architecture details lacked real diagrams; FactLens repo links were inconsistent; water potability was missing from featured repos.
- **Root Cause:** Quick prototyping with emoji glyphs.
- **Remediation:**
  - Replace emojis with clean SVG/Lucide icons and screenshots.
  - Add expandable architecture diagrams (SVG/Mermaid) legible on mobile (360px) and desktop.
  - Standardize FactLens repo to `AI-Powered-Fake-News-Detector-for-Students`.
  - Feature `RajanaDurgaPavanKumar_C1_ONLINETIHIITG` in GitHub telemetry.
  - Add explicit one-line **Limitations** to every featured project.

### A11: Hero Section Framing & Metadata
- **Symptom:** Hero stat said "12 Certifications" and "98 GCP Badges"; `theme-color` was `#f8fafc` (light) on dark canvas; title was "AI & ML Engineer"; images lacked responsive `sizes` attribute.
- **Root Cause:** Legacy tags and incomplete metadata.
- **Remediation:**
  - Stat updated to: **98 Google Cloud badges** with tooltip explaining: 57 skill badges + 12 arcade games + 9 trivia + 18 lab-free courses (Apr 1 – Jun 2, 2025, Diamond League, Ultimate Milestone).
  - Use **"CS Student · AI & ML"** framing everywhere.
  - Add responsive `sizes` attribute to all `next/image` components (`sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"`).
  - Fix `theme-color` to `#090d16` for dark mode.

### A12: Missing Pieces (About, Currently Strip, Clean Icons)
- **Symptom:** Hero lacked a concise personal statement and "Currently" strip. Skills and Certifications contained inconsistent emoji glyphs.
- **Remediation:**
  - Added concise About block (3–4 lines: Class of 2027, focus areas, what I build, seeking AI/ML internships & entry-level roles).
  - Added "Currently" strip (Building: FactLens AI / Learning: Distributed Training & Graph RAG).
  - Unified all icons across Skills and Certifications using Lucide React icons.

---

## 3. Section Flow & Renumbering (9 Sections)

| # | Section Identifier | Component | Anchor |
| :--- | :--- | :--- | :--- |
| **01** | `01 // HERO & OVERVIEW` | `Hero.tsx` | `#hero` |
| **02** | `02 // FEATURED PROJECTS` | `Projects.tsx` | `#projects` |
| **03** | `03 // EXPERIENCE & INTERNSHIPS` | `Experience.tsx` | `#experience` |
| **04** | `04 // OPEN SOURCE & TELEMETRY` | `GitHubActivity.tsx` | `#github` |
| **05** | `05 // TECHNICAL SKILLS` | `Skills.tsx` | `#skills` |
| **06** | `06 // EDUCATION & CERTIFICATIONS` | `Certifications.tsx` | `#certifications` |
| **07** | `07 // LEADERSHIP & SERVICE` | `Leadership.tsx` | `#leadership` |
| **08** | `08 // MOMENTS & HIGHLIGHTS` | `Gallery.tsx` | `#moments` |
| **09** | `09 // CONTACT & COLLABORATION` | `Contact.tsx` | `#contact` |

---

## 4. Verification & Build Criteria

- [x] All A1–A12 findings diagnosed and planned.
- [ ] Data models updated in `src/data/` with zero fabricated facts.
- [ ] Section components updated and blogs unmounted.
- [ ] GitHub telemetry hardened with graceful snapshot fallback.
- [ ] Unit tests (11 suites, 50 tests) passing with 100% green status.
- [ ] TypeScript typecheck passing with zero errors.
- [ ] ESLint passing with zero warnings or errors.
- [ ] Production build (`npm run build`) passing cleanly.
- [ ] All documentation updated in `/docs` and `README.md`.
