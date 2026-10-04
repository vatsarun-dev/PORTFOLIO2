export { AboutPage, default as AboutPageDefault } from './pages/AboutPage';
export { AboutHero } from './components/AboutHero';
export { AboutBio } from './components/AboutBio';
export { AboutServices } from './components/AboutServices';
export { AboutCredentials } from './components/AboutCredentials';
export { useAbout } from './hooks/useAbout';
export { aboutService, INITIAL_ABOUT_DATA } from './services/aboutService';
export {
  aboutSlice,
  updateAboutData,
  selectAboutData,
  selectAboutBio,
  selectAboutServices,
  selectAboutEducation,
  selectAboutAchievements,
  selectAboutCertifications,
  selectAboutSkills,
  default as aboutReducer,
} from './store/aboutSlice';
