import React, { useState } from 'react';
import { projects } from '../data/projects.js';

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
      {/* Floating project hover preview elements */}
      <div className="mouse-pos-list-image no-select">
        <div className="mouse-pos-list-image-bounce overlay">
          <div className="float-image-wrap">
            {projects.map((item, index) => (
              <li
                key={item.id}
                className="mouse-pos-list-image-inner"
                data-project={item.id}
                data-index={index}
              >
                <div
                  className="overlay overlay-image"
                  style={{
                    backgroundImage: `url(${item.svg})`,
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundColor: item.bgColor
                  }}
                ></div>
              </li>
            ))}
          </div>
        </div>
      </div>
      <div className="mouse-pos-list-btn no-select"></div>
      <div className="mouse-pos-list-span no-select">
        <p>View</p>
      </div>

      <div className="main-wrap" id="work">
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
              <div className="grid-sub-title">
                <div className="flex-col">
                  <h5>Project</h5>
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
              <ul className="work-items mouse-pos-list-image-wrap all-active">
                {filteredProjects.map((item, index) => (
                  <li
                    key={item.id}
                    className={`visible hover-row ${item.category.join(' ')}`}
                    data-project={item.id}
                    data-index={index}
                  >
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      <div className="stripe animate"></div>
                      <div className="row">
                        <div className="flex-col">
                          <h4>
                            <span>{item.title}</span>
                          </h4>
                        </div>
                        <div className="flex-col">
                          <p>{item.location}</p>
                        </div>
                        <div className="flex-col">
                          <p>{item.services}</p>
                        </div>
                        <div className="flex-col">
                          <p>{item.year}</p>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
                <div className="stripe last animate"></div>
              </ul>
            </div>
          </section>

          {/* Grid Columns Part */}
          <section
            className={`section work-tiles grid-fade grid-columns-part ${viewMode === 'columns' ? 'visible grid-fade-in' : ''}`}
            style={{ display: viewMode === 'columns' ? 'block' : 'none' }}
          >
            <div className="container">
              <ul>
                {filteredProjects.map((item, index) => (
                  <li
                    key={item.id}
                    className={`${item.category.join(' ')} visible`}
                    data-project={item.id}
                    data-index={index}
                  >
                    <div className="single-tile-wrap">
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="row">
                        <div className="flex-col">
                          <div className="tile-image">
                            <div
                              className="overlay overlay-image"
                              style={{
                                backgroundImage: `url(${item.svg})`,
                                backgroundColor: item.bgColor,
                                backgroundPosition: 'center center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover'
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex-col">
                          <h4>
                            <span>{item.title}</span>
                          </h4>
                          <div className="stripe"></div>
                        </div>
                        <div className="flex-col">
                          <p>{item.sub}</p>
                        </div>
                        <div className="flex-col">
                          <p>{item.tags}</p>
                        </div>
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
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
