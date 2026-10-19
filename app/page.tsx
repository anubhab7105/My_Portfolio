'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  Code2,
  Code,
  Lock,
  Database,
  Key,
  GitBranch,
  FolderOpen,
  Send,
  FileText,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { GithubIcon } from '@/components/SocialIcons';

import { FEATURED_PROJECTS } from '@/lib/data/projects';
import RobotHero from '@/components/RobotHero';

const ROLES = ['Cyber Security Student', 'Full-Stack Web Developer', 'OWASP Practitioner', 'Secure App Builder'];

const SKILLS = [
  { icon: <ShieldCheck size={18} />, name: 'Cyber Security' },
  { icon: <Code2 size={18} />, name: 'JavaScript' },
  { icon: <Code size={18} />, name: 'Python' },
  { icon: <Code size={18} />, name: 'HTML / CSS' },
  { icon: <Lock size={18} />, name: 'OWASP Top 10' },
  { icon: <Database size={18} />, name: 'Flask / SQLite' },
  { icon: <Key size={18} />, name: 'Auth & JWT' },
  { icon: <GitBranch size={18} />, name: 'Git & GitHub' },
];

function TypedText() {
  const elRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let ri = 0, ci = 0, deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    function type() {
      const el = elRef.current;
      if (!el) return;
      const current = ROLES[ri];
      if (!deleting) {
        el.textContent = current.substring(0, ci + 1);
        ci++;
        if (ci === current.length) {
          deleting = true;
          timer = setTimeout(type, 1800);
          return;
        }
      } else {
        el.textContent = current.substring(0, ci - 1);
        ci--;
        if (ci === 0) {
          deleting = false;
          ri = (ri + 1) % ROLES.length;
        }
      }
      timer = setTimeout(type, deleting ? 60 : 90);
    }
    type();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="hero-role">
      <span ref={elRef} id="typed-text" />
      <span className="cursor" aria-hidden="true" />
    </div>
  );
}

function AnimateUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          obs.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="animate-up" style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="page-content">
      {/* ── HERO ────────────────────────────────── */}
      <section className="hero" aria-label="Introduction">
        <div className="container">
          <div className="hero-inner">
            {/* left: text */}
            <div className="hero-text">
              <p className="hero-eyebrow">
                <span className="status-dot" aria-hidden="true" />
                Available for opportunities
              </p>
              <h1 className="hero-name">
                Anubhab
                <br />
                Das
              </h1>
              <TypedText />
              <p className="hero-tagline">
                Building fortresses, not just frontends. I craft secure, modern web experiences with a security-first
                mindset — from authentication systems to full-stack applications.
              </p>
              <div className="hero-actions">
                <Link href="/projects" className="btn btn-primary">
                  <FolderOpen size={15} aria-hidden="true" /> View Projects
                </Link>
                <Link href="/contact" className="btn btn-outline">
                  <Send size={15} aria-hidden="true" /> Get In Touch
                </Link>
                <a href="/images/AnubhabDasResume.pdf" className="btn btn-ghost" download>
                  <FileText size={15} aria-hidden="true" /> Resume
                </a>
              </div>
              <div className="hero-stats" aria-label="Key statistics">
                <div className="stat-item">
                  <span className="stat-value">5+</span>
                  <span className="stat-label">Projects</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">3</span>
                  <span className="stat-label">Internships</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">2+</span>
                  <span className="stat-label">Years Dev</span>
                </div>
              </div>
            </div>

            {/* right: visual */}
            <div className="hero-visual">
              <RobotHero />
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS STRIP ──────────────────────────── */}
      <section className="skills-preview" aria-label="Technical skills overview">
        <div className="container">
          <p className="section-label">core skills</p>
          <div className="skills-grid">
            {SKILLS.map((skill, i) => (
              <AnimateUp key={skill.name} delay={i * 0.06}>
                <div className="skill-chip">
                  <div className="skill-icon">{skill.icon}</div>
                  <span className="skill-name">{skill.name}</span>
                </div>
              </AnimateUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ─────────────────────── */}
      <section className="featured-projects" aria-label="Featured projects">
        <div className="container">
          <p className="section-label">featured work</p>
          <h2 className="section-title">Recent Projects</h2>
          <p className="section-subtitle">
            A selection of security tools, full-stack applications, and AI-assisted systems built around practical
            problems and modern development practices.
          </p>
          <div className="projects-grid-home" id="featured-projects-grid">
            {FEATURED_PROJECTS.map((p, i) => (
              <AnimateUp key={p.id} delay={i * 0.1}>
                <article className="project-card">
                  <Image
                    className="project-img"
                    src={p.img}
                    alt={`Screenshot of ${p.title}`}
                    width={640}
                    height={360}
                    loading="lazy"
                    style={{ width: '100%', height: 'auto', aspectRatio: '16/9', objectFit: 'cover' }}
                  />
                  <div className="project-body">
                    <div className="project-tags">
                      {p.technologies.map((t) => (
                        <span key={t} className="tag">
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 className="project-title">{p.title}</h3>
                    <p className="project-desc">{p.desc}</p>
                    <div className="project-links">
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline"
                        style={{ fontSize: '.75rem', padding: '7px 14px' }}
                      >
                        <GithubIcon size={13} aria-hidden="true" /> Code
                      </a>
                      {p.live && (
                        <a
                          href={p.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary"
                          style={{ fontSize: '.75rem', padding: '7px 14px' }}
                        >
                          <ExternalLink size={13} aria-hidden="true" /> Live
                        </a>
                      )}
                    </div>
                  </div>
                </AnimateUp>
              ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/projects" className="btn btn-outline">
              View all projects <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────── */}
      <section className="cta-section" aria-label="Call to action">
        <div className="container">
          <AnimateUp>
            <div className="cta-box">
              <p className="section-label" style={{ justifyContent: 'center' }}>
                let&apos;s connect
              </p>
              <h2>
                Ready to build something
                <br />
                <span style={{ color: 'var(--color-accent)' }}>secure &amp; powerful?</span>
              </h2>
              <p>
                Whether it&apos;s a collaboration, internship, or just a conversation about security — I&apos;m always
                open to connect with like-minded builders.
              </p>
              <div className="cta-actions">
                <Link href="/contact" className="btn btn-primary">
                  Send a message <ArrowRight size={15} aria-hidden="true" />
                </Link>
                <a
                  href="http://www.linkedin.com/in/anubhab7105"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </AnimateUp>
        </div>
      </section>
    </main>
  );
}
