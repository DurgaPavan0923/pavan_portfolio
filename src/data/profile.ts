import { ProfileData } from '@/types';
import { PROJECTS } from './projects';
import { CERTIFICATIONS } from './certifications';

export const PROFILE_DATA: ProfileData = {
  fullName: 'Rajana Durga Pavan Kumar',
  shortName: 'Pavan Kumar',
  title: 'AI & Machine Learning Engineer',
  roles: [
    'AI & ML Engineer',
    'RAG Systems Architect',
    'Deep Learning Practitioner',
    'Cloud Solutions Engineer',
  ],
  taglines: [
    'Building RAG Systems & Evaluation Pipelines',
    'Training Deep Learning & NLP Models',
    'Deploying Containerized Cloud Microservices',
    'Transforming Model Checkpoints into Practical AI Systems',
  ],
  education: {
    degree: 'B.Tech in Computer Science and Engineering',
    field: 'Artificial Intelligence & Machine Learning',
    institution: 'Siksha ‘O’ Anusandhan (SOA), ITER',
    period: 'Aug 2023 – Jul 2027',
    cgpa: '7.85 / 10.0',
    location: 'Bhubaneswar, Odisha, India',
  },
  contact: {
    email: 'rdpkumar2308@gmail.com',
    phone: '+91 82606 30538',
    location: 'Bhubaneswar, Odisha, India',
    github: 'https://github.com/DurgaPavan0923',
    githubUsername: 'DurgaPavan0923',
    linkedin: 'https://www.linkedin.com/in/rajana-durga-pavan-kumar-432248298',
    linkedinUsername: 'rajana-durga-pavan-kumar',
    resumePath: '/Rajana.pdf',
    designChallengeUrl: 'https://www.linkedin.com/in/rajana-durga-pavan-kumar-432248298',
  },
  stats: {
    projectsCount: `${PROJECTS.length}`,
    certificationsCount: `${CERTIFICATIONS.length}`,
    problemsSolved: '300+',
    hackathonsCount: 'Abinya 3.0',
    cloudBadges: '98 Badges (Arcade Diamond)',
  },
  bioParagraphs: [
    "I’m Rajana Durga Pavan Kumar, a Computer Science undergraduate specializing in AI & Machine Learning at SOA University (ITER). I build practical, well-engineered AI applications, Retrieval-Augmented Generation (RAG) pipelines, and cloud-native machine learning systems.",
    "My technical focus spans multi-agent orchestration, graph-enhanced semantic search (Neo4j + Pinecone), and natural language processing. I serve as a Student Intern at TIH IIT Guwahati and Club Coordinator at GDGoC ITER, coordinating technical workshops and study jams across campus.",
    "From architecting multi-agent fact verification platforms like FactLens AI to developing dual-track environmental ML forecasters, I bridge the gap between empirical evaluations and production software systems.",
  ],
};
