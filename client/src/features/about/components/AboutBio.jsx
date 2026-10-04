import React from 'react';

/**
 * AboutBio component.
 * Displays biography statement, status indicator, and modern architectural profile vector graphic.
 */
export const AboutBio = ({ bio }) => {
  return (
    <section className="section about-image once-in">
      <div className="container">
        <div className="row">
          <div className="flex-col">
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

          {/* Abstract visual element replacing personal photo */}
          <div className="flex-col">
            <div className="single-about-image" style={{ minHeight: '440px', position: 'relative' }}>
              <div className="about-abstract-graphic">
                <div className="graphic-corner-tag">
                  ARCHITECTURAL PROFILE // 2026
                </div>
                <div className="graphic-center-visual">
                  <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="60,10 105,35 105,85 60,110 15,85 15,35" fill="none" stroke="#455CE9" strokeWidth="1.5" />
                    <polygon points="60,25 90,42 90,78 60,95 30,78 30,42" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.4" />
                    <circle cx="60" cy="60" r="14" fill="#455CE9" fillOpacity="0.3" stroke="#455CE9" strokeWidth="1.5" />
                    <line x1="60" y1="10" x2="60" y2="110" stroke="#455CE9" strokeWidth="0.8" strokeOpacity="0.3" strokeDasharray="3 3" />
                    <line x1="15" y1="35" x2="105" y2="85" stroke="#455CE9" strokeWidth="0.8" strokeOpacity="0.3" strokeDasharray="3 3" />
                  </svg>
                </div>
                <div className="graphic-footer-info">
                  <div>
                    <h4>Arun Vats</h4>
                    <p>Full Stack &amp; AI Systems</p>
                  </div>
                  <div>
                    <p style={{ color: '#455CE9', fontWeight: 600 }}>BIT MEERUT</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBio;
