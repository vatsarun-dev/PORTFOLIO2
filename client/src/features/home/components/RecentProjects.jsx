import React from 'react';
import { useNavigation } from '../../../shared/context/NavigationContext';
import { ProjectList, ShowcaseGrid } from '../../projects';

/**
 * RecentProjects component for HomePage.
 * Renders desktop interactive project list, mobile showcase cards, and "More projects" link.
 */
export const RecentProjects = ({ projects = [] }) => {
  const { navigateTo } = useNavigation();

  return (
    <>
      {/* Section: Work Grid (Interactive hover items on desktop) */}
      <section className="section work-grid large-work-grid" id="work">
        <div className="container">
          <div className="grid-sub-title reveal in-view">
            <div className="flex-col">
              <h5>Recent projects</h5>
            </div>
          </div>
          <ProjectList items={projects} />
        </div>
      </section>

      {/* Section: Mobile Project Showcase (Showcase cards on mobile/tablet) */}
      <section className="section work-tiles-home mobile-showcase-section">
        <div className="container">
          <div className="grid-sub-title in-view" style={{ paddingBottom: '1.25rem' }}>
            <div className="flex-col">
              <h5>Recent projects</h5>
            </div>
          </div>
          <ShowcaseGrid items={projects} />
        </div>
      </section>

      {/* Center Button: More Projects */}
      <section className="section center-grid-btn center-grid-btn-home">
        <div className="container">
          <div className="grid-after-btn reveal in-view">
            <div className="btn btn-normal">
              <a
                href="/projects"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('/projects', 'Projects');
                }}
                className="btn-click magnetic"
                data-strength="25"
                data-strength-text="15"
              >
                <div className="btn-fill"></div>
                <span className="btn-text">
                  <span className="btn-text-inner change">
                    More projects
                    <div className="count-nr">{projects.length}</div>
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RecentProjects;
