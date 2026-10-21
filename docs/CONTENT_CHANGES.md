# Content Changes & Verification Audit Log

**Author:** Rajana Durga Pavan Kumar  
**Branch:** `feat/portfolio-final`  
**Date:** October 2026  
**Repository:** [https://github.com/DurgaPavan0923/pavan_portfolio.git](https://github.com/DurgaPavan0923/pavan_portfolio.git)  
**Live Site:** [https://pavan-portfolio-gamma-six.vercel.app/](https://pavan-portfolio-gamma-six.vercel.app/)

---

## 1. Executive Summary

This document details every claim, metric, role, and credential reviewed, modified, or eliminated across the portfolio codebase. The objective of this audit is strict factual accuracy, removing unverified percentage claims and placeholder external links, while spotlighting authentic technical accomplishments backed by source code and official LinkedIn records.

---

## 2. Removed Duplicate & Redundant Content

| Removed Item | Former Location | Reason for Removal | Replacement / Action Taken |
| :--- | :--- | :--- | :--- |
| **"Misinformation Detector & Feature Explainability"** Project Card | `src/data/projects.ts` (slug: `fake-news-classifier`) | Duplicate project card covering the same problem space as FactLens AI. | Removed completely. **FactLens AI** remains the single flagship misinformation verification platform. |
| **"Design Lead"** Timeline Entry | `src/data/experience.ts` | Overstated / unverified design leadership role. | Removed. Legitimate accomplishments (600+ applications reviewed, 100+ member team built, Google Cloud Study Jam facilitation, Chakravyuh Genesis) consolidated into **Club Coordinator**. |
| **"Social Media Designer"** Timeline Entry | `src/data/experience.ts` | Redundant design role diluting the core AI/ML engineering positioning. | Removed completely. |
| **"Linguistic Misinformation Detection"** Research Card | `src/data/research.ts` | Replicated wording from the removed detector project card. | Reworded to **"Explainable AI & Misinformation Research"**, emphasizing multi-agent consensus protocols and knowledge-graph lineage rather than simple classification. |
| **Design Claims across Profile & Hero** | `src/data/profile.ts`, `src/components/sections/About.tsx`, `src/lib/gemini.ts` | Phrasing claiming leadership of "engineering and design teams of 100+ members". | Rewritten to truthfully state coordinating technical workshops, study jams, and developer initiatives across campus. |
| **Sub-events under Chakravyuh Genesis** | `src/data/experience.ts`, `src/data/gallery.ts` | Unnecessary nested listing of internal tracks (Algorithm Arena, Cybersecurity workshop). | Normalized strictly to single event name: **"Chakravyuh Genesis"**. |

---

## 3. Truthful Metric Realignment & Claim Neutralization

All non-empirical percentage figures, unverifiable efficiency estimates, and marketing fluff were removed and replaced with factual descriptions of system architectures, tech stacks, and verified event participations:

### 3.1 Project Metrics Neutralized
| Project | Previous Unverified Claim | Truthful Factual Replacement | Rationale |
| :--- | :--- | :--- | :--- |
| **FactLens AI** | "Achieved 96.2% factual verification precision; 50,000+ benchmark claim vectors with zero hallucination leaks" | "Architected multi-agent verification pipeline with sub-second consensus latency; integrates dense vector indexing and knowledge graph provenance for transparent claim audits." Metrics: `< 1 sec latency`, `Neo4j AuraDB`, `Pinecone Serverless`, `APA/MLA Citations`. | F1 score of 96.2% on unreleased private benchmark is unverifiable; focus shifted to architectural latency and graph provenance. |
| **InsightAI ATS** | "Reduced manual HR evaluation duration by 60% across 10,000+ test resumes while improving placement precision by 35%." | "Automated resume parsing and semantic alignment evaluation using transformer embeddings and TF-IDF skill matrices." Metrics: `Cosine Similarity`, `PDF & DOCX parsing`, `FastAPI / Docker`. | 60% time saved and 35% precision boost are simulated marketing metrics; replaced with algorithmic descriptors. |
| **IRA Smart City** | "+35% resource efficiency across 5,000 mock city nodes." | "Showcased at Abinya 3.0 at Proxima 2026; demonstrates 3D municipal terrain rendering and predictive regression load balancing." Metrics: `Three.js WebGL`, `Regression ML`, `Proxima 2026 Participant`. | +35% efficiency was a simulation heuristic without field deployment verification. |
| **AGORA Governance** | "+30% decision efficiency, 25% queue reduction, 100% Sybil-Proof." | "Engineered for the SOA Regional AI Hackathon 2025; combines on-chain credential identity with machine-learning petition triage." Metrics: `DID & Soulbound Tokens`, `TF-IDF + Random Forest`, `Hackathon Project`. | Standardized on actual tech stack and hackathon context. |
| **Seq2Seq Summarizer** | "41.2 ROUGE-1, 38.4 ROUGE-L, 75% compression ratio." | "Trained an encoder-decoder neural network with Bahdanau additive attention on CNN/DailyMail article pairs for abstractive document condensation." Metrics: `Encoder-Decoder`, `Bahdanau Additive`, `Beam Search Decoder`. | Replaced specific unhosted checkpoint ROUGE numbers with concrete architectural specifications. |
| **Algorithm Arena V2** | "Supported 300+ concurrent student submissions." | "Full-stack competitive coding and problem evaluation dashboard engineered for GDGoC ITER developer events." Metrics: `Socket.io Real-Time`, `Node.js / Express`, `GDGoC Contest Portal`. | Removed specific concurrent load number; focused on platform purpose. |
| **SOA NCC Website** | "Serves 150+ active cadets across SOA University." | "Centralized official portal for the National Cadet Corps unit at SOA University, digitizing circulars and camp participation chronicles." | Factual portal description. |

### 3.2 Experience & Leadership Claims Realignment
| Section / Entity | Previous Claim | Updated Factual Statement | Reason |
| :--- | :--- | :--- | :--- |
| **TIH IIT Guwahati** | "Guwahati, Assam (Hybrid)" | **"Remote, India"** | Matches LinkedIn profile exactly. Bullets kept modest focusing on data curation, benchmark testing, and exploratory modeling under mentorship. |
| **Edunet Foundation / IBM** | "Engineered ML pipelines utilizing IBM Watson Studio" | **"6-week AI Internship with IBM SkillsBuild and AICTE"**; built FactLens AI (Next.js 15, Gemini API, Neo4j, Pinecone). | Aligned directly with verified LinkedIn description. |
| **InternPro** | "Jun 2025 – Aug 2025" | **"Jun 2025 – Jul 2025"** (Started 16 Jun 2025 for 6 weeks) | Aligned with verified LinkedIn start date and 6-week duration. |
| **Proxima 2026 Abinya 3.0** | "Abinya 3.0 Finalist … national jury distinction" | **"Participant / Showcased IRA"** | Matches LinkedIn status accurately. |
| **Cognizance & eDC Ambassador** | "promoted to 2,000+ students" | "promoted national engineering hackathons, workshops, and entrepreneurship summits across campus" | Removed inflated student count. |
| **Microsoft Elevate** | "Selected among top-performing candidates across India; 10+ Azure modules" | "Completed hands-on Microsoft cloud training via the AICTE Elevate initiative covering Virtual Machines, Blob Storage, and Azure AI Services." | Removed promotional superlatives. |
| **NCC Leadership** | "5+ Years Active Service" | **"NCC Sergeant (A Alpha, B Alpha, C Bravo), SOA University"** | Removed unverified multi-year tenure count; preserved certified certificate grades. |

---

## 4. UI Simplification & Cognitive Decluttering

To eliminate visual noise and provide a scannable, modern user experience:
1. **Purged Decorative Badges and Filter Bars:**
   - **Projects:** Removed category filter buttons (`All`, `Applied AI`, `Machine Learning`, `Full-Stack AI`, `Systems`) and per-card category pills. Project cards display their core title, summary, key metrics, and authentic technology stack chips.
   - **Certifications:** Removed category filter pills (`All`, `Cloud & AI`, `Professional`, `Academic`, `Competitions`) and category chips from credentials.
   - **Experience:** Removed redundant `exp.type` pill and `Active` badge.
   - **Leadership:** Removed `item.badge`.
   - **Blogs:** Removed redundant category pills, read time badges, and `#hashtags`.
   - **Skills:** Removed tabbed category filter; replaced with clean, semantic grouped sections with high readability.
2. **Preserved High-Value Semantic Indicators:**
   - Real-time GitHub "Live" indicator in Open Source metrics.
   - Availability pill ("Available for Applied AI & ML Roles").
   - Actual technology chips on projects (Python, PyTorch, Neo4j, Next.js, etc.).

---

## 5. Moments / Photo Retrospective Strip

- **Continuous Auto-Moving Photo Strip:**
  - Repositioned directly below the **About** section.
  - Infinite right-to-left marquee animation with GPU hardware acceleration (`translate3d`).
  - Automatically pauses on hover or touch so visitors can inspect photos.
  - Touch-friendly horizontal drag / scroll container with responsive card widths:
    - Mobile (360-430px): `w-[82vw]`
    - Tablet (768px): `w-[42vw]`
    - Desktop: `w-[28vw]` (max 380px)
  - Accessible manual left/right buttons for users with keyboard navigation or `prefers-reduced-motion`.
- **Accessible Lightbox Modal:**
  - Clicking any moment opens a clean modal with high-res photo, title, date, location, and description.
  - Keyboard navigation: `Esc` to close, `←` / `→` arrow keys to cycle through photos, focus trap, and ARIA dialog semantics.

---

## 6. Core Value Proposition ("Why Work With Me") & Closing Section

### 6.1 "Why Work With Me" Bento Grid
Located right after Moments and before Skills, this section organizes Pavan's core differentiators into a 5-card responsive bento layout:
1. **RAG & Graph RAG Engineering:** Enterprise context systems with Neo4j knowledge graphs, hybrid vector search, and cross-encoder rerankers.
2. **Dual-Cloud Certified:** Microsoft Certified: Azure Data Scientist Associate (DP-100) + Google Cloud Diamond Tier achiever with 10+ completed skill badges.
3. **100+ Member Leadership:** Club Coordinator at GDGoC ITER leading major initiatives like Chakravyuh Genesis.
4. **Full-Stack AI Product Delivery:** Production Next.js 15 App Router, streaming FastAPI endpoints, and containerized Docker services.
5. **Neo4j Certified Professional:** Schema modeling, Cypher optimization, and knowledge graph engineering.
- **Infinite Tech Marquee:** Seamless right-to-left marquee showcasing core production tooling.

### 6.2 "Thank You for Visiting" Personal Closing Section
Positioned immediately before the footer, providing a warm, personal closing:
- Friendly closing statement inviting discussion on Applied AI, ML engineering, and research collaborations.
- Prominent 4-card contact grid:
  - **Email:** Direct email with 1-click clipboard copy + direct `mailto:` action.
  - **LinkedIn:** Verified profile link with handle.
  - **GitHub:** Verified profile link with handle.
  - **Resume:** Direct download link to `/Rajana.pdf`.
- Availability status indicator ("🟢 Available for Full-Time Roles & Opportunities").
- Smooth "Back to Top" navigation button.

---

## 7. macOS-Style Interaction Layer

- **Mobile & Tablet Bottom Dock (`MobileDock`):**
  - Floating macOS-style glass dock (`fixed bottom-4 left-1/2 -translate-x-1/2 z-40`).
  - Quick action icons: Jump to Top, Moments, Projects, Contact, ⌘K Search, AI Chatbot toggle, and Dark/Light Mode toggle.
  - Safe-area inset aware (`pb-safe`) ensuring it never collides with OS home indicator gestures.
- **Focus Mode:**
  - Added to Command Palette (`act-focus`).
  - Hides navbar, dock, and chat chrome for distraction-free reading of projects and blogs.
  - Displays a subtle floating pill (`Focus Mode Active • Press ESC or Click to Exit`) to return at any time.
- **Enhanced Command Palette (`CommandPalette`):**
  - Added direct commands: `Why Work With Me`, `View Moments`, `Toggle Focus Mode`, `Scroll to Top`.
  - Added desktop keyboard hints (`↑↓ Navigate`, `↵ Select`, `ESC Close`, `⌘K / Ctrl+K`).

---

## 8. Credentials & Verification Links Audit

### 8.1 Placeholder URLs Removed
Removed generic homepage `verifyUrl` values across all certifications. When no direct recipient URL is available, the UI displays a clean badge: **`Credential available on request`** (with a shield icon).

### 8.2 Credentials Requiring Confirmation / LinkedIn Discrepancies
The following credentials listed in the portfolio codebase do **NOT** appear on the user's primary public LinkedIn profile as of October 2026:
1. **IBM Coursera Machine Learning Specialist** (`ibm-ml-cert`)
2. **Tata Group Cybersecurity Analyst Simulation** (`tata-cyber`)
3. **NPTEL Introduction to Artificial Intelligence** (`nptel-ai`)
4. **IISc CeNSE Winter School in Emerging Tech** (`cense-iisc`)
5. **Generative AI Academy Scholar** (`genai-academy`)

---

## 9. Real-Time GitHub Telemetry vs. Hardcoded Stats

| Metric | Previous Hardcoded Value | Upgraded Live Source |
| :--- | :--- | :--- |
| **Annual Contributions** | Hardcoded visual seed matrix | Live `contributionsCollection.contributionCalendar` (GraphQL / verified snapshot fallback). |
| **Indexed Commits** | Hardcoded `141+` | Live computed commit contributions from GitHub API. |
| **Public Repos** | Hardcoded `22` | Live `user.repositories.totalCount` (22 repos). |
| **Streaks** | Static fake streak | Algorithmic streak computation traversing consecutive calendar days. |
| **Language Distribution** | Hardcoded chips | Byte-weighted language calculation across all non-fork repositories. |
| **Featured Repos** | Hardcoded stars (185, 155, 124, 82) | Real GitHub stars, forks, primary language, and relative pushed time (`updated X ago`). |
| **Hero Counters SSR Flash** | Initialized to `0+` in state, causing client re-render flash | Initialized directly with baseline numbers (`7+`, `98`, `6+`, `300+`), guaranteeing identical server HTML and smooth hydration. |

---

## 10. Open Items & User Action Checklist

The following items are open for final user input or external keys:
- [ ] **GitHub Personal Access Token (`GITHUB_TOKEN`):** If higher rate limits are desired for live telemetry beyond the unauthenticated 60 req/hr public REST limit, set `GITHUB_TOKEN` in `.env.local` / Vercel dashboard. (Automatic verified fallback is built-in).
- [ ] **Credential URLs:** Provide direct verification URLs for the 5 credentials listed in Section 8.2 if you wish to display "Verify Credential" buttons.
- [ ] **External Blog URLs:** Populate `externalUrl` in `src/data/blogs.ts` as technical writeups are mirrored to Medium, Dev.to, or Hashnode.
- [ ] **Client / Peer Testimonials:** Intentionally omitted until real signed testimonials are provided. When available, they can be placed into a dedicated Kind Words card.
- [ ] **Additional Event Photos:** If more photos from hackathons, workshops, or club events are available, drop them into `/public/photos/` and register them in `src/data/gallery.ts`.
