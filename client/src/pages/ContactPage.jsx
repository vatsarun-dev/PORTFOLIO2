import React, { useState } from 'react';
import { personalInfo } from '../data/info.js';

export const ContactPage = () => {
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'submitting') return;

    const form = e.target;
    const formData = new FormData(form);

    if (formData.get('tel')) {
      // honeypot bot trap
      setStatus('success');
      setFeedback('Thank You');
      form.reset();
      return;
    }

    setStatus('submitting');
    setFeedback('');

    try {
      // Direct client email link trigger or Formspree integration
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus('success');
      setFeedback('Thank You! Message prepared. Feel free to connect directly on LinkedIn or GitHub as well.');
      form.reset();
      setTimeout(() => {
        setStatus('idle');
        setFeedback('');
      }, 6000);
    } catch (err) {
      console.error(err);
      setStatus('error');
      setFeedback('Failed to send message. Please connect directly via LinkedIn or GitHub.');
      setTimeout(() => setStatus('idle'), 7000);
    }
  };

  return (
    <div className="main-wrap" id="contact">
      <header className="section default-header contact-header theme-dark">
        <div className="container medium">
          <div className="row once-in">
            <div className="flex-col">
              <h1>
                <span>
                  <div className="profile-picture"></div> Let's start a{' '}
                </span>
                <span>project together</span>
              </h1>
            </div>
            <div className="flex-col">
              <div className="profile-picture"></div>
              <div className="arrow">
                <svg
                  width="14px"
                  height="14px"
                  viewBox="0 0 14 14"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>arrow-down-right</title>
                  <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g transform="translate(-1019.000000, -279.000000)" stroke="#FFFFFF" strokeWidth="1.5">
                      <g transform="translate(1026.000000, 286.000000) rotate(90.000000) translate(-1026.000000, -286.000000) translate(1020.000000, 280.000000)">
                        <polyline points="2.76923077 0 12 0 12 9.23076923"></polyline>
                        <line x1="12" y1="0" x2="0" y2="12"></line>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </div>

          <div className="row once-in">
            <div className="flex-col">
              <form className="form" id="contact-form" onSubmit={handleSubmit}>
                {/* Honeypot */}
                <div className="website-field" style={{ display: 'none' }}>
                  <label className="label" htmlFor="form-tel">
                    Phone Number
                  </label>
                  <input className="field" type="text" id="form-tel" name="tel" tabIndex={-1} />
                </div>

                <div className="form-col">
                  <h5>01</h5>
                  <label className="label" htmlFor="form-name">
                    What's your name?
                  </label>
                  <input
                    className="field"
                    type="text"
                    id="form-name"
                    name="name"
                    required
                    placeholder="John Doe *"
                  />
                </div>

                <div className="form-col">
                  <h5>02</h5>
                  <label className="label" htmlFor="form-email">
                    What's your email?
                  </label>
                  <input
                    className="field"
                    type="email"
                    id="form-email"
                    name="email"
                    required
                    placeholder="john@doe.com *"
                  />
                </div>

                <div className="form-col">
                  <h5>03</h5>
                  <label className="label" htmlFor="form-company">
                    What's the name of your organization?
                  </label>
                  <input
                    className="field"
                    type="text"
                    id="form-company"
                    name="company"
                    placeholder="Company &amp; Co. ®"
                  />
                </div>

                <div className="form-col">
                  <h5>04</h5>
                  <label className="label" htmlFor="form-service">
                    What services are you looking for?
                  </label>
                  <input
                    className="field"
                    type="text"
                    id="form-service"
                    name="service"
                    placeholder="Full Stack, Backend, AI Integration ..."
                  />
                </div>

                <div className="form-col">
                  <h5>05</h5>
                  <label className="label" htmlFor="form-message">
                    Your message
                  </label>
                  <textarea
                    className="field"
                    id="form-message"
                    name="message"
                    rows="8"
                    required
                    placeholder="Hello Arun, can you help me with ... *"
                  ></textarea>
                </div>

                <div className="btn-contact-send">
                  <div className="btn btn-round" data-scroll="true" data-scroll-speed="2">
                    <div
                      className="btn-click magnetic"
                      data-strength="100"
                      data-strength-text="50"
                    >
                      <div className="btn-fill"></div>
                      <span className="btn-text">
                        <span className="btn-text-inner">
                          {status === 'submitting'
                            ? 'Sending...'
                            : status === 'success'
                            ? 'Thank You'
                            : status === 'error'
                            ? 'Retry'
                            : 'Send it!'}
                        </span>
                      </span>
                      <input
                        type="submit"
                        name="submit"
                        value=""
                        className="form-btn"
                        disabled={status === 'submitting'}
                      />
                    </div>
                  </div>
                </div>

                {feedback && (
                  <div
                    className="contact-feedback"
                    style={{
                      marginTop: '1.75rem',
                      padding: '0.85rem 1.25rem',
                      borderRadius: '8px',
                      fontSize: '0.95rem',
                      lineHeight: '1.5',
                      backgroundColor:
                        status === 'error'
                          ? 'rgba(239, 68, 68, 0.12)'
                          : 'rgba(34, 197, 94, 0.12)',
                      border: `1px solid ${
                        status === 'error'
                          ? 'rgba(239, 68, 68, 0.3)'
                          : 'rgba(34, 197, 94, 0.3)'
                      }`,
                      color: status === 'error' ? '#fca5a5' : '#86efac',
                      transition: 'opacity 0.3s ease'
                    }}
                  >
                    {feedback}
                  </div>
                )}
              </form>
            </div>

            <div className="flex-col">
              <h5>Contact Details</h5>
              <ul className="links-wrap">
                <li className="btn btn-link btn-link-external">
                  <a
                    href="https://www.linkedin.com/in/arun-vats-a819bb281"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-click magnetic"
                    data-strength="20"
                    data-strength-text="10"
                  >
                    <span className="btn-text">
                      <span className="btn-text-inner">LinkedIn Profile</span>
                    </span>
                  </a>
                </li>
                <li className="btn btn-link btn-link-external">
                  <a
                    href="https://github.com/vatsarun-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-click magnetic"
                    data-strength="20"
                    data-strength-text="10"
                  >
                    <span className="btn-text">
                      <span className="btn-text-inner">github.com/vatsarun-dev</span>
                    </span>
                  </a>
                </li>
              </ul>

              <h5>Details</h5>
              <ul className="links-wrap">
                <li>
                  <p>{personalInfo.name}</p>
                </li>
                <li>
                  <p>Location: {personalInfo.location}</p>
                </li>
              </ul>

              <h5>Socials</h5>
              <ul className="links-wrap">
                {personalInfo.socials.map((soc) => (
                  <li key={soc.name} className="btn btn-link btn-link-external">
                    <a
                      href={soc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-click magnetic"
                      data-strength="20"
                      data-strength-text="10"
                    >
                      <span className="btn-text">
                        <span className="btn-text-inner">{soc.name}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* Contact Page Bottom Footer */}
      <footer className="section footer footer-contact theme-dark">
        <div className="container no-padding">
          <div className="row bottom-footer">
            <div className="flex-col">
              <div className="credits">
                <h5>Version</h5>
                <p>2026 © Edition</p>
              </div>
              <div className="time">
                <h5>Local time</h5>
                <p>
                  <span id="timeSpan">--:-- IST</span>
                </p>
              </div>
            </div>
            <div className="flex-col">
              <div className="socials">
                <h5>Socials</h5>
                <ul>
                  {personalInfo.socials.map((soc) => (
                    <li key={soc.name} className="btn btn-link btn-link-external">
                      <a
                        href={soc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-click magnetic"
                        data-strength="20"
                        data-strength-text="10"
                      >
                        <span className="btn-text">
                          <span className="btn-text-inner">{soc.name}</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
