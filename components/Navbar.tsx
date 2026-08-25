'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Download, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'HOME' },
  { href: '/about', label: 'ABOUT' },
  { href: '/projects', label: 'PROJECTS' },
  { href: '/publications', label: 'PUBLICATIONS' },
  { href: '/contact', label: 'CONTACT' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="nav-inner">
          <Link href="/" className="nav-logo" aria-label="Anubhab Das Home">
            AD<span>.</span>
          </Link>

          <div className="nav-links" role="menubar">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                role="menuitem"
                className={isActive(link.href) ? 'active' : ''}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <a
            href="/images/AnubhabDasResume.pdf"
            className="nav-cta"
            download
            aria-label="Download Resume"
          >
            <Download size={13} aria-hidden="true" />
            RESUME
          </a>

          <button
            className={`nav-hamburger${mobileOpen ? ' open' : ''}`}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile nav */}
      <div className={`nav-mobile${mobileOpen ? ' open' : ''}`} aria-label="Mobile navigation">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={isActive(link.href) ? 'active' : ''}
          >
            {link.label}
          </Link>
        ))}
        <a href="/images/AnubhabDasResume.pdf" className="nav-cta" download>
          <Download size={13} aria-hidden="true" />↓ RESUME
        </a>
      </div>
    </>
  );
}
