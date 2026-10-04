/**
 * Project Data & API Service
 * Handles project retrieval, filtering, and detail extraction.
 */

export const INITIAL_PROJECTS = [
  {
    id: 'deeptrust',
    number: '01',
    title: 'DeepTrust',
    category: ['development', 'design', 'interaction'],
    categoryLabel: 'AI Verification & RAG',
    location: 'India',
    services: 'AI Verification & RAG Pipeline',
    year: '2026',
    sub: 'Misinformation & AI media verifier',
    description:
      'An intelligent AI trust ecosystem detecting misinformation, analyzing synthetic media, and verifying digital claims in real time using retrieval-augmented generation (RAG) and automated fact-checking pipelines.',
    tools: ['React', 'Node.js', 'RAG Pipeline', 'Media Analysis', 'TailwindCSS'],
    tags: 'React · Node.js · RAG · Media Analysis',
    link: 'https://deeptrust-project.netlify.app/',
    github: 'https://github.com/vatsarun-dev/deepTrust',
    svg: '/assets/work-deeptrust.png',
    image: '/assets/work-deeptrust.png',
    rotation: -2.5,
    bgColor: '#1a0808',
  },
  {
    id: 'coderoom',
    number: '02',
    title: 'CodeRoom',
    category: ['development', 'interaction'],
    categoryLabel: 'Real-Time Systems & Collaborative IDE',
    location: 'India',
    services: 'Real-Time Systems & Collaborative IDE',
    year: '2025',
    sub: 'Collaborative code editor & rooms',
    description:
      'A high-performance real-time collaborative code editor featuring instant multi-user rooms, live delta code synchronization, editor presence awareness, and seamless compilation.',
    tools: ['Socket.io', 'React', 'Node.js', 'MongoDB', 'WebSockets'],
    tags: 'Socket.io · React · Node.js · MongoDB',
    link: 'https://developer-s-hub.vercel.app/',
    github: 'https://github.com/Developer-s-Hub',
    svg: '/assets/work-coderoom.png',
    image: '/assets/work-coderoom.png',
    rotation: 2.5,
    bgColor: '#111311',
  },
  {
    id: 'devconnect',
    number: '03',
    title: 'DevConnect',
    category: ['development', 'design'],
    categoryLabel: 'Full Stack & Developer Community',
    location: 'India',
    services: 'Full Stack & Developer Community',
    year: '2025',
    sub: 'Developer social platform & hub',
    description:
      'An editorial community platform where software developers build digital portfolios, publish long-form technical blogs, showcase project repositories, and network with engineers.',
    tools: ['React', 'Redux', 'Node.js', 'Express', 'MongoDB'],
    tags: 'React · Redux · Node.js · Express',
    link: 'https://hack-sprint-seven.vercel.app/',
    github: 'https://github.com/vatsarun-dev/hackSprint',
    svg: '/assets/work-devconnect.png',
    image: '/assets/work-devconnect.png',
    rotation: -2.0,
    bgColor: '#0c0f14',
  },
  {
    id: 'open-source contribution',
    number: '04',
    title: 'Open Source',
    category: ['development'],
    categoryLabel: 'Backend Engineering',
    location: 'India',
    services: 'Backend Engineering & NPM Template',
    year: '2024',
    sub: 'Backend template for Express.js, TypeScript, Prisma, and MongoDB',
    description:
      'Production-ready backend architecture template available as an NPM package for Express.js, TypeScript, Prisma ORM, and MongoDB with preconfigured auth, error handling, and API routing.',
    tools: ['TypeScript', 'Express.js', 'Prisma', 'MongoDB', 'NPM Package'],
    tags: 'React · JavaScript · REST APIs',
    link: 'https://github.com/vatsarun-dev/backend/tree/main/NPM_PACKAGE/server',
    github: 'https://github.com/vatsarun-dev/backend/tree/main/NPM_PACKAGE/server',
    svg: '/assets/work-amazon.svg',
    image: '/assets/work-open.png',
    rotation: 2.2,
    bgColor: '#1A1108',
  },
];

export const projectService = {
  getProjects: async () => {
    return Promise.resolve(INITIAL_PROJECTS);
  },
  getProjectById: async (id) => {
    return Promise.resolve(INITIAL_PROJECTS.find((p) => p.id === id) || null);
  },
  getRecentProjects: (limit = 4) => {
    return INITIAL_PROJECTS.slice(0, limit);
  },
};

export default projectService;
