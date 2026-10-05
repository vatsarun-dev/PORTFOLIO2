import React from 'react';

/**
 * AboutBio component.
 * Displays biography statement and status indicator.
 */
export const AboutBio = ({ bio }) => {
  return (
    <section className="section about-image once-in">
      <div className="container medium">
        <div className="row">
          <div className="flex-col about-bio-col">
            <div className="arrow">
              <svg width="14px" height="14px" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <title>arrow-up-right</title>
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g transform="translate(-1019.000000, -279.000000)" stroke="currentColor" strokeWidth="1.5">
                    <g transform="translate(1026.000000, 286.000000) rotate(90.000000) translate(-1026.000000, -286.000000) translate(1020.000000, 280.000000)">
                      <polyline points="2.76923077 0 12 0 12 9.23076923"></polyline>
                      <line x1="12" y1="0" x2="0" y2="12"></line>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <p>{bio.intro}</p>
            <p style={{ marginTop: '1.25em' }}>{bio.description}</p>
            <p>
              <span style={{ opacity: 0.5, display: 'block', paddingTop: '0.85em' }}>
                Always exploring
                <span className="animate-dot">.</span>
                <span className="animate-dot">.</span>
                <span className="animate-dot">.</span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBio;
