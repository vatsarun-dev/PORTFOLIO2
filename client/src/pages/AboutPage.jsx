import React from 'react';
import { personalInfo } from '../data/info.js';

export const AboutPage = () => {
  return (
    <div className="main-wrap" id="about">
      {/* Header */}
      <header className="section default-header about-header">
        <div className="container medium">
          <div className="row">
            <div className="flex-col once-in">
              <h1>
                <span>Engineering modern software</span>
                <span>thriving in the AI era</span>
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Line Globe */}
      <section className="section no-padding line-globe once-in">
        <div className="container medium">
          <div className="row">
            <div className="flex-col">
              <div className="stripe"></div>
              <div className="digital-ball">
                <div className="overlay"></div>
                <div className="globe">
                  <div className="globe-wrap">
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle-hor"></div>
                    <div className="circle-hor-middle"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Positioning & Abstract Graphic */}
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
              <p>
                {personalInfo.about.intro}
              </p>
              <p style={{ marginTop: '1.25em' }}>
                {personalInfo.about.description}
              </p>
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

      {/* Services / What I can help you with */}
      <section className="section about-services">
        <div className="container">
          <div className="row">
            <div className="flex-col">
              <h2>
                I can help you with{' '}
                <span className="animate-dot">.</span>
                <span className="animate-dot">.</span>
                <span className="animate-dot">.</span>
              </h2>
            </div>
          </div>
          <div className="row">
            {personalInfo.services.map((srv) => (
              <div key={srv.num} className="flex-col">
                <h5>{srv.num}</h5>
                <div className="stripe"></div>
                <h4>{srv.title}</h4>
                <p>{srv.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education, Achievements & Certifications */}
      <section className="section about-awwwards">
        <div className="container medium">
          <div className="row">
            {/* Visual credential badge */}
            <div className="flex-col">
              <div className="single-image" style={{ minHeight: '380px', position: 'relative' }}>
                <div className="about-abstract-graphic">
                  <div className="graphic-corner-tag">
                    CREDENTIALS // ACADEMIC &amp; TECH
                  </div>
                  <div className="graphic-center-visual">
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '3rem', fontWeight: 700, letterSpacing: '-0.05em', color: '#FFFFFF' }}>
                        8.34
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#455CE9', letterSpacing: '0.1em', marginTop: '0.25rem' }}>
                        CGPA / 10.0 (AKTU)
                      </div>
                    </div>
                  </div>
                  <div className="graphic-footer-info">
                    <div>
                      <h4>B.Tech in CSE</h4>
                      <p>Bharat Institute of Technology</p>
                    </div>
                    <div>
                      <p>2023 — 2027</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-col">
              <div className="awwwards-badge"></div>
              <h2>
                Education &amp;<br />Achievements
              </h2>
              <p>
                Computer Science student building modern web applications, scalable backends, AI-powered products, and developer tools.
              </p>

              <div className="about-credentials">
                <div className="credential-item">
                  <h5>Education</h5>
                  <h4>{personalInfo.education.degree}</h4>
                  <p>
                    {personalInfo.education.institution} ({personalInfo.education.university}) · {personalInfo.education.period} · CGPA {personalInfo.education.cgpa}
                  </p>
                </div>

                <div className="credential-item">
                  <h5>Achievements &amp; Competitions</h5>
                  {personalInfo.achievements.map((ach) => (
                    <div key={ach.title} style={{ marginBottom: '0.75rem' }}>
                      <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{ach.title}</h4>
                      <p style={{ fontSize: '0.9rem' }}>{ach.detail}</p>
                    </div>
                  ))}
                </div>

                <div className="credential-item">
                  <h5>Certifications</h5>
                  <div className="credential-tags">
                    {personalInfo.certifications.map((cert) => (
                      <span key={cert}>{cert}</span>
                    ))}
                  </div>
                </div>

                <div className="credential-item">
                  <h5>Core Competencies</h5>
                  <div className="credential-tags">
                    {[
                      ...personalInfo.skills.frontend,
                      ...personalInfo.skills.backend,
                      ...personalInfo.skills.ai
                    ]
                      .filter((val, idx, arr) => arr.indexOf(val) === idx)
                      .slice(0, 16)
                      .map((skill) => (
                        <span key={skill}>{skill}</span>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
