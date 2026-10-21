'use client';

import { useMemo, useState } from 'react';
import { ArrowUpRight, Filter, Search } from 'lucide-react';
import { GithubIcon } from '@/components/SocialIcons';
import { PROJECTS, type Project } from '@/lib/data/projects';

const FILTERS = [
  { key: 'all', label: 'Everything' },
  { key: 'security', label: 'Security' },
  { key: 'fullstack', label: 'Full stack' },
  { key: 'python', label: 'Python' },
  { key: 'javascript', label: 'JavaScript' },
  { key: 'ai', label: 'AI / APIs' },
];

const PROJECT_AREAS: Record<number, string> = {
  1: 'Multi-agent AI',
  2: 'Identity screening',
  3: 'Email forensics',
  4: 'Web security',
  5: 'Healthcare support',
  6: 'Backend modernization',
  7: 'Creative coding',
  8: 'Authentication',
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="lab-catalogue-card">
      <div className="lab-catalogue-card-top">
        <span className="lab-catalogue-index">/{String(index + 1).padStart(2, '0')}</span>
        <span className="lab-catalogue-area">{PROJECT_AREAS[project.id] ?? 'Software engineering'}</span>
      </div>

      <div className="lab-catalogue-main">
        <h2>{project.title}</h2>
        <p className="lab-catalogue-desc">{project.desc}</p>

        <div className="lab-catalogue-tech" aria-label="Technologies used">
          {project.technologies.map((technology) => (
            <span className="lab-tech-chip" key={technology}>{technology}</span>
          ))}
        </div>

        <div className="lab-catalogue-notes">
          <p className="lab-mono-label">ENGINEERING NOTES</p>
          <ul>
            {project.security.map((item) => (
              <li key={item}><span aria-hidden="true">↳</span>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="lab-catalogue-actions">
        <a href={project.github} target="_blank" rel="noopener noreferrer" className="lab-inline-action">
          <GithubIcon size={15} aria-hidden="true" /> Repository <ArrowUpRight size={15} aria-hidden="true" />
        </a>
        {project.live && (
          <a href={project.live} target="_blank" rel="noopener noreferrer" className="lab-inline-action">
            Live demo <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();
    return PROJECTS.filter((project) => {
      const matchesFilter = activeFilter === 'all' || project.filters.includes(activeFilter);
      const searchableText = [
        project.title,
        project.desc,
        ...project.technologies,
        ...project.security,
        PROJECT_AREAS[project.id] ?? '',
      ].join(' ').toLowerCase();
      return matchesFilter && (!query || searchableText.includes(query));
    });
  }, [activeFilter, search]);

  return (
    <main className="lab-projects-page page-content">
      <section className="lab-page-hero">
        <div className="container lab-container">
          <p className="lab-section-kicker"><span>01</span> PROJECT ARCHIVE</p>
          <div className="lab-page-heading-row">
            <h1 className="lab-page-title">Built to be<br /><span>taken apart.</span></h1>
            <p className="lab-page-intro">
              Full-stack applications, security tooling, and AI-assisted prototypes. Browse the systems, technologies,
              and engineering concerns behind each build.
            </p>
          </div>
          <div className="lab-page-meta">
            <span><b>{String(PROJECTS.length).padStart(2, '0')}</b> PROJECTS</span>
            <span><b>03</b> OVERLAPPING FOCUS AREAS</span>
            <span>CODE, CONTEXT &amp; TRADE-OFFS</span>
          </div>
        </div>
      </section>

      <section className="lab-catalogue-section" aria-label="Project catalogue">
        <div className="container lab-container">
          <div className="lab-catalogue-controls">
            <div className="lab-filter-label"><Filter size={15} aria-hidden="true" /> FILTER BY AREA</div>
            <div className="lab-filter-list" role="group" aria-label="Filter projects">
              {FILTERS.map((filter) => (
                <button
                  type="button"
                  className={`lab-filter-button${activeFilter === filter.key ? ' is-active' : ''}`}
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  aria-pressed={activeFilter === filter.key}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            <label className="lab-search">
              <Search size={16} aria-hidden="true" />
              <span className="sr-only">Search projects</span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search projects, stacks, notes…"
                type="search"
              />
            </label>
          </div>

          <div className="lab-results-line" aria-live="polite">
            <span>{String(filteredProjects.length).padStart(2, '0')} RESULTS</span>
            <span>Project archive · updated from project profiles</span>
          </div>

          {filteredProjects.length > 0 ? (
            <div className="lab-catalogue-grid">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          ) : (
            <div className="lab-no-results">
              <p className="lab-mono-label">NO MATCHING BUILDS</p>
              <h2>Try another search.</h2>
              <p>Clear the search or choose a different project area.</p>
              <button type="button" className="lab-button lab-button-primary" onClick={() => { setSearch(''); setActiveFilter('all'); }}>
                Reset filters
              </button>
            </div>
          )}

          <div className="lab-catalogue-endnote">
            <span className="lab-endnote-mark">AD<span>.</span></span>
            <p>Project descriptions reflect documented scope. Where accuracy, detection quality, or reliability matters, claims should be backed by measured evaluation.</p>
            <a href="https://github.com/anubhab7105" target="_blank" rel="noopener noreferrer">More on GitHub <ArrowUpRight size={14} aria-hidden="true" /></a>
          </div>
        </div>
      </section>
    </main>
  );
}
