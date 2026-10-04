import React from 'react';

/**
 * ContactDetails component.
 * Displays direct communication channels, location info, and social links.
 */
export const ContactDetails = ({ authorInfo }) => {
  return (
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
          <p>{authorInfo?.name || 'Arun Vats'}</p>
        </li>
        <li>
          <p>Location: {authorInfo?.location || 'Meerut, India'}</p>
        </li>
      </ul>

      <h5>Socials</h5>
      <ul className="links-wrap">
        {authorInfo?.socials?.map((soc) => (
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
  );
};

export default ContactDetails;
