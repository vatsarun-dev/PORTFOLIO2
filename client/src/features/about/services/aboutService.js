/**
 * About Feature Data & API Service
 * Provides comprehensive biography, academic credentials, service capabilities, and technical skills.
 */

export const INITIAL_ABOUT_DATA = {
  name: 'Arun Vats',
  firstName: 'Arun',
  lastName: 'Vats',
  role: 'Full Stack Developer & Software Engineer',
  tagline: 'Building modern web applications, scalable backends, and practical AI products.',
  location: 'Meerut, India',
  country: 'India',
  timezone: 'Asia/Kolkata',
  timezoneCode: 'IST',

  education: {
    degree: 'B.Tech in Computer Science & Engineering',
    institution: 'Bharat Institute of Technology, Meerut',
    university: 'AKTU',
    period: '2023 — 2027',
    cgpa: '8.34 / 10',
  },

  about: {
    intro:
      'I’m Arun Vats, a Computer Science Engineering student and developer focused on building modern, high-performance web applications and practical AI-powered products.',
    description:
      'My main interests are Full Stack Development, Backend Engineering, Generative AI, Agentic AI, and Data Structures & Algorithms. I enjoy turning ideas into real products — from collaborative developer tools to AI-powered verification systems.',
    cta: 'Always building & exploring.',
  },

  services: [
    {
      num: '01',
      title: 'Full Stack Development',
      description:
        'Building modern, high-performance web applications with React, Node.js, Express, and modern CSS/GSAP choreography. Focusing on clean code, responsive design, and smooth interactions.',
    },
    {
      num: '02',
      title: 'Backend & System Architecture',
      description:
        'Designing scalable REST APIs, real-time WebSocket systems (Socket.io), database models in MongoDB & MySQL, secure authentication with JWT/OAuth, and reliable backend services.',
    },
    {
      num: '03',
      title: 'Generative AI & Agentic Systems',
      description:
        'Developing practical AI-powered applications, Retrieval-Augmented Generation (RAG) pipelines, multimodal analysis tools, and integrating modern AI APIs and agentic workflows into production products.',
    },
  ],

  achievements: [
    { title: '3rd Rank — AI Competition', detail: 'Awarded for building multimodal AI solution' },
    { title: '3rd Rank — Coding Competition', detail: 'Data structures, algorithms & speed problem solving' },
    { title: 'Top 10 — Noida Hackathon', detail: 'Galgotias University hackathon finalist' },
    { title: 'Top 15 — Hackathons', detail: 'HackHeist & Trikon 2.0 hackathon leaderboards' },
    { title: 'NCC — 2 Years Service', detail: 'Awarded prestigious NCC B Certificate' },
  ],

  certifications: [
    'LeetCode Problem Solving',
    'LeetCode Python & Java',
    'Full Stack Web Development',
  ],

  skills: {
    frontend: ['React', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Lenis', 'HTML5', 'CSS3'],
    backend: ['Node.js', 'Express.js', 'REST APIs', 'MongoDB', 'MySQL', 'Socket.io', 'JWT', 'OAuth'],
    programming: ['Java', 'JavaScript', 'TypeScript', 'Python', 'Data Structures & Algorithms'],
    ai: ['Generative AI', 'RAG Pipelines', 'AI APIs', 'Agentic AI Concepts', 'Media Analysis'],
    tools: ['Git', 'GitHub', 'Vite', 'Postman', 'Linux', 'Vercel'],
  },

  socials: [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/arun-vats-a819bb281' },
    { name: 'GitHub', url: 'https://github.com/vatsarun-dev' },
    { name: 'LeetCode', url: 'https://leetcode.com/u/vatsarun09/' },
    { name: 'Instagram', url: 'https://www.instagram.com/build.witharun/' },
  ],
};

export const aboutService = {
  getAboutData: async () => {
    return Promise.resolve(INITIAL_ABOUT_DATA);
  },
  getServices: () => INITIAL_ABOUT_DATA.services,
  getEducation: () => INITIAL_ABOUT_DATA.education,
  getAchievements: () => INITIAL_ABOUT_DATA.achievements,
  getCertifications: () => INITIAL_ABOUT_DATA.certifications,
  getCoreSkills: () => {
    return [
      ...INITIAL_ABOUT_DATA.skills.frontend,
      ...INITIAL_ABOUT_DATA.skills.backend,
      ...INITIAL_ABOUT_DATA.skills.ai,
    ]
      .filter((val, idx, arr) => arr.indexOf(val) === idx)
      .slice(0, 16);
  },
};

export default aboutService;
