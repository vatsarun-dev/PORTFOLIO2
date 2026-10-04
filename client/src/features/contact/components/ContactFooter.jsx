import React from 'react';

/**
 * ContactFooter component.
 * Displays edition credits, live IST timezone clock, and socials.
 */
export const ContactFooter = ({ socials = [] }) => {
  return (
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
                {socials.map((soc) => (
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
  );
};

export default ContactFooter;
