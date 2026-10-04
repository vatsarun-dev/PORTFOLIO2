import React, { createContext, useContext, useRef, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NavigationContext = createContext(null);

export const useNavigation = () => {
  return useContext(NavigationContext);
};

export const getSectionTitle = (path) => {
  const p = (path || '').toLowerCase();
  if (p.includes('project') || p.includes('work')) return 'Projects';
  if (p.includes('about')) return 'About';
  if (p.includes('contact')) return 'Contact';
  return 'Home';
};

export const NavigationProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isNavigating = useRef(false);
  const initialLoadDone = useRef(false);

  // 1. Exit wipe animation (overlay curved polygon slides UP off screen, revealing page)
  const playExitAnimation = useCallback(() => {
    return new Promise((resolve) => {
      const container = document.querySelector('.loading-container');
      const screen = document.querySelector('.loading-screen');
      if (!container || !screen) {
        document.body.classList.remove('loading');
        resolve();
        return;
      }

      const duration = 900;
      const h = screen.offsetHeight || window.innerHeight;
      const w = screen.offsetWidth || window.innerWidth;
      const k = Math.min(w * 0.35, h * 0.45);
      const steps = 32;
      let start = null;

      const heroScale = document.querySelector('.home-header .hero-scale');
      const bigName = document.querySelector('.home-header .big-name');
      if (heroScale) {
        heroScale.style.transition = 'none';
        heroScale.style.transformOrigin = '50% 100%';
      }

      const activeWord =
        container.querySelector('.loading-words h2.active') ||
        container.querySelector('.loading-words h2:not([style*="display: none"])');

      const step = (now) => {
        if (start === null) start = now;
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const sinWave = Math.sin(progress * Math.PI);
        const curveHeight = k * (0.35 + 0.65 * sinWave);
        const yBase = h + curveHeight - ease * (h + curveHeight * 2.8);

        const polygonPoints = [];
        for (let u = 0; u <= steps; u++) {
          const ratio = u / steps;
          const y = yBase + curveHeight * 4 * ratio * (1 - ratio);
          polygonPoints.push((ratio * 100).toFixed(2) + '% ' + y.toFixed(1) + 'px');
        }
        polygonPoints.push('100% 0%', '0% 0%');
        screen.style.clipPath = 'polygon(' + polygonPoints.join(', ') + ')';

        if (activeWord && progress > 0.08) {
          activeWord.style.opacity = Math.max(0, 1 - (progress - 0.08) * 3.5).toFixed(3);
        }

        if (heroScale) {
          const transY = (1 - ease) * 160;
          const scale = 0.88 + ease * 0.12;
          heroScale.style.transform = `translate3d(0, ${transY.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
        }

        if (bigName) {
          const transY = (1 - ease) * 90;
          bigName.style.transform = `translate3d(0, ${transY.toFixed(2)}px, 0)`;
        }

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          if (heroScale) {
            heroScale.style.transform = '';
            heroScale.style.transition = '';
          }
          if (bigName) {
            bigName.style.transform = '';
          }
          screen.style.clipPath = '';
          container.style.display = 'none';
          container.style.pointerEvents = 'none';
          container.style.zIndex = '';
          document.body.classList.remove('loading');
          document.documentElement.classList.remove('page-transitioning');
          if (activeWord) {
            activeWord.style.display = 'none';
            activeWord.classList.remove('active');
          }
          resolve();
        }
      };

      requestAnimationFrame(step);
    });
  }, []);

  // 2. Entrance wipe animation (overlay curved polygon slides UP from bottom, covering screen)
  const playEntranceAnimation = useCallback((targetWord) => {
    return new Promise((resolve) => {
      const container = document.querySelector('.loading-container');
      const screen = document.querySelector('.loading-screen');
      const wordsWrap = document.querySelector('.loading-words');
      if (!container || !screen) {
        resolve();
        return;
      }

      container.style.display = 'block';
      container.style.pointerEvents = 'all';
      container.style.zIndex = '10000';
      document.body.classList.add('loading');

      const allWords = container.querySelectorAll('.loading-words h2');
      let targetHeading = null;
      allWords.forEach((word) => {
        word.style.display = 'none';
        word.classList.remove('active');
        word.style.opacity = '0';
        if (
          !word.classList.contains('home-active') &&
          word.textContent.trim().toLowerCase() === (targetWord || '').toLowerCase()
        ) {
          targetHeading = word;
        }
      });

      if (!targetHeading) {
        targetHeading =
          container.querySelector('.loading-words h2:not(.home-active)') || allWords[0];
        if (targetHeading) {
          targetHeading.innerHTML = (targetWord || '') + '<div class="dot"></div>';
        }
      }

      if (targetHeading) {
        targetHeading.style.display = 'block';
        targetHeading.classList.add('active');
        targetHeading.style.opacity = '0';
      }

      if (wordsWrap) wordsWrap.style.opacity = '1';

      const duration = 650;
      const h = screen.offsetHeight || window.innerHeight;
      const w = screen.offsetWidth || window.innerWidth;
      const k = Math.min(w * 0.35, h * 0.45);
      const steps = 32;
      let start = null;

      const step = (now) => {
        if (start === null) start = now;
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const sinWave = Math.sin(progress * Math.PI);
        const curveHeight = k * (0.35 + 0.65 * sinWave);
        const yBase = h + curveHeight - ease * (h + curveHeight * 2.8);

        const polygonPoints = [];
        for (let u = 0; u <= steps; u++) {
          const ratio = u / steps;
          const y = yBase - curveHeight * 4 * ratio * (1 - ratio);
          polygonPoints.push((ratio * 100).toFixed(2) + '% ' + y.toFixed(1) + 'px');
        }
        polygonPoints.push('100% 100%', '0% 100%');
        screen.style.clipPath = 'polygon(' + polygonPoints.join(', ') + ')';

        if (targetHeading) {
          if (progress < 0.22) {
            targetHeading.style.opacity = '0';
          } else if (progress < 0.65) {
            const opacity = (progress - 0.22) / 0.43;
            targetHeading.style.opacity = opacity.toFixed(3);
          } else {
            targetHeading.style.opacity = '1';
          }
        }

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          screen.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
          if (targetHeading) targetHeading.style.opacity = '1';
          resolve();
        }
      };

      requestAnimationFrame(step);
    });
  }, []);

  // 3. Subpage quick transition
  const playSubpageAnimation = useCallback(
    (targetWord) => {
      const container = document.querySelector('.loading-container');
      const screen = document.querySelector('.loading-screen');
      const wordsWrap = document.querySelector('.loading-words');
      if (!container || !screen) return Promise.resolve();

      container.style.display = 'block';
      container.style.pointerEvents = 'all';
      container.style.zIndex = '10000';
      screen.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
      document.body.classList.add('loading');

      const allWords = container.querySelectorAll('.loading-words h2');
      allWords.forEach((w) => {
        w.style.display = 'none';
        w.style.opacity = '0';
        w.classList.remove('active');
      });

      let targetHeading = null;
      for (let i = 0; i < allWords.length; i++) {
        if (allWords[i].textContent.trim().toLowerCase() === (targetWord || '').toLowerCase()) {
          targetHeading = allWords[i];
          break;
        }
      }

      if (!targetHeading && allWords.length > 0) {
        targetHeading = allWords[0];
        targetHeading.innerHTML = (targetWord || '') + '<div class="dot"></div>';
      }

      if (targetHeading) {
        targetHeading.style.display = 'block';
        targetHeading.classList.add('active');
        targetHeading.style.opacity = '1';
      }

      if (wordsWrap) wordsWrap.style.opacity = '1';

      return new Promise((resolve) => setTimeout(resolve, 260))
        .then(() => playExitAnimation())
        .then(() => {
          container.style.display = 'none';
          container.style.pointerEvents = 'none';
          document.body.classList.remove('loading');
          document.documentElement.classList.remove('page-transitioning');
        });
    },
    [playExitAnimation]
  );

  // 4. Initial Welcome Greeting Sequence
  const runWelcomeSequence = useCallback(() => {
    const container = document.querySelector('.loading-container');
    const screen = document.querySelector('.loading-screen');
    const wordsWrap = document.querySelector('.loading-words');
    if (!container || !screen) return Promise.resolve();

    container.style.display = 'block';
    container.style.pointerEvents = 'all';
    container.style.zIndex = '10000';
    screen.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
    document.body.classList.add('loading');

    container.querySelectorAll('.loading-words h2').forEach((h) => {
      h.style.display = 'none';
      h.style.opacity = '0';
      h.classList.remove('active');
    });

    if (wordsWrap) wordsWrap.style.opacity = '1';

    const greetings = Array.from(container.querySelectorAll('.loading-words h2.home-active'));
    let sequence = Promise.resolve();

    greetings.forEach((h, index) => {
      const isLast = index === greetings.length - 1;
      sequence = sequence.then(() => {
        h.style.display = 'block';
        h.style.transition = 'opacity 0.11s ease';
        h.style.opacity = '1';
        h.classList.add('active');

        if (isLast) {
          return new Promise((res) => setTimeout(res, 300));
        } else {
          return new Promise((res) => setTimeout(res, 120))
            .then(() => {
              h.style.opacity = '0';
              return new Promise((res) => setTimeout(res, 45));
            })
            .then(() => {
              h.style.display = 'none';
              h.classList.remove('active');
            });
        }
      });
    });

    return sequence
      .then(() => {
        document.body.classList.add('hero-reveal');
        return playExitAnimation();
      })
      .then(() => {
        container.style.display = 'none';
        container.style.pointerEvents = 'none';
        document.body.classList.remove('loading');
        document.documentElement.classList.remove('page-transitioning');
      });
  }, [playExitAnimation]);

  // Handle first load sequence
  useEffect(() => {
    if (initialLoadDone.current) return;
    initialLoadDone.current = true;

    if (location.pathname === '/' || location.pathname === '/index.html') {
      runWelcomeSequence();
    } else {
      const title = getSectionTitle(location.pathname);
      playSubpageAnimation(title);
    }
  }, [location.pathname, runWelcomeSequence, playSubpageAnimation]);

  // Handle browser popstate (back/forward)
  useEffect(() => {
    const handlePopState = () => {
      const title = getSectionTitle(window.location.pathname);
      playSubpageAnimation(title === 'Home' ? 'Home' : title);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [playSubpageAnimation]);

  // Programmatic navigate with page transition
  const navigateTo = useCallback(
    (targetPath, explicitTitle) => {
      if (location.pathname === targetPath || isNavigating.current) return;
      isNavigating.current = true;

      const title = explicitTitle || getSectionTitle(targetPath);
      document.body.classList.remove('nav-active');
      const hamburger = document.querySelector('.btn-hamburger');
      if (hamburger) hamburger.classList.remove('active');

      playEntranceAnimation(title).then(() => {
        navigate(targetPath);
        window.scrollTo(0, 0);
        setTimeout(() => {
          playExitAnimation().then(() => {
            isNavigating.current = false;
          });
        }, 80);
      });
    },
    [location.pathname, navigate, playEntranceAnimation, playExitAnimation]
  );

  return (
    <NavigationContext.Provider
      value={{
        navigateTo,
        playSubpageAnimation,
        runWelcomeSequence,
        playExitAnimation
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
