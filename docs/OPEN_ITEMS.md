# Open Items & Verification Requests

**Branch:** `feat/final-credibility-pass`  
**Date:** November 2026  
**Standard:** Every claim, number, and technology must be backed by code, an evaluation artifact, or a verified document.

This document tracks items requiring explicit external documents, weights, links, or verification artifacts to uphold strict interview defensibility.

---

## 1. Production Environment Variables (Vercel Project Settings)
To enable live telemetry and AI features on Vercel:
1. **`GITHUB_TOKEN`:** Add a read-only GitHub Personal Access Token (classic with `read:user` and public repo scope, or fine-grained PAT) for user `DurgaPavan0923`. (When omitted, the app gracefully falls back to `github-snapshot.json` with a transparent "Cached" indicator).
2. **`REVALIDATE_SECRET`:** Set a secret token for the `/api/revalidate` on-demand cache clearing route.
3. **`GEMINI_API_KEY`:** Add API key for Google Gemini assistant (`/api/chat`). (When omitted, the app gracefully renders structured local answers).
4. **`RESEND_API_KEY`:** Add Resend API key for `/api/contact` email dispatch to `rdpkumar2308@gmail.com`.

---

## 2. Academic & Education Verification
- **Item:** B.Tech Computer Science (AI & ML) CGPA (`7.85 / 10.0`).
- **Where It Appears:** Credentials & Education section (`#credentials`), `src/data/profile.ts`, Command Palette (`act-result-portal`), Chatbot.
- **Status:** Displayed honestly as `7.85 / 10.0` with a direct link to the SOA University Examination Result Portal (`https://soaportals.com/StudentPortalSOA/#/`) and note *"Student login required; marksheet available on request."*
- **Action Needed:**
  - Place an official semester grade sheet or consolidated transcript PDF in `/public/docs/marksheet.pdf`.
  - Alternatively, provide an authenticated digital verification URL from the university registrar.

---

## 3. Credentials Verification Status

| # | Credential / Event | Issuer | Current Portfolio Status | Action Needed from Candidate |
|---|---|---|---|---|
| 1 | **Neo4j Certified Professional** | Neo4j Graph Academy | **VERIFIED** (ID: `178619623`) | None; verified and linkable. |
| 2 | **Google Cloud Badges** | Google Cloud Skills Boost | **VERIFIED** (98 total badges: 57 skill + 12 arcade + 9 trivia + 18 lab-free courses) | Add public profile URL to Skills Boost if desired. |
| 3 | **IBM Machine Learning Specialization** | IBM / Coursera | "Available on request" | Provide Coursera verification link (`coursera.org/verify/...`). |
| 4 | **Microsoft Elevate: Azure Cloud** | Microsoft / AICTE | "Available on request" | Provide AICTE/Microsoft certificate link or PDF. |
| 5 | **NPTEL AI & Deep Learning** | NPTEL / IIT Madras | "Available on request" | Provide NPTEL e-certificate link or roll number. |
| 6 | **Tata Cyber Security Analyst Simulation** | Tata Group / Forage | "Available on request" | Provide Forage completion link or certificate hash. |
| 7 | **Adobe India GenAI Hackathon** | Adobe | **Participation** | Participation badge recorded. |
| 8 | **Convolve 4.0 Pan-IIT AI/ML Hackathon** | IIT Kharagpur & IIT Guwahati | **Participation** | Participation badge recorded. |
| 9 | **ICAAIMLS 2025 International Conference** | ICAAIMLS | **Participation** | Participation badge recorded. |

---

## 4. Work Experience & Internships Artifacts

1. **Technology Innovation Hub (TIH), IIT Guwahati**
   - *Role:* Project Intern (Jul – Sep 2025, Online)
   - *Status on Site:* **VERIFIED & RESOLVED**. Canonical repository: `https://github.com/DurgaPavan0923/RajanaDurgaPavanKumar_C1_ONLINETIHIITG` and live potability deployment: `https://water-potability-vert.vercel.app/`. Project title: *'Development of an AI-Based Model to Detect and Predict Underwater Environmental Changes Using Water Quality Parameters'*. Evaluated on N=656 holdout lockbox and continuous telemetry stream; published in `/evals/underwater-analytics/` and featured on the site.

2. **Edunet Foundation (IBM SkillsBuild & AICTE)**
   - *Role:* Artificial Intelligence Intern (May – Jun 2025)
   - *Status on Site:* **VERIFIED & RESOLVED**. Canonical repository: `https://github.com/DurgaPavan0923/AI-Powered-Fake-News-Detector-for-Students`. FactLens AI explainable fact-verification architecture with offline evaluation in `/evals/factlens-ai/`.

3. **InternPro**
   - *Role:* AI/ML Intern (16 Jun – 28 Jul 2025)
   - *Status on Site:* Factual summary of the real estate price prediction regression pipeline using Scikit-Learn and Pandas (`https://github.com/DurgaPavan0923/real-estate-prediction`).
   - *Action Needed:* Place internship completion certificate PDF in `/public/docs/internpro-certificate.pdf` if available.

---

## 5. Evaluation Weights & Datasets

1. **News Summarizer Seq2Seq Trained Checkpoint Weights**
   - *Project:* `seq2seq-news-summarizer`
   - *Status in Repo:*
     - Labeled test dataset: 50 CNN/DailyMail articles in `/evals/seq2seq-summarizer/dataset.json`.
     - Script `/evals/seq2seq-summarizer/evaluate.py` evaluated and published Lead-3 baseline metrics (ROUGE-1: 0.5550, ROUGE-2: 0.2801, ROUGE-L: 0.4281, 0.148 ms inference latency).
     - Trained checkpoint is marked **"Evaluation pending local .pt weights"** on the site and in `/evals/seq2seq-summarizer/METHODOLOGY.md`.
   - *Action Needed:* Place the model weights file (e.g., `checkpoint.pt` or Hugging Face repository link) to run the neural inference benchmark against the Lead-3 baseline.

---

## 6. Technical Blogs Section
- *Status:* Unmounted from main navigation and page flow because zero `.mdx` files or published external URLs exist in the repository.
- *Action Needed:* When articles are published to Medium, Dev.to, or Substack, add external publication URLs and remount the section.
