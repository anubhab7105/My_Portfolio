import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore Anubhab Das\'s project portfolio — including a secure e-commerce platform, JWT authentication system, AI-powered cyber threat analyzer, chatbot, and health metrics dashboard.',
  alternates: { canonical: 'https://anubhab-das.vercel.app/projects' },
  openGraph: {
    title: 'Projects by Anubhab Das | Cyber Security & Web Dev',
    description: 'Security-focused web projects: e-commerce, JWT auth, AI threat analysis, chatbot, and health dashboards.',
    url: 'https://anubhab-das.vercel.app/projects',
    images: [{ url: '/images/project1.png' }],
  },
  twitter: { card: 'summary_large_image' },
};
