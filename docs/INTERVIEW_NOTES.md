# Technical Interview Defense & Architecture Notes

This document provides complete, interview-defensible technical walk-throughs, data flow diagrams, failure cases, engineering trade-offs, and 10 likely interviewer questions with concise, technically accurate answers for every featured project and production pipeline in this portfolio.

---

# 1. FactLens AI — Multi-Agent Explainable AI Platform

## 1.1 Architecture Walk-Through & Data Flow
FactLens AI is an explainable fact-verification architecture designed to eliminate black-box classification by fusing vector retrieval with property knowledge graphs and multi-agent adversarial debate.

```
Inbound Claim
     │
     ▼
[Step 1: Normalization & Named Entity Disambiguation]
     │
     ├─────────────────────────────────────────┐
     ▼                                         ▼
[Step 2: Dense Vector Retrieval]        [Step 3: Graph Traversal]
Pinecone Serverless (Cosine on text-    Neo4j AuraDB (2-hop Cypher query
embedding-004 / 768-dim embeddings)     for entity relationship clusters)
     │                                         │
     └────────────────────┬────────────────────┘
                          ▼
            [Step 4: Multi-Agent Consensus]
               ├─► Deconstructor Agent (Isolates atomic facts)
               ├─► Evidence Retriever (Grounded citations)
               ├─► Devil's Advocate (Adversarial counter-arguments)
               └─► Adjudication Arbiter (Gemini API verdict)
                          │
                          ▼
        [Step 5: XAI Report & Academic Citations]
         Confidence Intervals, Linguistic Bias Heatmap,
         Exportable BibTeX / APA / MLA Citations
```

## 1.2 Key Files and Why
- `src/lib/gemini.ts`: Manages server-side Gemini API calls, schema-constrained structured JSON output parsing, and fallback error handling.
- `evals/factlens-ai/evaluate.py`: Standalone evaluation harness running 5-fold cross-validation on lexical baselines, zero-shot LLM reasoning, and grounded Graph RAG.
- `evals/factlens-ai/dataset.json`: Labeled claim benchmark ($n=100$, 50 True, 50 False) with FEVER v1.0 and LIAR provenance.

## 1.3 Engineering Trade-Offs
- **Graph RAG vs. Pure Vector Search:** Vector search alone is fast ($O(1)$ ANN search) but blind to relationship hierarchies. Neo4j graph traversal adds $15\text{--}30\text{ ms}$ overhead but enables 2-hop entity lineage audits that prevent hallucinated connections.
- **Multi-Agent Consensus vs. Single Prompt:** Orchestrating 4 agents incurs 3x token overhead and higher latency, but reduces sycophantic bias and improves adversarial edge-case detection.

## 1.4 Failure Cases & Edge Scenarios
- **Cold-Start Entities:** Emerging breaking news with no prior nodes in Neo4j AuraDB falls back strictly to vector web retrieval, lowering confidence scores.
- **Rhetorical Sarcasm / Irony:** Claims embedded in satire or colloquial sarcasm can mislead lexical entity extractors unless pre-filtered with contextual tone classifiers.

## 1.5 Evaluation Method & Empirical Limits
- **Method:** Evaluated on $n=100$ balanced claims. Compared against TF-IDF / Naive Bayes (35.0% Acc) and Zero-Shot LLM (87.0% Acc). FactLens AI achieved 94.0% accuracy, 0.9400 Macro-F1, and 8.99 ms p50 latency.
- **Limits:** $n=100$ is a controlled benchmark subset, not a 185k-claim full production test. Real-world performance may degrade on ambiguous or multimodal claims.

## 1.6 10 Likely Interviewer Questions & Concise Answers
1. **Why did you use Neo4j in addition to Pinecone?**  
   *Vector databases measure semantic similarity between text chunks but cannot represent explicit entity-relationship schemas. Neo4j allows Cypher queries to traverse multi-hop connections (e.g., source $\to$ publisher $\to$ financial backer), providing verifiable provenance.*
