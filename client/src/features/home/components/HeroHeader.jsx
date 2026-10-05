import React, { useRef, useEffect } from 'react';

/**
 * HeroHeader component for HomePage.
 * Includes the personal cutout image, interactive globe hanger, title, and marquee.
 * The big name marquee runs continuously on both mobile and desktop with scroll velocity boost.
 */
export const HeroHeader = ({ heroRef }) => {
  const nameH1Ref = useRef(null);

  useEffect(() => {
    const el = nameH1Ref.current;
    if (!el) return;

    let xOffset = 0;
    let direction = -1; // -1 = flows right-to-left
    let velocityBoost = 0;
    let lastScrollY = window.scrollY;
    let lastTime = performance.now();
    let rafId = null;
    let singleWidth = 0;

    const measure = () => {
      if (!el) return;
      const firstChild = el.querySelector('.name-wrap');
      if (firstChild && firstChild.offsetWidth > 0) {
        singleWidth = firstChild.offsetWidth;
      } else if (el.scrollWidth > 0) {
        singleWidth = el.scrollWidth / 4;
      }
    };

    measure();

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measure).catch(() => {});
    }

    const t1 = setTimeout(measure, 100);
    const t2 = setTimeout(measure, 400);

    const onResize = () => {
      measure();
    };
    window.addEventListener('resize', onResize);

    const onScroll = () => {
      const curScroll = window.scrollY;
      const delta = Math.abs(curScroll - lastScrollY);
      if (curScroll > lastScrollY + 1) {
        direction = -1;
      } else if (curScroll < lastScrollY - 1) {
        direction = 1;
      }
      if (delta > 0) {
        velocityBoost = Math.min(8, velocityBoost + delta * 0.4);
      }
      lastScrollY = curScroll;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const animate = (now) => {
      const deltaMs = Math.min(now - lastTime, 64);
      lastTime = now;

      if (singleWidth <= 0) {
        measure();
      }

      const isMobile = window.innerWidth <= 768;
      // Steady continuous speed: mobile ~0.08 px/ms (~80px/s), desktop ~0.095 px/ms (~95px/s)
      const baseSpeed = isMobile ? 0.08 : 0.095;
      const moveSpeed = baseSpeed * (1 + velocityBoost);

      xOffset += direction * moveSpeed * deltaMs;
      velocityBoost *= Math.pow(0.96, deltaMs / 16);
      if (velocityBoost < 0.005) velocityBoost = 0;

      if (singleWidth > 0) {
        while (xOffset <= -singleWidth) {
          xOffset += singleWidth;
        }
        while (xOffset > 0) {
          xOffset -= singleWidth;
        }
      }

      el.style.transform = `translate3d(${xOffset.toFixed(2)}px, 0, 0)`;
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <header className="section home-header theme-dark" ref={heroRef}>
      <div className="hero-scale">
        {/* Center personal portrait image */}
        <div className="personal-image-wrap">
          <div
            className="overlay overlay-image"
            style={{
              backgroundImage: "url('/assets/arun-vats-cutout.png')",
            }}
          />
        </div>

        {/* Left Hanger: Location & Digital Ball Globe */}
        <div className="overlay get-height">
          <div className="hanger">
            <p>
              <span>Located </span>
              <span>in </span>
              <span>India</span>
            </p>
            <svg
              width="300px"
              height="121px"
              viewBox="0 0 300 121"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Combined Shape</title>
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(0.000000, -366.000000)" fill="#1C1D20">
                  <g transform="translate(149.816828, 426.633657) rotate(90.000000) translate(-149.816828, -426.633657) translate(89.816828, 276.816828)">
                    <g transform="translate(60.000000, 149.816828) rotate(-90.000000) translate(-60.000000, -149.816828) translate(-89.816828, 89.816828)">
                      <path d="M239.633657,0 C272.770742,1.0182436e-15 299.633657,26.862915 299.633657,60 C299.633657,93.137085 272.770742,120 239.633657,120 L0,120 L0,0 L239.633657,0 Z M239.633657,18.7755102 C216.866,18.7755102 198.409167,37.232343 198.409167,60 C198.409167,82.767657 216.866,101.22449 239.633657,101.22449 C262.401314,101.22449 280.858147,82.767657 280.858147,60 C280.858147,37.232343 262.401314,18.7755102 239.633657,18.7755102 Z"></path>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
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

        {/* Subtitle / Arrow top right */}
        <div className="container">
          <div className="row">
            <div className="flex-col">
              <div className="header-above-h4 reveal">
                <div className="arrow big">
                  <svg
                    width="14px"
                    height="14px"
                    viewBox="0 0 14 14"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>arrow-up-right</title>
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
              <h4 className="reveal">
                <span>Full Stack Developer</span> &amp; Software Engineer
              </h4>
            </div>
          </div>
        </div>

        {/* Huge Big Name Marquee - 4 repeating items for seamless infinite gliding */}
        <div className="big-name" aria-hidden="true">
          <div className="name-h1" ref={nameH1Ref}>
            <div className="name-wrap">
              <h1 className="no-select">
                Arun Vats<span className="spacer">—</span>
              </h1>
            </div>
            <div className="name-wrap">
              <h1 className="no-select">
                Arun Vats<span className="spacer">—</span>
              </h1>
            </div>
            <div className="name-wrap">
              <h1 className="no-select">
                Arun Vats<span className="spacer">—</span>
              </h1>
            </div>
            <div className="name-wrap">
              <h1 className="no-select">
                Arun Vats<span className="spacer">—</span>
              </h1>
            </div>
          </div>
        </div>

        <div className="white-block"></div>
      </div>
    </header>
  );
};

export default HeroHeader;
