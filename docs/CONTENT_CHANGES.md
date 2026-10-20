# Content Changes & Verification Audit Log

**Author:** Rajana Durga Pavan Kumar  
**Branch:** `fix/portfolio-v2-cleanup`  
**Date:** October 2026  
**Repository:** [https://github.com/DurgaPavan0923/pavan_portfolio.git](https://github.com/DurgaPavan0923/pavan_portfolio.git)  
**Live Site:** [https://pavan-portfolio-gamma-six.vercel.app/](https://pavan-portfolio-gamma-six.vercel.app/)

---

## 1. Executive Summary

This document details every claim, metric, role, and credential reviewed, modified, or eliminated across the portfolio codebase. The objective of this audit is strict factual accuracy, removing unverified percentage claims and placeholder external links, while spotlighting authentic technical accomplishments backed by source code and official LinkedIn records.

---

## 2. Removed Duplicate & Redundant Content (Task 1)

| Removed Item | Former Location | Reason for Removal | Replacement / Action Taken |
| :--- | :--- | :--- | :--- |
| **"Misinformation Detector & Feature Explainability"** Project Card | `src/data/projects.ts` (slug: `fake-news-classifier`) | Duplicate project card covering the same problem space as FactLens AI. | Removed completely. **FactLens AI** remains the single flagship misinformation verification platform. Filter tabs dynamically update with correct project counts. |
| **"Design Lead"** Timeline Entry | `src/data/experience.ts` | Overstated / unverified design leadership role. | Removed. Legitimate accomplishments (600+ applications reviewed, 100+ member team built, Google Cloud Study Jam facilitation, Algorithm Arena, 3-day Cybersecurity Workshop, Chakravyuh Genesis) consolidated into **Club Coordinator**. |
| **"Social Media Designer"** Timeline Entry | `src/data/experience.ts` | Redundant design role diluting the core AI/ML engineering positioning. | Removed completely. |
| **"Linguistic Misinformation Detection"** Research Card | `src/data/research.ts` | Replicated wording from the removed detector project card. | Reworded to **"Explainable AI & Misinformation Research"**, emphasizing multi-agent consensus protocols and knowledge-graph lineage rather than simple classification. |
| **Design Claims across Profile & Hero** | `src/data/profile.ts`, `src/components/sections/About.tsx`, `src/lib/gemini.ts` | Phrasing claiming leadership of "engineering and design teams of 100+ members". | Rewritten to truthfully state coordinating technical workshops, study jams, and developer initiatives across campus. |

---

## 3. Truthful Metric Realignment & Claim Neutralization (Task 4.1)

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

## 4. Credentials & Verification Links Audit

### 4.1 Placeholder URLs Removed
The previous version used placeholder generic landing page URLs (`https://graphacademy.neo4j.com/`, `https://www.cloudskillsboost.google/`, `https://internship.aicte-india.org/`, `https://www.theforage.com/`, etc.) that did not link to unique recipient verification certificates.
- **Action Taken:** Removed generic homepage `verifyUrl` values across all certifications.
- **Client UX:** When no direct recipient URL is available, the UI now displays a clean, professional badge: **`Credential available on request`** (with a shield icon) rather than a non-functional or misleading external link.

### 4.2 Credentials Requiring Confirmation / LinkedIn Discrepancies
The following credentials listed in the portfolio codebase do **NOT** appear on the user's primary public LinkedIn profile as of October 2026:
1. **IBM Coursera Machine Learning Specialist** (`ibm-ml-cert`)
2. **Tata Group Cybersecurity Analyst Simulation** (`tata-cyber`)
3. **NPTEL Introduction to Artificial Intelligence** (`nptel-ai`)
4. **IISc CeNSE Winter School in Emerging Tech** (`cense-iisc`)
5. **Generative AI Academy Scholar** (`genai-academy`)

> [!IMPORTANT]
> **Action Required by User:** Please confirm whether you hold official completion certificates or credential verification URLs for the 5 items above. If verified, provide the direct credential links or upload them to `/public` to enable the "Verify" link. Otherwise, these can be retained with "Credential available on request" or removed if unverified.

---

## 5. Technical Writing / Blogs Audit

- **Previous State:** Blog cards had external links pointing to the author's root GitHub profile (`https://github.com/DurgaPavan0923`) as a placeholder.
- **Upgraded Architecture:**
  - Removed all placeholder GitHub redirect links.
  - Clicking **"Read Full Article"** now opens the interactive **`BlogModal` reader**, displaying the comprehensive markdown article, architecture diagrams, LaTeX math, and code blocks built into the portfolio.
  - External publication links (e.g. Medium, Substack, Dev.to) can be populated via `externalUrl` in `src/data/blogs.ts` as posts are published externally.

---

## 6. Real-Time GitHub Telemetry vs. Hardcoded Stats (Task 2)

| Metric | Previous Hardcoded Value | Upgraded Live Source |
| :--- | :--- | :--- |
| **Annual Contributions** | Hardcoded visual seed matrix | Live `contributionsCollection.contributionCalendar` (GraphQL / verified snapshot fallback). |
| **Indexed Commits** | Hardcoded `141+` | Live computed commit contributions from GitHub API. |
| **Public Repos** | Hardcoded `22` | Live `user.repositories.totalCount` (22 repos). |
| **Streaks** | Static fake streak | Algorithmic streak computation traversing consecutive calendar days. |
| **Language Distribution** | Hardcoded chips | Byte-weighted language calculation across all non-fork repositories. |
| **Featured Repos** | Hardcoded stars (185, 155, 124, 82) | Real GitHub stars, forks, primary language, and relative pushed time (`updated X ago`). |
| **Non-Open-Source Badges** | Cloud Badges & Hackathons in Open Source section | Removed from GitHub section; accurately housed under Credentials. |
| **Hero Counters SSR Flash** | Initialized to `0+` in state, causing client re-render flash | Initialized directly with baseline numbers (`7+`, `98`, `6+`, `300+`), guaranteeing identical server HTML and smooth hydration. |

---

## 7. SEO & Environment Variable Configuration

- **Unified Canonical URL:** Standardized on `https://pavan-portfolio-gamma-six.vercel.app/` via `NEXT_PUBLIC_SITE_URL`.
- **Dynamic OpenGraph Image:** Generated dynamically at `/opengraph-image` (1200×630px) via `@vercel/og` (`next/og` `ImageResponse`) with custom typography and brand colors.
- **Search Metadata:** Corrected `robots.ts` and `sitemap.ts` to reference `NEXT_PUBLIC_SITE_URL`.
