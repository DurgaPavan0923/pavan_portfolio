import { ProfileData } from '@/types';
import { PROJECTS } from './projects';
import { CERTIFICATIONS } from './certifications';

export const PROFILE_DATA: ProfileData = {
  fullName: 'Rajana Durga Pavan Kumar',
  shortName: 'Pavan Kumar',
  title: 'CS Student · AI & ML',
  roles: [
    'CS Student (AI & ML)',
    'AI & ML Practitioner',
    'Deep Learning & NLP',
    'Cloud Solutions Enthusiast',
  ],
  taglines: [
    'Computer Science Student (AI & ML) at SOA ITER',
    'Building Practical AI Applications & RAG Pipelines',
    'Evaluating Machine Learning Models Honestly',
    'Seeking AI/ML Internships & Entry-Level Roles',
  ],
  education: {
    degree: 'B.Tech in Computer Science and Engineering',
    field: 'Artificial Intelligence & Machine Learning',
    institution: 'Siksha ‘O’ Anusandhan (SOA), ITER',
    period: 'Aug 2023 – Jul 2027',
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
    cloudBadges: '98 Google Cloud badges',
  },
  cloudBadgesBreakdown:
    '57 skill badges · 12 arcade games · 9 trivia · 18 lab-free courses (Apr 1 – Jun 2, 2025, Diamond League, Ultimate Milestone)',
  about:
    'Computer Science undergraduate (Class of 2027) specializing in AI & Machine Learning at SOA University (ITER), Bhubaneswar. I build practical AI applications, Retrieval-Augmented Generation (RAG) pipelines, and machine learning systems backed by empirical evaluations. Seeking AI/ML internships and entry-level software engineering roles.',
  currently: {
    building: 'FactLens AI (fact verification pipeline) & environmental ML models',
    learning: 'Distributed training & graph-augmented retrieval systems',
    seeking: 'AI/ML internships and entry-level software engineering roles',
  },
  bioParagraphs: [
    'I’m Rajana Durga Pavan Kumar, a Computer Science undergraduate specializing in AI & Machine Learning at SOA University (ITER), Class of 2027. I build practical AI applications, Retrieval-Augmented Generation (RAG) pipelines, and machine learning systems backed by empirical evaluations.',
    'My technical focus spans multi-agent orchestration, graph-enhanced semantic search (Neo4j + Pinecone), and natural language processing. I serve as a Student Intern at TIH IIT Guwahati and Club Coordinator at GDGoC ITER, coordinating technical workshops and study jams across campus.',
    'From architecting multi-agent fact verification platforms like FactLens AI to developing dual-track environmental ML forecasters, I focus on software systems that are empirically tested and defensible in production.',
  ],
};
