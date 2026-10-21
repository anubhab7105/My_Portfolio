export interface Project {
  id: number;
  title: string;
  desc: string;
  technologies: string[];
  filters: string[];
  github: string;
  live: string;
  security: string[];
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Assembly — Multi-Agent AI Workspace',
    desc: 'An experimental multi-agent AI workspace where agents solve a problem independently, compare responses, examine disagreement, and synthesize a final answer with sources and uncertainty notes where available. Multi-agent agreement does not guarantee correctness, so important outputs need independent verification.',
    technologies: ['Python', 'FastAPI', 'Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    filters: ['fullstack', 'python', 'ai', 'security'],
    github: 'https://github.com/anubhab7105/Assembly',
    live: 'https://assembly-murex.vercel.app/',
    security: [
      'Configurable model-provider integrations and routing',
      'Streamed run events between the frontend and backend',
      'Testing and CI workflows',
      'Dependency-audit gates and contributor documentation',
    ],
    featured: true,
  },
  {
    id: 2,
    title: 'NETRAKSHA — AI-Assisted Document & Identity Screening',
    desc: 'A human-in-the-loop screening workstation concept for reviewing identity documents, live face captures, and registry records. Its modular pipeline produces an explainable Green/Yellow/Red risk recommendation for review by an authorized decision-maker; biometric and forensic signals still depend on model quality, capture conditions, and validation.',
    technologies: ['Python', 'FastAPI', 'React', 'Vite', 'Tailwind CSS', 'OpenCV', 'InsightFace', 'MediaPipe', 'OCR/MRZ'],
    filters: ['fullstack', 'python', 'ai', 'security'],
    github: 'https://github.com/anubhab7105/NETRAKSHA',
    live: 'https://www.netraksha.xyz/',
    security: [
      'Document OCR/MRZ and checksum validation',
      'Image-tampering and physical-forgery signals',
      'Face comparison and liveness checks',
      'Composite risk scoring, role-based access, and audit logging',
      'API-contract, authentication, and pipeline tests',
    ],
    featured: true,
  },
  {
    id: 3,
    title: 'ThreatOptic — Email Threat Detection & Forensic Intelligence',
    desc: 'An email investigation platform for phishing, spoofing, business email compromise, impersonation, and fraud analysis. Its documented workflow combines header checks, ML/rule-based scoring, URL and attachment signals, origin tracing, campaign correlation, case management, alerts, and report generation.',
    technologies: ['Python', 'FastAPI', 'React', 'TypeScript', 'scikit-learn', 'NLP', 'Threat Intelligence', 'SQL'],
    filters: ['fullstack', 'python', 'ai', 'security'],
    github: 'https://github.com/anubhab7105/ThreatOptic',
    live: 'https://email-scanner-chi.vercel.app/',
    security: [
      'SPF/DKIM/DMARC and Received-chain analysis',
      'TF-IDF/Logistic Regression with rule-based risk signals',
      'Domain and URL threat-intelligence integrations',
      'Relationship and campaign correlation',
      'Privacy controls and traceable case workflows',
    ],
    featured: true,
  },
  {
    id: 4,
    title: 'NexusScan — Web Security & Phishing Scanner',
    desc: 'A Flask-based scanner that checks submitted URLs for selected web-security misconfigurations and phishing signals, then explains findings in plain English. URLs can be entered manually, scanned from a live camera QR code, or checked from an uploaded QR-code image. A scan is a signal, not a certification that a site is safe.',
    technologies: ['Python', 'Flask', 'HTML', 'CSS', 'JavaScript', 'scikit-learn', 'HIBP API', 'LLM APIs'],
    filters: ['security', 'javascript', 'python', 'ai'],
    github: 'https://github.com/anubhab7105/NEXUSSCAN',
    live: 'https://nexusscan.vercel.app/',
    security: [
      'Checks selected security headers, exposed files, directory listing, TRACE, and HTTPS enforcement',
      'Random Forest classifier using 48 URL-derived features, with rule-based fallback',
      'Have I Been Pwned domain-breach lookup',
      'Optional LLM explanations do not decide the underlying verdict or risk score',
      'SSRF safeguards and per-IP rate limiting, with optional Redis support',
    ],
    featured: true,
  },
  {
    id: 5,
    title: 'MedAssist AI — Healthcare Support Assistant',
    desc: 'An educational healthcare-support prototype with an AI chat interface, symptom-guidance workflow, emergency-aware checks, user profiles, saved chat and symptom history, and nearby-care discovery through an interactive map. It is not a diagnostic system or a replacement for qualified medical care.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'Supabase', 'Groq API', 'Leaflet', 'OpenStreetMap'],
    filters: ['fullstack', 'python', 'ai'],
    github: 'https://github.com/anubhab7105/MedAssist_AI',
    live: 'https://medassist-ctrlv.vercel.app/',
    security: [
      'Authenticated user profiles and persisted history',
      'Separate frontend and FastAPI backend',
      'API routes for chat, symptom guidance, nearby providers, and profile management',
      'Nearby healthcare search using OpenStreetMap/Overpass',
    ],
    featured: true,
  },
  {
    id: 6,
    title: 'HealthMetrics API — Healthcare Application Modernization',
    desc: 'A backend modernization project replacing a legacy Java Servlet/JSP and MySQL implementation with a structured FastAPI application while preserving legacy page routes and adding a JSON REST API.',
    technologies: ['Python', 'FastAPI', 'SQLAlchemy', 'Alembic', 'PostgreSQL', 'Supabase', 'Jinja2', 'JWT', 'OAuth'],
    filters: ['fullstack', 'python', 'security'],
    github: 'https://github.com/anubhab7105/healthmetrics',
    live: 'https://healthmetrics-blue.vercel.app/',
    security: [
      'Layered routers, services, repositories, schemas, and ORM models',
      'Versioned database migrations and environment-driven configuration',
      'Supabase authentication, Google OAuth, and JWT verification',
      'Cookie-compatible legacy routes, structured logging, and smoke tests',
    ],
    featured: false,
  },
  {
    id: 7,
    title: 'CyberASCII — Real-Time ASCII Visualization',
    desc: 'A browser-based visualization tool that converts uploaded images and live camera input into configurable ASCII art, with performance metrics and optional AI-powered visual analysis.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Canvas API', 'WebRTC', 'Chart.js', 'Node.js', 'Gemini API'],
    filters: ['ai', 'javascript', 'web'],
    github: 'https://github.com/anubhab7105/CyberASCII',
    live: 'https://cyber-ascii.vercel.app/',
    security: [
      'Browser-based image and live-camera input workflow',
      'Canvas and WebRTC integration',
      'Optional Gemini-powered visual analysis',
    ],
    featured: true,
  },
  {
    id: 8,
    title: 'Secure User Authentication System',
    desc: 'An authentication-focused web project exploring password hashing and token-based session flows, with attention to common web-security concerns.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'JWT', 'bcrypt'],
    filters: ['security', 'javascript'],
    github: 'https://github.com/anubhab7105/PRODIGY_FS_01',
    live: 'https://anubhab7105.github.io/PRODIGY_FS_01/',
    security: [
      'Password hashing with bcrypt',
      'Token-based authentication flow',
      'Security-conscious handling of authentication inputs',
    ],
    featured: false,
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);
