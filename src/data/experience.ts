import { ExperienceRole } from '@/types';

export const EXPERIENCES: ExperienceRole[] = [
  {
    title: 'Student Intern',
    company: 'Technology Innovation Hub (TIH), IIT Guwahati',
    location: 'Remote, India',
    period: 'Jun 2026 – Present',
    icon: '🔬',
    points: [
      'Assisted in applied machine learning research and neural representation benchmarking under faculty mentorship.',
      'Curated standardized evaluation datasets and executed reproducible PyTorch evaluation pipelines.',
    ],
    skills: ['PyTorch', 'Machine Learning', 'Benchmarking', 'Python'],
    verifyUrl: 'https://www.linkedin.com/in/rajana-durga-pavan-kumar-432248298',
  },
  {
    title: 'Club Coordinator',
    company: 'Google Developer Groups on Campus (GDGoC) ITER',
    location: 'Bhubaneswar, Odisha',
    period: 'Sep 2025 – Present',
    icon: '🚀',
    points: [
      'Recruited and led a 100+ member cross-functional chapter team after reviewing 600+ student applications.',
      'Facilitated the Google Cloud Study Jam across campus, guiding 150+ students through hands-on cloud labs and badge completions.',
      'Directed campus-wide operations, technical infrastructure, and logistics for Chakravyuh Genesis.',
    ],
    skills: ['Technical Leadership', 'Team Operations', 'Community Building', 'Cloud Jam Facilitation'],
    verifyUrl: 'https://gdg.community.dev/gdg-on-campus-siksha-o-anusandhan-university-bhubaneswar-india/',
  },
  {
    title: 'AI Intern',
    company: 'Edunet Foundation (IBM SkillsBuild & AICTE)',
    location: 'Remote, India',
    period: 'May 2026 – Jun 2026',
    icon: '🤖',
    points: [
      'Built FactLens AI, an explainable fact-verification system, using Next.js 15, TypeScript, Gemini API, Neo4j, and Pinecone.',
      'Engineered dual-layer retrieval combining Pinecone dense vector search with Neo4j Cypher knowledge graph traversal → achieved 94.0% evaluation accuracy across multi-hop claims.',
      'Implemented automated entity relation mapping and citation generation → provided transparent verification trails for disputed media claims.',
    ],
    skills: ['Next.js 15', 'TypeScript', 'Gemini API', 'Neo4j', 'Pinecone', 'Python'],
    repoUrl: 'https://github.com/DurgaPavan0923/FactLens-AI',
  },
  {
    title: 'Azure Cloud Intern — Microsoft Elevate',
    company: 'Microsoft (AICTE Initiative)',
    location: 'Remote, India',
    period: '20 Jan 2026 – 12 Feb 2026',
    icon: '☁️',
    points: [
      'Completed an intensive 4-week, 25-hour Microsoft Azure cloud training track covering core cloud architecture and security fundamentals.',
      'Configured and deployed Azure Virtual Machines, Blob Storage accounts, and Virtual Networks using Azure Portal and CLI.',
      'Completed hands-on labs with Azure AI Services for cloud-hosted natural language and cognitive API integration.',
    ],
    skills: ['Microsoft Azure', 'Azure Virtual Machines', 'Azure Blob Storage', 'Azure AI Services'],
  },
  {
    title: 'AI/ML Intern',
    company: 'InternPro',
    location: 'Remote, India',
    period: '16 Jun 2025 – Jul 2025 (6 weeks)',
    icon: '📈',
    points: [
      'Completed a 6-week machine learning internship starting 16 Jun 2025.',
      'Built a dynamic real estate price prediction pipeline using Python, Scikit-Learn, and Pandas → performed data preprocessing, feature engineering, and cross-validated regression modeling.',
    ],
    skills: ['Python', 'Scikit-Learn', 'Pandas', 'Regression Modeling', 'Data Cleaning'],
  },
  {
    title: 'Campus Ambassador',
    company: 'Cognizance IIT Roorkee & eDC IIT Delhi',
    location: 'Remote / Campus Liaison',
    period: 'Dec 2025 – Mar 2026',
    icon: '🎙️',
    points: [
      'Liaised between IIT technical fest organizers and SOA University to drive student participation in national engineering competitions.',
      'Conducted outreach and information sessions for students on competitive programming and hackathon tracks.',
    ],
    skills: ['Technical Outreach', 'Student Engagement', 'Liaison'],
  },
];
