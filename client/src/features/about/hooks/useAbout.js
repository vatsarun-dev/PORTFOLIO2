import { useSelector } from 'react-redux';
import {
  selectAboutData,
  selectAboutBio,
  selectAboutServices,
  selectAboutEducation,
  selectAboutAchievements,
  selectAboutCertifications,
  selectAboutSkills,
} from '../store/aboutSlice';

export const useAbout = () => {
  const aboutData = useSelector(selectAboutData);
  const bio = useSelector(selectAboutBio);
  const services = useSelector(selectAboutServices);
  const education = useSelector(selectAboutEducation);
  const achievements = useSelector(selectAboutAchievements);
  const certifications = useSelector(selectAboutCertifications);
  const skills = useSelector(selectAboutSkills);

  const coreSkills = [
    ...skills.frontend,
    ...skills.backend,
    ...skills.ai,
  ]
    .filter((val, idx, arr) => arr.indexOf(val) === idx)
    .slice(0, 16);

  return {
    aboutData,
    bio,
    services,
    education,
    achievements,
    certifications,
    skills,
    coreSkills,
  };
};

export default useAbout;
