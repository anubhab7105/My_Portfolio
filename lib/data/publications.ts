export interface Publication {
  id: number;
  title: string;
  venue: string;
  year: string;
  status: 'published' | 'accepted' | 'under-review' | 'preprint';
  abstract: string;
  paperUrl: string | null;
  doi: string | null;
  arxiv: string | null;
  tags: string[];
  filters: string[];
  img: string | null;
}

export const PUBLICATIONS: Publication[] = [
  {
    id: 1,
    title: 'Blockchain Based IoT Security: A Comprehensive Review of Architectures Challenges and Future Directions',
    venue: '2025 International Conference on Research in Computational Intelligence and Communication Networks (ICRCICN)',
    year: 'December, 2025',
    status: 'published',
    abstract:
      'The rapid adoption of IoT in healthcare, transportation, and smart cities has introduced major security and privacy challenges. Traditional centralized security methods often fail to protect decentralized IoT networks. This article explores IoT vulnerabilities and highlights blockchain, artificial intelligence, and post-quantum cryptography as promising solutions for secure, efficient, and scalable IoT systems.',
    paperUrl: 'https://ieeexplore.ieee.org/document/11364679',
    doi: '10.1109/ICRCICN68210.2025.11364679',
    arxiv: null,
    tags: ['Blockchain', 'Internet of Things (IoT)', 'Security', 'Smart Contracts', 'Decentralized Identity (DID)'],
    filters: ['blockchain', 'iot'],
    img: '/publications/Blockchain_Based_IoT_Security.jpg',
  },
  {
    id: 2,
    title: 'A Systematic Review of Blockchain-Based Security Architectures for Trusted Cloud Data Sharing: Threat Models and Open Challenges',
    venue: 'The Journal of Techniques - Sciences - Methodes (TSM).',
    year: 'April, 2026',
    status: 'published',
    abstract:
      'This systematic review examines blockchain-enabled secure cloud data sharing frameworks published between 2023 and 2025. The study analyzes decentralized architectures, smart contract-based access control mechanisms, decentralized identity management, and privacy-preserving encryption techniques. It further evaluates major threat models including insider threats, Sybil attacks, and smart contract vulnerabilities while identifying open challenges related to scalability, interoperability, and integration with emerging technologies such as federated learning and edge computing.',
    paperUrl: 'https://tsmjournal.com/volume-10-issue-4-2026/',
    doi: 'https://doi.org/1.5281/zenodo.1387322',
    arxiv: null,
    tags: ['Blockchain', 'Cloud Security', 'Access Control', 'Threat Modeling'],
    filters: ['cybersecurity', 'blockchain', 'cloud'],
    img: '/publications/Trusted_Cloud_Data_Sharing.jpg',
  },
  {
    id: 3,
    title: 'Hardware-Aware Co-Design Framework for Efficient TinyML Deployment on Ultra-Low Power Edge Devices',
    venue: 'TinyML-Enabled IoT Systems: Recent Advancements in Tiny Machine Learning',
    year: 'June, 2026',
    status: 'published',
    abstract:
      'Content Security Policy (CSP) is widely considered the canonical defense against Cross-Site Scripting in modern SPAs, yet real-world deployments routinely rely on unsafe CSP directives that hollow out its protections. This paper audits fifty production SPAs, catalogues the most common policy weaknesses, and proposes a layered hardening framework combining Trusted Types, Subresource Integrity, and runtime taint-tracking that reduces the exploitable XSS surface by 78% without architectural changes.',
    paperUrl: 'https://zenodo.org/records/20664090',
    doi: 'https://doi.org/10.5281/zenodo.20664090',
    arxiv: null,
    tags: ['XSS', 'CSP', 'SPA Security', 'Browser APIs'],
    filters: ['web-security', 'cybersecurity', 'ai-ml'],
    img: '/publications/TinyML_Deployment_on_Ultra-Low.jpg',
  },
  {
    id: 4,
    title: 'Offline-First TinyML–Federated Learning Framework for Privacy-Preserving and Energy-Efficient Smart Healthcare Systems',
    venue: 'TinyML-Enabled IoT Systems: Recent Advancements in Tiny Machine Learning',
    year: 'June, 2026',
    status: 'published',
    abstract:
      'This chapter presents an offline-first TinyML and federated learning framework for smart healthcare environments. The system enables privacy-preserving on-device intelligence for wearable devices by combining decentralized model training, local inference, quantization, and pruning techniques. The proposed architecture minimizes latency, reduces energy consumption, preserves patient privacy, and maintains reliable operation under intermittent network connectivity.',
    paperUrl: 'https://zenodo.org/records/20664766',
    doi: '10.5281/zenodo.20664766',
    arxiv: null,
    tags: ['TinyML', 'Federated Learning', 'Smart Healthcare', 'Edge AI'],
    filters: ['ai-ml', 'cybersecurity', 'iot', 'healthcare'],
    img: '/publications/TinyML–Federated_Learning.jpg',
  },
];

export const STATUS_CONFIG: Record<string, { label: string; cssClass: string }> = {
  published: { label: 'Published', cssClass: 'published' },
  accepted: { label: 'Published', cssClass: 'published' },
  'under-review': { label: 'Published', cssClass: 'published' },
  preprint: { label: 'Published', cssClass: 'published' },
};
