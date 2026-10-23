# Open Items & Verification Requests

This document tracks items requiring explicit external documents, weights, links, or verification artifacts to uphold the portfolio's hard rule: **every number, claim, and technology on the site must be backed by code, a measurement, or a document in this repo.**

---

## 1. Academic & Education Verification
- **Item:** B.Tech Computer Science & Information Technology CGPA (`07/10`).
- **Where It Appears:** Credentials & Education section (`#credentials`), `src/data/profile.ts`.
- **Status:** Displayed honestly as `07/10` with a direct link to the SOA University Examination Result Portal (`http://115.240.101.71:81/`).
- **Action Needed:**
  - Place an official semester grade sheet or consolidated transcript PDF in `/public/docs/marksheet.pdf`.
  - Alternatively, provide an authenticated digital verification URL from the university registrar.

---

## 2. Credentials Not Present on LinkedIn Profile
The following 5 credentials are in the portfolio data but are not currently listed on your public LinkedIn profile:

1. **IBM Machine Learning Professional Specialization**
   - *Issuer:* IBM / Coursera
   - *Status on Site:* `Credential ID: IBM-COURSERA-ML-SPEC` / "Available on request".
   - *Action Needed:* Provide the direct Coursera certificate verification link (e.g., `coursera.org/verify/...`) or add the credential to your LinkedIn profile.

2. **Tata Cyber Security Analyst Simulation**
   - *Issuer:* Tata Group / Forage
   - *Status on Site:* `Credential ID: TATA-FORAGE-CYBER-2025` / "Available on request".
   - *Action Needed:* Provide the Forage completion certificate link (e.g., `forage-uploads-prod.s3.amazonaws.com/...`) or verification hash.

3. **NPTEL AI & Deep Learning Certification**
   - *Issuer:* NPTEL / IIT Madras
   - *Status on Site:* `Credential ID: NPTEL-AI-2024-PASS` / "Available on request".
   - *Action Needed:* Provide the NPTEL e-certificate link or roll number verification URL.

4. **IISc CeNSE Winter Specialized School**
   - *Issuer:* Indian Institute of Science (IISc Bangalore)
   - *Status on Site:* `Credential ID: IISC-CENSE-WINTER-2025` / "Available on request".
   - *Action Needed:* Provide the participation certificate PDF or department letter.

5. **Generative AI Academy Certification**
   - *Issuer:* Google Cloud / GenAI Academy
   - *Status on Site:* `Credential ID: GENAI-ACADEMY-2025` / "Available on request".
   - *Action Needed:* Provide the Google Cloud Skills Boost badge/certificate URL.

---

## 3. Work Experience & Internships Artifacts

1. **Technology Innovation Hub (TIH), IIT Guwahati**
   - *Role:* Student Intern (Jun 2026 – Present, Remote)
   - *Status on Site:* Modest factual lines describing faculty mentorship, PyTorch evaluation pipelines, and neural representation benchmarking.
   - *Action Needed:* Once research concludes, provide the public GitHub repository, paper preprint link (arXiv), or faculty mentorship verification letter.

2. **InternPro**
   - *Role:* AI/ML Intern (16 Jun 2025 – Jul 2025, 6 weeks)
   - *Status on Site:* Factual summary of the real estate price prediction regression pipeline using Scikit-Learn and Pandas.
   - *Action Needed:* Provide the GitHub repository link or internship completion certificate hash/PDF.

---

## 4. Evaluation Weights & Datasets

1. **News Summarizer Seq2Seq Trained Checkpoint Weights**
   - *Project:* `seq2seq-news-summarizer`
   - *Status in Repo:*
     - Labeled test dataset: 50 CNN/DailyMail articles in `/evals/seq2seq-summarizer/dataset.json`.
     - Script `/evals/seq2seq-summarizer/evaluate.py` successfully evaluated and published Lead-3 baseline metrics (ROUGE-1: 0.5550, ROUGE-2: 0.2801, ROUGE-L: 0.4281, 0.148 ms inference latency).
     - Trained checkpoint is marked **"Evaluation pending local .pt weights"** on the site and in `/evals/seq2seq-summarizer/METHODOLOGY.md`.
   - *Action Needed:* Place the model weights file (e.g., `checkpoint.pt` or Hugging Face repository link) to run the neural inference benchmark against the Lead-3 baseline.

---

## 5. External Technical Blog Links
- *Status:* Three deep-dive architectural articles are fully rendered inside the portfolio's native reader modal (`#blogs` data in `src/data/blogs.ts`).
- *Action Needed:* If these articles are cross-posted to Medium, Dev.to, or Substack, provide the external URLs. The buttons currently open the in-app modal and will never point to a generic GitHub profile.
