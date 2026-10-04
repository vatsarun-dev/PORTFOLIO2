import React from 'react';
import { useNavigation } from '../../../shared/context/NavigationContext';

/**
 * HomeIntro component for HomePage.
 * Displays brief personal statement and animated magnetic "About Me" CTA button.
 */
export const HomeIntro = () => {
  const { navigateTo } = useNavigation();

  return (
    <section className="section home-intro" id="about">
      <div className="container medium">
        <div className="row">
          <div className="flex-col">
            <h4 className="span-lines animate">
              <span className="span-line">
                <span className="span-line-inner">Building modern web</span>
              </span>
              <span className="span-line">
                <span className="span-line-inner">applications &amp; practical AI.</span>
              </span>
            </h4>
          </div>
          <div className="flex-col">
            <div className="text-wrap reveal">
              <p>
                I’m Arun Vats, a Computer Science Engineering student and developer focused on building modern, high-performance web applications and practical AI-powered products. My main interests are Full Stack Development, Backend Engineering, Generative AI, and Data Structures &amp; Algorithms.
              </p>
            </div>
            <div className="btn-wrap-intro">
              <div className="btn btn-round reveal">
                <a
                  href="/about"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('/about', 'About');
                  }}
                  className="btn-click magnetic"
                >
                  <div className="btn-fill"></div>
                  <span className="btn-text">
                    <span className="btn-text-inner">About Me</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeIntro;
