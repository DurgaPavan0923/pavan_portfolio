import { SkillCategory } from '@/types';

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Generative AI, LLMs & RAG',
    description: 'Architecting retrieval-augmented pipelines, multi-agent systems, and graph RAG.',
    skills: [
      { name: 'RAG Architectures', level: 'Expert', icon: '🔗' },
      { name: 'Google Gemini API', level: 'Expert', icon: '✨' },
      { name: 'LangChain & LlamaIndex', level: 'Advanced', icon: '🦜' },
      { name: 'Vector DBs (Pinecone, FAISS)', level: 'Expert', icon: '⚡' },
      { name: 'Graph RAG (Neo4j)', level: 'Expert', icon: '🕸️' },
      { name: 'Prompt Engineering', level: 'Expert', icon: '📝' },
      { name: 'Multi-Agent Systems', level: 'Advanced', icon: '🤖' },
      { name: 'Model Fine-Tuning', level: 'Intermediate', icon: '🎯' },
    ],
  },
  {
    title: 'Machine Learning & Deep Learning',
    description: 'End-to-end model training, evaluation, NLP pipelines, and feature engineering.',
    skills: [
      { name: 'PyTorch', level: 'Advanced', icon: '🔥' },
      { name: 'TensorFlow', level: 'Advanced', icon: '🧠' },
      { name: 'Scikit-Learn', level: 'Expert', icon: '📊' },
      { name: 'Hugging Face Transformers', level: 'Advanced', icon: '🤗' },
      { name: 'NLP & Seq2Seq Models', level: 'Expert', icon: '🗣️' },
      { name: 'Computer Vision (OpenCV)', level: 'Advanced', icon: '👁️' },
      { name: 'Pandas & NumPy', level: 'Expert', icon: '🔢' },
      { name: 'LightGBM & XGBoost', level: 'Advanced', icon: '🌲' },
    ],
  },
  {
    title: 'Cloud Platforms & MLOps',
    description: 'Deploying resilient cloud architectures, containerized APIs, and automated CI/CD.',
    skills: [
      { name: 'Microsoft Azure (AICTE Elevate)', level: 'Advanced', icon: '☁️' },
      { name: 'Google Cloud Platform (GCP)', level: 'Advanced', icon: '🌐' },
      { name: 'Arcade Diamond League (98 Badges)', level: 'Expert', icon: '💎' },
      { name: 'Docker & Containerization', level: 'Advanced', icon: '🐳' },
      { name: 'FastAPI & Flask', level: 'Expert', icon: '⚡' },
      { name: 'Vercel Edge Runtime', level: 'Expert', icon: '▲' },
      { name: 'GitHub Actions CI/CD', level: 'Advanced', icon: '⚙️' },
      { name: 'Azure AI Services & Studio', level: 'Advanced', icon: '☁️' },
    ],
  },
  {
    title: 'Languages & Core Computer Science',
    description: 'Foundational programming proficiency and algorithmic problem solving.',
    skills: [
      { name: 'Python', level: 'Expert', icon: '🐍' },
      { name: 'Java', level: 'Advanced', icon: '☕' },
      { name: 'SQL', level: 'Advanced', icon: '🗄️' },
      { name: 'TypeScript', level: 'Advanced', icon: '🔷' },
      { name: 'JavaScript (ESNext)', level: 'Advanced', icon: '🟨' },
      { name: 'Data Structures & Algorithms', level: 'Advanced', icon: '📐' },
      { name: 'Object-Oriented Programming', level: 'Advanced', icon: '🧩' },
      { name: 'DBMS & Database Architecture', level: 'Advanced', icon: '💾' },
    ],
  },
  {
    title: 'Databases & Storage',
    description: 'Graph databases, relational stores, document indices, and vector caching.',
    skills: [
      { name: 'Neo4j (Certified Professional)', level: 'Expert', icon: '🔗' },
      { name: 'PostgreSQL', level: 'Advanced', icon: '🐘' },
      { name: 'Pinecone Vector Database', level: 'Expert', icon: '🌲' },
      { name: 'MongoDB', level: 'Intermediate', icon: '🍃' },
      { name: 'SQLite', level: 'Advanced', icon: '🪶' },
    ],
  },
  {
    title: 'Frontend & Interactive Visuals',
    description: 'Building ultra-responsive, accessible, and high-performance interactive interfaces.',
    skills: [
      { name: 'Next.js 15 (App Router)', level: 'Expert', icon: '▲' },
      { name: 'React 19', level: 'Expert', icon: '⚛️' },
      { name: 'Tailwind CSS v4', level: 'Expert', icon: '🎨' },
      { name: 'Three.js / WebGL', level: 'Intermediate', icon: '🌌' },
      { name: 'Framer Motion', level: 'Advanced', icon: '🎬' },
      { name: 'Zustand State Management', level: 'Advanced', icon: '🐻' },
    ],
  },
];
