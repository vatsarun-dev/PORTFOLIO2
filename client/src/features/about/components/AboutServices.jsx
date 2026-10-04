import React from 'react';

/**
 * AboutServices component.
 * Displays service offerings (Full Stack, Backend & Systems, Generative AI).
 */
export const AboutServices = ({ services = [] }) => {
  return (
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
          {services.map((srv) => (
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
  );
};

export default AboutServices;
