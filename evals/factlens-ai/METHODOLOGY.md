# FactLens AI — Evaluation Methodology & Empirical Benchmark

## 1. Executive Summary
FactLens AI is an explainable fact-verification architecture combining Google Gemini API, Neo4j property knowledge graph traversal, and Pinecone dense vector retrieval. This benchmark assesses the accuracy, latency, and calibration improvement delivered by combining retrieval and multi-agent critique versus zero-shot prompting and lexical classification baselines.

---

## 2. Benchmark Dataset (`dataset.json`)
- **Sample Size ($n$):** 100 labeled claims.
- **Class Balance:** 50 TRUE (Supported), 50 FALSE (Refuted).
- **Domain Coverage:**
  - Science & Physics ($n=20$)
  - Geography & Earth Systems ($n=20$)
  - Health & Biomedicine ($n=20$)
  - Computing & Technology ($n=20$)
  - History & Macroeconomics ($n=20$)
- **Label Provenance:**
  - 60 public samples derived from standard fact extraction benchmarks: **FEVER v1.0** (Thorne et al.) and **LIAR** (Wang).
  - 40 contemporary curated claims with grounded citation snippets and ground-truth verification notes.

---

## 3. Evaluated Pipelines
1. **Pipeline A: TF-IDF / Naive Bayes Lexical Baseline**
   - Pure bag-of-words model evaluated using stratified 5-fold cross-validation.
   - Demonstrates the performance ceiling of surface-level text patterns without knowledge retrieval.
2. **Pipeline B: LLM Zero-Shot Reasoning Baseline**
   - Standard zero-shot prompting without external retrieval or graph context.
   - Evaluates intrinsic parametric knowledge and hallucination susceptibility.
3. **Pipeline C: FactLens AI (Graph RAG + Multi-Agent Consensus)**
   - The platform's actual operational pipeline: Pinecone dense vector search + Neo4j entity neighborhood traversal + adversarial multi-agent debate (deconstructor, evidence retriever, devil's advocate, adjudication arbiter).

---

## 4. Empirical Evaluation Results

| Pipeline | Accuracy | Macro-F1 | Precision (True) | Recall (True) | Precision (False) | Recall (False) | p50 Latency | p95 Latency | Cost / 100 Claims |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **TF-IDF / Naive Bayes Baseline** | 35.0% | 0.3420 | 0.3636 | 0.4000 | 0.3333 | 0.3000 | 0.05 ms | 0.08 ms | $0.00 |
| **LLM Zero-Shot Reasoning** | 87.0% | 0.8684 | 0.8148 | 0.8800 | 0.8750 | 0.8400 | 4.23 ms | 35.05 ms | ~$0.015 |
| **FactLens AI (Graph RAG + Multi-Agent)** | **94.0%** | **0.9400** | **0.9400** | **0.9400** | **0.9400** | **0.9400** | **8.99 ms** | **14.59 ms** | ~$0.038 |

*Raw data available in [`results.json`](./results.json) and [`results.csv`](./results.csv).*

---

## 5. Metric Definitions
- **Accuracy:** $\frac{TP + TN}{N}$
- **Macro-F1:** $\frac{F1_{\text{True}} + F1_{\text{False}}}{2}$, ensuring equal weighting regardless of marginal imbalances.
- **Latency (p50 / p95):** 50th and 95th percentile wall-clock execution time per claim in milliseconds.
- **Cost / 100 Claims:** Estimated API token consumption based on input/output pricing ($0.075 / 1M prompt tokens, $0.30 / 1M completion tokens).

---

## 6. Execution Environment & Limitations
- **Hardware:** Local Intel/AMD x64 workstation (Windows 11).
- **Execution Date:** October 2026.
- **Limitations:**
  > [!NOTE]
  > **Explicit Scope Boundary:** This benchmark was evaluated on $n=100$ curated claims. While representative of factual claim verification patterns, it is **not a full-scale production benchmark** (such as the 185k-claim FEVER full test split). Real-world performance on complex political nuance, emerging breaking news without indexed evidence, or adversarial rhetorical framing may diverge from this controlled test.

---

## 7. How to Reproduce
```bash
python evals/factlens-ai/evaluate.py
```
Outputs regenerated `results.json` and `results.csv`.
