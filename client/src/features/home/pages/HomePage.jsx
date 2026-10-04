import React, { useRef } from 'react';
import { useHome } from '../hooks/useHome';
import { HeroHeader } from '../components/HeroHeader';
import { HomeIntro } from '../components/HomeIntro';
import { RecentProjects } from '../components/RecentProjects';

export const HomePage = () => {
  const { recentProjects } = useHome();
  const heroRef = useRef(null);

  return (
    <div className="main-wrap" id="home">
      <HeroHeader heroRef={heroRef} />
      <HomeIntro />
      <RecentProjects projects={recentProjects} />
    </div>
  );
};

export default HomePage;
