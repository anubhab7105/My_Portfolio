import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  Code,
  Server,
  Wrench,
  MapPin,
  GraduationCap,
  Briefcase,
  Languages,
  Phone,
  Mail,
  Award,
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
    'Learn about Anubhab Das — Cyber Security student at GNIT Kolkata, web developer, and security-focused builder with internship experience at Prodigy InfoTech, iStudio, and Infotact Solutions.',
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
    icon: <ShieldCheck size={18} />,
    name: 'Security',
    skills: ['OWASP Top 10', 'XSS Prevention', 'SQL Injection', 'CSRF Protection', 'JWT Auth', 'bcrypt', 'Data Encryption', 'Rate Limiting', 'Threat Analysis'],
  },
  {
    icon: <Code size={18} />,
    name: 'Frontend',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'REST APIs', 'Chart.js', 'Bootstrap'],
  },
  {
    icon: <Server size={18} />,
    name: 'Backend',
    skills: ['Python', 'Flask', 'SQLite', 'NLP', 'AI Integration', 'C'],
  },
  {
    icon: <Wrench size={18} />,
    name: 'Tools & DevOps',
    skills: ['Git', 'GitHub', 'Vercel', 'GitHub Pages', 'VS Code', 'Formspree'],
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
  { year: '2024 – 2028', degree: 'B.Sc in Cyber Security', school: 'Guru Nanak Institute of Technology', board: 'MAKAUT (Maulana Abul Kalam Azad University of Technology)' },
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
                  I&apos;m <strong>Anubhab Das</strong>, a first-year <strong>B.Sc Cyber Security student</strong> at
                  Guru Nanak Institute of Technology (MAKAUT), Kolkata. My journey into tech started with a fascination
                  for how things break — and more importantly, how to make sure they don&apos;t.
                </p>
                <p className="animate-up">
                  I specialize in building <strong>secure, production-grade web applications</strong> that balance great
                  user experience with rock-solid security architecture. From implementing{' '}
                  <strong>JWT authentication and bcrypt password hashing</strong> to preventing SQL injection, XSS, and
                  CSRF attacks, I approach every project with the OWASP Top 10 in mind.
                </p>
                <p className="animate-up">
                  Beyond security, I&apos;m a <strong>full-stack web developer</strong> comfortable across the entire
                  stack — crafting responsive frontends with HTML/CSS/JS and building backend APIs with Python and Flask.
                  I&apos;ve completed three internships — at <strong>Prodigy InfoTech</strong>,{' '}
                  <strong>iStudio</strong>, and <strong>Infotact Solutions</strong> — where I worked on real-world
                  client projects.
                </p>
                <p className="animate-up">
                  When I&apos;m not writing code, I&apos;m researching the latest vulnerabilities, exploring threat
                  intelligence tools, or sharpening my Python skills. I&apos;m actively looking for{' '}
                  <strong>opportunities in web development, cybersecurity analysis, or security engineering</strong>.
                </p>

                {/* highlights */}
                <div className="about-highlights animate-up">
                  {[
                    { num: '5+', label: 'Projects shipped' },
                    { num: '3', label: 'Internships completed' },
                    { num: '2024', label: 'Started B.Sc CyberSec' },
                    { num: 'OWASP', label: 'Security framework' },
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
                    <p className="profile-role">// cyber_security_student</p>
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
                  title: 'Associate L1 — Web Development Intern',
                  org: 'Infotact Solutions',
                  desc: 'Collaborated on feature development, testing, and deployment for client web applications. Implemented secure-coding checks, reviewing pull requests for regressions, and assisted QA to maintain production code quality.',
                },
                {
                  date: 'July 2025',
                  title: 'Full-Stack Web Development Intern',
                  org: 'Prodigy InfoTech',
                  desc: 'Worked on real-world full-stack projects, implementing security best practices throughout the development lifecycle. Delivered multiple secure web applications. Received Certificate of Completion and Letter of Recommendation.',
                },
                {
                  date: 'Aug – Sep 2024',
                  title: 'Website Design & Development Intern',
                  org: 'iStudio',
                  desc: 'Completed training and internship in website design and development, focusing on creating user-friendly web applications with attention to security considerations and responsive design principles.',
                },
              ].map((item, i) => (
                <div key={i} className="timeline-item animate-up">
                  <div className="timeline-dot" aria-hidden="true" />
                  <p className="timeline-date">{item.date}</p>
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-org">{item.org}</p>
                  <p className="timeline-desc">{item.desc}</p>
                  <span className="timeline-badge">
                    <Award size={11} aria-hidden="true" /> Certificate Issued
                  </span>
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

      </main>
    </>
  );
}
