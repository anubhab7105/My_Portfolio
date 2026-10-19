'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Code2,
  Database,
  GitBranch,
  LockKeyhole,
  Network,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { GithubIcon } from '@/components/SocialIcons';
import { PROJECTS } from '@/lib/data/projects';

const SYSTEM_NODES = [
  {
    id: 'interface',
    index: '01',
    name: 'Interface',
    type: 'Experience layer',
    detail: 'The part people actually touch: accessible flows, clear feedback, responsive layouts, and thoughtful states.',
  },
  {
    id: 'api',
    index: '02',
    name: 'API layer',
    type: 'Application logic',
    detail: 'Routes, validation, authorization, and the contracts that make the frontend and backend work together.',
  },
  {
    id: 'intelligence',
    index: '03',
    name: 'Intelligence',
    type: 'Models & orchestration',
    detail: 'Model integrations, analysis pipelines, and useful outputs with uncertainty and limitations kept visible.',
  },
  {
    id: 'data',
    index: '04',
    name: 'Data & trust',
    type: 'Persistence & controls',
    detail: 'Storage boundaries, secrets, auditability, and security decisions designed into the system rather than added at the end.',
  },
];

const PROJECT_AREAS: Record<number, string> = {
  1: 'Multi-agent AI',
  2: 'Identity screening',
  3: 'Email forensics',
  4: 'Web security',
};

const featuredProjects = PROJECTS.filter((project) => [1, 2, 3, 4].includes(project.id));