2. **How do you prevent agent hallucination in the consensus layer?**  
   *We enforce strict context grounding: the Adjudication Arbiter is prompt-constrained to cite only spans present in retrieved vector chunks or graph edges, refusing ungrounded assertions.*
3. **What is the latency bottleneck in the pipeline?**  
   *Sequential LLM calls across agents. We mitigated this by parallelizing the Evidence Retriever and Devil's Advocate agents using `Promise.all` / asynchronous worker threads.*
4. **How do you handle API rate limits during high claim throughput?**  
   *By caching normalized claim vectors in Pinecone and embedding lookups in Redis, avoiding duplicate inference calls for previously audited claims.*
5. **Why Gemini API over OpenAI GPT-4?**  
   *Gemini offers high context-window throughput, native multimodal capabilities for future video/image expansion, and highly competitive developer pricing.*
6. **How do you format APA/MLA citations accurately?**  
   *The Adjudication Agent outputs structured JSON containing author, publication, date, URL, and archival DOI, which a deterministic client utility formats into standard citation strings.*
7. **What happens if Pinecone and Neo4j return conflicting evidence?**  
   *The Devil's Advocate agent flags the contradiction, prompting the Arbiter to widen its confidence interval and output an "Unverified / Contested" verdict rather than a false binary.*
8. **Why did your TF-IDF baseline score only 35%?**  
   *Because factual verification cannot be solved by lexical surface terms alone; false claims often use the exact same vocabulary as true claims, differing only in relational truth.*
9. **How would you scale this to 10,000 queries per minute?**  
   *Distribute claim normalization to a Kafka queue, deploy quantized SLMs (e.g. Llama 3 8B) on auto-scaling GPU nodes (vLLM/Triton), and use Pinecone serverless read replicas.*
10. **What is your biggest takeaway from building FactLens AI?**  
    *Explainability is far more important to users than a raw confidence number. Showing the evidence graph and opposing counter-arguments builds genuine trust.*

---

# 2. InsightAI — Resume Screening & ATS Engine

## 2.1 Architecture Walk-Through & Data Flow
InsightAI parses unstandardized candidate resumes (PDF/DOCX), normalizes structural sections, computes multidimensional semantic match matrices against Job Descriptions, and synthesizes technical interview rubrics.

```
Candidate Resume (PDF/DOCX)               Job Description (Text)
         │                                          │
         ▼                                          ▼
[PyPDF / Layout Extractor]                 [Job Spec Ingestion]
         │                                          │
         ├──────────────────────────────────────────┘
         ▼
[Section Chunking: Experience, Skills, Education]
         │
         ▼
[Dual Scoring Engine]
  ├─► TF-IDF Term Weighting (Penalizes repetitive keyword stuffing)
  └─► Semantic Embedding Cosine Similarity (Identifies conceptual domain overlap)
         │
         ▼
[Weighted Ranking & Skill Gap Matrix]
  - Precision@1, Precision@3, NDCG@3 Score Computation
  - Contextual Technical Interview Question Generator
```

## 2.2 Key Files and Why
- `evals/insight-ai/evaluate.py`: Benchmarking script comparing Jaccard keyword overlap, TF-IDF cosine, and InsightAI's semantic engine across 32 pairs.
- `evals/insight-ai/dataset.json`: Labeled resume-JD corpus covering 8 technical engineering disciplines with graded relevance (2 = Match, 1 = Partial, 0 = Non-Match).

## 2.3 Engineering Trade-Offs
- **TF-IDF + Embeddings vs. Pure LLM Scoring:** Running full LLM prompts on every resume is prohibitively expensive ($0.05+ per resume) and slow (~2s). Our hybrid vector-TF-IDF pipeline scores candidates in $0.197\text{ ms}$ (p50) for less than $0.0001, reserving LLMs solely for interview question generation.
- **Client Parsing vs. Server Microservice:** Client-side parsing saves server compute but fails on complex two-column PDF streams. We decoupled parsing into a Dockerized FastAPI service with fallback regex extractors.

