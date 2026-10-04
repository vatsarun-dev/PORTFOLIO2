import React, { useState } from 'react';
import './showcaseCard.css';

export const ShowcaseCard = ({ project }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <article className={`showcase-card ${isOpen ? 'is-open' : ''}`}>
      {/* Visual Image Box with 16:10 landscape aspect ratio */}
      <div className="showcase-image-box" onClick={toggleOpen}>
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
        />
        <div className="showcase-image-gradient" />
        
        {/* Floating Top Badges */}
        <div className="showcase-image-badges">
          <span className="showcase-badge-pill">
            {project.categoryLabel || project.category?.[0] || 'Project'}
          </span>
          <span className="showcase-year-pill">{project.year || '2025'}</span>
        </div>
      </div>

      {/* Header Info Bar */}
      <div className="showcase-header-bar">
        <div className="showcase-title-wrap">
          <h3 className="showcase-project-name">{project.title}</h3>
          <span className="showcase-project-category">
            {project.sub || project.services}
          </span>
        </div>

        <button
          type="button"
          className="showcase-toggle-btn"
          onClick={toggleOpen}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Collapse project details' : 'Expand project details'}
        >
          <span>{isOpen ? 'Less' : 'Details'}</span>
          <svg
            className="showcase-chevron-icon"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6l4 4 4-4" />
          </svg>
        </button>
      </div>

      {/* Expandable Content Drawer */}
      <div className="showcase-expanded-drawer">
        <div className="showcase-drawer-inner">
          <div className="showcase-drawer-content">
            <p className="showcase-description">
              {project.description || project.sub || project.services}
            </p>

            {/* Tools / Tech Stack Tags */}
            {project.tools && project.tools.length > 0 && (
              <div className="showcase-tools-row">
                {project.tools.map((tool, idx) => (
                  <span key={idx} className="showcase-tool-tag">
                    {tool}
                  </span>
                ))}
              </div>
            )}

            {/* Direct Action Links */}
            <div className="showcase-actions-row">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="showcase-action-primary"
                >
                  <span>Live Demo</span>
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17l9.2-9.2M17 17V7H7" />
                  </svg>
                </a>
              )}

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="showcase-action-secondary"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>Code</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export const ShowcaseGrid = ({ items }) => {
  return (
    <div className="showcase-grid-wrap">
      {items.map((project) => (
        <ShowcaseCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ShowcaseCard;
