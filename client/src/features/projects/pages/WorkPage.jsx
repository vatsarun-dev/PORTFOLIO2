import React from 'react';
import { useProjects } from '../hooks/useProjects';
import { ShowcaseGrid } from '../components/ShowcaseCard/ShowcaseCard';
import { ProjectFilters } from '../components/ProjectFilters';
import { ProjectArchiveBtn } from '../components/ProjectArchiveBtn';

export const WorkPage = () => {
  const {
    filter,
    viewMode,
    filteredProjects,
    counts,
    setFilter,
    setViewMode,
  } = useProjects();

  return (
    <>
      <div className="main-wrap" id="projects">
        <header className="section default-header work-header">
          <div className="container medium">
            <div className="row">
              <div className="flex-col once-in">
                <h1>
                  <span>Creating next level </span>
                  <span>digital products</span>
                </h1>
              </div>
            </div>
          </div>
        </header>

        {/* Filters & Layout Switcher */}
        <ProjectFilters
          filter={filter}
          viewMode={viewMode}
          counts={counts}
          onFilterChange={setFilter}
          onViewModeChange={setViewMode}
        />

        {/* Projects View: Rows (List) or Columns (Grid) */}
        <section className="section-wrap section-wrap-work once-in">
          {/* List Rows Part (Editorial 4-Column List View without floating cursor preview) */}
          <section
            className={`section work-grid small-work-grid grid-fade grid-rows-part ${viewMode === 'rows' ? 'visible grid-fade-in' : ''}`}
            style={{ display: viewMode === 'rows' ? 'block' : 'none' }}
          >
            <div className="container">
              <div className="grid-sub-title">
                <div className="flex-col">
                  <h5>Client</h5>
                </div>
                <div className="flex-col">
                  <h5>Location</h5>
                </div>
                <div className="flex-col">
                  <h5>Services</h5>
                </div>
                <div className="flex-col">
                  <h5>Year</h5>
                </div>
              </div>
              <ul className="work-items all-active">
                {filteredProjects.map((project, index) => (
                  <li
                    key={project.id}
                    className={`visible hover-row ${Array.isArray(project.category) ? project.category.join(' ') : project.category}`}
                    data-project={project.id}
                    data-index={index}
                  >
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="stripe animate"></div>
                      <div className="row">
                        <div className="flex-col">
                          <h4>
                            <span>{project.title}</span>
                          </h4>
                        </div>
                        <div className="flex-col">
                          <p>{project.location || 'India'}</p>
                        </div>
                        <div className="flex-col">
                          <p>{project.services || project.categoryLabel || 'Development'}</p>
                        </div>
                        <div className="flex-col">
                          <p>{project.year || '2025'}</p>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
                <div className="stripe last animate"></div>
              </ul>
            </div>
          </section>

          {/* Grid Columns Part (Framer Showcase Cards) */}
          <section
            className={`section work-showcase-section grid-fade grid-columns-part ${viewMode === 'columns' ? 'visible grid-fade-in' : ''}`}
            style={{ display: viewMode === 'columns' ? 'block' : 'none' }}
          >
            <div className="container">
              <ShowcaseGrid items={filteredProjects} />
            </div>
          </section>
        </section>

        {/* Center Button: Archive */}
        <ProjectArchiveBtn count={10} />
      </div>
    </>
  );
};

export default WorkPage;
