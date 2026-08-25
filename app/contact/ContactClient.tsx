'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Briefcase,
  Handshake,
  ShieldCheck,
  MessageSquare,
  Send,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '@/components/SocialIcons';


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
  return <div ref={ref} className="animate-up" style={{ transitionDelay: `${delay}s` }}>{children}</div>;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ContactClient() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('https://formspree.io/f/mvgqkdbr', {
        method: 'POST',
        body: new FormData(e.currentTarget),
        headers: { Accept: 'application/json' },
      });
      if (response.ok) {
        setStatus('success');
        formRef.current?.reset();
      } else {
        throw new Error('Network response was not ok');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <main className="page-content">
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <p className="section-label">get in touch</p>
          <h1 className="section-title">
            Let&apos;s Build Something
            <br />
            <span style={{ color: 'var(--color-accent)' }}>Secure Together</span>
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', maxWidth: '500px', marginTop: '12px' }}>
            Whether it&apos;s a project, internship, or just a conversation about security — my inbox is always open.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '56px' }}>
        <div className="container">
          <div className="contact-layout">

            {/* info block */}
            <aside className="contact-info-block">
              <AnimateUp>
                <div className="contact-card">
                  <h3>Contact Information</h3>
                  <div className="contact-items">
                    {[
                      { icon: <Mail size={16} />, label: 'Email', value: <a href="mailto:anubhab7105@gmail.com" className="contact-value">anubhab7105@gmail.com</a> },
                      { icon: <Phone size={16} />, label: 'Phone', value: <a href="tel:+917439913838" className="contact-value">+91 74399 13838</a> },
                      { icon: <MapPin size={16} />, label: 'Location', value: <span className="contact-value">Kolkata, West Bengal, India</span> },
                      { icon: <Clock size={16} />, label: 'Response Time', value: <span className="contact-value">Within 24 hours</span> },
                    ].map((item) => (
                      <div key={item.label} className="contact-item">
                        <div className="contact-icon" aria-hidden="true">{item.icon}</div>
                        <div className="contact-text-wrap">
                          <span className="contact-label">{item.label}</span>
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateUp>

              <AnimateUp delay={0.1}>
                <div className="contact-card">
                  <h3>Find Me Online</h3>
                  <div className="social-links" style={{ flexWrap: 'wrap' }}>
                    <a href="https://github.com/anubhab7105" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile"><GithubIcon size={17} /></a>
                    <a href="http://www.linkedin.com/in/anubhab7105" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile"><LinkedinIcon size={17} /></a>
                    <a href="https://www.instagram.com/anubhab.env" target="_blank" rel="noopener noreferrer" aria-label="Instagram profile"><InstagramIcon size={17} /></a>
                    <a href="mailto:anubhab7105@gmail.com" aria-label="Email"><Mail size={17} /></a>
                  </div>
                </div>
              </AnimateUp>

              <AnimateUp delay={0.2}>
                <div className="contact-card">
                  <h3>Open To</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '4px' }}>
                    {[
                      { icon: <Briefcase size={13} />, label: 'Internship opportunities' },
                      { icon: <Handshake size={13} />, label: 'Project collaborations' },
                      { icon: <ShieldCheck size={13} />, label: 'Security consulting' },
                      { icon: <MessageSquare size={13} />, label: 'Tech conversations' },
                    ].map((item) => (
                      <span key={item.label} className="soft-tag" style={{ width: 'fit-content', padding: '8px 14px', borderRadius: '8px' }}>
                        {item.icon} {item.label}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimateUp>
            </aside>

            {/* contact form */}
            <AnimateUp>
              <div className="contact-form-wrap">
                <h3>Send a Message</h3>
                <p>Fill out the form and I&apos;ll get back to you as soon as possible.</p>

                <form id="contact-form" ref={formRef} onSubmit={handleSubmit} noValidate>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input type="text" id="name" name="name" placeholder="Your name" required autoComplete="name" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input type="email" id="email" name="email" placeholder="your@email.com" required autoComplete="email" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="inquiry_type">Subject</label>
                    <select id="inquiry_type" name="inquiry_type" required>
                      <option value="" disabled>Select a topic</option>
                      <option value="internship">Internship Opportunity</option>
                      <option value="collaboration">Project Collaboration</option>
                      <option value="security">Security Consulting</option>
                      <option value="freelance">Freelance Work</option>
                      <option value="research">Research Collaboration / Paper Co-Authorship</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project, opportunity, or what's on your mind..."
                      required
                    />
                  </div>

                  {/* honeypot */}
                  <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                  <button
                    type="submit"
                    id="submit-btn"
                    className="btn btn-primary"
                    disabled={status === 'loading'}
                    style={{ width: '100%', justifyContent: 'center', padding: '14px 24px', fontSize: '0.88rem' }}
                  >
                    {status === 'loading' ? (
                      <>Sending...</>
                    ) : (
                      <><Send size={14} aria-hidden="true" /> Send Message</>
                    )}
                  </button>

                  {status === 'success' && (
                    <div className="form-status success" role="alert">
                      <CheckCircle size={15} aria-hidden="true" />
                      Message sent! I&apos;ll get back to you within 24 hours.
                    </div>
                  )}
                  {status === 'error' && (
                    <div className="form-status error" role="alert">
                      <AlertTriangle size={15} aria-hidden="true" />
                      Something went wrong. Please try emailing me directly at anubhab7105@gmail.com
                    </div>
                  )}
                </form>
              </div>
            </AnimateUp>

          </div>
        </div>
      </section>
    </main>
  );
}