export default function HomePage() {
  const [activeSystem, setActiveSystem] = useState('api');
  const selectedNode = SYSTEM_NODES.find((node) => node.id === activeSystem) ?? SYSTEM_NODES[1];

  return (
    <main className="lab-home">
      <section className="lab-hero" aria-labelledby="hero-heading">
        <div className="container lab-container">
          <div className="lab-hero-copy">
            <p className="lab-eyebrow">
              <span className="lab-live-dot" aria-hidden="true" />
              Independent developer <span className="lab-slash">/</span> Kolkata, India
            </p>
            <h1 id="hero-heading" className="lab-display">
              Build the thing.
              <br />
              <span className="lab-highlight">Understand the system.</span>
            </h1>
            <p className="lab-intro">
              I build full-stack applications, security tools, and AI-assisted systems — and care about the engineering
              decisions that make them useful, understandable, and resilient.
            </p>
            <div className="lab-hero-actions">
              <Link href="/projects" className="lab-button lab-button-primary">
                Explore selected work <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
              <a
                href="https://github.com/anubhab7105"
                target="_blank"
                rel="noopener noreferrer"
                className="lab-button lab-button-secondary"
              >
                <GithubIcon size={16} aria-hidden="true" /> GitHub <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
            <div className="lab-focus-line" aria-label="Areas of focus">
              <span>FULL-STACK</span>
              <i aria-hidden="true" />
              <span>APPLICATION SECURITY</span>
              <i aria-hidden="true" />
              <span>APPLIED AI</span>
            </div>
          </div>

          <div className="lab-explorer" aria-label="Interactive reference architecture">
            <div className="lab-explorer-top">
              <div>
                <span className="lab-mono-label">FIELD NOTE / 001</span>
                <h2>A system, in four layers.</h2>
              </div>
              <span className="lab-explorer-status"><span /> INTERACTIVE</span>
            </div>
            <p className="lab-explorer-note">A reference map, not a diagram of any single project. Select a layer.</p>
            <div className="lab-flow" role="group" aria-label="Select a system layer">
              {SYSTEM_NODES.map((node, index) => (
                <div className="lab-flow-item" key={node.id}>
                  <button
                    type="button"
                    className={`lab-flow-node${activeSystem === node.id ? ' is-selected' : ''}`}
                    onClick={() => setActiveSystem(node.id)}
                    aria-pressed={activeSystem === node.id}
                  >
                    <span className="lab-flow-node-index">{node.index}</span>
                    <span className="lab-flow-node-icon" aria-hidden="true">
                      {index === 0 ? <Code2 size={19} /> : index === 1 ? <Network size={19} /> : index === 2 ? <Sparkles size={19} /> : <Database size={19} />}
                    </span>
                    <span className="lab-flow-node-name">{node.name}</span>
                    <span className="lab-flow-node-type">{node.type}</span>
                  </button>
                  {index < SYSTEM_NODES.length - 1 && (
                    <span className="lab-flow-connector" aria-hidden="true"><ArrowRight size={16} /></span>
                  )}
                </div>
              ))}
            </div>
            <div className="lab-node-readout" aria-live="polite">
              <span className="lab-readout-mark" aria-hidden="true"><span /></span>
              <div>
                <span className="lab-mono-label">SELECTED LAYER / {selectedNode.index}</span>
                <h3>{selectedNode.name}: {selectedNode.type}</h3>
                <p>{selectedNode.detail}</p>
              </div>
            </div>
            <div className="lab-explorer-footer">
              <span><span className="lab-footer-dot" /> SYSTEMS THINKING</span>
              <span>SELECT A NODE TO EXPLORE</span>
            </div>
          </div>
        </div>
        <div className="lab-hero-bottomline" aria-hidden="true">
          <span>DESIGN WITH INTENT</span><span>ENGINEER WITH CONTEXT</span><span>SHIP WITH CARE</span>
        </div>
      </section>

      <section className="lab-work-section" aria-labelledby="work-heading">
        <div className="container lab-container">
          <div className="lab-section-heading">
            <div>
              <p className="lab-section-kicker"><span>01</span> SELECTED WORK</p>
              <h2 id="work-heading" className="lab-section-title">Problems worth getting into.</h2>
            </div>
            <p className="lab-section-summary">
              A few projects from the overlap between web engineering, security, and applied AI. Each one starts with a
              problem, not a tech-stack checklist.
            </p>
          </div>

          <div className="lab-project-grid">
            {featuredProjects.map((project, index) => (
              <article className={`lab-project-card lab-project-card-${index + 1}`} key={project.id}>
                <div className="lab-project-card-top">
                  <span className="lab-project-number">PROJECT / {String(index + 1).padStart(2, '0')}</span>
                  <span className="lab-project-area">{PROJECT_AREAS[project.id] ?? 'Application engineering'}</span>
                </div>
                <div className="lab-project-heading">
                  <h3>{project.title}</h3>
                  <p>{project.desc}</p>
                </div>
                <div className="lab-project-points">
                  {project.security.slice(0, 2).map((item) => (
                    <p key={item}><span aria-hidden="true">↳</span>{item}</p>
                  ))}
                </div>
                <div className="lab-project-tech" aria-label="Technologies">
                  {project.technologies.slice(0, 5).map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>
                <div className="lab-project-links">
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    Source <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer">
                      Live project <ArrowUpRight size={15} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="lab-work-footer">
            <p>Want the implementation details, trade-offs, and the rest of the catalogue?</p>
            <Link href="/projects" className="lab-text-link">Explore all projects <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="lab-principles-section" aria-labelledby="principles-heading">
        <div className="container lab-container">
          <div className="lab-principles-intro">
            <p className="lab-section-kicker"><span>02</span> HOW I BUILD</p>
            <h2 id="principles-heading" className="lab-section-title">The details are the product.</h2>
            <p>I enjoy the part where the pieces have to become one coherent thing: interface, API, data, edge cases, and trust.</p>
          </div>
          <div className="lab-principle-list">
            <article>
              <span className="lab-principle-icon"><Boxes size={20} aria-hidden="true" /></span>
              <div><h3>Connect the layers</h3><p>Build beyond the happy-path UI — through API contracts, data models, integration, and useful failure states.</p></div>
              <span className="lab-principle-index">A / 01</span>
            </article>
            <article>
              <span className="lab-principle-icon"><ShieldCheck size={20} aria-hidden="true" /></span>
              <div><h3>Make trust part of the design</h3><p>Think about inputs, permissions, secrets, privacy, and abuse cases while the architecture is still being shaped.</p></div>
              <span className="lab-principle-index">B / 02</span>
            </article>
            <article>
              <span className="lab-principle-icon"><GitBranch size={20} aria-hidden="true" /></span>
              <div><h3>Leave the work understandable</h3><p>Readable code, useful tests, clear documentation, and honest explanations of what a system can and cannot do.</p></div>
              <span className="lab-principle-index">C / 03</span>
            </article>
          </div>
        </div>
      </section>

      <section className="lab-next-section" aria-labelledby="next-heading">
        <div className="container lab-container">
          <div className="lab-next-panel">
            <div className="lab-next-orbit" aria-hidden="true"><LockKeyhole size={34} /></div>
            <div className="lab-next-copy">
              <p className="lab-section-kicker"><span>03</span> BEYOND THE BUILD</p>
              <h2 id="next-heading">Curious about the thinking behind the code?</h2>
              <p>Explore my background, research publications, or get in touch about a project, internship, or collaboration.</p>
            </div>
            <div className="lab-next-actions">
              <Link href="/about" className="lab-button lab-button-dark">About me <ArrowUpRight size={16} aria-hidden="true" /></Link>
              <Link href="/publications" className="lab-text-link">Research & writing <ArrowRight size={16} aria-hidden="true" /></Link>
              <Link href="/contact" className="lab-text-link">Start a conversation <ArrowRight size={16} aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
