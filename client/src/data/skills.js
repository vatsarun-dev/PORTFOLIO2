export const mindNodes = [
  { id: 'dsa', label: 'DSA', radius: 2.8, speed: 0.7, yOffset: 0.4, color: '#ff006e' },
  { id: 'ai', label: 'AI & RAG', radius: 3.4, speed: 0.5, yOffset: -0.6, color: '#00f5d4' },
  { id: 'react', label: 'REACT 19', radius: 2.5, speed: 0.9, yOffset: 0.8, color: '#ffbe0b' },
  { id: 'backend', label: 'BACKEND ARCH', radius: 3.8, speed: 0.4, yOffset: -0.2, color: '#fb5607' },
  { id: 'sysdesign', label: 'SYSTEM DESIGN', radius: 3.1, speed: 0.65, yOffset: 0.5, color: '#8338ec' },
  { id: 'motion', label: 'GSAP MOTION', radius: 2.9, speed: 0.8, yOffset: -0.7, color: '#ff006e' },
  { id: 'webgl', label: '3D WEBGL', radius: 3.5, speed: 0.45, yOffset: 0.3, color: '#3a86ff' },
  { id: 'opensource', label: 'OPEN SOURCE', radius: 2.7, speed: 0.75, yOffset: -0.4, color: '#ffffff' },
];

export const kineticSkills = [
  {
    category: 'FRONTEND ENGINEERING',
    direction: -1, // moves left on scroll
    speed: 1.2,
    items: ['REACT', 'JAVASCRIPT ES6+', 'TYPESCRIPT', 'GSAP 3', 'LENIS', 'HTML5', 'CSS3', 'CANVAS / WEBGL', 'RESPONSIVE UI'],
  },
  {
    category: 'BACKEND & CLOUD',
    direction: 1, // moves right on scroll
    speed: 1.0,
    items: ['NODE.JS', 'EXPRESS.JS', 'MONGODB', 'MONGOOSE', 'REST APIS', 'JWT AUTH', 'GOOGLE OAUTH2', 'WEBSOCKETS', 'SOCKET.IO'],
  },
  {
    category: 'AI & INTELLIGENT SYSTEMS',
    direction: -1,
    speed: 1.4,
    items: ['GENERATIVE AI', 'RAG ARCHITECTURE', 'VECTOR EMBEDDINGS', 'AGENTIC WORKFLOWS', 'LLM INTEGRATION', 'PROMPT PIPELINES', 'FORENSIC ANALYSIS'],
  },
  {
    category: 'CORE FOUNDATIONS & SYSTEMS',
    direction: 1,
    speed: 0.9,
    items: ['JAVA', 'PYTHON', 'DATA STRUCTURES & ALGORITHMS', 'SYSTEM DESIGN', 'OOP PRINCIPLES', 'DBMS / SQL', 'GIT & GITHUB', 'LINUX SHELL'],
  },
];

export const tickerItems = [
  'LEARN',
  'BUILD',
  'BREAK',
  'DEBUG',
  'SHIP',
  'REPEAT',
  'CODE',
  'OPTIMIZE',
  'DEPLOY',
  'ITERATE',
];

export const achievements = [
  {
    number: '03',
    suffix: 'RD',
    label: 'CODING COMPETITION',
    sub: 'College-Level Competitive Programming Showcase',
    detail: 'Algorithmic problem solving across complex graphs, dynamic programming, and greedy logic.',
    color: '#ff006e',
  },
  {
    number: '03',
    suffix: 'RD',
    label: 'AI COMPETITION RANK',
    sub: 'Generative AI & Rapid Prototype Sprint',
    detail: 'Engineered an AI-driven verification workflow under tight hackathon deadlines.',
    color: '#ff5400',
  },
  {
    number: '15',
    prefix: 'TOP',
    suffix: '',
    label: 'HACKATHON FINALIST',
    sub: 'Multi-Disciplinary Innovation Hackathon',
    detail: 'Built and pitched a collaborative developer ecosystem product selected in top 15 solutions.',
    color: '#00f5d4',
  },
  {
    number: '02',
    suffix: 'YRS',
    label: 'NCC B CERTIFICATE',
    sub: 'National Cadet Corps (Air / Army Wing)',
    detail: 'Rigorous 2-year leadership, discipline, team coordination, and field endurance training.',
    color: '#ffbe0b',
  },
];
