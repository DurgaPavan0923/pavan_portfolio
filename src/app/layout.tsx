import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { CustomCursor } from '@/components/layout/CustomCursor';
import { PROFILE_DATA } from '@/data/profile';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pavan-portfolio-gamma-six.vercel.app';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#050814' },
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${PROFILE_DATA.fullName} — AI & ML Engineer`,
  description:
    'Portfolio of Rajana Durga Pavan Kumar. AI & Machine Learning Engineer specializing in Retrieval-Augmented Generation (RAG), Graph RAG (Neo4j), Multi-Agent AI, and Cloud Architecture.',
  keywords: [
    'Rajana Durga Pavan Kumar',
    'Pavan Kumar',
    'AI ML Engineer',
    'Machine Learning Engineer',
    'RAG Systems Architect',
    'Neo4j Certified Professional',
    'Google Cloud Diamond League',
    'TIH IIT Guwahati Intern',
    'GDGoC ITER Club Coordinator',
    'Deep Learning',
    'FactLens AI',
  ],
  authors: [{ name: PROFILE_DATA.fullName, url: PROFILE_DATA.contact.github }],
  creator: PROFILE_DATA.fullName,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: `${PROFILE_DATA.fullName} — AI & ML Engineer`,
    description:
      'AI & Machine Learning Engineer building RAG systems, multi-agent pipelines, and cloud architectures. Neo4j Certified · GCP Diamond League · TIH IIT Guwahati Intern.',
    siteName: `${PROFILE_DATA.fullName} Portfolio`,
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${PROFILE_DATA.fullName} - AI & Machine Learning Engineer`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PROFILE_DATA.fullName} — AI & ML Engineer`,
    description:
      'AI & Machine Learning Engineer building RAG systems, multi-agent pipelines, and cloud architectures.',
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/Pavan.jpeg',
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PROFILE_DATA.fullName,
    alternateName: PROFILE_DATA.shortName,
    url: siteUrl,
    image: `${siteUrl}/Pavan.jpeg`,
    jobTitle: PROFILE_DATA.title,
    worksFor: {
      '@type': 'Organization',
      name: 'Technology Innovation Hub (TIH), IIT Guwahati',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: PROFILE_DATA.education.institution,
    },
    sameAs: [
      PROFILE_DATA.contact.github,
      PROFILE_DATA.contact.linkedin,
    ],
    knowsAbout: [
      'Machine Learning',
      'Deep Learning',
      'Retrieval-Augmented Generation (RAG)',
      'Artificial Intelligence',
      'Natural Language Processing',
      'Cloud Architecture',
      'Neo4j Graph Databases',
      'Next.js 15',
    ],
  };

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('pavan_portfolio_theme')||'dark';document.documentElement.classList.remove('light','dark');document.documentElement.classList.add(t);document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
        <ThemeProvider>
          <SmoothScroll>
            <ScrollProgress />
            <CustomCursor />
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
