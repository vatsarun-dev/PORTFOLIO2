import React from 'react';

/**
 * Filter buttons (All, Design, Development) and view mode switchers (Rows / Columns).
 */
export const ProjectFilters = ({
  filter,
  viewMode,
  counts,
  onFilterChange,
  onViewModeChange,
}) => {
  return (
    <section className="section work-filters">
      <div className="container once-in">
        <div className="filter-row">
          <div className="toggle-row">
            <div
              className={`btn btn-normal all-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => onFilterChange('all')}
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
              onClick={() => onFilterChange('design')}
            >
              <div className="btn-click magnetic" data-strength="25" data-strength-text="15">
                <div className="btn-fill"></div>
                <span className="btn-text">
                  <span className="btn-text-inner change">
                    Design
                    <div className="count-nr">{counts.design}</div>
                  </span>
                </span>
              </div>
            </div>

            <div
              className={`btn btn-normal development-btn ${filter === 'development' ? 'active' : ''}`}
              onClick={() => onFilterChange('development')}
            >
              <div className="btn-click magnetic" data-strength="25" data-strength-text="15">
                <div className="btn-fill"></div>
                <span className="btn-text">
                  <span className="btn-text-inner change">
                    Development
                    <div className="count-nr">{counts.development}</div>
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="grid-row">
            <div
              className={`btn btn-normal btn-icon rows-btn ${viewMode === 'rows' ? 'active' : ''}`}
              onClick={() => onViewModeChange('rows')}
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
              onClick={() => onViewModeChange('columns')}
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
  );
};

export default ProjectFilters;
