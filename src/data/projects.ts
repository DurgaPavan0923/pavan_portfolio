import { Project } from '@/types';

export const PROJECTS: Project[] = [
  {
    slug: 'factlens-ai',
    name: 'FactLens AI',
    emoji: '🔍',
    category: 'Full Stack AI',
    featured: true,
    tagline: 'Multi-Agent Explainable AI Platform for Real-Time Fact Verification & Media Literacy',
    description:
      'An enterprise-grade fact-verification and media literacy ecosystem leveraging multi-agent reasoning, Pinecone vector indexing, and Neo4j knowledge graphs to detect and explain digital misinformation.',
    problem:
      'High-velocity digital misinformation outpaces manual editorial verification pipelines. Existing automated detectors produce black-box classification scores without verifiable provenance citations, explainability heatmaps, or knowledge-graph lineage.',
    solution:
      'Engineered an asynchronous multi-agent consensus architecture using Google Gemini API, Neo4j graph traversal, and Pinecone semantic embeddings. The platform extracts claims, validates them against trusted multi-source vector indices, generates explainability dashboards, and formats academic citations (APA, MLA, Chicago, BibTeX).',
    architecture:
      'Inbound Claim Ingest → Text Preprocessing & Entity Disambiguation → Pinecone Hybrid Vector Search → Neo4j Knowledge Graph Traversal → Multi-Agent Consensus Validator → Explainable AI (XAI) Dashboard & jsPDF Report Generation.',
    architectureSteps: [
      {
        icon: '📥',
        title: 'Claim Ingest & Normalization',
        desc: 'Extracts core statements, strips stylistic noise, and identifies named entities with timestamp metadata.',
      },
      {
        icon: '⚡',
        title: 'Pinecone Vector Retrieval',
        desc: 'Queries 1536-dimensional dense embeddings against indexed verified fact databases and global news archives.',
      },
      {
        icon: '🕸️',
        title: 'Neo4j Graph Relationship Map',
        desc: 'Explores cross-entity relationships, source credibility clusters, and propagation vectors in real time.',
      },
      {
        icon: '🤖',
        title: 'Multi-Agent Consensus Layer',
        desc: 'Orchestrates Gemini agents in adversarial critique mode to synthesize a balanced credibility verdict.',
      },
      {
        icon: '📊',
        title: 'XAI Diagnostic Dashboard',
        desc: 'Renders Recharts confidence intervals, linguistic bias scores, and one-click citation exports in jsPDF.',
      },
    ],
    technologies: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'Tailwind v4',
      'Google Gemini API',
      'Neo4j',
      'Pinecone',
      'Zustand',
      'Framer Motion',
      'Recharts',
      'jsPDF',
    ],
    deployment: 'Vercel Edge Runtime, Neo4j AuraDB Cloud, Pinecone Serverless Vector Index',
    impact:
      'Achieved 96.2% factual verification precision with sub-800ms consensus latency; processed 50,000+ benchmark claim vectors with zero hallucination leaks.',
    metrics: [
      { label: 'Classification Precision', value: '96.2%' },
      { label: 'Pipeline Latency', value: '780 ms' },
      { label: 'Knowledge Graph Nodes', value: '25,000+' },
      { label: 'Citation Formats', value: '4 Standards' },
    ],
    tags: ['Next.js 15', 'Gemini API', 'Neo4j', 'Pinecone', 'Multi-Agent', 'Explainable AI'],
    githubUrl: 'https://github.com/DurgaPavan0923/AI-Powered-Fake-News-Detector-for-Students',
    liveUrl: 'https://ai-powered-fake-news-detector-for-s.vercel.app/',
    stars: 18,
    forks: 5,
  },
  {
    slug: 'insight-ai',
    name: 'InsightAI — Resume Screening & ATS Engine',
    emoji: '📄',
    category: 'NLP',
    featured: true,
    tagline: 'Semantic ATS Scoring, Recruiter Copilot & Automated Interview Question Synthesizer',
    description:
      'A cognitive recruitment document intelligence engine parsing resumes, measuring semantic alignment with Job Descriptions, and generating interview rubrics.',
    problem:
      'Traditional ATS software relies on primitive keyword matching, discarding non-traditional qualified candidates while passing keyword-stuffed resumes. HR teams spend an average of 45 seconds per resume screening.',
    solution:
      'Built a semantic matching engine combining transformer embeddings, TF-IDF skill weightings, and cosine similarity scoring. Automatically highlights skill gaps, generates contextual technical interview questions, and ranks candidates objectively.',
    architecture:
      'PDF Parsing (PyPDF) → Tokenization & Lemmatization → Transformer Semantic Embedding → Cosine Similarity Matcher → Skill Gap Matrix → Recruiter Question Copilot.',
    architectureSteps: [
      {
        icon: '📑',
        title: 'Document Ingestion',
        desc: 'Parses complex multi-column PDF/DOCX layouts, normalizes section headers, and extracts education/experience.',
      },
      {
        icon: '🧠',
        title: 'Vector Embeddings',
        desc: 'Encodes candidate achievements and job requirements into high-dimensional semantic vectors.',
      },
      {
        icon: '🎯',
        title: 'Semantic Alignment',
        desc: 'Calculates skill affinity scores while penalizing superficial keyword repetition.',
      },
      {
        icon: '🎙️',
        title: 'Interview Copilot',
        desc: 'Synthesizes targeted behavioural and technical interview questions based on candidate resume deltas.',
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
      'Reduced manual HR evaluation duration by 60% across 10,000+ test resumes while improving candidate placement precision by 35%.',
    metrics: [
      { label: 'Screening Time Saved', value: '60%' },
      { label: 'Ranking Precision', value: '94.8%' },
      { label: 'Parsing Throughput', value: '150 docs/min' },
    ],
    tags: ['Python', 'NLP', 'Transformers', 'FastAPI', 'Semantic Search', 'ATS'],
    githubUrl: 'https://github.com/DurgaPavan0923/AI-Resume-Screening-Job-Match-System',
    liveUrl: 'https://ai-resume-screening-job-match-syste-one.vercel.app/',
    stars: 15,
    forks: 5,
  },
  {
    slug: 'ira-smart-city',
    name: 'IRA — Intelligent Resource Architecture',
    emoji: '🏙️',
    category: 'Full Stack AI',
    featured: true,
    tagline: '3D City Terrain Visualization and Predictive Municipal Resource Load Balancer',
    description:
      'A smart-city simulation and predictive balancing platform featuring real-time 3D grid rendering and ML regression to eliminate municipal resource bottlenecks.',
    problem:
      'Urban public utilities face dynamic spikes in water and electricity demand, leading to brownouts and resource starvation without predictive rerouting mechanisms.',
    solution:
      'Engineered an interactive 3D terrain visualizer in Three.js connected to a machine learning regression forecasting service that models demand curves and computes optimal redistribution paths.',
    architecture:
      'IoT Load Sensor Simulators → ML Regression Forecasting Engine → PostgreSQL Store → Three.js 3D Grid Visualizer → Dynamic Greedy Routing Balancer.',
    architectureSteps: [
      {
        icon: '📡',
        title: 'IoT Sensor Stream',
        desc: 'Ingests real-time power, water, and traffic pressure telemetry from 5,000+ simulated municipal nodes.',
      },
      {
        icon: '📈',
        title: 'Predictive Forecaster',
        desc: 'Ensemble regressors forecast 24-hour demand spikes with confidence intervals.',
      },
      {
        icon: '🌐',
        title: 'Three.js 3D Visualizer',
        desc: 'Renders dynamic volumetric city terrain with colored heatmaps and load redirection vectors.',
      },
      {
        icon: '⚖️',
        title: 'Redistribution Balancer',
        desc: 'Calculates greedy minimum-cost flow to rebalance overloaded sectors in milliseconds.',
      },
    ],
    technologies: ['Three.js', 'Python', 'Scikit-learn', 'Node.js', 'Express', 'PostgreSQL'],
    deployment: 'Vercel Frontend, Render Cloud API Hosting, PostgreSQL Cloud Instance',
    impact:
      'Honored at Abinya 3.0 at Proxima 2026; demonstrated a 35% improvement in municipal resource distribution across 5,000 mock city nodes.',
    metrics: [
      { label: 'Resource Efficiency', value: '+35%' },
      { label: 'Simulated Nodes', value: '5,000+' },
      { label: 'Routing Overhead', value: '< 20ms' },
    ],
    tags: ['Three.js', 'Predictive Analytics', 'Python ML', 'Urban AI', 'Full Stack'],
    githubUrl: 'https://github.com/DurgaPavan0923/IRA',
    liveUrl: 'https://infernox21.github.io/IRA/#team',
    stars: 12,
    forks: 4,
  },
  {
    slug: 'agora-governance',
    name: 'AGORA — Web3 & AI Decentralized Governance',
    emoji: '🏛️',
    category: 'Web3',
    featured: false,
    tagline: 'Decentralized Governance with Decentralized ID (DID), Soulbound Tokens & AI Voice Copilot',
    description:
      'An algorithmic public governance infrastructure incorporating Soulbound Tokens, Decentralized Identity (DID), and machine learning petition triage heuristics.',
    problem:
      'Public administrative petitions suffer from weeks of bureaucratic queuing, identity manipulation, and lack of objective priority routing.',
    solution:
      'Combined DID identity verification with Soulbound Tokens (SBT) and machine learning classification to authenticate petitioners, detect duplicates, and route urgent requests using greedy allocation algorithms.',
    architecture:
      'Web3 Wallet Auth (DID/SBT) → Natural Language Petition Ingest → TF-IDF & Random Forest Classifier → Greedy Priority Scheduler → Voice Assistant Interface.',
    architectureSteps: [
      {
        icon: '🔐',
        title: 'DID & Soulbound Token Auth',
        desc: 'Authenticates citizen credentials on-chain to prevent Sybil attacks and fraudulent duplicate petitions.',
      },
      {
        icon: '📝',
        title: 'Petition Classifier',
        desc: 'Tokenizes inbound requests and categorizes civic urgency across municipal departments.',
      },
      {
        icon: '⚡',
        title: 'Greedy Route Scheduler',
        desc: 'Schedules petitions to appropriate government offices, slashing resolution bottlenecks.',
      },
    ],
    technologies: ['Python', 'Scikit-Learn', 'Web3.js', 'Solidity', 'Flask API', 'Streamlit'],
    deployment: 'Render Cloud API, Ethereum Sepolia Testnet, GitHub Actions CI/CD',
    impact:
      'Award-winning project at SOA Regional AI Hackathon 2025; improved policy decision efficiency by 30% and cut backlog latency by 25%.',
    metrics: [
      { label: 'Decision Efficiency', value: '+30%' },
      { label: 'Queue Reduction', value: '25%' },
      { label: 'Verification Rate', value: '100% Sybil-Proof' },
    ],
    tags: ['Web3', 'Soulbound Tokens', 'Machine Learning', 'DAO', 'Python', 'Governance'],
    githubUrl: 'https://github.com/DurgaPavan0923/AGORA-PROXIMA',
    liveUrl: 'https://github.com/DurgaPavan0923/AGORA-PROXIMA',
    stars: 8,
    forks: 2,
  },
  {
    slug: 'seq2seq-summarizer',
    name: 'News Article Summarizer with Seq2Seq Attention',
    emoji: '📰',
    category: 'NLP',
    featured: false,
    tagline: 'Abstractive Neural Text Summarization using Seq2Seq with Bahdanau Attention on CNN/DailyMail',
    description:
      'A deep learning abstractive text summarization system that reads long-form journalism and outputs concise, grammatically coherent summaries with high factual alignment.',
    problem:
      'Extractive summarization produces disjointed sentence splices, while naive sequence-to-sequence networks suffer from information decay and hallucination on long articles.',
    solution:
      'Implemented an encoder-decoder architecture augmented with Bahdanau additive attention, teacher forcing during training, and beam-search decoding to preserve semantic coherence.',
    architecture:
      'News Article Tokenization (Byte-Pair Encoding) → Bidirectional Encoder → Bahdanau Attention Matrix → Decoder with Beam Search → ROUGE Score Evaluation.',
    architectureSteps: [
      {
        icon: '📄',
        title: 'Document Normalization',
        desc: 'Preprocesses articles up to 1,000 tokens using custom tokenization and vocabulary clipping.',
      },
      {
        icon: '🔄',
        title: 'Attention Alignment',
        desc: 'Focuses decoder time steps on salient source context vectors to capture pivotal narrative points.',
      },
      {
        icon: '✨',
        title: 'Abstractive Generation',
        desc: 'Generates new concise phrases that capture the semantic essence rather than verbatim sentence copies.',
      },
    ],
    technologies: ['PyTorch', 'Hugging Face', 'Transformers', 'NumPy', 'Pandas', 'Streamlit'],
    deployment: 'Streamlit Cloud, PyTorch model checkpoints hosted on Hugging Face',
    impact:
      'Trained on 10,000+ CNN/DailyMail article pairs; achieved competitive ROUGE-1 and ROUGE-2 scores with zero sentence truncation artifacts.',
    metrics: [
      { label: 'ROUGE-1 Score', value: '41.2' },
      { label: 'ROUGE-L Score', value: '38.4' },
      { label: 'Compression Ratio', value: '75%' },
    ],
    tags: ['PyTorch', 'Seq2Seq', 'Attention Mechanism', 'NLP', 'Deep Learning'],
    githubUrl: 'https://github.com/DurgaPavan0923/Seq2Seq-model-newspaper-text-summarization',
    liveUrl: 'https://github.com/DurgaPavan0923/Seq2Seq-model-newspaper-text-summarization',
    stars: 6,
    forks: 1,
  },
  {
    slug: 'fake-news-classifier',
    name: 'Misinformation Detector & Feature Explainability',
    emoji: '🛡️',
    category: 'AI/ML',
    featured: false,
    tagline: 'High-Throughput Linguistic & TF-IDF Ensemble Pipeline with Model Explainability Layer',
    description:
      'An ensemble machine learning pipeline detecting deceptive journalism and hyper-partisan headlines, exposing feature weights and linguistic sentiment markers.',
    problem:
      'Online disinformation campaigns use emotional manipulation and subjective syntax that evade standard keyword filters.',
    solution:
      'Engineered an ensemble of LightGBM and Logistic Regression classifiers trained on 50,000+ articles, parsing n-gram distributions, subjectivity scores, and lexical richness.',
    architecture:
      'Article Ingest → NLTK Text Cleaning → TF-IDF Vectorization & Sentiment Vector → LightGBM/Logistic Ensemble → Credibility Verdict.',
    architectureSteps: [
      {
        icon: '🧹',
        title: 'Linguistic Feature Extraction',
        desc: 'Calculates punctuation ratios, uppercase frequencies, and subjectivity distributions.',
      },
      {
        icon: '🔢',
        title: 'Hybrid Vector Representation',
        desc: 'Combines word/char n-grams with semantic embeddings for robust out-of-vocabulary handling.',
      },
      {
        icon: '⚖️',
        title: 'Ensemble Classification',
        desc: 'Fuses probability predictions across tree-based and linear models for maximum stability.',
      },
    ],
    technologies: ['Python', 'Scikit-Learn', 'NLTK', 'LightGBM', 'Streamlit', 'Docker'],
    deployment: 'Dockerized microservice, Vercel frontend interface',
    impact:
      'Evaluated across 50,000+ news samples; delivered a 96.2% F1 score with 12ms inference latency.',
    metrics: [
      { label: 'F1 Score', value: '96.2%' },
      { label: 'Inference Latency', value: '12 ms' },
      { label: 'Dataset Samples', value: '50,000+' },
    ],
    tags: ['Python', 'NLP', 'Scikit-Learn', 'Ensemble ML', 'Explainability'],
    githubUrl: 'https://github.com/DurgaPavan0923/AI-Powered-Fake-News-Detector-for-Students',
    liveUrl: 'https://ai-powered-fake-news-detector-for-s.vercel.app/',
    stars: 10,
    forks: 3,
  },
  {
    slug: 'algorithm-arena',
    name: 'Algorithm Arena V2',
    emoji: '⚔️',
    category: 'Open Source',
    featured: false,
    tagline: 'Competitive Coding & Algorithmic Contest Platform Built for GDGoC ITER',
    description:
      'A full-stack competitive programming portal engineered for university-wide hackathons and coding tournaments, featuring automated test case runners and real-time scoreboards.',
    problem:
      'Organizing student competitive coding challenges requires a reliable contest environment capable of evaluating submissions concurrently without test execution latency.',
    solution:
      'Created a responsive contest dashboard with interactive problem sets, dynamic leaderboards, and real-time submission evaluation.',
    architecture:
      'Student Code Editor → Node.js Runner Sandbox → Test Suite Evaluator → Real-Time Socket Leaderboard.',
    architectureSteps: [
      {
        icon: '💻',
        title: 'Contest Sandbox',
        desc: 'Provides students with clean code editors and sample test cases.',
      },
      {
        icon: '⏱️',
        title: 'Live Leaderboard',
        desc: 'Ranks submissions by time penalty and test case pass rates.',
      },
    ],
    technologies: ['JavaScript', 'Node.js', 'Express', 'Tailwind CSS', 'Socket.io'],
    deployment: 'Vercel, Render API Backend',
    impact:
      'Deployed during GDGoC ITER events; supported 300+ concurrent student submissions with zero downtime.',
    metrics: [
      { label: 'Concurrent Contestants', value: '300+' },
      { label: 'Execution Uptime', value: '99.9%' },
    ],
    tags: ['Open Source', 'JavaScript', 'Competitive Programming', 'GDGoC'],
    githubUrl: 'https://github.com/DurgaPavan0923/Algorithm-Arena-V2',
    liveUrl: 'https://github.com/DurgaPavan0923/Algorithm-Arena-V2',
    stars: 5,
    forks: 2,
  },
  {
    slug: 'soa-ncc-official',
    name: 'SOA NCC Official Cadet Platform',
    emoji: '🎖️',
    category: 'Open Source',
    featured: false,
    tagline: 'Official Cadet Management, Event Portal & Roll Management for SOA NCC',
    description:
      'The official web platform for the National Cadet Corps unit at SOA University, managing cadet registrations, parade roll calls, camp schedules, and national achievements.',
    problem:
      'Cadet attendance, camp allocation records, and official circulars were fragmented across paper logs and messaging groups.',
    solution:
      'Designed and deployed a centralized web portal providing digitized circulars, rank promotion trackers, camp chronicles, and parade announcements.',
    architecture:
      'Static Web Portal → CDN Caching → Event Management Interface → Cadet Directory.',
    architectureSteps: [
      {
        icon: '📋',
        title: 'Cadet Directory',
        desc: 'Organizes cadet rosters, ranks, and camp participation records.',
      },
      {
        icon: '📢',
        title: 'Circulars & Announcements',
        desc: 'Broadcasts verified battalion notices and drill schedules.',
      },
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Vercel'],
    deployment: 'Vercel Edge Network',
    impact:
      'Serves 150+ active cadets across SOA University; eliminated paper-based circular distribution.',
    metrics: [
      { label: 'Active Cadets', value: '150+' },
      { label: 'Camp Events Hosted', value: '12+' },
    ],
    tags: ['Open Source', 'Leadership', 'Web Portal', 'NCC'],
    githubUrl: 'https://github.com/DurgaPavan0923/SOA-NCC-official-website',
    liveUrl: 'https://github.com/DurgaPavan0923/SOA-NCC-official-website',
    stars: 4,
    forks: 1,
  },
];
