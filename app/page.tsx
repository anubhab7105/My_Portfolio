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
  MapPin,
  GraduationCap,
  Briefcase,
  Languages,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/SocialIcons';
import { PROJECTS } from '@/lib/data/projects';

const featuredProjects = PROJECTS.filter((project) => [1, 2, 3, 4].includes(project.id));

export default function HomePage() {
  const heroStoryRef = useRef<HTMLElement | null>(null);
  const heroFrameRef = useRef<HTMLDivElement | null>(null);
  const principlesStageRef = useRef<HTMLElement | null>(null);
  const principlesRailRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const story = heroStoryRef.current;
    const frame = heroFrameRef.current;
    const principlesStage = principlesStageRef.current;
    const principlesRail = principlesRailRef.current;
    const principlesWindow = principlesRail?.parentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animationFrame = 0;

    const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

    const applyScrollProgress = () => {
      animationFrame = 0;

      if (story && frame) {
        const rawProgress = (window.scrollY - (story.getBoundingClientRect().top + window.scrollY))
          / Math.max(1, story.offsetHeight - window.innerHeight);
        const progress = clamp01(rawProgress);
        const eased = progress * progress * (3 - 2 * progress);

        story.style.setProperty('--hero-progress', reduceMotion.matches ? '0' : eased.toFixed(4));
        story.style.setProperty(
          '--hero-artifact-opacity',
          reduceMotion.matches ? '0' : clamp01((eased - 0.08) / 0.42).toFixed(4),
        );
        story.style.setProperty(
          '--hero-artifact-y',
          reduceMotion.matches ? '0px' : `${((1 - eased) * 42).toFixed(2)}px`,
        );
        story.style.setProperty(
          '--hero-artifact-scale',
          reduceMotion.matches ? '1' : (0.86 + eased * 0.14).toFixed(4),
        );

        frame.style.setProperty('--hero-progress', reduceMotion.matches ? '0' : eased.toFixed(4));
        frame.style.setProperty('--hero-scale', reduceMotion.matches ? '1' : (1 - eased * 0.5).toFixed(4));
        frame.style.setProperty('--hero-radius', reduceMotion.matches ? '0px' : `${(eased * 36).toFixed(2)}px`);
        frame.style.setProperty('--hero-shadow-alpha', reduceMotion.matches ? '0' : (eased * 0.48).toFixed(3));
        frame.style.setProperty('--hero-photo-shift', reduceMotion.matches ? '0px' : `${(eased * 18).toFixed(2)}px`);
      }

      if (principlesStage && principlesRail && principlesWindow) {
        if (reduceMotion.matches || window.innerWidth <= 820) {
          principlesRail.style.setProperty('--principles-x', '0px');
          principlesStage.style.setProperty('--principles-progress', '0');
        } else {
          const stageTop = principlesStage.getBoundingClientRect().top + window.scrollY;
          const range = Math.max(1, principlesStage.offsetHeight - window.innerHeight);
          const progress = clamp01((window.scrollY - stageTop) / range);
          const eased = progress * progress * (3 - 2 * progress);
          const maxShift = Math.max(0, principlesRail.scrollWidth - principlesWindow.clientWidth);

          principlesRail.style.setProperty('--principles-x', `${(-maxShift * eased).toFixed(2)}px`);
          principlesStage.style.setProperty('--principles-progress', eased.toFixed(4));
        }
      }
    };

    const scheduleProgressUpdate = () => {
      if (animationFrame === 0) {
        animationFrame = window.requestAnimationFrame(applyScrollProgress);
      }
    };

    const revealTargets = document.querySelectorAll<HTMLElement>('[data-scroll-reveal]');
    let observer: IntersectionObserver | undefined;

    if (reduceMotion.matches || !('IntersectionObserver' in window)) {
      revealTargets.forEach((target) => target.classList.add('is-scroll-visible'));
    } else {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-scroll-visible');
            observer?.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

      revealTargets.forEach((target) => observer?.observe(target));
    }

    scheduleProgressUpdate();
    window.addEventListener('scroll', scheduleProgressUpdate, { passive: true });
    window.addEventListener('resize', scheduleProgressUpdate);
    reduceMotion.addEventListener('change', scheduleProgressUpdate);

    return () => {
      window.removeEventListener('scroll', scheduleProgressUpdate);
      window.removeEventListener('resize', scheduleProgressUpdate);
      reduceMotion.removeEventListener('change', scheduleProgressUpdate);
      observer?.disconnect();
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
          <div className="lab-hero-artifacts" aria-hidden="true">
            {featuredProjects.map((project, index) => (
              <article className={`lab-hero-artifact lab-hero-artifact-${index + 1}`} key={project.id}>
                <div className="lab-artifact-topline">
                  <span>CASE STUDY / {String(index + 1).padStart(2, '0')}</span>
                  <span>↗</span>
                </div>
                <div className="lab-artifact-preview">
                  <span className="lab-artifact-preview-mark">{['A', 'N', 'T', 'N'][index]}</span>
                  <span className="lab-artifact-preview-lines"><i /><i /><i /></span>
                </div>
                <h2>{project.title}</h2>
                <p>{project.technologies.slice(0, 3).join(' / ')}</p>
              </article>
            ))}
          </div>
          <div ref={heroFrameRef} className="lab-hero-frame">
            <section className="lab-hero" aria-labelledby="hero-heading">
              <div className="lab-hero-glow" aria-hidden="true" />
              <picture className="lab-hero-picture">
                <source media="(min-width: 1025px) and (hover: hover) and (pointer: fine)" srcSet="/images/Anubhab_Desktop.webp" />
                <Image
                  className="lab-hero-portrait"
                  src="/images/protfolio.jpg"
                  alt="Anubhab Das speaking at a campus event"
                  width={1087}
                  height={1447}
                  priority
                  sizes="100vw"
                />
              </picture>
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
              <a href="#about-home-heading" className="lab-scroll-cue" aria-label="Scroll to about Anubhab">
                SCROLL TO EXPLORE <ArrowDown size={14} aria-hidden="true" />
              </a>
            </section>
          </div>
        </div>
      </section>

      <section id="about" className="lab-about-section" aria-labelledby="about-home-heading">
        <div className="container lab-container">
          <div className="lab-about-heading" data-scroll-reveal>
            <p className="lab-section-kicker"><span>01</span> ABOUT ME / THE PERSON BEHIND THE BUILDS</p>
            <h2 id="about-home-heading" className="lab-section-title">Security-first builder<br />from Kolkata, India.</h2>
            <p className="lab-about-lead">I build useful software, with an eye on how it works, how it fails, and how it earns trust.</p>
          </div>

          <div className="lab-about-grid">
            <div className="lab-about-copy" data-scroll-reveal>
              <p>
                I’m <strong>Anubhab Das</strong>, a B.Sc. Cyber Security student at Guru Nanak Institute of Technology
                (MAKAUT), Kolkata, studying from 2024 to 2028. I’m interested in building software that is useful,
                understandable, and designed with security in mind.
              </p>
              <p>
                My work spans full-stack development, web application security, and applied AI. I build with Python,
                JavaScript, TypeScript, React, Next.js, Flask, FastAPI, and Node.js, with attention to input validation,
                security controls, testing, and clear failure states.
              </p>
              <p>
                I’m also interested in security research, including blockchain security, TinyML, and privacy-aware AI.
                Alongside my technical work, I serve as a Class Representative, Vice-Captain of the GNIT Football Team,
                and Event Co-Head for Creative Strokes (Euphonious X Zyzzva 2K26).
              </p>

              <div className="lab-about-focus-grid">
                <article>
                  <span>01 / ENGINEERING</span>
                  <h3>Connect the whole system.</h3>
                  <p>Frontend, APIs, data, testing, and thoughtful failure states — not just the happy path.</p>
                </article>
                <article>
                  <span>02 / SECURITY</span>
                  <h3>Build with trust in mind.</h3>
                  <p>Threats, permissions, validation, and privacy belong in the design from the start.</p>
                </article>
              </div>

              <div className="lab-about-actions">
                <Link href="/about" className="lab-button lab-button-primary">
                  Full background <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
                <a href="/images/AnubhabDasResume.pdf" download className="lab-button lab-button-secondary">
                  Download résumé <ArrowUpRight size={15} aria-hidden="true" />
                </a>
                <Link href="/projects" className="lab-button lab-button-secondary">
                  View projects <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <aside className="lab-about-sidebar" data-scroll-reveal aria-label="Profile and quick information">
              <div className="lab-about-profile">
                <div className="lab-about-portrait-wrap">
                  <Image
                    src="/images/protfolio.jpg"
                    alt="Anubhab Das speaking at a campus event"
                    width={1087}
                    height={1447}
                    loading="lazy"
                    sizes="(max-width: 820px) 100vw, 38vw"
                  />
                </div>
                <div className="lab-about-profile-meta">
                  <span>ANUBHAB DAS / KOLKATA, INDIA</span>
                  <h3>Developer, security learner, and researcher.</h3>
                  <div className="lab-about-socials" aria-label="Social profiles">
                    <a href="https://github.com/anubhab7105" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                      <GithubIcon size={16} aria-hidden="true" />
                    </a>
                    <a href="https://www.linkedin.com/in/anubhab7105/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <LinkedinIcon size={16} aria-hidden="true" />
                    </a>
                    <a href="mailto:anubhab7105@gmail.com" aria-label="Email Anubhab">
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="lab-about-facts">
                <div className="lab-about-fact">
                  <GraduationCap size={18} aria-hidden="true" />
                  <div>
                    <span>EDUCATION</span>
                    <strong>B.Sc. Cyber Security</strong>
                    <small>GNIT · 2024–2028</small>
                  </div>
                </div>
                <div className="lab-about-fact">
                  <Briefcase size={18} aria-hidden="true" />
                  <div>
                    <span>EXPERIENCE</span>
                    <strong>Web development internships</strong>
                    <small>Infotact · Prodigy · iStudio</small>
                  </div>
                </div>
                <div className="lab-about-fact">
                  <Languages size={18} aria-hidden="true" />
                  <div>
                    <span>FOCUS</span>
                    <strong>Full-stack · Application security · Applied AI</strong>
                  </div>
                </div>
                <div className="lab-about-fact">
                  <MapPin size={18} aria-hidden="true" />
                  <div>
                    <span>BASED IN</span>
                    <strong>Kolkata, West Bengal, India</strong>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          <div className="lab-about-toolkit" data-scroll-reveal>
            <span>CORE TOOLKIT</span>
            <div>
              {['Python', 'TypeScript', 'React', 'Next.js', 'FastAPI', 'Flask', 'OWASP Top 10', 'scikit-learn', 'Git & GitHub', 'PostgreSQL'].map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section ref={principlesStageRef} className="lab-principles-section" aria-labelledby="principles-heading">
        <div className="container lab-container">
          <div className="lab-principles-intro" data-scroll-reveal>
            <p className="lab-section-kicker"><span>02</span> HOW I BUILD</p>
            <h2 id="principles-heading" className="lab-section-title">The details are the product.</h2>
            <p>I enjoy the part where the pieces have to become one coherent thing: interface, API, data, edge cases, and trust.</p>
          </div>
          <div className="lab-principles-window">
            <div ref={principlesRailRef} className="lab-principle-list">
              <article data-scroll-reveal>
                <span className="lab-principle-icon"><Boxes size={20} aria-hidden="true" /></span>
                <div>
                  <h3>Connect the layers</h3>
                  <p>Build beyond the happy-path UI — through API contracts, data models, integration, and useful failure states.</p>
                </div>
                <span className="lab-principle-index">A / 01</span>
              </article>
              <article data-scroll-reveal>
                <span className="lab-principle-icon"><ShieldCheck size={20} aria-hidden="true" /></span>
                <div>
                  <h3>Make trust part of the design</h3>
                  <p>Think about inputs, permissions, secrets, privacy, and abuse cases while the architecture is still being shaped.</p>
                </div>
                <span className="lab-principle-index">B / 02</span>
              </article>
              <article data-scroll-reveal>
                <span className="lab-principle-icon"><GitBranch size={20} aria-hidden="true" /></span>
                <div>
                  <h3>Leave the work understandable</h3>
                  <p>Readable code, useful tests, clear documentation, and honest explanations of what a system can and cannot do.</p>
                </div>
                <span className="lab-principle-index">C / 03</span>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="lab-next-section" aria-labelledby="next-heading">
        <div className="container lab-container">
          <div className="lab-next-panel" data-scroll-reveal>
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