## 2.4 Failure Cases & Edge Scenarios
- **Multi-Column Formatting:** Resumes with stylized multi-column tables can interleave unrelated sentences if read strictly by line index.
- **Acronym Ambiguity:** Terms like "BERT" (NLP model vs. business intelligence tool) require contextual sentence windows to disambiguate.

## 2.5 Evaluation Method & Empirical Limits
- **Method:** Evaluated on $n=32$ candidate pairs across 8 technical queries. InsightAI achieved 100% Precision@1, 66.7% Precision@3 (theoretical maximum in pool of 2 qualifying candidates), and 0.9955 NDCG@3 with 0.197 ms p50 scoring latency.
- **Limits:** Dataset uses clean synthetic pairs. In production, OCR artifacts and scanned image resumes introduce noise requiring LayoutLM or Amazon Textract.

## 2.6 10 Likely Interviewer Questions & Concise Answers
1. **Why is keyword matching insufficient for ATS?**  
   *Keyword matching rewards candidates who copy-paste job descriptions in white font, while rejecting qualified candidates who write "Kubernetes orchestrator" instead of "K8s cluster management".*
2. **Explain NDCG@k and why it matters here.**  
   *Normalized Discounted Cumulative Gain evaluates whether the best candidates appear at the top of the ranked list, penalizing relevant profiles placed in lower positions logarithmically.*
3. **How does your system penalize keyword stuffing?**  
   *By combining sub-linear term frequency scaling ($\text{TF} = 1 + \ln(\text{count})$) with inverse document frequency and cosine vector normalizations, preventing repetitive terms from inflating scores.*
4. **Why did your semantic engine score 0.9955 NDCG@3 vs 0.9910 for keyword overlap?**  
   *Because semantic synonym expansion correctly promoted partial-match profiles with adjacent technologies above completely irrelevant cross-domain candidates.*
5. **How are interview questions generated?**  
   *The system computes the set difference between JD requirements and candidate resume skills, feeding this delta into a prompt that requests targeted technical verification questions.*
6. **What is the time complexity of scoring $N$ resumes against 1 JD?**  
   *$O(N \cdot |V|)$ for sparse TF-IDF vectors, and $O(N \cdot D)$ for dense $D$-dimensional embeddings, taking under 10 ms for 100 resumes.*
7. **How do you address algorithmic hiring bias?**  
   *By stripping demographic identifiers (name, age, gender, graduation years, address) before tokenization and vectorization, scoring purely on technical competencies.*
8. **What library do you use for PDF parsing?**  
   *PyPDF / pdfminer for layout extraction, normalizing text blocks before tokenization.*
9. **How would you improve PDF text extraction in production?**  
   *Use an OCR vision model (like LayoutLMv3 or Marker) to preserve spatial hierarchy and tabular boundaries.*
10. **How does the system handle junior vs senior candidate evaluation?**  
    *By extracting temporal tenure markers and project ownership verbs (e.g. "architected", "led" vs "assisted"), weighting seniority alongside raw skill overlap.*

---

# 3. News Summarizer with Seq2Seq Attention

## 3.1 Architecture Walk-Through & Data Flow
Abstractive text summarization trained on CNN/DailyMail news article pairs, utilizing a bidirectional encoder and Bahdanau additive attention decoder.

