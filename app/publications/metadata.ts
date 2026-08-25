import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Publications',
  description:
    'Research publications by Anubhab Das in cybersecurity, web security, AI/ML, and related fields. Peer-reviewed papers, preprints, and academic contributions.',
  alternates: { canonical: 'https://anubhab-das.vercel.app/publications' },
  openGraph: {
    title: 'Research Publications — Anubhab Das',
    description: 'Academic publications in cybersecurity, AI threat detection, web security, and privacy-preserving systems.',
    url: 'https://anubhab-das.vercel.app/publications',
    images: [{ url: '/images/protfolio.jpg' }],
  },
  twitter: { card: 'summary_large_image' },
};
