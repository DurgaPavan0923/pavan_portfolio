import { SkillCategory } from '@/types';

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Core (Use Daily)',
    description: 'Foundational programming languages, deep learning frameworks, and engineering tools applied daily.',
    skills: [
      { name: 'Python', icon: '🐍' },
      { name: 'PyTorch', icon: '🔥' },
      { name: 'TypeScript', icon: '🔷' },
      { name: 'Scikit-Learn', icon: '📊' },
      { name: 'Next.js 15 & React 19', icon: '⚛️' },
      { name: 'Tailwind CSS', icon: '🎨' },
      { name: 'SQL', icon: '🗄️' },
      { name: 'Git & GitHub Actions', icon: '⚙️' },
    ],
  },
  {
    title: 'Working (Used in Projects)',
    description: 'Specialized technologies, cloud services, and retrieval engines proven in evaluated projects.',
    skills: [
      { name: 'Google Gemini API', icon: '✨' },
      { name: 'Neo4j & Cypher (Certified)', icon: '🕸️' },
      { name: 'Pinecone Vector DB', icon: '🌲' },
      { name: 'FastAPI', icon: '⚡' },
      { name: 'Hugging Face Transformers', icon: '🤗' },
      { name: 'Pandas & NumPy', icon: '🔢' },
      { name: 'Microsoft Azure', icon: '☁️' },
      { name: 'Docker', icon: '🐳' },
    ],
  },
  {
    title: 'Familiar (Coursework & Labs)',
    description: 'Academic university coursework, cloud platform completion labs, and exploratory frameworks.',
    skills: [
      { name: 'Java', icon: '☕' },
      { name: 'PostgreSQL', icon: '🐘' },
      { name: 'Google Cloud Platform (98 Badges)', icon: '🌐' },
      { name: 'Three.js / WebGL', icon: '🌌' },
      { name: 'LangChain & LlamaIndex', icon: '🦜' },
      { name: 'TensorFlow', icon: '🧠' },
    ],
  },
];
