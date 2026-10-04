import React from 'react';
import { useAbout } from '../hooks/useAbout';
import { AboutHero } from '../components/AboutHero';
import { AboutBio } from '../components/AboutBio';
import { AboutServices } from '../components/AboutServices';
import { AboutCredentials } from '../components/AboutCredentials';

export const AboutPage = () => {
  const {
    bio,
    services,
    education,
    achievements,
    certifications,
    coreSkills,
  } = useAbout();

  return (
    <div className="main-wrap" id="about">
      <AboutHero />
      <AboutBio bio={bio} />
      <AboutServices services={services} />
      <AboutCredentials
        education={education}
        achievements={achievements}
        certifications={certifications}
        coreSkills={coreSkills}
      />
    </div>
  );
};

export default AboutPage;
