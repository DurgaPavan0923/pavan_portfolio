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
      'An explainable fact-verification and media literacy ecosystem leveraging multi-agent reasoning, Pinecone vector indexing, and Neo4j knowledge graphs to analyze and explain digital claims.',
    problem:
      'High-velocity digital misinformation outpaces manual editorial verification pipelines. Existing automated tools often produce black-box classification scores without verifiable provenance citations, explainability heatmaps, or knowledge-graph lineage.',
    solution:
      'Engineered an asynchronous multi-agent consensus architecture using Google Gemini API, Neo4j graph traversal, and Pinecone semantic embeddings. The platform extracts claims, validates them against trusted vector indices, generates explainability dashboards, and formats academic citations (APA, MLA, Chicago, BibTeX).',
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
      'Recharts',
      'jsPDF',
    ],
    deployment: 'Vercel Edge Runtime, Neo4j AuraDB Cloud, Pinecone Serverless Vector Index',
    impact:
      'Architected multi-agent verification pipeline with sub-second consensus latency; integrates dense vector indexing and knowledge graph provenance for transparent claim audits.',
    metrics: [
      { label: 'Latency', value: '< 1 sec' },
      { label: 'Knowledge Graph', value: 'Neo4j AuraDB' },
      { label: 'Vector Index', value: 'Pinecone Serverless' },
      { label: 'Citations', value: 'APA, MLA, BibTeX' },
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
      'A cognitive recruitment document intelligence engine parsing resumes, measuring semantic alignment with Job Descriptions, and generating contextual interview rubrics.',
    problem:
      'Traditional ATS software relies on primitive keyword matching, discarding non-traditional qualified candidates while passing keyword-stuffed resumes.',
    solution:
      'Built a semantic matching engine combining transformer embeddings, TF-IDF skill weightings, and cosine similarity scoring. Automatically highlights skill gaps and generates contextual technical interview questions.',
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
      'Automated resume parsing and semantic alignment evaluation using transformer embeddings and TF-IDF skill matrices.',
    metrics: [
      { label: 'Semantic Match', value: 'Cosine Similarity' },
      { label: 'Document Parsing', value: 'PDF & DOCX' },
      { label: 'API Microservice', value: 'FastAPI / Docker' },
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
      'A smart-city simulation and predictive balancing platform featuring real-time 3D grid rendering and ML regression to model municipal resource demand curves.',
    problem:
      'Urban public utilities face dynamic spikes in water and electricity demand, leading to resource strain without predictive monitoring and redistribution mechanisms.',
    solution:
      'Engineered an interactive 3D terrain visualizer in Three.js connected to a machine learning regression forecasting service that models demand curves and computes redistribution paths.',
    architecture:
      'IoT Load Sensor Simulators → ML Regression Forecasting Engine → PostgreSQL Store → Three.js 3D Grid Visualizer → Dynamic Routing Balancer.',
    architectureSteps: [
      {
        icon: '📡',
        title: 'IoT Sensor Stream',
        desc: 'Ingests simulated real-time power, water, and traffic demand telemetry across municipal nodes.',
      },
      {
        icon: '📈',
        title: 'Predictive Forecaster',
        desc: 'Regression models forecast demand variations with confidence intervals.',
      },
      {
        icon: '🌐',
        title: 'Three.js 3D Visualizer',
        desc: 'Renders dynamic volumetric city terrain with colored heatmaps and load redirection vectors.',
      },
      {
        icon: '⚖️',
        title: 'Redistribution Balancer',
        desc: 'Calculates minimum-cost flow to balance overloaded sectors dynamically.',
      },
    ],
    technologies: ['Three.js', 'Python', 'Scikit-learn', 'Node.js', 'Express', 'PostgreSQL'],
    deployment: 'Vercel Frontend, Render Cloud API Hosting, PostgreSQL Cloud Instance',
    impact:
      'Showcased at Abinya 3.0 at Proxima 2026; demonstrates 3D municipal terrain rendering and predictive regression load balancing.',
    metrics: [
      { label: 'Visualization', value: 'Three.js WebGL' },
      { label: 'Forecasting', value: 'Regression ML' },
      { label: 'Symposium', value: 'Proxima 2026' },
    ],
    tags: ['Three.js', 'Predictive Analytics', 'Python ML', 'Urban AI', 'Full Stack'],
    githubUrl: 'https://github.com/DurgaPavan0923/IRA',
    liveUrl: 'https://infernox21.github.io/IRA/#team',
    stars: 12,
    forks: 4,
  },
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
    architectureSteps: [
      {
        icon: '🔐',
        title: 'DID & Soulbound Token Auth',
        desc: 'Authenticates citizen credentials to prevent Sybil attacks and fraudulent duplicate petitions.',
      },
      {
        icon: '📝',
        title: 'Petition Classifier',
        desc: 'Tokenizes inbound requests and categorizes civic urgency across municipal departments.',
      },
      {
        icon: '⚡',
        title: 'Priority Scheduler',
        desc: 'Schedules petitions to appropriate offices to reduce administrative latency.',
      },
    ],
    technologies: ['Python', 'Scikit-Learn', 'Web3.js', 'Solidity', 'Flask API', 'Streamlit'],
    deployment: 'Render Cloud API, Ethereum Sepolia Testnet, GitHub Actions CI/CD',
    impact:
      'Engineered for the SOA Regional AI Hackathon 2025; combines on-chain credential identity with machine-learning petition triage.',
    metrics: [
      { label: 'Identity Layer', value: 'DID & Soulbound Tokens' },
      { label: 'Model Stack', value: 'TF-IDF + Random Forest' },
      { label: 'Platform', value: 'Hackathon Project' },
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
      'A deep learning abstractive text summarization system that reads long-form journalism and outputs concise, grammatically coherent summaries.',
    problem:
      'Extractive summarization produces disjointed sentence splices, while naive sequence-to-sequence networks suffer from information decay on long articles.',
    solution:
      'Implemented an encoder-decoder architecture augmented with Bahdanau additive attention, teacher forcing during training, and beam-search decoding to preserve semantic coherence.',
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
      'Trained an encoder-decoder neural network with Bahdanau additive attention on CNN/DailyMail article pairs for abstractive document condensation.',
    metrics: [
      { label: 'Architecture', value: 'Encoder-Decoder' },
      { label: 'Attention Mechanism', value: 'Bahdanau Additive' },
      { label: 'Inference', value: 'Beam Search Decoder' },
    ],
    tags: ['PyTorch', 'Seq2Seq', 'Attention Mechanism', 'NLP', 'Deep Learning'],
    githubUrl: 'https://github.com/DurgaPavan0923/Seq2Seq-model-newspaper-text-summarization',
    liveUrl: 'https://github.com/DurgaPavan0923/Seq2Seq-model-newspaper-text-summarization',
    stars: 6,
    forks: 1,
  },
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
      'Full-stack competitive coding and problem evaluation dashboard engineered for GDGoC ITER developer events.',
    metrics: [
      { label: 'Real-Time Sync', value: 'Socket.io' },
      { label: 'Backend Runtime', value: 'Node.js / Express' },
      { label: 'Purpose', value: 'GDGoC Contest Portal' },
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
      'The official web platform for the National Cadet Corps unit at SOA University, managing cadet registrations, parade roll calls, camp schedules, and achievements.',
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
      'Centralized official portal for the National Cadet Corps unit at SOA University, digitizing circulars and camp participation chronicles.',
    metrics: [
      { label: 'Unit', value: 'SOA University NCC' },
      { label: 'Core Features', value: 'Roster & Circulars' },
      { label: 'Delivery', value: 'Vercel Edge' },
    ],
    tags: ['Open Source', 'Leadership', 'Web Portal', 'NCC'],
    githubUrl: 'https://github.com/DurgaPavan0923/SOA-NCC-official-website',
    liveUrl: 'https://github.com/DurgaPavan0923/SOA-NCC-official-website',
    stars: 4,
    forks: 1,
  },
];
