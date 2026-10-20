import { ResearchInterest } from '@/types';

export const RESEARCH_INTERESTS: ResearchInterest[] = [
  {
    title: 'Retrieval-Augmented Generation (RAG)',
    icon: '🔗',
    description:
      'Designing hybrid semantic-graph retrieval pipelines that fuse dense vector embeddings with structured knowledge graphs to eliminate LLM hallucinations.',
    keywords: ['Dense Retrieval', 'Graph RAG', 'Neo4j AuraDB', 'Vector Reranking', 'ColBERT'],
  },
  {
    title: 'Multi-Agent Consensus Systems',
    icon: '🤖',
    description:
      'Orchestrating autonomous AI agents that debate, verify, and validate complex outputs using adversarial critique and reflection loops.',
    keywords: ['LangGraph', 'Agentic Workflows', 'Task Decomposition', 'Consensus Verification'],
  },
  {
    title: 'Deep Representation Learning',
    icon: '🧬',
    description:
      'Investigating neural embedding spaces for cross-modal text and tabular representation, with application to predictive modeling and document matching.',
    keywords: ['Self-Supervised Learning', 'Seq2Seq', 'Attention Mechanisms', 'PyTorch'],
  },
  {
    title: 'Explainable AI & Misinformation Research',
    icon: '📰',
    description:
      'Investigating multi-agent consensus protocols and knowledge-graph traversal to verify digital claims, surface evidence lineages, and explain reasoning transparently.',
    keywords: ['Explainable AI', 'Graph RAG', 'Multi-Agent Consensus', 'Citation Provenance', 'NLP'],
  },
  {
    title: 'Urban AI & 3D Spatial Forecasting',
    icon: '🏙️',
    description:
      'Simulating municipal resource distribution and dynamic demand curves using 3D spatial grids and low-latency regression balancing techniques.',
    keywords: ['Three.js', 'Spatial Indexing', 'Predictive Load Balancing', 'Greedy Optimization'],
  },
  {
    title: 'Cloud-Native MLOps Architectures',
    icon: '☁️',
    description:
      'Streamlining the transition from model training workflows to containerized, auto-scaling microservices on modern cloud infrastructure.',
    keywords: ['Microsoft Azure', 'FastAPI', 'Docker', 'Vercel Edge', 'CI/CD Pipelines'],
  },
];
