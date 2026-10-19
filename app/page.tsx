'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Boxes,
  GitBranch,
  LockKeyhole,
  ShieldCheck,
} from 'lucide-react';
import { GithubIcon } from '@/components/SocialIcons';
import { PROJECTS } from '@/lib/data/projects';

const PROJECT_AREAS: Record<number, string> = {
  1: 'Multi-agent AI',
  2: 'Identity screening',
  3: 'Email forensics',
  4: 'Web security',
};

const featuredProjects = PROJECTS.filter((project) => [1, 2, 3, 4].includes(project.id));

export default function HomePage() {
  const heroStoryRef = useRef<HTMLElement | null>(null);
  const heroFrameRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const story = heroStoryRef.current;
    const frame = heroFrameRef.current;
    if (!story || !frame) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animationFrame = 0;

    const applyScrollProgress = () => {
      animationFrame = 0;

      if (reduceMotion.matches) {
        frame.style.setProperty('--hero-progress', '0');
        frame.style.setProperty('--hero-scale', '1');
        frame.style.setProperty('--hero-radius', '0px');
        frame.style.setProperty('--hero-shadow-alpha', '0');
        frame.style.setProperty('--hero-photo-shift', '0px');
        return;
      }

      const storyTop = story.getBoundingClientRect().top + window.scrollY;
      const scrollRange = Math.max(1, story.offsetHeight - window.innerHeight);
      const rawProgress = (window.scrollY - storyTop) / scrollRange;
      const progress = Math.min(1, Math.max(0, rawProgress));
      const eased = progress * progress * (3 - 2 * progress);

      frame.style.setProperty('--hero-progress', eased.toFixed(4));
      frame.style.setProperty('--hero-scale', (1 - eased * 0.24).toFixed(4));
      frame.style.setProperty('--hero-radius', `${(eased * 28).toFixed(2)}px`);
      frame.style.setProperty('--hero-shadow-alpha', (eased * 0.44).toFixed(3));
      frame.style.setProperty('--hero-photo-shift', `${(eased * 16).toFixed(2)}px`);
    };

    const scheduleProgressUpdate = () => {
      if (animationFrame === 0) {
        animationFrame = window.requestAnimationFrame(applyScrollProgress);
      }
    };

    scheduleProgressUpdate();
    window.addEventListener('scroll', scheduleProgressUpdate, { passive: true });
    window.addEventListener('resize', scheduleProgressUpdate);
    reduceMotion.addEventListener('change', scheduleProgressUpdate);

    return () => {
      window.removeEventListener('scroll', scheduleProgressUpdate);
      window.removeEventListener('resize', scheduleProgressUpdate);
      reduceMotion.removeEventListener('change', scheduleProgressUpdate);
      if (animationFrame !== 0) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <main className="lab-home">
      <section
        ref={heroStoryRef}
        className="lab-hero-story"
        aria-label="Anubhab Das introduction"
      >
        <div className="lab-hero-sticky">
          <div ref={heroFrameRef} className="lab-hero-frame">
            <section className="lab-hero" aria-labelledby="hero-heading">
              <div className="lab-hero-glow" aria-hidden="true" />
              <Image
                className="lab-hero-portrait"
                src="/images/protfolio.jpg"
                alt="Anubhab Das at a campus event"
                width={1087}
                height={1447}
                priority
                sizes="(max-width: 820px) 100vw, 70vw"
              />
              <div className="lab-hero-photo-tint" aria-hidden="true" />

              <div className="lab-hero-content">
                <p className="lab-eyebrow">
                  <span className="lab-live-dot" aria-hidden="true" />
                  B.SC. CYBER SECURITY <span className="lab-slash">/</span> GNIT KOLKATA
                </p>
                <h1 id="hero-heading" className="lab-display">
                  Build useful
                  <br />
                  things.
                  <br />
                  <span className="lab-hero-highlight">Secure by design.</span>
                </h1>
                <p className="lab-intro">
                  I’m Anubhab Das — a cybersecurity student and developer building full-stack applications,
                  security tools, and AI-assisted systems.
                </p>
                <div className="lab-hero-actions">
                  <Link href="/projects" className="lab-button lab-button-primary">
                    Explore selected work <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                  <a
                    href="/images/AnubhabDasResume.pdf"
                    download
                    className="lab-button lab-button-secondary"
                  >
                    View résumé <ArrowUpRight size={15} aria-hidden="true" />
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

              <div className="lab-hero-side-notes" aria-hidden="true">
                <p>FULL-STACK<br />ENGINEERING</p>
                <p>APPLICATION<br />SECURITY</p>
                <p>APPLIED AI<br />&amp; RESEARCH</p>
              </div>

              <div className="lab-hero-bottomline" aria-hidden="true">
                <span>BUILD WITH INTENT</span>
                <span>SECURE BY DESIGN</span>
                <span>SHIP WITH CARE</span>
              </div>
              <a href="#work-heading" className="lab-scroll-cue" aria-label="Scroll to selected work">
                SCROLL TO EXPLORE <ArrowDown size={14} aria-hidden="true" />
              </a>
            </section>
          </div>
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
