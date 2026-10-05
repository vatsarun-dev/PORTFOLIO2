import React from 'react';

/**
 * AboutCredentials component.
 * Displays education credentials, academic CGPA badge, achievements, competitions, and skills tags.
 */
export const AboutCredentials = ({
  education,
  achievements = [],
  certifications = [],
  coreSkills = [],
}) => {
  return (
    <section className="section about-awwwards">
      <div className="container medium">
        <div className="row">
          <div className="flex-col about-credentials-col">
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
                <h4>{education?.degree}</h4>
                <p>
                  {education?.institution} ({education?.university}) · {education?.period} · CGPA {education?.cgpa}
                </p>
              </div>

              <div className="credential-item">
                <h5>Achievements &amp; Competitions</h5>
                {achievements.map((ach) => (
                  <div key={ach.title} style={{ marginBottom: '0.75rem' }}>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{ach.title}</h4>
                    <p style={{ fontSize: '0.9rem' }}>{ach.detail}</p>
                  </div>
                ))}
              </div>

              <div className="credential-item">
                <h5>Certifications</h5>
                <div className="credential-tags">
                  {certifications.map((cert) => (
                    <span key={cert}>{cert}</span>
                  ))}
                </div>
              </div>

              <div className="credential-item">
                <h5>Core Competencies</h5>
                <div className="credential-tags">
                  {coreSkills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCredentials;
