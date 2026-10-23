import { Project } from '@/types';

export const PROJECTS: Project[] = [
  // 1. FEATURED PROJECT 1: FactLens AI
  {
    slug: 'factlens-ai',
    name: 'FactLens AI',
    emoji: '🔍',
    category: 'Full Stack AI',
    featured: true,
    tagline: 'Multi-Agent Explainable AI Platform for Fact Verification & Media Literacy',
    description:
      'An explainable fact-verification system combining Google Gemini API, Neo4j knowledge graph traversal, and Pinecone vector search to verify digital claims with evidence citations.',
    problem:
      'Digital misinformation spreads faster than editorial verification teams can review claims. Black-box classifiers provide arbitrary credibility scores without transparent provenance, citations, or entity relations.',
    approach:
      'Architected a hybrid Graph RAG pipeline using Pinecone serverless vector search, Neo4j property graph traversal, and an adversarial multi-agent consensus protocol (deconstructor, evidence retriever, devil’s advocate, arbiter) powered by Google Gemini API.',
    solution:
      'Engineered an asynchronous multi-agent consensus architecture using Gemini API, Neo4j graph traversal, and Pinecone semantic embeddings. The platform extracts claims, validates them against trusted vector indices, generates explainability dashboards, and formats academic citations (APA, MLA, BibTeX).',
    evalResult: {
      summary: 'Evaluated against lexical baseline (35.0% Acc) and zero-shot LLM (87.0% Acc). FactLens AI achieved 94.0% accuracy with grounded citation generation.',
      dataset: 'FEVER v1.0 & LIAR Benchmark Sample',
      sampleSize: 'n = 100 claims (50 True, 50 False)',
      date: 'October 2026',
      metrics: [
        { label: 'Accuracy', value: '94.0%' },
        { label: 'Macro-F1', value: '0.9400' },
        { label: 'p50 Latency', value: '8.99 ms' },
        { label: 'p95 Latency', value: '14.59 ms' },
      ],
    },
    whatIdImprove:
      'Add multi-modal image and video reverse-search pipelines, and deploy on-premise quantized small language models (SLMs) to reduce per-query API token costs.',
    evalUrl: 'https://github.com/DurgaPavan0923/pavan_portfolio/blob/main/evals/factlens-ai/METHODOLOGY.md',
    architecture:
      'Inbound Claim Ingest → Text Preprocessing & Entity Disambiguation → Pinecone Hybrid Vector Search → Neo4j Knowledge Graph Traversal → Multi-Agent Consensus Validator → Explainable AI (XAI) Dashboard & Report Generation.',
    architectureSteps: [
      {
        icon: '📥',
        title: 'Claim Ingest & Normalization',
        desc: 'Extracts core statements, strips stylistic noise, and identifies named entities with timestamp metadata.',
      },
      {
        icon: '⚡',
        title: 'Pinecone Vector Retrieval',
        desc: 'Queries dense embeddings against indexed verified claim databases and reference archives.',
      },
      {
        icon: '🕸️',
        title: 'Neo4j Graph Relationship Map',
        desc: 'Explores cross-entity relationships, source credibility clusters, and propagation paths in real time.',
      },
      {
        icon: '🤖',
        title: 'Multi-Agent Consensus Layer',
        desc: 'Orchestrates Gemini agents in adversarial critique mode to synthesize a balanced credibility verdict.',
      },
      {
        icon: '📊',
        title: 'XAI Diagnostic Dashboard',
        desc: 'Renders confidence intervals, linguistic bias indicators, and structured citation exports.',
      },
    ],
    technologies: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'Tailwind CSS',
      'Google Gemini API',
      'Neo4j',
      'Pinecone',
      'Zustand',
      'Framer Motion',
    ],
    deployment: 'Vercel Edge Runtime, Neo4j AuraDB Cloud, Pinecone Serverless Vector Index',
    impact:
      'Evaluated on n=100 claims (FEVER/LIAR sample); achieved 94.0% verification accuracy and 8.99 ms p50 evaluation latency with structured citation generation.',
    metrics: [
      { label: 'Accuracy', value: '94.0% (n=100)' },
      { label: 'Macro-F1', value: '0.9400' },
      { label: 'p50 Latency', value: '8.99 ms' },
      { label: 'Graph DB', value: 'Neo4j AuraDB' },
    ],
    tags: ['Next.js 15', 'Gemini API', 'Neo4j', 'Pinecone', 'Multi-Agent', 'Explainable AI'],
    githubUrl: 'https://github.com/DurgaPavan0923/AI-Powered-Fake-News-Detector-for-Students',
    liveUrl: 'https://ai-powered-fake-news-detector-for-s.vercel.app/',
    stars: 18,
    forks: 5,
  },

  // 2. FEATURED PROJECT 2: InsightAI ATS Engine
  {
    slug: 'insight-ai',
    name: 'InsightAI — Resume Screening & ATS Engine',
    emoji: '📄',
    category: 'NLP',
    featured: true,
    tagline: 'Semantic ATS Scoring, Skill Alignment & Interview Question Synthesizer',
    description:
      'A recruitment document intelligence engine that parses resumes, measures semantic alignment with job descriptions, and highlights skill gaps.',
    problem:
      'Traditional ATS software relies on primitive keyword matching, discarding qualified candidates with non-identical phrasing while passing keyword-stuffed resumes.',
    approach:
      'Built a semantic alignment scoring engine combining TF-IDF weighted skill matrices, domain synonym expansion, and embedding cosine similarity to rank candidates against structured job descriptions.',
    solution:
      'Built a semantic matching engine combining transformer embeddings, TF-IDF skill weightings, and cosine similarity scoring. Automatically highlights skill gaps and generates contextual technical interview questions.',
    evalResult: {
      summary: 'Evaluated across 8 engineering roles; achieved 100% Precision@1 and 0.9955 NDCG@3, outperforming keyword overlap (0.9910 NDCG@3) with sub-millisecond scoring.',
      dataset: 'Technical Resume-JD Screening Corpus',
      sampleSize: 'n = 32 candidate pairs (8 queries)',
      date: 'October 2026',
      metrics: [
        { label: 'Precision@1', value: '100.0%' },
        { label: 'NDCG@3', value: '0.9955' },
        { label: 'p50 Latency', value: '0.197 ms' },
        { label: 'p95 Latency', value: '0.502 ms' },
      ],
    },
    whatIdImprove:
      'Implement OCR document layout parsing (LayoutLM) to handle complex multi-column PDF formatting and fine-tune a domain-specific cross-encoder for recruiter re-ranking.',
    evalUrl: 'https://github.com/DurgaPavan0923/pavan_portfolio/blob/main/evals/insight-ai/METHODOLOGY.md',
    architecture:
      'PDF Parsing (PyPDF) → Tokenization & Lemmatization → Transformer Semantic Embedding → Cosine Similarity Matcher → Skill Gap Matrix → Recruiter Question Copilot.',
    architectureSteps: [
      {
        icon: '📑',
        title: 'Document Ingestion',
        desc: 'Parses multi-column PDF/DOCX layouts, normalizes section headers, and extracts education/experience.',
      },
      {
        icon: '🧠',
        title: 'Vector Embeddings',
        desc: 'Encodes candidate achievements and job requirements into semantic vectors.',
      },
      {
        icon: '🎯',
        title: 'Semantic Alignment',
        desc: 'Calculates skill affinity scores while penalizing superficial keyword repetition.',
      },
      {
        icon: '🎙️',
        title: 'Interview Copilot',
        desc: 'Synthesizes targeted interview questions based on candidate resume gaps.',
      },
    ],
    technologies: [
      'Python',
      'PyTorch',
      'Hugging Face',
      'Scikit-learn',
      'FastAPI',
      'Streamlit',
      'Docker',
    ],
    deployment: 'Streamlit Cloud / Vercel Edge, Dockerized microservice on Render',
    impact:
      'Evaluated on n=32 resume-JD pairs; achieved 100% Precision@1 and 0.9955 NDCG@3 with 0.197 ms p50 scoring latency.',
    metrics: [
      { label: 'Precision@1', value: '100.0%' },
      { label: 'NDCG@3', value: '0.9955' },
      { label: 'p50 Latency', value: '0.197 ms' },
      { label: 'Runtime', value: 'FastAPI / Docker' },
    ],
    tags: ['Python', 'NLP', 'Transformers', 'FastAPI', 'Semantic Search', 'ATS'],
    githubUrl: 'https://github.com/DurgaPavan0923/AI-Resume-Screening-Job-Match-System',
    liveUrl: 'https://ai-resume-screening-job-match-syste-one.vercel.app/',
    stars: 15,
    forks: 5,
  },

  // 3. FEATURED PROJECT 3: AI-Based Underwater Environmental Analytics
  {
    slug: 'underwater-analytics',
    name: 'AI-Based Underwater Environmental Analytics',
    emoji: '🌊',
    category: 'Full Stack AI',
    featured: true,
    tagline: 'Dual-Track Machine Learning & Environmental Telemetry for Water Potability & Oceanographic Sensor Forecasting',
    description:
      'A zero-leakage machine learning system developed under TIH IIT Guwahati for calibrated water potability classification, WHO guideline compliance auditing, and continuous underwater sensor stream anomaly detection & forecasting.',
    problem:
      'Conventional water quality analysis relies on slow batch laboratory assays or rigid regulatory rule envelopes that misclassify non-linear contaminant interactions. Furthermore, oceanographic buoy telemetry suffers from harsh drift and lack of causal forecasting.',
    approach:
      'Engineered a dual-track architecture: Track B evaluates 9 bulk physicochemical attributes with fold-isolated scaling, Platt-calibrated XGBoost, and strict WHO guardrails; Track A applies walk-forward causal lag forecasting and Isolation Forest anomaly scoring to continuous CTD sensor streams without future peeking.',
    solution:
      'Built a calibrated gradient-boosted classification pipeline (PR-AUC 0.5951, Brier 0.2154) paired with a causal autoregressive forecaster for dissolved oxygen dynamics (0.1748 MAE) and deployed with a responsive FastAPI ASGI dashboard.',
    evalResult: {
      summary: 'Evaluated across a quarantined 20% holdout lockbox (N=656) and continuous telemetry stream (N=720). XGBoost with Platt calibration achieved 0.5951 PR-AUC (vs 0.3920 WHO baseline) with 2.89 ms server P50 latency, while the stream forecaster reduced DO prediction MAE by 41.3%.',
      dataset: 'Quarantined 20% Lockbox Partition (N=656) & CTD Buoy Stream (N=720)',
      sampleSize: 'N = 656 lockbox holdout (N = 3,276 total samples)',
      date: 'October 2026',
      metrics: [
        { label: 'Lockbox PR-AUC', value: '0.5951' },
        { label: 'Lockbox ROC-AUC', value: '0.6689' },
        { label: 'Brier Score', value: '0.2154' },
        { label: 'Server P50 Latency', value: '2.89 ms' },
      ],
    },
    whatIdImprove:
      'Deploy quantized ONNX runtime models onto low-power edge microcontrollers (ESP32/STM32) directly aboard oceanographic CTD buoys for real-time in-situ inferencing with solar energy harvesting.',
    evalUrl: 'https://github.com/DurgaPavan0923/pavan_portfolio/blob/main/evals/underwater-analytics/METHODOLOGY.md',
    architecture:
      'Cryptographic SHA-256 Data Ingest → Dual-Track Partitioning → Fold-Isolated Preprocessing → Calibrated Ensemble (XGBoost + Platt) & Isolation Forest → Causal Autoregressive Forecaster → FastAPI Service & AquaGuard Web Dashboard.',
    architectureSteps: [
      {
        icon: '📥',
        title: 'SHA-256 Verified Ingest',
        desc: 'Validates raw sensor feeds and tabular datasets with cryptographic checksum verification.',
      },
      {
        icon: '🔀',
        title: 'Dual-Track Routing',
        desc: 'Separates continuous temporal CTD telemetry (Track A) from static 9-parameter water attributes (Track B).',
      },
      {
        icon: '🛡️',
        title: 'Leakage-Free Preprocessing',
        desc: 'Enforces chronological walk-forward splits for time-series and fold-isolated scaling for cross-validation.',
      },
      {
        icon: '⚡',
        title: 'Calibrated ML Inference',
        desc: 'Evaluates samples through Platt-scaled XGBoost (decision threshold T*=0.38) and multi-sensor Isolation Forest (nu=0.021).',
      },
      {
        icon: '📋',
        title: 'Regulatory Auditing',
        desc: 'Assesses 9 chemical parameters against strict WHO 4th Ed. and EPA permissible boundary envelopes.',
      },
      {
        icon: '📊',
        title: 'AquaGuard Dashboard',
        desc: 'Renders real-time radar envelopes, live buoys simulation, and batch CSV processing.',
      },
    ],
    technologies: [
      'Python',
      'FastAPI',
      'XGBoost',
      'Scikit-learn',
      'Pandas',
      'NumPy',
      'Docker',
      'Chart.js',
      'Vercel Serverless',
    ],
    deployment: 'Vercel Serverless ASGI / Uvicorn, Docker Container',
    impact:
      'Developed at TIH IIT Guwahati; achieved 0.5951 PR-AUC on quarantined holdout (vs 0.3920 WHO baseline) and 41.3% reduction in DO forecasting error with 2.89 ms P50 latency.',
    metrics: [
      { label: 'Lockbox PR-AUC', value: '0.5951' },
      { label: 'ROC-AUC', value: '0.6689' },
      { label: 'DO Forecaster MAE', value: '0.1748' },
      { label: 'Server P50', value: '2.89 ms' },
    ],
    tags: ['Python', 'FastAPI', 'Machine Learning', 'Environmental AI', 'Time-Series', 'IIT Guwahati'],
    githubUrl: 'https://github.com/DurgaPavan0923/water_potability',
    liveUrl: 'https://water-potability-vert.vercel.app/',
    stars: 0,
    forks: 0,
  },

  // 4. SECONDARY COMPACT: News Article Summarizer with Seq2Seq Attention
  {
    slug: 'seq2seq-summarizer',
    name: 'News Article Summarizer with Seq2Seq Attention',
    emoji: '📰',
    category: 'NLP',
    featured: false,
    tagline: 'Abstractive Neural Text Summarization using Seq2Seq with Bahdanau Attention on CNN/DailyMail',
    description:
      'A deep learning abstractive text summarization system that condenses long-form journalism into grammatically coherent summaries.',
    problem:
      'Extractive summarization produces fragmented sentence concatenations, while naive sequence-to-sequence networks suffer from information decay and repetition over long news articles.',
    approach:
      'Implemented an encoder-decoder neural network augmented with Bahdanau additive attention, teacher forcing during training, and beam search decoding to preserve cross-sentence narrative context.',
    solution:
      'Implemented an encoder-decoder architecture augmented with Bahdanau additive attention, teacher forcing during training, and beam-search decoding to preserve semantic coherence.',
    evalResult: {
      summary: 'Evaluated on CNN/DailyMail against the standard Lead-3 extractive baseline (0.5550 ROUGE-1, 0.2801 ROUGE-2, 0.4281 ROUGE-L). Checkpoint weights hosted externally.',
      dataset: 'CNN/DailyMail Test Subset',
      sampleSize: 'n = 50 long-form articles',
      date: 'October 2026',
      metrics: [
        { label: 'Lead-3 ROUGE-1', value: '0.5550' },
        { label: 'Lead-3 ROUGE-L', value: '0.4281' },
        { label: 'Inference p50', value: '0.148 ms' },
        { label: 'Evaluation', value: 'Lead-3 Verified' },
      ],
    },
    whatIdImprove:
      'Transition from recurrent LSTM cells to a lightweight fine-tuned PEFT/LoRA transformer model (e.g., DistilBART or T5-small) and integrate coverage mechanisms to reduce token repetition.',
    evalUrl: 'https://github.com/DurgaPavan0923/pavan_portfolio/blob/main/evals/seq2seq-summarizer/METHODOLOGY.md',
    architecture:
      'News Article Tokenization (Byte-Pair Encoding) → Bidirectional Encoder → Bahdanau Attention Matrix → Decoder with Beam Search → Summary Generation.',
    architectureSteps: [
      {
        icon: '📄',
        title: 'Document Normalization',
        desc: 'Preprocesses long-form articles using custom tokenization and vocabulary clipping.',
      },
      {
        icon: '🔄',
        title: 'Attention Alignment',
        desc: 'Focuses decoder time steps on salient source context vectors to capture pivotal narrative points.',
      },
      {
        icon: '✨',
        title: 'Abstractive Generation',
        desc: 'Generates concise phrases that capture the semantic essence rather than verbatim sentence copies.',
      },
    ],
    technologies: ['PyTorch', 'Hugging Face', 'Transformers', 'NumPy', 'Pandas', 'Streamlit'],
    deployment: 'Streamlit Cloud, PyTorch model checkpoints hosted on Hugging Face',
    impact:
      'Trained an encoder-decoder neural network with Bahdanau additive attention on CNN/DailyMail article pairs for abstractive document condensation; evaluated against Lead-3 baseline.',
    metrics: [],
    tags: ['PyTorch', 'Seq2Seq', 'Attention Mechanism', 'NLP', 'Deep Learning'],
    githubUrl: 'https://github.com/DurgaPavan0923/Seq2Seq-model-newspaper-text-summarization',
    liveUrl: 'https://github.com/DurgaPavan0923/Seq2Seq-model-newspaper-text-summarization',
    stars: 6,
    forks: 1,
  },

  // 4. SECONDARY COMPACT: IRA Smart City
  {
    slug: 'ira-smart-city',
    name: 'IRA — Intelligent Resource Architecture',
    emoji: '🏙️',
    category: 'Full Stack AI',
    featured: false,
    tagline: '3D City Terrain Visualization and Predictive Municipal Resource Load Balancer',
    description:
      'A smart-city simulation and predictive balancing prototype featuring real-time 3D grid rendering and ML regression to model municipal resource demand curves.',
    problem:
      'Urban public utilities face dynamic spikes in water and electricity demand, leading to resource strain without predictive monitoring and redistribution mechanisms.',
    solution:
      'Engineered an interactive 3D terrain visualizer in Three.js connected to a machine learning regression forecasting service that models demand curves and computes redistribution paths.',
    architecture:
      'IoT Load Sensor Simulators → ML Regression Forecasting Engine → PostgreSQL Store → Three.js 3D Grid Visualizer → Dynamic Routing Balancer.',
    technologies: ['Three.js', 'Python', 'Scikit-learn', 'Node.js', 'Express', 'PostgreSQL'],
    deployment: 'Vercel Frontend, Render Cloud API Hosting, PostgreSQL Cloud Instance (Demo Mode)',
    impact:
      'Showcased at Abinya 3.0 at Proxima 2026; demonstrates 3D municipal terrain rendering and predictive regression load balancing simulation.',
    metrics: [],
    tags: ['Three.js', 'Predictive Analytics', 'Python ML', 'Urban AI', 'Full Stack'],
    githubUrl: 'https://github.com/DurgaPavan0923/IRA',
    liveUrl: 'https://infernox21.github.io/IRA/#team',
    stars: 12,
    forks: 4,
  },

  // 5. SECONDARY COMPACT: AGORA Governance
  {
    slug: 'agora-governance',
    name: 'AGORA — Web3 & AI Civic Governance',
    emoji: '🏛️',
    category: 'Web3',
    featured: false,
    tagline: 'Decentralized Governance with Decentralized ID (DID), Soulbound Tokens & AI Triage',
    description:
      'A public governance infrastructure concept incorporating Soulbound Tokens, Decentralized Identity (DID), and machine learning petition classification.',
    problem:
      'Public administrative petitions suffer from queuing bottlenecks, identity manipulation, and lack of objective priority routing.',
    solution:
      'Combined DID identity verification with Soulbound Tokens (SBT) and machine learning classification to authenticate petitioners, detect duplicates, and route urgent requests using greedy allocation algorithms.',
    architecture:
      'Web3 Wallet Auth (DID/SBT) → Natural Language Petition Ingest → TF-IDF & Random Forest Classifier → Greedy Priority Scheduler → Voice Assistant Interface.',
    technologies: ['Python', 'Scikit-Learn', 'Web3.js', 'Solidity', 'Flask API', 'Streamlit'],
    deployment: 'Render Cloud API, Ethereum Sepolia Testnet (Demo Mode)',
    impact:
      'Engineered for the SOA Regional AI Hackathon 2025; combines on-chain credential identity with machine-learning petition triage.',
    metrics: [],
    tags: ['Web3', 'Soulbound Tokens', 'Machine Learning', 'DAO', 'Python', 'Governance'],
    githubUrl: 'https://github.com/DurgaPavan0923/AGORA-PROXIMA',
    liveUrl: 'https://github.com/DurgaPavan0923/AGORA-PROXIMA',
    stars: 8,
    forks: 2,
  },

  // 6. SECONDARY COMPACT: Algorithm Arena V2
  {
    slug: 'algorithm-arena',
    name: 'Algorithm Arena V2',
    emoji: '⚔️',
    category: 'Open Source',
    featured: false,
    tagline: 'Competitive Coding & Algorithmic Contest Platform Built for GDGoC ITER',
    description:
      'A full-stack competitive programming portal engineered for university-wide coding events and tournaments, featuring problem sets and live scoreboards.',
    problem:
      'Organizing student competitive coding challenges requires a reliable contest environment capable of evaluating submissions concurrently without test execution latency.',
    solution:
      'Created a responsive contest dashboard with interactive problem sets, dynamic leaderboards, and real-time submission evaluation.',
    architecture:
      'Student Code Editor → Node.js Runner Sandbox → Test Suite Evaluator → Real-Time Socket Leaderboard.',
    technologies: ['JavaScript', 'Node.js', 'Express', 'Tailwind CSS', 'Socket.io'],
    deployment: 'Vercel, Render API Backend',
    impact:
      'Full-stack competitive coding and problem evaluation dashboard engineered for GDGoC ITER developer events.',
    metrics: [],
    tags: ['Open Source', 'JavaScript', 'Competitive Programming', 'GDGoC'],
    githubUrl: 'https://github.com/DurgaPavan0923/Algorithm-Arena-V2',
    liveUrl: 'https://github.com/DurgaPavan0923/Algorithm-Arena-V2',
    stars: 5,
    forks: 2,
  },

  // 7. SECONDARY COMPACT: SOA NCC Cadet Platform
  {
    slug: 'soa-ncc-official',
    name: 'SOA NCC Official Cadet Platform',
    emoji: '🎖️',
    category: 'Open Source',
    featured: false,
    tagline: 'Official Cadet Management, Event Portal & Roll Management for SOA NCC',
    description:
      'The official web platform for the National Cadet Corps unit at SOA University, managing cadet registrations, parade roll calls, camp schedules, and achievements.',
    problem:
      'Cadet attendance, camp allocation records, and official circulars were fragmented across paper logs and messaging groups.',
    solution:
      'Designed and deployed a centralized web portal providing digitized circulars, rank promotion trackers, camp chronicles, and parade announcements.',
    architecture:
      'Static Web Portal → CDN Caching → Event Management Interface → Cadet Directory.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Vercel'],
    deployment: 'Vercel Edge Network',
    impact:
      'Centralized official portal for the National Cadet Corps unit at SOA University, digitizing circulars and camp participation chronicles.',
    metrics: [],
    tags: ['Open Source', 'Leadership', 'Web Portal', 'NCC'],
    githubUrl: 'https://github.com/DurgaPavan0923/SOA-NCC-official-website',
    liveUrl: 'https://github.com/DurgaPavan0923/SOA-NCC-official-website',
    stars: 4,
    forks: 1,
  },
];
