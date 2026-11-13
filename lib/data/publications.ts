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
}

export const PUBLICATIONS: Publication[] = [
  {
    id: 1,
    title: 'Blockchain Based IoT Security: A Comprehensive Review of Architectures, Challenges and Future Directions',
    venue: '2025 International Conference on Research in Computational Intelligence and Communication Networks (ICRCICN)',
    year: 'December, 2025',
    status: 'published',
    abstract:
      'The paper reviews security and privacy challenges in IoT environments and discusses blockchain-based approaches for securing connected systems, with attention to architectures, implementation challenges, and future research directions.',
    paperUrl: 'https://ieeexplore.ieee.org/document/11364679',
    doi: '10.1109/ICRCICN68210.2025.11364679',
    arxiv: null,
    tags: ['Blockchain', 'Internet of Things (IoT)', 'Security', 'Smart Contracts', 'Decentralized Identity (DID)'],
    filters: ['blockchain', 'iot'],
  },
  {
    id: 2,
    title: 'Blockchain-Based Security Architectures for Trusted Cloud Data Sharing: A Systematic Review',
    venue: 'TSM Journal, Volume 10, Issue 4',
    year: 'April, 2026',
    status: 'published',
    abstract:
      'This systematic review examines blockchain-enabled secure cloud data sharing frameworks published between 2023 and 2025. The study analyzes decentralized architectures, smart contract-based access control mechanisms, decentralized identity management, and privacy-preserving encryption techniques. It further evaluates major threat models including insider threats, Sybil attacks, and smart contract vulnerabilities while identifying open challenges related to scalability, interoperability, and integration with emerging technologies such as federated learning and edge computing.',
    paperUrl: 'https://tsmjournal.com/volume-10-issue-4-2026/',
    doi: 'https://doi.org/1.5281/zenodo.1387322',
    arxiv: null,
    tags: ['Blockchain', 'Cloud Security', 'Access Control', 'Threat Modeling'],
    filters: ['cybersecurity', 'blockchain', 'cloud'],
  },
  {
    id: 3,
    title: 'Hardware-Aware Co-Design Framework for Efficient TinyML Deployment',
    venue: 'TinyML-Enabled IoT Systems: Recent Advancements in Tiny Machine Learning',
    year: 'June, 2026',
    status: 'published',
    abstract:
      'This work examines a hardware-aware co-design approach for efficient TinyML deployment, considering model and hardware choices together to support machine-learning workloads on resource-constrained edge devices.',
    paperUrl: 'https://zenodo.org/records/20664090',
    doi: 'https://doi.org/10.5281/zenodo.20664090',
    arxiv: null,
    tags: ['XSS', 'CSP', 'SPA Security', 'Browser APIs'],
    filters: ['web-security', 'cybersecurity', 'ai-ml'],
  },
  {
    id: 4,
    title: 'Offline-First TinyML–Federated Learning Framework for Privacy-Preserving Smart Healthcare',
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
  },,
{
    id: 5,
    title: 'Rowhammer Attacks on Modern Memory Systems: Evolution, Exploitation, and Defence Mechanisms',
    venue: 'The Future of Digital Security: AI, Big Data, and Cyber Defense — Iterative International Publishers (IIP Series)',
    year: 'August, 2026',
    status: 'published',
    abstract:
      'This book chapter examines the evolution and exploitation of Rowhammer attacks on modern memory systems, together with defence mechanisms for mitigating memory-level security threats. Published on 27 August 2026. Print ISBN: 978-81-6774-464-7; E-ISBN: 978-81-6774-465-4; ISSN: 3070-7617.',
    paperUrl: 'https://doi.org/10.58532/nbennur3409C7',
    doi: '10.58532/nbennur3409C7',
    arxiv: null,
    tags: ['Rowhammer', 'Memory Security', 'Hardware Security', 'Cybersecurity'],
    filters: ['cybersecurity', 'hardware-security'],
  },
  {
    id: 6,
    title: 'Zero Trust Security Architecture for Cloud, IoT, and Enterprise Networks',
    venue: 'The Future of Digital Security: AI, Big Data, and Cyber Defense — Iterative International Publishers (IIP Series)',
    year: 'August, 2026',
    status: 'published',
    abstract:
      'This book chapter explores Zero Trust Security Architecture across cloud environments, IoT systems, and enterprise networks. Published on 27 August 2026. Print ISBN: 978-81-6774-464-7; E-ISBN: 978-81-6774-465-4; ISSN: 3070-7617.',
    paperUrl: 'https://doi.org/10.58532/nbennur3409C5',
    doi: '10.58532/nbennur3409C5',
    arxiv: null,
    tags: ['Zero Trust', 'Cloud Security', 'IoT Security', 'Network Security'],
    filters: ['cybersecurity', 'cloud', 'iot', 'network-security'],
  },
  {
    id: 7,
    title: 'Prompt Injection and Jailbreak Attacks on Large Language Models: Threats and Defense Strategies',
    venue: 'The Future of Digital Security: AI, Big Data, and Cyber Defense — Iterative International Publishers (IIP Series)',
    year: 'August, 2026',
    status: 'published',
    abstract:
      'This book chapter analyzes prompt-injection and jailbreak attacks targeting large language models, discussing their associated security threats and defence strategies. Published on 27 August 2026. Print ISBN: 978-81-6774-464-7; E-ISBN: 978-81-6774-465-4; ISSN: 3070-7617.',
    paperUrl: 'https://doi.org/10.58532/nbennur3409C9',
    doi: '10.58532/nbennur3409C9',
    arxiv: null,
    tags: ['Prompt Injection', 'Jailbreak Attacks', 'Large Language Models', 'AI Security'],
    filters: ['cybersecurity', 'ai-ml', 'ai-security'],
  },
];

export const STATUS_CONFIG: Record<string, { label: string; cssClass: string }> = {
  published: { label: 'Published', cssClass: 'published' },
  accepted: { label: 'Published', cssClass: 'published' },
  'under-review': { label: 'Published', cssClass: 'published' },
  preprint: { label: 'Published', cssClass: 'published' },
};
