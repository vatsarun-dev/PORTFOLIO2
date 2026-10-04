import React, { useState } from 'react';
import { projects } from '../data/projects.js';
import { ShowcaseGrid } from '../components/ShowcaseCard/ShowcaseCard.jsx';
import { ProjectList } from '../components/ProjectList/ProjectList.jsx';

export const WorkPage = () => {
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState('columns');

  const filteredProjects = projects.filter((item) =>
    filter === 'all' ? true : item.category.includes(filter)
  );

  const devCount = projects.filter((p) => p.category.includes('development')).length;
  const designCount = projects.filter((p) => p.category.includes('design')).length;

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
        <section className="section work-filters">
          <div className="container once-in">
            <div className="filter-row">
              <div className="toggle-row">
                <div
                  className={`btn btn-normal all-btn ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  <div className="btn-click magnetic" data-strength="25" data-strength-text="15">
                    <div className="btn-fill"></div>
                    <span className="btn-text">
                      <span className="btn-text-inner change">All</span>
                    </span>
                  </div>
                </div>

                <div
                  className={`btn btn-normal design-btn ${filter === 'design' ? 'active' : ''}`}
                  onClick={() => setFilter('design')}
                >
                  <div className="btn-click magnetic" data-strength="25" data-strength-text="15">
                    <div className="btn-fill"></div>
                    <span className="btn-text">
                      <span className="btn-text-inner change">
                        Design
                        <div className="count-nr">{designCount}</div>
                      </span>
                    </span>
                  </div>
                </div>

                <div
                  className={`btn btn-normal development-btn ${filter === 'development' ? 'active' : ''}`}
                  onClick={() => setFilter('development')}
                >
                  <div className="btn-click magnetic" data-strength="25" data-strength-text="15">
                    <div className="btn-fill"></div>
                    <span className="btn-text">
                      <span className="btn-text-inner change">
                        Development
                        <div className="count-nr">{devCount}</div>
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid-row">
                <div
                  className={`btn btn-normal btn-icon rows-btn ${viewMode === 'rows' ? 'active' : ''}`}
                  onClick={() => setViewMode('rows')}
                  title="List View"
                >
                  <div className="btn-click magnetic" data-strength="25" data-strength-text="15">
                    <div className="btn-fill"></div>
                    <span className="btn-text">
                      <span className="btn-text-inner change">
                        <svg
                          style={{ width: '20px' }}
                          width="20"
                          height="19"
                          viewBox="0 0 20 19"
                        >
                          <g fill="currentColor" fillRule="evenodd">
                            <path d="M0 6h20v1H0zM0 0h20v1H0zM0 12h20v1H0zM0 18h20v1H0z"></path>
                          </g>
                        </svg>
                      </span>
                    </span>
                  </div>
                </div>

                <div
                  className={`btn btn-normal btn-icon columns-btn ${viewMode === 'columns' ? 'active' : ''}`}
                  onClick={() => setViewMode('columns')}
                  title="Grid View"
                >
                  <div className="btn-click magnetic" data-strength="25" data-strength-text="15">
                    <div className="btn-fill"></div>
                    <span className="btn-text">
                      <span className="btn-text-inner change">
                        <svg
                          style={{ width: '20px' }}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                        >
                          <g fill="currentColor" fillRule="nonzero">
                            <path d="M8 0H0v8h8V0zM7 1v6H1V1h6zM8 12H0v8h8v-8zm-1 1v6H1v-6h6zM20 0h-8v8h8V0zm-1 1v6h-6V1h6zM20 12h-8v8h8v-8zm-1 1v6h-6v-6h6z"></path>
                          </g>
                        </svg>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects View: Rows (List) or Columns (Grid) */}
        <section className="section-wrap section-wrap-work once-in">
          {/* List Rows Part */}
          <section
            className={`section work-grid small-work-grid grid-fade grid-rows-part ${viewMode === 'rows' ? 'visible grid-fade-in' : ''}`}
            style={{ display: viewMode === 'rows' ? 'block' : 'none' }}
          >
            <div className="container">
              <ProjectList items={filteredProjects} />
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
        <section className="section center-grid-btn center-grid-btn-archive">
          <div className="container">
            <div className="grid-after-btn">
              <div className="btn btn-normal btn-dark">
                <a
                  href="https://github.com/vatsarun-dev?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-click magnetic"
                  data-strength="25"
                  data-strength-text="15"
                >
                  <div className="btn-fill"></div>
                  <span className="btn-text">
                    <span className="btn-text-inner change">
                      Archive
                      <div className="count-nr">10</div>
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
