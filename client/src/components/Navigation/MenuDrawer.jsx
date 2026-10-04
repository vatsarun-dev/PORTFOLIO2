import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigation } from '../../context/NavigationContext.jsx';
import { personalInfo } from '../../data/info.js';

export const MenuDrawer = ({ onClose }) => {
  const location = useLocation();
  const { navigateTo } = useNavigation();

  const handleNav = (targetPath, title) => {
    onClose();
    navigateTo(targetPath, title);
  };

  const path = location.pathname.toLowerCase();
  const isHome = path === '/' || path === '/index.html';
  const isWork = path.includes('work');
  const isAbout = path.includes('about');
  const isContact = path.includes('contact');

  return (
    <>
      <div className="overlay fixed-nav-back" onClick={onClose}></div>
      <div className="fixed-nav theme-dark">
        <div className="fixed-nav-rounded-div">
          <div className="rounded-div-wrap">
            <div className="rounded-div"></div>
          </div>
        </div>
        <div className="fixed-nav-inner">
          <div className="row nav-row">
            <h5>Navigation</h5>
            <div className="stripe"></div>
            <ul className="links-wrap">
              <li className={`btn btn-link ${isHome ? 'active' : ''}`}>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('/', 'Home');
                  }}
                  className="btn-click magnetic"
                >
                  <span className="btn-text">
                    <span className="btn-text-inner">Home</span>
                  </span>
                </a>
              </li>
              <li className={`btn btn-link ${isWork ? 'active' : ''}`}>
                <a
                  href="/work"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('/work', 'Work');
                  }}
                  className="btn-click magnetic"
                >
                  <span className="btn-text">
                    <span className="btn-text-inner">Work</span>
                  </span>
                </a>
              </li>
              <li className={`btn btn-link ${isAbout ? 'active' : ''}`}>
                <a
                  href="/about"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('/about', 'About');
                  }}
                  className="btn-click magnetic"
                >
                  <span className="btn-text">
                    <span className="btn-text-inner">About</span>
                  </span>
                </a>
              </li>
              <li className={`btn btn-link ${isContact ? 'active' : ''}`}>
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('/contact', 'Contact');
                  }}
                  className="btn-click magnetic"
                >
                  <span className="btn-text">
                    <span className="btn-text-inner">Contact</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>

          <div className="row social-row">
            <div className="stripe"></div>
            <div className="socials">
              <h5>Socials</h5>
              <ul className="links-wrap">
                {personalInfo.socials.map((soc) => (
                  <li key={soc.name} className="btn btn-link btn-link-external">
                    <a
                      href={soc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-click magnetic"
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
    </>
  );
};