```
Source News Article (Up to 1000 tokens)
                  │
                  ▼
[Byte-Pair Tokenizer & Embedding Layer]
                  │
                  ▼
[Bidirectional GRU / LSTM Encoder]
  Produces sequence of encoder hidden states: h_1, h_2, ..., h_Tx
                  │
                  ▼
[Bahdanau Additive Attention Mechanism]
  Calculates dynamic alignment scores: e_ts = v^T tanh(W s_{t-1} + U h_s)
  Computes context vector c_t as weighted sum of encoder hidden states
                  │
                  ▼
[Autoregressive Decoder with Beam Search]
  Generates probability distribution over vocabulary at step t
  Beam width = 4 with length penalty alpha = 0.6
                  │
                  ▼
Condensed Abstractive Summary Highlights
```

## 3.2 Key Files and Why
- `evals/seq2seq-summarizer/evaluate.py`: Empirical ROUGE calculation script running Lead-3 baseline and evaluating against reference highlights.
- `evals/seq2seq-summarizer/dataset.json`: Benchmark subset of $n=50$ CNN/DailyMail news articles and reference highlights.

## 3.3 Engineering Trade-Offs
- **Extractive vs. Abstractive Summarization:** Extractive methods (like Lead-3) achieve strong ROUGE scores simply by copying opening sentences, but lack conciseness. Abstractive Seq2Seq models synthesize original phrasing but require careful regularization to avoid hallucinating facts.
- **Additive (Bahdanau) vs. Multiplicative (Luong) Attention:** Bahdanau additive attention uses a feed-forward layer to calculate compatibility, which provides smoother gradient propagation on longer sequences at a minor computational cost.

## 3.4 Failure Cases & Edge Scenarios
- **Repetitive Loops:** Recurrent decoders without coverage penalties frequently repeat salient phrases (e.g., "the conference delegates... the conference delegates").
- **Factual Distortion:** Abstractive generation can occasionally re-attribute quotes to the wrong speaker if multiple named entities are mentioned in close proximity.

## 3.5 Evaluation Method & Empirical Limits
- **Method:** Evaluated on $n=50$ CNN/DailyMail test articles. Lead-3 baseline achieved 0.5550 ROUGE-1, 0.2801 ROUGE-2, and 0.4281 ROUGE-L with 0.148 ms p50 latency.
- **Checkpoint Status:** In accordance with repository standards, the Lead-3 baseline is empirically verified locally, while full Seq2Seq `.pt` model checkpoint weights are hosted externally and flagged in `OPEN_ITEMS.md`.

## 3.6 10 Likely Interviewer Questions & Concise Answers
1. **What is Bahdanau attention and how does it differ from Luong attention?**  
   *Bahdanau uses an additive compatibility function ($v^T \tanh(W s_{t-1} + U h_i)$) computed from the previous decoder hidden state, whereas Luong uses a multiplicative dot product ($s_t^T W h_i$) using the current decoder state.*
2. **Why does Lead-3 perform so well on CNN/DailyMail?**  
   *News journalism follows the "inverted pyramid" style, where the most important facts (who, what, where, when) are concentrated in the first three paragraphs.*
3. **What is the difference between ROUGE-1, ROUGE-2, and ROUGE-L?**  
   *ROUGE-1 measures unigram overlap (vocabulary coverage); ROUGE-2 measures consecutive bigram overlap (fluency); ROUGE-L measures the Longest Common Subsequence (sentence-level structure).*
4. **How did you prevent exposure bias during training?**  
   *By employing scheduled sampling (decaying teacher forcing), gradually forcing the decoder to condition on its own previous generation rather than ground-truth tokens.*
5. **How does beam search decoding work?**  
   *Instead of greedy decoding (taking the single highest-probability token), beam search maintains the top $K$ candidate hypotheses at each time step, pruning lower-probability paths.*
6. **Why do recurrent Seq2Seq models struggle on very long articles?**  
   *Vanishing and exploding gradients across long recurrent unrolls, and memory constraints that limit attention matrix operations beyond 1,000 tokens.*
7. **How does a coverage mechanism help in text summarization?**  
   *It maintains a sum of attention distributions over previous steps, penalizing the attention mechanism for attending to previously summarized source words, eliminating repetition.*
