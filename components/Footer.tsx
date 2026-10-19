import Link from 'next/link';
import { ArrowUpRight, Github } from 'lucide-react';
import { LinkedinIcon } from '@/components/SocialIcons';

const footerLinks = [
  { href: '/projects', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/publications', label: 'Research' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="lab-footer" role="contentinfo">
      <div className="container lab-container">
        <div className="lab-footer-main">
          <div className="lab-footer-brand">
            <Link href="/" className="lab-footer-mark">AD<span>.</span></Link>
            <p>Thoughtful software.<br />Systems built with intent.</p>
          </div>
          <div className="lab-footer-nav">
            <span className="lab-mono-label">EXPLORE</span>
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href}>{link.label}</Link>
            ))}
          </div>
          <div className="lab-footer-connect">
            <span className="lab-mono-label">FIND ME ELSEWHERE</span>
            <a href="https://github.com/anubhab7105" target="_blank" rel="noopener noreferrer">
              <Github size={15} aria-hidden="true" /> GitHub <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <a href="https://www.linkedin.com/in/anubhab7105/" target="_blank" rel="noopener noreferrer">
              <LinkedinIcon size={15} aria-hidden="true" /> LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <a href="https://scholar.google.com/citations?user=qOzRzE8AAAAJ&hl=en" target="_blank" rel="noopener noreferrer">
              Google Scholar <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="lab-footer-bottom">
          <span>© {new Date().getFullYear()} Anubhab Das</span>
          <span>KOLKATA, INDIA <i aria-hidden="true" /> BUILT WITH CARE</span>
          <a href="#top" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
