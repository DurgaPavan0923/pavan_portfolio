'use client';

import React from 'react';
import {
  Brain,
  Cloud,
  Database,
  Rocket,
  Users,
  Award,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface BentoCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  highlights: string[];
  colSpan?: string;
  badge?: string;
}

function BentoCard({
  title,
  subtitle,
  description,
  icon,
  highlights,
  colSpan = 'col-span-1',
  badge,
}: BentoCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-white/70 dark:bg-slate-900/40 border border-slate-200 dark:border-white/[0.08] p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/5 ${colSpan}`}
    >
      {/* Subtle Glow Backdrop */}
      <div className="absolute -right-16 -top-16 w-36 h-36 rounded-full bg-cyan-500/10 blur-3xl transition-opacity group-hover:opacity-100 opacity-40 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/15 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
              {icon}
            </div>
            {badge && (
              <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
                {badge}
              </span>
            )}
          </div>

          <div className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-1">
            {subtitle}
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-3">
            {title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
            {description}
          </p>
        </div>

        {/* Highlights List */}
        <div className="pt-4 border-t border-slate-200/60 dark:border-white/[0.06] flex flex-wrap gap-2">
          {highlights.map((item, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
              <span>{item}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const TECH_MARQUEE = [
  'Python',
  'PyTorch',
  'LangChain',
  'Neo4j Cypher',
  'Next.js 15',
  'FastAPI',
  'Microsoft Azure',
  'Google Cloud',
  'Docker',
  'TypeScript',
  'PostgreSQL',
  'Hugging Face',
  'LlamaIndex',
  'Redis',
  'Tailwind CSS',
  'Vector DBs',
];

export function WhyWorkWithMe() {
  return (
    <section
      id="why-me"
      aria-label="Why Work With Me"
      className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-mono mb-4 border border-cyan-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CORE VALUE PROPOSITION</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 font-display">
          Why Work With Me
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400">
          Production AI engineering that bridges cutting-edge research algorithms, verifiable
          dual-cloud systems, and reliable full-stack delivery.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: RAG & Graph RAG (2 cols on lg) */}
        <BentoCard
          title="RAG & Graph RAG Engineering"
          subtitle="Enterprise Context Systems"
          description="Architecting hybrid retrieval pipelines integrating Neo4j knowledge graphs with high-dimensional vector embeddings, semantic chunking, and cross-encoder rerankers for hallucination-resistant, sub-second responses."
          icon={<Brain className="w-6 h-6" />}
          highlights={[
            'Hybrid Vector + Graph Traversal',
            'Sub-second Latency Pipelines',
            'Verifiable Entity Attribution',
          ]}
          colSpan="lg:col-span-2"
          badge="Core Specialization"
        />

        {/* Card 2: Dual-Cloud Certified (1 col) */}
        <BentoCard
          title="Dual-Cloud Certified"
          subtitle="Azure & Google Cloud"
          description="Microsoft Certified: Azure Data Scientist Associate (DP-100) and Google Cloud Diamond Tier achiever with 10+ completed skill badges spanning compute, security, and ML workflows."
          icon={<Cloud className="w-6 h-6" />}
          highlights={[
            'Azure Data Scientist (DP-100)',
            'GCP Diamond Tier Achiever',
            'Automated ML Cloud Pipelines',
          ]}
          colSpan="lg:col-span-1"
          badge="Industry Verified"
        />

        {/* Card 3: Community Leadership (1 col) */}
        <BentoCard
          title="100+ Member Leadership"
          subtitle="GDGoC ITER Coordinator"
          description="Built and coordinated a 100+ member developer community. Spearheaded technical events such as Chakravyuh Genesis, hands-on cloud study jams, and developer workshops."
          icon={<Users className="w-6 h-6" />}
          highlights={[
            'Chakravyuh Genesis Lead',
            '600+ Candidate Applications',
            'Hands-on Tech Workshops',
          ]}
          colSpan="lg:col-span-1"
          badge="Proven Leadership"
        />

        {/* Card 4: Full-Stack AI Delivery (2 cols on lg) */}
        <BentoCard
          title="Full-Stack AI Product Delivery"
          subtitle="Next.js 15 • FastAPI • Docker"
          description="Translating AI research into robust production software. Real-time streaming inference, responsive and accessible user interfaces, containerized microservices, and end-to-end type safety."
          icon={<Rocket className="w-6 h-6" />}
          highlights={[
            'Next.js 15 App Router & Server Actions',
            'Async FastAPI & Streaming Endpoints',
            'Production Docker Deployments',
          ]}
          colSpan="lg:col-span-2"
          badge="End-to-End Delivery"
        />

        {/* Card 5: Neo4j Professional (Full row / 3 cols on lg) */}
        <BentoCard
          title="Neo4j Certified Professional"
          subtitle="Graph Database Modeling"
          description="Certified professional in graph schema modeling, Cypher query optimization, entity resolution, and connecting knowledge graphs directly into production LLM agents for deterministic context retrieval."
          icon={<Database className="w-6 h-6" />}
          highlights={[
            'Certified Graph Professional',
            'Cypher Query Optimization',
            'Enterprise Entity Resolution',
          ]}
          colSpan="lg:col-span-3"
          badge="Graph Authority"
        />
      </div>

      {/* Infinite Tech Marquee */}
      <div className="mt-16 pt-10 border-t border-slate-200 dark:border-white/[0.08]">
        <div className="text-center text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-6">
          Core Production Stack & Tooling
        </div>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div className="flex gap-4 w-max animate-marquee-rtl py-2">
            {[...TECH_MARQUEE, ...TECH_MARQUEE].map((tech, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-medium bg-slate-100 dark:bg-white/[0.04] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/[0.08] hover:border-cyan-500/40 transition-colors whitespace-nowrap"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
