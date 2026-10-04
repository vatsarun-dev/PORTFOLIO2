import React from 'react';

/**
 * Archive CTA section linking to GitHub repositories.
 */
export const ProjectArchiveBtn = ({ count = 10, githubUrl = 'https://github.com/vatsarun-dev?tab=repositories' }) => {
  return (
    <section className="section center-grid-btn center-grid-btn-archive">
      <div className="container">
        <div className="grid-after-btn">
          <div className="btn btn-normal btn-dark">
            <a
              href={githubUrl}
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
                  <div className="count-nr">{count}</div>
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectArchiveBtn;
