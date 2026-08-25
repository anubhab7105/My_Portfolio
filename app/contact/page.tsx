import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Anubhab Das for collaboration, internship opportunities, or projects in web development and cyber security. Based in Kolkata, India.',
  alternates: { canonical: 'https://anubhab-das.vercel.app/contact' },
  openGraph: {
    title: 'Contact Anubhab Das',
    description: 'Reach out for collaboration, opportunities, or just a conversation about security and web development.',
    url: 'https://anubhab-das.vercel.app/contact',
    images: [{ url: '/images/protfolio.jpg' }],
  },
  twitter: { card: 'summary' },
};

export default function ContactPage() {
  return <ContactClient />;
}
