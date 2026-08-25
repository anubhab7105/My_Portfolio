'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import type { Metadata } from 'next';
import { ShieldCheck, ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/SocialIcons';

import { PROJECTS, type Project } from '@/lib/data/projects';

const FILTERS = [
  { key: 'all', label: 'All Projects' },
  { key: 'security', label: 'Security' },
  { key: 'fullstack', label: 'Full Stack' },
  { key: 'python', label: 'Python' },
  { key: 'javascript', label: 'JavaScript' },
  { key: 'ai', label: 'AI / APIs' },
];

function AnimateUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.unobserve(el); } },
      { threshold: 0.1 }
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

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const filtered = activeFilter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.filters.includes(activeFilter));

  return (
    <main className="page-content">
      <section className="page-hero">
        <div className="container">
          <p className="section-label">My Work</p>
          <h1 className="section-title">Projects &amp; Builds</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', maxWidth: '540px', marginTop: '12px' }}>
            Every project is built security-first — with OWASP best practices, input validation, and secure data
            handling at the core.
          </p>
        </div>
      </section>

      <section style={{ padding: '80px 0' }}>
        <div className="container">
          {/* filter buttons */}
          <div className="projects-filter" role="group" aria-label="Filter projects by technology">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                className={`filter-btn${activeFilter === f.key ? ' active' : ''}`}
                data-filter={f.key}
                onClick={() => setActiveFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* projects grid */}
          <div className="projects-grid" id="projects-grid" role="list">
            {filtered.map((p: Project, i: number) => (
              <AnimateUp key={p.id} delay={i * 0.08}>
                <article
                  className="project-card-full"
                  role="listitem"
                  data-filters={p.filters.join(' ')}
                >
                  <Image
                    className="project-img"
                    src={p.img}
                    alt={`Screenshot of ${p.title}`}
                    width={640}
                    height={360}
                    loading="lazy"
                    style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }}
                  />
                  <div className="project-body">
                    <p className="project-number">
                      // project_{String(p.id).padStart(2, '0')}
                    </p>
                    <div className="project-tags">
                      {p.technologies.map((t) => (
                        <span key={t} className="tag">{t}</span>
                      ))}
                    </div>
                    <h2 className="project-title">{p.title}</h2>
                    <p className="project-desc">{p.desc}</p>
                    <div className="project-security">
                      <p className="security-title">
                        <ShieldCheck size={13} aria-hidden="true" /> SECURITY FEATURES
                      </p>
                      <ul className="security-list">
                        {p.security.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="project-links">
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline"
                        style={{ fontSize: '.75rem', padding: '8px 16px' }}
                        aria-label={`View source code for ${p.title} on GitHub`}
                      >
                        <GithubIcon size={13} aria-hidden="true" /> Source Code
                      </a>
                      {p.live && (
                        <a
                          href={p.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary"
                          style={{ fontSize: '.75rem', padding: '8px 16px' }}
                          aria-label={`View live demo of ${p.title}`}
                        >
                          <ExternalLink size={13} aria-hidden="true" /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </AnimateUp>
            ))}
          </div>
        </div>
      </section>

      {/* GitHub CTA */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <AnimateUp>
            <div
              className="cta-box"
              style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '48px', textAlign: 'center' }}
            >
              <GithubIcon
                size={38}
                style={{ color: 'var(--color-text-secondary)', marginBottom: '16px', margin: '0 auto 16px' }}
                aria-hidden="true"
              />
              <h2 style={{ fontFamily: 'var(--font-family-heading)', fontSize: '1.6rem', fontWeight: 800, marginBottom: '10px' }}>
                See More on GitHub
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', maxWidth: '440px', margin: '0 auto 28px' }}>
                These are my featured projects. Visit my GitHub for more experiments, contributions, and ongoing work.
              </p>
              <a
                href="https://github.com/anubhab7105"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <GithubIcon size={15} aria-hidden="true" /> github.com/anubhab7105
              </a>
            </div>
          </AnimateUp>
        </div>
      </section>
    </main>
  );
}
