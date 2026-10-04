import { projectService } from '../../projects/services/projectService';
import { AUTHOR_INFO } from '../../../shared/constants/authorInfo';

/**
 * Home Feature Service
 * Aggregates home hero highlights, tagline data, and featured recent works.
 */
export const homeService = {
  getHeroData: () => ({
    author: AUTHOR_INFO,
    tagline: 'Building modern web applications & practical AI.',
    role: 'Full Stack Developer & Software Engineer',
    introText:
      'I’m Arun Vats, a Computer Science Engineering student and developer focused on building modern, high-performance web applications and practical AI-powered products. My main interests are Full Stack Development, Backend Engineering, Generative AI, and Data Structures & Algorithms.',
  }),
  getRecentProjects: () => {
    return projectService.getRecentProjects(4);
  },
};

export default homeService;
