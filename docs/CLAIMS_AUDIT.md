# Engineering Claims Audit & Verification Log (v3.0)

**Author:** Rajana Durga Pavan Kumar  
**Branch:** `feat/portfolio-10of10`  
**Date:** November 2026  
**Repository:** [https://github.com/DurgaPavan0923/pavan_portfolio.git](https://github.com/DurgaPavan0923/pavan_portfolio.git)  
**Standard:** Zero invented metrics; all claims verified by repository source code, empirical evaluation scripts in `/evals/`, or official third-party credentials.

---

## 1. Claims Audit & Resolution Matrix

| # | Claim | Where it Appeared | Evidence & Source of Truth | Action Taken | Current Status |
|---|---|---|---|---|---|
| 1 | "Hallucination-free LLM pipelines" | Former `src/data/blogs.ts:8`, `src/data/research.ts:8` | Graph traversal grounds assertions but cannot theoretically guarantee zero hallucinations on all distributions. | **Rewritten** | Rewritten to "grounds LLM responses with verifiable graph evidence" and "grounds outputs in verified graph and vector context". |
| 2 | "Enterprise-grade / SaaS-grade" | Former `src/components/sections/Hero.tsx:13`, `docs/AUDIT.md:13` | No SLA, SOC2, or enterprise compliance audit exists for student portfolio builds. | **Rewritten** | Rewritten to plain descriptive terms: "production Next.js 15 App Router", "Retrieval-Augmented Generation pipelines". |
| 3 | "Production-grade software" | Former `src/data/profile.ts:48` | Superlative buzzword phrasing. | **Rewritten** | Rewritten to "production software systems". |
| 4 | "State-of-the-art / cutting-edge" | Former `src/components/sections/WhyWorkWithMe.tsx:121` | Unverifiable promotional superlative. | **Rewritten** | Rewritten to "research algorithms, verifiable dual-cloud systems, and reliable full-stack delivery". |
| 5 | "Misinformation Detector & Feature Explainability" | Former `src/data/projects.ts` (former slug `fake-news-classifier`) | Duplicate card duplicating FactLens AI. | **Removed** | Completely removed everywhere; FactLens AI is the single verified platform. |
| 6 | "Design Lead" | Former `src/data/experience.ts` | Overstated role not supported by official engineering achievements. | **Removed** | Removed. Truthful coordinator responsibilities consolidated under Club Coordinator at GDGoC ITER. |
| 7 | "Social Media Designer" | Former `src/data/experience.ts` | Dilutes core AI/ML engineering positioning. | **Removed** | Removed completely. |
| 8 | "Mayavyuh" / "AI Treasure Hunt" | Former `src/data/experience.ts`, `src/data/gallery.ts` | Sub-events that confuse external recruiters. | **Normalized** | Consolidated and normalized strictly to single official event name: "Chakravyuh Genesis". |
| 9 | "Google Gemini 1.5 Flash / Pro" | Former `src/components/ai/ChatBot.tsx:170`, `src/components/sections/Skills.tsx:9`, `src/data/blogs.ts:34` | Dated model string; Google AI recommends Gemini 2.5 / 2.0 series. | **Rewritten** | Replaced with "Google Gemini API" and environment variable `GEMINI_MODEL=gemini-2.5-flash` with graceful fallback. |
| 10 | FactLens AI: "96.2% precision on 50,000 benchmark vectors" | Former `src/data/projects.ts` | F1 score of 96.2% on unreleased private dataset is unverifiable. | **Rewritten** | Replaced with empirical evaluation: 94.0% Accuracy, 0.9400 Macro-F1 on n=100 FEVER/LIAR sample. Documented in `/evals/factlens-ai/`. |
| 11 | InsightAI: "Reduced manual HR time by 60% across 10,000 resumes" | Former `src/data/projects.ts` | Simulated marketing statistic without live HR trial verification. | **Rewritten** | Replaced with empirical ranking evaluation: 100% P@1, 0.9955 NDCG@3 on n=32 resume-JD pairs. Documented in `/evals/insight-ai/`. |
| 12 | Underwater Analytics: "TIH IIT Guwahati Research" | `src/data/projects.ts:172`, `src/data/experience.ts:5` | Discovered public repo `DurgaPavan0923/water_potability` and live deployment. | **Verified** | Evaluated on N=656 holdout lockbox and continuous telemetry stream (0.5951 PR-AUC, 2.89 ms P50). Documented in `/evals/underwater-analytics/`. |
| 13 | News Summarizer: "41.2 ROUGE-1, 38.4 ROUGE-L, 75% compression" | Former `src/data/projects.ts` | Weights were stored externally without local benchmark artifact. | **Rewritten** | Replaced with empirical Lead-3 baseline on CNN/DailyMail (0.5550 ROUGE-1, 0.4281 ROUGE-L) and marked checkpoint evaluation pending in `/docs/OPEN_ITEMS.md`. |
| 14 | IRA Smart City: "+35% resource efficiency across 5,000 nodes" | Former `src/data/projects.ts` | Simulated heuristic in Three.js without municipal grid deployment. | **Rewritten / Labeled Demo** | Removed metric; labeled card as "Simulation prototype / demo mode" and showcased at Abinya 3.0 at Proxima 2026. |
| 15 | AGORA: "+30% decision efficiency, 100% Sybil-Proof" | Former `src/data/projects.ts` | Hackathon prototype without audited blockchain deployment. | **Rewritten / Labeled Demo** | Removed metric; labeled card as "Hackathon project / demo mode" for SOA Regional AI Hackathon 2025. |
| 16 | Elevate Azure: "Engineered enterprise cloud infrastructure" | Former `src/data/experience.ts:57` | Elevate was a 4-week, 25-hour student training program. | **Rewritten** | Described honestly: 4-week virtual cloud internship via AICTE completing labs on Azure Virtual Machines, Blob Storage, and Azure AI Services. |
| 17 | NCC Service: "Senior Warrant Rank" / "5+ Years Active Service" | Former `src/data/leadership.ts:11` | Non-standard military rank string and unverifiable duration claim. | **Rewritten** | Removed ribbon badge string. Accurately described: "NCC Sergeant (A Alpha, B Alpha, C Bravo), SOA University Unit". |
| 18 | CGPA / Education Accuracy | `src/data/profile.ts:26`, `Certifications.tsx` | University student portal record. | **Verified** | Set to `7.85 / 10.0` with verified link to `https://soaportals.com/StudentPortalSOA/#/` and note: *"Student login required; marksheet available on request."* |
| 19 | Experience Bullets Structure | `src/data/experience.ts` | Inconsistent bullet counts across roles. | **Standardized** | Exactly 3 bullets per role across all 6 roles following: "Built/Developed X using Y → outcome or learning". |
| 20 | Skills Structure & Ribbon Clutter | `src/data/skills.ts`, `Skills.tsx` | 3 tiers with decorative marquee ribbon. | **Restructured** | Exactly 4 groups of 6 items each (24 items total: Machine Learning, Generative AI, AI Engineering, Full-Stack & Cloud) in clean 2x2 grid. Decorative ribbon removed. |

---

## 2. Simulated & Demo Feature Transparency

| Feature | Project / Location | Implementation Reality | UI Label / Action Taken |
|---|---|---|---|
| **IoT Sensor Grid Balancing** | IRA Smart City (`/IRA`) | Three.js client-side math simulation with randomized demand spikes. | Explicitly labeled **"Simulation prototype / Demo mode"**. Metrics removed from card. |
| **Soulbound Token Identity Auth** | AGORA Governance | Ethereum Sepolia testnet smart contract prototype. | Explicitly labeled **"Hackathon project / Demo mode"**. Metrics removed from card. |
| **Offline Chatbot Fallback** | AI Assistant (`/api/chat`) | Local regex and heuristic response matrix when API quota or network fails. | Clearly tagged as offline fallback in server response when `GEMINI_API_KEY` is not present. |
| **News Summarizer Model Weights** | Seq2Seq Attention Summarizer | PyTorch checkpoints stored externally. | Evaluated against standard Lead-3 baseline; checkpoint evaluation marked pending in `/docs/OPEN_ITEMS.md`. |
