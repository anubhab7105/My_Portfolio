export interface Project {
  id: number;
  title: string;
  desc: string;
  technologies: string[];
  filters: string[];
  github: string;
  live: string;
  img: string;
  security: string[];
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'NeuroMotion',
    desc: 'An advanced interactive 3D particle system controlled entirely by hand gestures using MediaPipe. Features real-time shape morphing, pinch-based scaling, gesture-triggered transformations, and a futuristic HUD interface with live camera preview.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Three.js', 'MediaPipe Hands'],
    filters: ['javascript', 'threejs', 'ai'],
    github: 'https://github.com/anubhab7105/NeuroMotion',
    live: 'https://neuro-motion-anubhab.vercel.app/',
    img: '/images/project1.png',
    security: [
      'Camera permission handling with user consent',
      'No server-side data storage (privacy-safe)',
      'Real-time processing on client-side only',
      'Secure MediaPipe integration via CDN',
    ],
    featured: true,
  },
  {
    id: 2,
    title: 'Secure User Authentication System',
    desc: 'A robust, production-ready authentication system implementing modern security best practices. Focused on mitigating common authentication vulnerabilities while providing a seamless login and registration flow.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'JWT', 'bcrypt', 'Security'],
    filters: ['security', 'javascript'],
    github: 'https://github.com/anubhab7105/PRODIGY_FS_01',
    live: '',
    img: '/images/project2.png',
    security: [
      'Password hashing with bcrypt',
      'JWT token authentication',
      'XSS prevention (output encoding)',
      'CSRF protection tokens',
      'Rate limiting on login attempts',
      'Secure session management',
    ],
    featured: true,
  },
  {
    id: 3,
    title: 'NEXUSSCAN',
    desc: 'A real-time threat intelligence tool that scans URLs for potential cyber threats. Built with a privacy-first approach — no user data is retained after each session.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'REST APIs', 'Python'],
    filters: ['security', 'javascript', 'python'],
    github: 'https://github.com/anubhab7105/NEXUSSCAN',
    live: 'https://nexusscan.vercel.app/',
    img: '/images/project3.png',
    security: [
      'Secure API communication (HTTPS/TLS)',
      'Input sanitization for URL validation',
      'Data validation before processing',
      'Privacy-focused — zero data retention',
      'CORS implementation for API security',
    ],
  },
  {
    id: 4,
    title: 'NLP-Powered Chatbot',
    desc: 'An interactive chatbot leveraging Python NLP techniques to handle casual conversations, FAQs, and contextual API responses. Built as a learning project exploring natural language processing and secure conversational AI design.',
    technologies: ['Python', 'NLP', 'Flask', 'HTML', 'CSS', 'JavaScript'],
    filters: ['fullstack', 'python', 'ai'],
    github: 'https://github.com/anubhab7105/ChatBot',
    live: '',
    img: '/images/project4.png',
    security: [
      'Sanitized user input against code injection',
      'API key obfuscation',
      'Rate limiting to prevent abuse',
      'Error handling for invalid responses',
    ],
  },
  {
    id: 5,
    title: 'Health Metrics Dashboard',
    desc: 'A responsive, data-rich dashboard for visualizing personal health and fitness metrics. Features interactive Chart.js charts, habit tracking, and trend analytics — all rendered beautifully on any device.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Chart.js', 'Bootstrap'],
    filters: ['javascript'],
    github: 'https://github.com/anubhab7105/HealthMetricsDashboard',
    live: '',
    img: '/images/project5.png',
    security: [
      'Data anonymization for demo data',
      'Secure handling of input metrics',
      'Client-side input validation',
      'CORS configuration',
    ],
  },
  {
    id: 6,
    title: 'Local Grocery E-Commerce Platform',
    desc: 'A full-featured e-commerce solution built for local grocery stores, complete with inventory management, shopping cart, and secure payment processing. Designed to help small businesses transition to online retail while keeping customer data protected.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Python', 'Flask', 'SQLite'],
    filters: ['fullstack', 'python', 'security'],
    github: 'https://github.com/anubhab7105/PRODIGY_FS_03',
    live: 'https://freshmart-gamma.vercel.app/',
    img: '/images/project6.png',
    security: [
      'Input validation & sanitization',
      'Secure payment processing integration',
      'SQL injection prevention (parameterized queries)',
      'Data encryption at rest',
      'XSS output encoding',
    ],
  },
  {
    id: 7,
    title: 'CYBERASCII',
    desc: 'A real-time ASCII visualization tool that converts images and live camera feeds into dynamic terminal-style art, enhanced with Gemini AI-powered analysis. Designed with a privacy-first architecture — camera data is processed locally and never stored.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Canvas API', 'WebRTC', 'Chart.js', 'Gemini AI API'],
    filters: ['ai', 'security', 'javascript', 'web'],
    github: 'https://github.com/anubhab7105/CyberASCII',
    live: 'https://cyber-ascii.vercel.app/',
    img: '/images/project7.png',
    security: [
      'Camera data processed locally (no storage or transmission)',
      'API keys secured server-side (Node.js backend)',
      'Strict Content Security Policy (CSP) implementation',
      'Input validation for uploaded images',
      'Secure API communication (HTTPS/TLS)',
    ],
    featured: true,
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);
