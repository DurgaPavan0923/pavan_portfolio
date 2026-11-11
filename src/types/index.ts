export type ProjectCategory = 'All' | 'AI/ML' | 'Full Stack AI' | 'NLP' | 'Web3' | 'Open Source';

export interface ProjectMetric {
  label: string;
  value: string;
  change?: string;
}

export interface ArchitectureStep {
  icon: string;
  title: string;
  desc: string;
}

export interface EvalMetric {
  label: string;
  value: string;
}

export interface ProjectEvalResult {
  summary: string;
  dataset: string;
  sampleSize: string;
  date: string;
  metrics: EvalMetric[];
}

export interface Project {
  slug: string;
  name: string;
  emoji: string;
  category: ProjectCategory;
  featured: boolean;
  tagline: string;
  description: string;
  problem: string;
  approach?: string;
  solution: string;
  whatIdImprove?: string;
  limitations?: string;
  screenshotUrl?: string;
  architectureDiagram?: string;
  evalResult?: ProjectEvalResult;
  evalUrl?: string;
  architecture: string;
  architectureSteps?: ArchitectureStep[];
  technologies: string[];
  deployment: string;
  impact: string;
  metrics: ProjectMetric[];
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  stars?: number;
  forks?: number;
}

export interface SkillItem {
  name: string;
  icon: string;
  highlight?: boolean;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: SkillItem[];
}

export interface ExperienceRole {
  title: string;
  company: string;
  location: string;
  period: string;
  type?: 'Internship' | 'Leadership' | 'Community' | 'Ambassador';
  icon: string;
  points: string[];
  skills: string[];
  verifyUrl?: string;
  repoUrl?: string;
}

export interface ResearchInterest {
  title: string;
  icon: string;
  description: string;
  keywords: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  category: 'Cloud' | 'AI/ML' | 'Hackathons' | 'Leadership';
  icon: string;
  verifyUrl?: string;
  credentialId?: string;
  badge?: string;
  type?: 'Certification' | 'Participation';
}

export interface LeadershipRecognition {
  title: string;
  organization: string;
  period?: string;
  description: string;
  icon: string;
  badge?: string;
}

export type GalleryCategory = 'All' | 'Hackathons & Tech' | 'NCC & Discipline' | 'Community & Leadership';

export interface GalleryItem {
  id: string;
  title: string;
  subtitle?: string;
  category: 'Hackathons & Tech' | 'NCC & Discipline' | 'Community & Leadership';
  date: string;
  location: string;
  description: string;
  imageSrc: string;
  aspectRatio?: 'portrait' | 'landscape' | 'wide';
  tags?: string[];
  badge?: string;
  width?: number;
  height?: number;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category?: string;
  tags: string[];
  published?: boolean;
  externalUrl?: string;
}

export interface ProfileData {
  fullName: string;
  shortName: string;
  title: string;
  roles: string[];
  taglines: string[];
  education: {
    degree: string;
    field: string;
    institution: string;
    period: string;
    location: string;
  };
  contact: {
    email: string;
    phone?: string;
    location: string;
    github: string;
    githubUsername: string;
    linkedin: string;
    linkedinUsername: string;
    resumePath: string;
    designChallengeUrl?: string;
  };
  stats: {
    projectsCount: string;
    certificationsCount: string;
    problemsSolved: string;
    hackathonsCount: string;
    cloudBadges: string;
  };
  bioParagraphs: string[];
  about?: string;
  currently?: {
    building: string;
    learning: string;
    seeking: string;
  };
  cloudBadgesBreakdown?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}
