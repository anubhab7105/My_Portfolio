import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  Code,
  Wrench,
  MapPin,
  GraduationCap,
  Briefcase,
  Languages,
  Phone,
  Mail,
  FileText,
  Send,
  MessageSquare,
  Users,
  Clock,
  Puzzle,
  Flame,
  BookOpen,
  Eye,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '@/components/SocialIcons';


export const metadata: Metadata = {
  title: 'About',
  description:
    'Anubhab Das is a B.Sc. Cyber Security student at GNIT Kolkata working across full-stack development, application security, applied AI, and research.',
  alternates: { canonical: 'https://anubhab-das.vercel.app/about' },
  openGraph: {
    title: 'About Anubhab Das | Cyber Security & Web Dev',
    description: 'Cyber Security student at GNIT Kolkata with hands-on experience in secure web development and threat analysis.',
    url: 'https://anubhab-das.vercel.app/about',
    images: [{ url: '/images/protfolio.jpg' }],
  },
};

const SKILL_CATEGORIES = [
  {
    icon: <Languages size={18} />,
    name: 'Languages',
    skills: ['Python', 'JavaScript', 'TypeScript', 'C', 'SQL', 'HTML5', 'CSS3'],
  },
  {
    icon: <Code size={18} />,
    name: 'Web & Backend',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'Flask', 'FastAPI', 'Node.js', 'REST APIs', 'SQLAlchemy'],
  },
  {
    icon: <ShieldCheck size={18} />,
    name: 'Security',
    skills: ['OWASP Top 10', 'XSS / SQLi / CSRF / SSRF mitigation', 'JWT & bcrypt', 'Phishing analysis', 'Email-header analysis'],
  },
  {
    icon: <BookOpen size={18} />,
    name: 'AI / ML',
    skills: ['scikit-learn', 'pandas', 'NumPy', 'NLP', 'LLM APIs (Groq, OpenAI, Gemini)', 'OpenCV'],
  },
  {
    icon: <Wrench size={18} />,
    name: 'Data & DevOps',
    skills: ['PostgreSQL', 'Supabase', 'Redis', 'Git', 'GitHub Actions', 'Docker', 'pytest', 'Playwright', 'Vercel'],
  },
];

const SOFT_SKILLS = [
  { icon: <MessageSquare size={14} />, label: 'Communication' },
  { icon: <Users size={14} />, label: 'Teamwork' },
  { icon: <Clock size={14} />, label: 'Time Management' },
  { icon: <Puzzle size={14} />, label: 'Problem Solving' },
  { icon: <Flame size={14} />, label: 'Self-Motivated' },
  { icon: <BookOpen size={14} />, label: 'Continuous Learning' },
  { icon: <Eye size={14} />, label: 'Attention to Detail' },
];

