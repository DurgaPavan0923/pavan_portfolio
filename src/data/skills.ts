import { SkillCategory } from '@/types';

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Machine Learning',
    description: 'Statistical modeling, deep learning architectures, feature engineering, and empirical evaluation metrics.',
    skills: [
      { name: 'Python', icon: '🐍' },
      { name: 'PyTorch', icon: '🔥' },
      { name: 'Scikit-Learn', icon: '📊' },
      { name: 'XGBoost', icon: '⚡' },
      { name: 'Pandas & NumPy', icon: '🔢' },
      { name: 'Model Evaluation & Metrics', icon: '📈' },
    ],
  },
  {
    title: 'Generative AI',
    description: 'Retrieval-Augmented Generation, knowledge graphs, semantic vector search, and agent orchestration.',
    skills: [
      { name: 'Google Gemini API', icon: '✨' },
      { name: 'RAG Architecture', icon: '🔍' },
      { name: 'Neo4j Graph RAG (Certified)', icon: '🕸️' },
      { name: 'Vector Search & Embeddings', icon: '🌲' },
      { name: 'Hugging Face Transformers', icon: '🤗' },
      { name: 'Prompt Engineering', icon: '📝' },
    ],
  },
  {
    title: 'AI Engineering',
    description: 'Microservice APIs, probability calibration, data schema contracts, and temporal stream forecasting.',
    skills: [
      { name: 'FastAPI', icon: '⚡' },
      { name: 'Pinecone Vector DB', icon: '🌲' },
      { name: 'Platt Calibration', icon: '🎯' },
      { name: 'Data Validation (Zod & Pydantic)', icon: '🛡️' },
      { name: 'Time-Series Forecasters', icon: '⏱️' },
      { name: 'Anomaly Detection (Isolation Forest)', icon: '🔬' },
    ],
  },
  {
    title: 'Full-Stack & Cloud',
    description: 'Modern reactive web interfaces, type-safe frontend systems, cloud compute, and automated CI/CD.',
    skills: [
      { name: 'Next.js 15 & React 19', icon: '⚛️' },
      { name: 'TypeScript', icon: '🔷' },
      { name: 'Tailwind CSS', icon: '🎨' },
      { name: 'Microsoft Azure', icon: '☁️' },
      { name: 'Google Cloud Platform (98 Badges)', icon: '🌐' },
      { name: 'Git & Docker', icon: '⚙️' },
    ],
  },
];
