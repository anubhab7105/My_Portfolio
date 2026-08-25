import Link from 'next/link';

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/publications', label: 'Publications' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer role="contentinfo">
      <div className="footer-inner">
        <div className="footer-logo">
          AD<span>.</span>
        </div>
        <div className="footer-links">
          {footerLinks.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} Anubhab Das. All rights reserved.</p>
      </div>
    </footer>
  );
}
