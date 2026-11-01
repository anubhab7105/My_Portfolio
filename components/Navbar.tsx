'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';

const navLinks = [
  { href: '/projects', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/publications', label: 'Research' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const activeTheme = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
    setTheme(activeTheme);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    try {
      window.localStorage.setItem('portfolio-theme', nextTheme);
    } catch {
      // The theme still changes for this session when storage is unavailable.
    }
    setTheme(nextTheme);
  };

  return (
    <header id="top" className={`lab-navbar${pathname === '/' ? ' is-home' : ''}${scrolled ? ' has-scrolled' : ''}`}>
      <nav className="lab-nav-inner" aria-label="Main navigation">
        <Link href="/" className="lab-brand" aria-label="Anubhab Das, home">
          <span className="lab-brand-mark">AD<span>.</span></span>
          <span className="lab-brand-meta">
            <b>ANUBHAB DAS</b>
            <i>FULL-STACK × SECURITY</i>
          </span>
        </Link>

        <div className="lab-nav-links">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={isActive(link.href) ? 'is-active' : ''}
              aria-current={isActive(link.href) ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <a href="/images/AnubhabDasResume.pdf" className="lab-resume-link" download>
          Resume <ArrowUpRight size={15} aria-hidden="true" />
        </a>

        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          aria-pressed={theme === 'dark'}
        >
          {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
        </button>

        <button
          type="button"
          className="lab-menu-toggle"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      <div className={`lab-mobile-menu${mobileOpen ? ' is-open' : ''}`} aria-hidden={!mobileOpen}>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={isActive(link.href) ? 'is-active' : ''}
            tabIndex={mobileOpen ? 0 : -1}
          >
            <span>{link.label}</span><ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        ))}
        <a href="/images/AnubhabDasResume.pdf" download tabIndex={mobileOpen ? 0 : -1}>
          Download résumé <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}
