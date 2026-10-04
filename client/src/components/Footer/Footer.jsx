import React from 'react';
import { useNavigation } from '../../context/NavigationContext.jsx';
import { personalInfo } from '../../data/info.js';

export const Footer = () => {
  const { navigateTo } = useNavigation();

  return (
    <>
      <div className="footer-rounded-div">
        <div className="rounded-div-wrap">
          <div className="rounded-div"></div>
        </div>
      </div>

      <div className="footer-spacer"></div>

      <div className="footer-wrap footer-footer-wrap theme-dark" id="contact">
        <footer className="section footer">
          <div className="container medium">
            <div className="row">
              <div className="flex-col">
                <div className="arrow">
                  <svg width="14px" height="14px" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <title>arrow-up-right</title>
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
                <h2>
                  <span>
                    <div className="profile-picture"></div> Let's work{' '}
                  </span>
                  <span>together</span>
                </h2>
              </div>
            </div>

            <div className="row">
              <div className="flex-col">
                <div className="stripe"></div>
                <div className="btn-fixed">
                  <div className="btn btn-round">
                    <a
                      href="/contact"
                      onClick={(t) => {
                        t.preventDefault();
                        navigateTo('/contact', 'Contact');
                      }}
                      className="btn-click magnetic"
                      data-strength="100"
                      data-strength-text="50"
                    >
                      <div className="btn-fill"></div>
                      <span className="btn-text">
                        <span className="btn-text-inner">Get in touch</span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="flex-col">
                <div className="btn btn-normal">
                  <a
                    href="https://www.linkedin.com/in/arun-vats-a819bb281"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-click magnetic"
                    data-strength="25"
                    data-strength-text="15"
                  >
                    <div className="btn-fill"></div>
                    <span className="btn-text">
                      <span className="btn-text-inner change">LinkedIn / Arun Vats</span>
                    </span>
                  </a>
                </div>
                <div className="btn btn-normal">
                  <a
                    href="https://github.com/vatsarun-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-click magnetic"
                    data-strength="25"
                    data-strength-text="15"
                  >
                    <div className="btn-fill"></div>
                    <span className="btn-text">
                      <span className="btn-text-inner change">github.com/vatsarun-dev</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

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
        <div className="overlay overlay-gradient"></div>
      </div>
    </>
  );
};