const EDUCATION = [
  { year: '2024 – 2028', degree: 'B.Sc. in Cyber Security', school: 'Guru Nanak Institute of Technology', board: 'MAKAUT · Class Representative · Vice-Captain, GNIT Football Team' },
  { year: '2024', degree: 'Higher Secondary (Class XII)', school: 'Baranagar Narendranath Vidyamandir', board: 'WBCHSE (West Bengal Council of Higher Secondary Education)' },
  { year: '2022', degree: 'Secondary (Class X)', school: 'Baranagar Narendranath Vidyamandir', board: 'WBBSE (West Bengal Board of Secondary Education)' },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: {
    '@type': 'Person',
    name: 'Anubhab Das',
    url: 'https://anubhab-das.vercel.app/',
    jobTitle: 'Cyber Security Student & Web Developer',
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Guru Nanak Institute of Technology' },
    knowsAbout: ['Cyber Security', 'JavaScript', 'Python', 'OWASP', 'Web Development'],
  },
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="page-content">

        {/* page hero */}
        <section className="page-hero">
          <div className="container">
            <p className="section-label">about me</p>
            <h1 className="section-title">Security-first builder<br />from Kolkata, India</h1>
          </div>
        </section>

        {/* about main */}
        <section className="section">
          <div className="container">
            <div className="about-layout">
              {/* left: bio */}
              <div className="about-bio">
                <p className="animate-up">
                  I&apos;m <strong>Anubhab Das</strong>, a B.Sc. Cyber Security student at Guru Nanak Institute of Technology
                  (MAKAUT), Kolkata, studying from 2024 to 2028. I&apos;m interested in building software that is useful,
                  understandable, and designed with security in mind.
                </p>
                <p className="animate-up">
                  My work spans full-stack development, web application security, and applied AI. I build with Python,
                  JavaScript, TypeScript, React, Next.js, Flask, FastAPI, and Node.js, with attention to input validation,
                  security controls, testing, and clear failure states.
                </p>
                <p className="animate-up">
                  Recent projects include <strong>Assembly</strong>, an experimental multi-agent AI workspace;
                  <strong> NexusScan</strong>, a URL and phishing-analysis tool; <strong>ThreatOptic</strong>, an email
                  forensics platform; and <strong>NETRAKSHA</strong>, an identity-document screening prototype.
                </p>
                <p className="animate-up">
                  Alongside development and research in blockchain security, TinyML, and privacy-preserving healthcare AI,
                  I serve as a <strong>Class Representative</strong>, Vice-Captain of the GNIT Football Team, and Event
                  Co-Head for Creative Strokes (Euphonious X Zyzzva 2K26).
                </p>

                {/* highlights */}
                <div className="about-highlights animate-up">
                  {[
                    { num: '04', label: 'Featured projects' },
                    { num: '03', label: 'Internships completed' },
                    { num: '04', label: 'Research papers' },
                    { num: 'CR', label: 'Class Representative' },
                  ].map((h) => (
                    <div key={h.label} className="highlight-item">
                      <span className="highlight-num">{h.num}</span>
                      <span className="highlight-label">{h.label}</span>
                    </div>
                  ))}
                </div>

                <div className="animate-up" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '8px' }}>
                  <a href="/images/AnubhabDasResume.pdf" className="btn btn-primary" download>
                    <FileText size={14} aria-hidden="true" /> Download Resume
                  </a>
                  <Link href="/contact" className="btn btn-outline">
                    <Send size={14} aria-hidden="true" /> Contact Me
                  </Link>
                </div>
              </div>

              {/* right: sidebar */}
              <aside className="about-sidebar">
                <div className="profile-card animate-up">
                  <div className="profile-img-wrap">
                    <Image
                      src="/images/protfolio.jpg"
                      alt="Anubhab Das profile photo"
                      width={320}
                      height={320}
                      loading="lazy"
                      style={{ objectFit: 'cover', objectPosition: 'top center', width: '100%', height: '100%' }}
                    />
                  </div>
                  <div className="profile-info">
                    <p className="profile-name">Anubhab Das</p>
                    <p className="profile-role">// full_stack_dev × security</p>
                    <div className="social-links">
                      <a href="https://github.com/anubhab7105" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile"><GithubIcon size={16} /></a>
                      <a href="http://www.linkedin.com/in/anubhab7105" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile"><LinkedinIcon size={16} /></a>
                      <a href="https://www.instagram.com/anubhab.env" target="_blank" rel="noopener noreferrer" aria-label="Instagram profile"><InstagramIcon size={16} /></a>
                      <a href="mailto:anubhab7105@gmail.com" aria-label="Send email"><Mail size={16} /></a>
                    </div>
                  </div>
                </div>

                <div className="info-card animate-up">
                  <h4>Quick Info</h4>
                  <ul className="info-list">
                    <li><MapPin size={14} style={{ color: 'var(--color-accent)', flexShrink: 0 }} /><span>Kolkata, West Bengal, India</span></li>
                    <li><GraduationCap size={14} style={{ color: 'var(--color-accent)', flexShrink: 0 }} /><span>B.Sc Cyber Security (2024–2028), GNIT</span></li>
                    <li><Briefcase size={14} style={{ color: 'var(--color-accent)', flexShrink: 0 }} /><span>Open to internships &amp; full-time roles</span></li>
                    <li><Languages size={14} style={{ color: 'var(--color-accent)', flexShrink: 0 }} /><span>English · Bengali · Hindi</span></li>
                    <li><Phone size={14} style={{ color: 'var(--color-accent)', flexShrink: 0 }} /><span>+91 74399 13838</span></li>
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* experience timeline */}
        <section className="section" aria-label="Work experience" style={{ paddingTop: 0 }}>
          <div className="container">
            <p className="section-label">experience</p>
            <h2 className="section-title" style={{ marginBottom: '48px' }}>Work History</h2>
            <div className="timeline">
              {[
                {
                  date: 'Aug 2025 – Oct 2025',
                  title: 'Associate L1 – Web Development Intern',
                  org: 'Infotact Solutions',
                  desc: 'Contributed to feature development, testing, and deployment of web applications. Applied security-aware checks, reviewed changes for regressions, and supported QA.',
                },
                {
                  date: 'Jul 2025',
                  title: 'Full-Stack Web Development Intern',
                  org: 'Prodigy InfoTech',
                  desc: 'Built full-stack web projects applying security best practices and received a letter of recommendation.',
                },
                {
                  date: 'Aug 2024 – Sep 2024',
                  title: 'Website Design & Development Intern',
                  org: 'iStudio',
                  desc: 'Completed training and internship in responsive, security-aware web development.',
                },
              ].map((item, i) => (
                <div key={i} className="timeline-item animate-up">
                  <div className="timeline-dot" aria-hidden="true" />
                  <p className="timeline-date">{item.date}</p>
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-org">{item.org}</p>
                  <p className="timeline-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* skills section */}
        <section className="skills-section" aria-label="Technical skills">
          <div className="container">
            <p className="section-label">capabilities</p>
            <h2 className="section-title" style={{ marginBottom: '40px' }}>Technical Skills</h2>
            <div className="skills-categories">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.name} className="skill-category-card animate-up">
                  <div className="skill-cat-header">
                    <div className="skill-cat-icon">{cat.icon}</div>
                    <span className="skill-cat-name">{cat.name}</span>
                  </div>
                  <div className="skill-items">
                    {cat.skills.map((s) => (
                      <span key={s} className="tag">{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="soft-skills-row animate-up">
              <h4>Soft Skills</h4>
              <div className="soft-tags">
                {SOFT_SKILLS.map((s) => (
                  <span key={s.label} className="soft-tag">
                    {s.icon} {s.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* education section */}
        <section className="education-section" aria-label="Education history">
          <div className="container">
            <p className="section-label">academic</p>
            <h2 className="section-title" style={{ marginBottom: '40px' }}>Education</h2>
            <div className="edu-grid">
              {EDUCATION.map((edu) => (
                <div key={edu.year} className="edu-card animate-up">
                  <span className="edu-year">{edu.year}</span>
                  <h3 className="edu-degree">{edu.degree}</h3>
                  <p className="edu-school">{edu.school}</p>
                  <p className="edu-board">{edu.board}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* achievements and community */}
        <section className="education-section" aria-label="Achievements and activities">
          <div className="container">
            <p className="section-label">recognition &amp; community</p>
            <h2 className="section-title" style={{ marginBottom: '40px' }}>Achievements &amp; Activities</h2>
            <div className="edu-grid">
              {[
                {
                  year: 'NCAT 2026',
                  degree: 'All India Rank 2,096',
                  school: '548 / 800 in the Naukri Campus All India NCAT 2026.',
                  board: 'Naukri Campus',
                },
                {
                  year: 'HACKATHONS',
                  degree: 'VIBEFORGE 1.0 Finalist',
                  school: 'Also participated in SkillHigh Web Dev Hackathon 2025 and Bharatiya Antariksh Hackathon 2025.',
                  board: 'Hackathons',
                },
                {
                  year: 'AUG 2024',
                  degree: '2nd Place — Extempore',
                  school: 'Secured second position in the Extempore Competition at GNIT.',
                  board: 'Campus achievement',
                },
                {
                  year: '2025',
                  degree: 'Cybersecurity simulations',
                  school: 'Forage Cybersecurity IAM and phishing job simulations; OPSWAT Critical Infrastructure Protection.',
                  board: 'Professional learning',
                },
              ].map((item) => (
                <article key={item.degree} className="edu-card animate-up">
                  <span className="edu-year">{item.year}</span>
                  <h3 className="edu-degree">{item.degree}</h3>
                  <p className="edu-school">{item.school}</p>
                  <p className="edu-board">{item.board}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