8. **What loss function did you use?**  
   *Cross-entropy loss over the target vocabulary, masked to ignore padding tokens.*
9. **How would you modernize this architecture today?**  
   *Fine-tune a pretrained transformer like DistilBART or T5 using LoRA (Low-Rank Adaptation) for faster convergence and superior zero-shot transfer.*
10. **What is the biggest limitation of ROUGE metrics?**  
    *ROUGE relies purely on string overlap. A valid abstractive summary using exact synonyms can receive an artificially low ROUGE score despite being factually perfect.*

---

# 4. GitHub Live Telemetry Pipeline

## 4.1 Architecture & Flow
```
Client Page Load
       │
       ▼
Next.js Server Route (`/api/github`)
       │
       ├─► Read `GITHUB_TOKEN` from server environment
       │
       ├─► Query GitHub GraphQL API (User, Repos, ContributionCalendar)
       │     │
       │     ├─► Success: Compute streak, commit counts, languages
       │     │            Cache with Next.js ISR (revalidate: 3600s)
       │     │
       │     └─► Failure / Token Unset: Serve static fallback (`github-snapshot.json`)
       │
       ▼
Client UI Hydration (SSR-safe initial values, no 0+ counter flash)
```

## 4.2 Key Security Controls
- `GITHUB_TOKEN` is strictly server-side and never exposed to the client bundle.
- Revalidation interval (`3600` seconds) prevents GitHub API rate limit exhaustion (5,000 GraphQL req/hr).
- If GitHub API is unreachable, the route returns `200 OK` with `data.isStale: true` and the cached snapshot, ensuring 100% uptime.

## 4.3 5 Interviewer Questions
1. **Why GraphQL instead of REST for GitHub stats?**  
   *A single GraphQL query fetches user metadata, pinned repositories, repository stars, language byte distributions, and the complete 365-day contribution calendar in one round-trip.*
2. **How do you calculate contribution streaks?**  
   *We traverse the `contributionCalendar.weeks` days in reverse from today, counting consecutive days where `contributionCount > 0`.*
3. **How do you prevent hydration errors when displaying live numbers?**  
   *Initial React state is initialized directly with snapshot baseline numbers, ensuring the server HTML and client initial render match identically.*

---

# 5. Contact API Delivery Pipeline (`/api/contact`)

## 5.1 Architecture & Defense in Depth
```
Inbound POST `/api/contact`
       │
       ▼
[Layer 1: Node.js Runtime Verification]
       │
       ▼
[Layer 2: Honeypot & Time-Trap Check]
  - If hidden `company` field is populated ──► Silently discard (200 OK spoof)
  - If form submission duration < 2500ms ──► Discard bot submission
       │
       ▼
[Layer 3: IP Sliding-Window Rate Limiting]
  - Max 3 requests per 10 minutes per IP
       │
       ▼
[Layer 4: Zod Input Validation & Sanitization]
  - Name (2-100 chars), Email (strict RFC format), Subject, Message (10-2000 chars)
  - HTML character escaping to prevent XSS injection
       │
       ▼
[Layer 5: Dual Dispatch Engine]
  - Primary: Resend API (`RESEND_API_KEY`) to rdpkumar2308@gmail.com
  - Secondary Fallback: Gmail SMTP via Nodemailer
```

## 5.2 5 Interviewer Questions
1. **How do you protect the form from automated spam without CAPTCHA?**  
   *Dual defense: a CSS-hidden honeypot field that bots auto-fill, and a timestamp check that rejects submissions made in under 2.5 seconds.*
2. **What happens if Resend encounters an outage?**  
   *The catch block automatically invokes the Nodemailer Gmail SMTP transport, ensuring no inquiries are lost.*
3. **Why do you return a 200 OK to honeypot triggers?**  
   *Spoofing success prevents automated bot scripts from learning they were filtered and attempting alternate evasion tactics.*
