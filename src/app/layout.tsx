import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { PROFILE_DATA } from '@/data/profile';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pavan-portfolio-gamma-six.vercel.app';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#090d16' },
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${PROFILE_DATA.fullName} — Computer Science Student · AI & ML`,
  description:
    'Portfolio of Rajana Durga Pavan Kumar. Computer Science student specializing in AI & Machine Learning, building practical AI applications.',
  keywords: [
    'Rajana Durga Pavan Kumar',
    'Pavan Kumar',
    'Computer Science Student',
    'AI & ML',
    'Machine Learning',
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
    title: `${PROFILE_DATA.fullName} — Computer Science Student · AI & ML`,
    description:
      'Computer Science student specializing in AI & Machine Learning, building practical AI applications. Neo4j Certified · GCP Diamond League · TIH IIT Guwahati Intern.',
    siteName: `${PROFILE_DATA.fullName} Portfolio`,
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${PROFILE_DATA.fullName} - Computer Science Student (AI & ML)`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PROFILE_DATA.fullName} — Computer Science Student · AI & ML`,
    description:
      'Computer Science student specializing in AI & Machine Learning, building practical AI applications.',
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
    affiliation: {
      '@type': 'EducationalOrganization',
      name: PROFILE_DATA.education.institution,
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
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
