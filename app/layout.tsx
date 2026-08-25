import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';

export const metadata: Metadata = {
  metadataBase: new URL('https://anubhab-das.vercel.app'),
  title: {
    default: 'Anubhab Das | Cyber Security Student & Web Developer — Kolkata',
    template: '%s | Anubhab Das',
  },
  description:
    'Anubhab Das is a Cyber Security student at GNIT Kolkata and full-stack web developer specializing in secure web applications, OWASP best practices, and modern frontend development.',
  keywords: ['Anubhab Das', 'Cyber Security', 'Web Developer', 'Kolkata', 'GNIT', 'portfolio', 'secure web applications', 'OWASP'],
  authors: [{ name: 'Anubhab Das' }],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: 'https://anubhab-das.vercel.app/',
    siteName: 'Anubhab Das Portfolio',
    locale: 'en_IN',
    images: [{ url: '/images/protfolio.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/protfolio.jpg'],
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🛡️</text></svg>",
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Anubhab Das',
  url: 'https://anubhab-das.vercel.app/',
  image: 'https://anubhab-das.vercel.app/images/protfolio.jpg',
  jobTitle: 'Cyber Security Student & Web Developer',
  description:
    'Cyber Security student at Guru Nanak Institute of Technology, Kolkata. Full-stack web developer specializing in secure application development.',
  email: 'anubhab7105@gmail.com',
  telephone: '+917439913838',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kolkata',
    addressRegion: 'West Bengal',
    addressCountry: 'IN',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Guru Nanak Institute of Technology',
    address: 'Kolkata, West Bengal, India',
  },
  sameAs: ['https://github.com/anubhab7105', 'http://www.linkedin.com/in/anubhab7105'],
  knowsAbout: ['Cyber Security', 'Web Development', 'OWASP', 'Python', 'JavaScript', 'HTML', 'CSS'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
