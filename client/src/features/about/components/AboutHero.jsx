import React from 'react';

/**
 * AboutHero component.
 * Displays header title and interactive line globe.
 */
export const AboutHero = () => {
  return (
    <>
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
    </>
  );
};

export default AboutHero;
