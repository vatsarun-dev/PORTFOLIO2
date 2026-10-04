import React from 'react';

/**
 * ContactHeader component.
 * Displays page heading and decorative arrow.
 */
export const ContactHeader = () => {
  return (
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
              <g
                transform="translate(-1019.000000, -279.000000)"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              >
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
  );
};

export default ContactHeader;
