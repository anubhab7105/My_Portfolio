'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Link2, GraduationCap } from 'lucide-react';
import { PUBLICATIONS, STATUS_CONFIG, type Publication } from '@/lib/data/publications';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'cybersecurity', label: 'Cybersecurity' },
  { key: 'web-security', label: 'Web Security' },
  { key: 'ai-ml', label: 'AI / ML' },
  { key: 'privacy', label: 'Privacy' },
  { key: 'blockchain', label: 'Blockchain' },
];

const ICON_MAP: Record<string, string> = {
  cybersecurity: '🛡️',
  'web-security': '🌐',
  'ai-ml': '🤖',
  privacy: '🔒',
  blockchain: '⛓️',
};

function AnimateUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.unobserve(el); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className="animate-up" style={{ transitionDelay: `${delay}s` }}>{children}</div>;
}

function CountUp({ target }: { target: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        obs.unobserve(el);
        let cur = 0;
        const step = Math.ceil(target / 20);
        const timer = setInterval(() => {
          cur = Math.min(cur + step, target);
          setN(cur);
          if (cur >= target) clearInterval(timer);
        }, 40);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{n}</span>;
}

export default function PublicationsPage() {
  const [currentFilter, setCurrentFilter] = useState('all');
  const [currentSort, setCurrentSort] = useState('newest');

  const filtered = currentFilter === 'all'
    ? [...PUBLICATIONS]
    : PUBLICATIONS.filter((p) => p.filters.includes(currentFilter));

  const sorted = [...filtered].sort((a, b) => {
    if (currentSort === 'title') return a.title.localeCompare(b.title);
    if (currentSort === 'oldest') return a.year.localeCompare(b.year);
    return b.year.localeCompare(a.year);
  });

  const published = PUBLICATIONS.filter((p) => p.status === 'published' || p.status === 'accepted').length;
  const pending = PUBLICATIONS.filter((p) => p.status === 'under-review' || p.status === 'preprint').length;

  return (
    <main className="page-content">
      {/* ── HERO ──────────────────────────────── */}
      <section className="pub-hero" aria-labelledby="pub-hero-title">
        <div className="pub-hero-inner">
          <div className="pub-hero-grid">
            <div>
              <p className="section-label">Academic Work</p>
              <h1 className="section-title" id="pub-hero-title">Research Publications</h1>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', maxWidth: '560px', marginTop: '14px', lineHeight: '1.8' }}>
                A curated collection of my academic and research contributions — spanning cybersecurity threat detection,
                web application security, privacy-preserving AI systems, and emerging attack surfaces. Each paper reflects
                work done at the intersection of rigorous research and real-world security engineering.
              </p>
            </div>
            <AnimateUp>
              <div className="pub-stats" aria-label="Publication statistics">
                <div className="pub-stat">
                  <span className="pub-stat-num"><CountUp target={PUBLICATIONS.length} /></span>
                  <span className="pub-stat-label">Papers</span>
                </div>
                <div className="pub-stat">
                  <span className="pub-stat-num"><CountUp target={published} /></span>
                  <span className="pub-stat-label">Published</span>
                </div>
                <div className="pub-stat">
                  <span className="pub-stat-num"><CountUp target={pending} /></span>
                  <span className="pub-stat-label">In Progress</span>
                </div>
              </div>
            </AnimateUp>
          </div>
        </div>
      </section>

      {/* ── PUBLICATIONS SECTION ──────────────── */}
      <section className="publications-section">
        <div className="container">
          {/* Controls */}
          <div className="pub-controls" role="group" aria-label="Filter and sort publications">
            <span className="pub-filter-group" role="group" aria-label="Filter by category">
              <label>Filter:</label>
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  className={`filter-btn${currentFilter === f.key ? ' active' : ''}`}
                  onClick={() => setCurrentFilter(f.key)}
                  aria-pressed={currentFilter === f.key}
                >
                  {f.label}
                </button>
              ))}
            </span>
            <div className="pub-sort-wrap">
              <label htmlFor="pub-sort">Sort:</label>
              <select
                id="pub-sort"
                className="pub-sort-select"
                value={currentSort}
                onChange={(e) => setCurrentSort(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Title A–Z</option>
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="pub-results-bar" aria-live="polite" aria-atomic="true">
            <p className="pub-results-count">
              Showing <span>{sorted.length}</span> of <span>{PUBLICATIONS.length}</span> publications
            </p>
          </div>

          {/* Grid */}
          <div className="publications-grid" id="publications-grid" role="list" aria-label="Publications list">
            {sorted.length === 0 ? (
              <div className="pub-empty" role="status">
                <p>No publications match this filter.</p>
              </div>
            ) : (
              sorted.map((pub: Publication, i: number) => {
                const sc = STATUS_CONFIG[pub.status] || STATUS_CONFIG['published'];
                return (
                  <AnimateUp key={pub.id} delay={i * 0.09}>
                    <article
                      className="pub-card"
                      role="listitem"
                      data-filters={pub.filters.join(' ')}
                      aria-label={`Publication: ${pub.title}`}
                    >
                      <div className="pub-thumb">
                        {pub.img ? (
                          <Image
                            className="pub-thumb-img"
                            src={pub.img}
                            alt={`Thumbnail for ${pub.title}`}
                            width={640}
                            height={360}
                            loading="lazy"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          <div className="pub-thumb-placeholder" aria-hidden="true">
                            <span className="pub-thumb-icon">
                              {ICON_MAP[pub.filters[0]] || '📄'}
                            </span>
                          </div>
                        )}
                        <span
                          className={`pub-status-badge ${sc.cssClass}`}
                          role="status"
                          aria-label={`Status: ${sc.label}`}
                        >
                          {sc.label}
                        </span>
                      </div>

                      <div className="pub-body">
                        <p className="pub-ref">// pub_{String(pub.id).padStart(2, '0')}</p>

                        {pub.tags && pub.tags.length > 0 && (
                          <div className="pub-tags" aria-label="Publication tags">
                            {pub.tags.map((t) => (
                              <span key={t} className="tag">{t}</span>
                            ))}
                          </div>
                        )}

                        <h2 className="pub-title">{pub.title}</h2>

                        <div className="pub-venue-row">
                          <span className="pub-venue" aria-label="Venue">{pub.venue}</span>
                          <span className="pub-venue-sep" aria-hidden="true" />
                          <span className="pub-year" aria-label="Year">{pub.year}</span>
                        </div>

                        <p className="pub-abstract" aria-label="Abstract">{pub.abstract}</p>

                        {pub.doi && (
                          <div className="pub-ids" aria-label="External identifiers">
                            <a
                              href={`https://doi.org/${pub.doi}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="pub-id-link"
                              aria-label={`DOI link for ${pub.title}`}
                            >
                              <Link2 size={11} aria-hidden="true" /> DOI
                            </a>
                          </div>
                        )}

                        <div className="pub-actions">
                          {pub.paperUrl ? (
                            <a
                              href={pub.paperUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-primary"
                              style={{ fontSize: '.75rem', padding: '8px 18px' }}
                              aria-label={`Read paper: ${pub.title}`}
                            >
                              Read Paper
                            </a>
                          ) : (
                            <span
                              className="btn btn-outline"
                              style={{ fontSize: '.75rem', padding: '8px 18px', opacity: 0.55, cursor: 'not-allowed' }}
                              aria-label="Paper not yet available"
                            >
                              Coming Soon
                            </span>
                          )}
                        </div>
                      </div>
                    </article>
                  </AnimateUp>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* ── SCHOLAR CTA ─────────────────────── */}
      <section className="scholar-cta" aria-label="Find more publications">
        <div className="container">
          <AnimateUp>
            <div className="scholar-cta-box">
              <div className="scholar-cta-icon" aria-hidden="true">
                <GraduationCap size={38} />
              </div>
              <h2>Find More on Google Scholar</h2>
              <p>
                My full publication record — including co-authored work, conference presentations, and ongoing
                manuscripts — is available on Google Scholar.
              </p>
              <div className="scholar-cta-links">
                <a
                  href="https://scholar.google.com/citations?user=qOzRzE8AAAAJ&hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  aria-label="View publications on Google Scholar"
                >
                  <GraduationCap size={15} aria-hidden="true" /> Google Scholar
                </a>
                <a
                  href="https://ieeexplore.ieee.org/author/445612925941485"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  aria-label="View publications on IEEE Xplore"
                >
                  IEEE Xplore
                </a>
              </div>
            </div>
          </AnimateUp>
        </div>
      </section>
    </main>
  );
}
