# InsightAI ATS Scoring — Evaluation Methodology & Empirical Benchmark

## 1. Executive Summary
InsightAI is an automated resume screening and candidate-job matching engine designed to replace rigid keyword-matching ATS parsers with semantic alignment scoring. This benchmark evaluates ranking quality (Precision@k, NDCG@k) and inference latency comparing raw keyword overlap, TF-IDF cosine similarity, and InsightAI's semantic embedding scoring.

---

## 2. Benchmark Dataset (`dataset.json`)
- **Sample Size ($n$):** 32 candidate resume-job description pairs across 8 core technical disciplines:
  - Machine Learning Engineer ($n=4$)
  - Cloud DevOps & Infrastructure ($n=4$)
  - Full-Stack Next.js / TypeScript ($n=4$)
  - Natural Language Processing ($n=4$)
  - Graph Database & Knowledge Graphs ($n=4$)
  - Computer Vision & Edge AI ($n=4$)
  - Backend Microservices ($n=4$)
  - Data Engineering & Analytics ($n=4$)
- **Ground Truth Relevance Scale:**
  - `2`: Strong Match (Exact technical stack and domain alignment)
  - `1`: Marginal Match (Adjacent technologies or partial qualification)
  - `0`: Non-Match (Cross-domain mismatch, e.g., retail manager applying for backend architect)

---

## 3. Evaluated Ranking Algorithms
1. **Keyword Overlap (Jaccard Similarity):**
   - Measures pure token intersection over union without term weighting.
2. **TF-IDF Cosine Similarity:**
   - Vector space model weighting rare technical keywords higher across the corpus.
3. **Semantic Embedding Similarity (InsightAI Engine):**
   - Hybrid scoring fusing TF-IDF weighting with dense skill synonym expansion and semantic cluster affinity.

---

## 4. Empirical Evaluation Results

| Method | Precision@1 | Precision@3 | NDCG@1 | NDCG@3 | p50 Latency | p95 Latency |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Keyword Overlap (Jaccard)** | 100.0% | 66.7% | 1.0000 | 0.9910 | 0.085 ms | 0.555 ms |
| **TF-IDF Cosine Similarity** | 100.0% | 66.7% | 1.0000 | 0.9910 | 0.125 ms | 0.297 ms |
| **InsightAI Semantic Engine** | **100.0%** | **66.7%** | **1.0000** | **0.9955** | **0.197 ms** | **0.502 ms** |

*(Note: In a pool of 4 candidates per query containing exactly 2 relevant profiles [Grade 2 and Grade 1], the theoretical maximum Precision@3 is $\frac{2}{3} = 66.7\%$. InsightAI achieves the highest NDCG@3 at 0.9955).*

*Raw data available in [`results.json`](./results.json) and [`results.csv`](./results.csv).*

---

## 5. Metric Definitions
- **Precision@1:** Whether the candidate ranked at rank 1 is a verified strong match ($\text{grade} \ge 1.5$).
- **Precision@3:** Proportion of top-3 ranked candidates that are relevant ($\text{grade} \ge 1$).
- **NDCG@k:** Normalized Discounted Cumulative Gain at rank $k$:
  $$\text{DCG}@k = \sum_{i=1}^k \frac{2^{r_i} - 1}{\log_2(i + 1)}, \quad \text{NDCG}@k = \frac{\text{DCG}@k}{\text{IDCG}@k}$$
- **Scoring Latency (p50 / p95):** 50th and 95th percentile wall-clock time required to score and rank each candidate pair.

---

## 6. Execution Environment & Limitations
- **Hardware:** Local Intel/AMD x64 workstation (Windows 11).
- **Execution Date:** October 2026.
- **Limitations:**
  > [!NOTE]
  > **Controlled Evaluation Scope:** Evaluated on $n=32$ curated resume-JD pairs. While demonstrating robust differentiation between qualifying and disqualifying profiles with sub-millisecond scoring, production enterprise screening requires handling heavily formatted multi-page PDFs, OCR artifacts, and proprietary skill ontologies.

---

## 7. How to Reproduce
```bash
python evals/insight-ai/evaluate.py
```
Outputs regenerated `results.json` and `results.csv`.
