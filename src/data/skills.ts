import { SkillCategory } from '@/types';

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Machine Learning',
    description: 'Statistical modeling, deep learning architectures, feature engineering, and empirical evaluation metrics.',
    skills: [
      { name: 'Python', icon: 'Code2' },
      { name: 'PyTorch', icon: 'Brain' },
      { name: 'Scikit-Learn', icon: 'BarChart3' },
      { name: 'XGBoost', icon: 'Zap' },
      { name: 'Pandas & NumPy', icon: 'Database' },
      { name: 'Model Evaluation & Metrics', icon: 'CheckCircle2' },
    ],
  },
  {
    title: 'Generative AI',
    description: 'Retrieval-Augmented Generation, knowledge graphs, semantic vector search, and agent orchestration.',
    skills: [
      { name: 'Google Gemini API', icon: 'Sparkles' },
      { name: 'RAG Architecture', icon: 'Layers' },
      { name: 'Neo4j Graph RAG (Certified)', icon: 'Share2' },
      { name: 'Vector Search & Embeddings', icon: 'Search' },
      { name: 'Hugging Face Transformers', icon: 'Cpu' },
      { name: 'Prompt Engineering', icon: 'Terminal' },
    ],
  },
  {
    title: 'AI Engineering',
    description: 'Microservice APIs, probability calibration, data schema contracts, and temporal stream forecasting.',
    skills: [
      { name: 'FastAPI', icon: 'Zap' },
      { name: 'Pinecone Vector DB', icon: 'Database' },
      { name: 'Platt Calibration', icon: 'CheckCircle2' },
      { name: 'Data Validation (Zod & Pydantic)', icon: 'Shield' },
      { name: 'Time-Series Forecasters', icon: 'TrendingUp' },
      { name: 'Anomaly Detection (Isolation Forest)', icon: 'Activity' },
    ],
  },
  {
    title: 'Full-Stack & Cloud',
    description: 'Modern reactive web interfaces, type-safe frontend systems, cloud compute, and automated CI/CD.',
    skills: [
      { name: 'Next.js 15 & React 19', icon: 'Globe' },
      { name: 'TypeScript', icon: 'FileCode' },
      { name: 'Tailwind CSS', icon: 'Palette' },
      { name: 'Microsoft Azure', icon: 'Cloud' },
      { name: 'Google Cloud Platform (98 Badges)', icon: 'Cloud' },
      { name: 'Git & Docker', icon: 'Container' },
    ],
  },
];
