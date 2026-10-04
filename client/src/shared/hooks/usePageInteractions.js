import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function usePageInteractions() {
  const location = useLocation();

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanups = [];

    window.scrollTo(0, 0);

    // 1. Scrolled class on <main>
    const mainEl = document.querySelector('main');
    const handleScrollMain = () => {
      if (mainEl) {
        mainEl.classList.toggle('scrolled', window.scrollY > 60);
      }
    };
    window.addEventListener('scroll', handleScrollMain, { passive: true });
    handleScrollMain();
    cleanups.push(() => window.removeEventListener('scroll', handleScrollMain));

    // 2. Reveal and Span-lines IntersectionObserver
    const revealElements = document.querySelectorAll('.reveal, .span-lines, .once-in');
    document.querySelectorAll('.span-lines').forEach((spanBlock) => {
      spanBlock.querySelectorAll('.span-line-inner').forEach((lineInner, idx) => {
        lineInner.style.transitionDelay = `${idx * 0.12}s`;
      });
    });

    let observer = null;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const target = entry.target;
            if (entry.isIntersecting) {
              target.classList.add('in-view');
              if (!target.classList.contains('span-lines')) {
                observer.unobserve(target);
              }
            } else if (
              target.classList.contains('span-lines') &&
              entry.boundingClientRect.top > 0
            ) {
              target.classList.remove('in-view');
            }
          });
        },
        { threshold: [0, 0.1], rootMargin: '0px 0px -5% 0px' }
      );
      revealElements.forEach((el) => observer.observe(el));
    } else {
      revealElements.forEach((el) => el.classList.add('in-view'));
    }

    setTimeout(() => {
      revealElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
          el.classList.add('in-view');
        }
      });
    }, 150);

    // 3. Indian Standard Time (IST) Clock
    const timeSpan = document.getElementById('timeSpan');
    let clockInterval = null;
    if (timeSpan) {
      const updateClock = () => {
        try {
          const timeStr = new Intl.DateTimeFormat('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone: 'Asia/Kolkata'
          })
            .format(new Date())
            .toLowerCase();
          timeSpan.textContent = `${timeStr} IST`;
        } catch {
          timeSpan.textContent = `${new Date().toLocaleTimeString()} IST`;
        }
      };
      updateClock();
      clockInterval = setInterval(updateClock, 15000);
      cleanups.push(() => clockInterval && clearInterval(clockInterval));
    }

    // 4. Magnetic Buttons Physics
    if (!prefersReduced) {
      const magneticButtons = document.querySelectorAll('.btn-click.magnetic, .btn-click');
      magneticButtons.forEach((btn) => {
        const textSpan = btn.querySelector('.btn-text');
        let animFrame = null;
        let currX = 0,
          currY = 0,
          targetX = 0,
          targetY = 0;
        let textX = 0,
          textY = 0,
          textTargetX = 0,
          textTargetY = 0;
        let currRot = 0,
          targetRot = 0;
        let currScale = 1,
          targetScale = 1;
        let isHovered = false;

        const strength = parseFloat(btn.getAttribute('data-strength')) || 40;
        const strengthText = parseFloat(btn.getAttribute('data-strength-text')) || 20;

        const updateMagnetic = () => {
          currX += (targetX - currX) * 0.22;
          currY += (targetY - currY) * 0.22;
          currRot += (targetRot - currRot) * 0.18;
          currScale += (targetScale - currScale) * 0.18;

          if (textSpan) {
            textX += (textTargetX - textX) * 0.24;
            textY += (textTargetY - textY) * 0.24;
            textSpan.style.transform = `translate3d(${textX.toFixed(2)}px, ${textY.toFixed(2)}px, 0)`;
          }

          btn.style.transform = `translate3d(${currX.toFixed(2)}px, ${currY.toFixed(2)}px, 0) rotate(${currRot.toFixed(3)}deg) scale(${currScale.toFixed(4)})`;

          if (
            isHovered ||
            Math.abs(targetX - currX) > 0.1 ||
            Math.abs(targetY - currY) > 0.1 ||
            Math.abs(targetRot - currRot) > 0.05 ||
            Math.abs(targetScale - currScale) > 0.005
          ) {
            animFrame = requestAnimationFrame(updateMagnetic);
          } else {
            btn.style.transform = '';
            if (textSpan) textSpan.style.transform = '';
            animFrame = null;
          }
        };

        const kick = () => {
          if (animFrame === null) animFrame = requestAnimationFrame(updateMagnetic);
        };

        const onMouseEnter = () => {
          isHovered = true;
          targetScale = 1.04;
          if (btn.closest('.btn-left-top')) {
            targetRot = -2.5;
            targetX = 2;
            targetY = 0;
          }
          kick();
        };

        const onMouseMove = (e) => {
          const rect = btn.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const deltaX = e.clientX - centerX;
          const deltaY = e.clientY - centerY;

          targetX = (deltaX / (rect.width / 2)) * (strength * 0.45);
          targetY = (deltaY / (rect.height / 2)) * (strength * 0.45);

          if (textSpan) {
            textTargetX = (deltaX / (rect.width / 2)) * (strengthText * 0.55);
            textTargetY = (deltaY / (rect.height / 2)) * (strengthText * 0.55);
          }
          kick();
        };

        const onMouseLeave = () => {
          isHovered = false;
          targetX = 0;
          targetY = 0;
          targetRot = 0;
          targetScale = 1;
          textTargetX = 0;
          textTargetY = 0;
          kick();
        };

        btn.addEventListener('mouseenter', onMouseEnter);
        btn.addEventListener('mousemove', onMouseMove);
        btn.addEventListener('mouseleave', onMouseLeave);

        cleanups.push(() => {
          btn.removeEventListener('mouseenter', onMouseEnter);
          btn.removeEventListener('mousemove', onMouseMove);
          btn.removeEventListener('mouseleave', onMouseLeave);
          if (animFrame) cancelAnimationFrame(animFrame);
        });
      });
    }

    // 5. Big-Name Infinite Marquee with Scroll Velocity
    const bigNameWrap = document.querySelector('.home-header .big-name .name-h1');
    if (bigNameWrap) {
      let xOffset = 0;
      let direction = -1;
      let speed = 1;
      let velocityBoost = 0;
      let lastScrollY = window.scrollY;
      let lastTime = performance.now();
      let marqueeRaf = null;

      const calcSpeed = () => {
        const halfWidth = bigNameWrap.scrollWidth / 2;
        speed = halfWidth > 0 ? halfWidth / 26000 : 1;
      };
      calcSpeed();
      window.addEventListener('resize', calcSpeed);

      const onScrollMarquee = () => {
        const curScroll = window.scrollY;
        const delta = Math.abs(curScroll - lastScrollY);
        if (curScroll > lastScrollY + 1) {
          direction = -1;
        } else if (curScroll < lastScrollY - 1) {
          direction = 1;
        }
        if (delta > 0) {
          velocityBoost = Math.min(6, velocityBoost + delta * 0.35);
        }
        lastScrollY = curScroll;
      };
      window.addEventListener('scroll', onScrollMarquee, { passive: true });

      const animateMarquee = (now) => {
        const deltaMs = Math.min(now - lastTime, 48);
        lastTime = now;

        xOffset += direction * speed * (1 + velocityBoost) * deltaMs;
        velocityBoost *= Math.pow(0.985, deltaMs / 16);
        if (velocityBoost < 0.01) velocityBoost = 0;

        const halfW = bigNameWrap.scrollWidth / 2;
        if (halfW > 0) {
          if (xOffset <= -halfW) xOffset += halfW;
          if (xOffset > 0) xOffset -= halfW;
        }
        bigNameWrap.style.transform = `translateX(${xOffset.toFixed(2)}px)`;
        marqueeRaf = requestAnimationFrame(animateMarquee);
      };
      marqueeRaf = requestAnimationFrame(animateMarquee);

      cleanups.push(() => {
        window.removeEventListener('resize', calcSpeed);
        window.removeEventListener('scroll', onScrollMarquee);
        if (marqueeRaf) cancelAnimationFrame(marqueeRaf);
      });
    }

    // 5b. Hero Personal Portrait Interactive Mouse Parallax (Dennis Snellenberg style)
    if (!prefersReduced && window.innerWidth > 720) {
      const personalImg = document.querySelector('.home-header .personal-image-wrap .overlay-image');
      if (personalImg) {
        let mouseX = 0;
        let mouseY = 0;
        let curX = 0;
        let curY = 0;
        let pRaf = null;

        const onHeroMouseMove = (e) => {
          const halfW = window.innerWidth / 2;
          const halfH = window.innerHeight / 2;
          mouseX = (e.clientX - halfW) * 0.018;
          mouseY = (e.clientY - halfH) * 0.012;
          if (!pRaf) pRaf = requestAnimationFrame(updateParallax);
        };

        const updateParallax = () => {
          curX += (mouseX - curX) * 0.08;
          curY += (mouseY - curY) * 0.08;
          personalImg.style.transform = `translate3d(${curX.toFixed(2)}px, ${curY.toFixed(2)}px, 0)`;

          if (Math.abs(mouseX - curX) > 0.05 || Math.abs(mouseY - curY) > 0.05) {
            pRaf = requestAnimationFrame(updateParallax);
          } else {
            pRaf = null;
          }
        };

        window.addEventListener('mousemove', onHeroMouseMove, { passive: true });
        cleanups.push(() => {
          window.removeEventListener('mousemove', onHeroMouseMove);
          if (pRaf) cancelAnimationFrame(pRaf);
        });
      }
    }

    // 6. Floating Project Hover Preview (Desktop only)
    if (!prefersReduced && window.innerWidth > 1024) {
      const floatImage = document.querySelector('.mouse-pos-list-image');
      const floatBtn = document.querySelector('.mouse-pos-list-btn');
      const floatSpan = document.querySelector('.mouse-pos-list-span');
      const hoverRows = document.querySelectorAll('.hover-row, .work-items li, .work-tiles li');
      const imageItems = document.querySelectorAll('.mouse-pos-list-image-inner');

      if (
        floatImage &&
        hoverRows.length > 0 &&
        !location.pathname.includes('project') &&
        !location.pathname.includes('work')
      ) {
        let mouseX = 0,
          mouseY = 0;
        let smoothX = 0,
          smoothY = 0;
        let isHovering = false;
        let followRaf = null;

        const onDocMouseMove = (e) => {
          mouseX = e.clientX;
          mouseY = e.clientY;
          if (!followRaf && isHovering) {
            followRaf = requestAnimationFrame(updateFloatPos);
          }
        };

        const updateFloatPos = () => {
          const diffX = mouseX - smoothX;
          const diffY = mouseY - smoothY;

          if (Math.abs(diffX) > 0.1 || Math.abs(diffY) > 0.1) {
            smoothX += diffX * 0.16;
            smoothY += diffY * 0.16;
          } else {
            smoothX = mouseX;
            smoothY = mouseY;
          }

          floatImage.style.transform = `translate3d(${smoothX.toFixed(1)}px, ${smoothY.toFixed(1)}px, 0) translate(-50%, -50%)`;
          if (floatBtn) {
            floatBtn.style.transform = `translate3d(${smoothX.toFixed(1)}px, ${smoothY.toFixed(1)}px, 0) translate(-50%, -50%)`;
          }
          if (floatSpan) {
            floatSpan.style.transform = `translate3d(${smoothX.toFixed(1)}px, ${smoothY.toFixed(1)}px, 0) translate(-50%, -50%)`;
          }

          if (isHovering || Math.abs(mouseX - smoothX) > 0.5 || Math.abs(mouseY - smoothY) > 0.5) {
            followRaf = requestAnimationFrame(updateFloatPos);
          } else {
            followRaf = null;
          }
        };

        document.addEventListener('mousemove', onDocMouseMove);

        hoverRows.forEach((row) => {
          const onRowEnter = () => {
            const projId = row.getAttribute('data-project');
            const projIndex = row.getAttribute('data-index');

            imageItems.forEach((img) => {
              const matchesId = projId && img.getAttribute('data-project') === projId;
              const matchesIndex = projIndex && img.getAttribute('data-index') === projIndex;
              img.classList.toggle('visible', matchesId || matchesIndex);
            });

            isHovering = true;
            floatImage.classList.add('active');
            if (floatBtn) floatBtn.classList.add('active');
            if (floatSpan) floatSpan.classList.add('active');
            if (!followRaf) followRaf = requestAnimationFrame(updateFloatPos);
          };

          const onRowLeave = () => {
            isHovering = false;
            floatImage.classList.remove('active');
            if (floatBtn) floatBtn.classList.remove('active');
            if (floatSpan) floatSpan.classList.remove('active');
          };

          row.addEventListener('mouseenter', onRowEnter);
          row.addEventListener('mouseleave', onRowLeave);

          cleanups.push(() => {
            row.removeEventListener('mouseenter', onRowEnter);
            row.removeEventListener('mouseleave', onRowLeave);
          });
        });

        cleanups.push(() => {
          document.removeEventListener('mousemove', onDocMouseMove);
          if (followRaf) cancelAnimationFrame(followRaf);
        });
      }
    }

    // 7. Parallax Offset for About Me Button
    const introSection = document.querySelector('.home-intro');
    const introBtn = introSection ? introSection.querySelector('.btn-wrap-intro') : null;
    if (introSection && introBtn) {
      let isRafPending = false;
      const calcIntroParallax = () => {
        const rect = introSection.getBoundingClientRect();
        const winH = window.innerHeight;
        const totalSpan = winH * 0.85 + rect.height * 0.5;
        const scrolledDistance = winH - rect.top;
        const ratio = Math.max(0, Math.min(1, scrolledDistance / totalSpan));
        const startY = 110;
        const endY = -105;
        const transY = startY + (endY - startY) * ratio;
        introBtn.style.transform = `translate3d(0, ${transY.toFixed(2)}px, 0)`;
        isRafPending = false;
      };

      const onScrollIntro = () => {
        if (!isRafPending) {
          requestAnimationFrame(calcIntroParallax);
          isRafPending = true;
        }
      };

      window.addEventListener('scroll', onScrollIntro, { passive: true });
      window.addEventListener('resize', calcIntroParallax);
      calcIntroParallax();

      cleanups.push(() => {
        window.removeEventListener('scroll', onScrollIntro);
        window.removeEventListener('resize', calcIntroParallax);
      });
    }

    // 8. Pinned Footer Reveal with Curved Div Height Morph
    const footerWrap = document.querySelector('.footer-wrap');
    const footerSpacer = document.querySelector('.footer-spacer');
    const roundedWrap = document.querySelector('.footer-rounded-div .rounded-div-wrap');
    const footerEl = footerWrap ? footerWrap.querySelector('.footer') : null;
    const footerH2 = footerWrap ? footerWrap.querySelector('.container.medium .row:nth-child(1) h2') : null;
    const btnFixed = footerWrap ? footerWrap.querySelector('.btn-fixed') : null;
    const secondRow = footerWrap ? footerWrap.querySelector('.container.medium .row:nth-child(2)') : null;
    const footerArrow = footerWrap ? footerWrap.querySelector('.arrow') : null;

    if (footerWrap && footerSpacer) {
      let smoothProgress = 0;
      let targetProgress = 0;
      let footerRaf = null;

      const setSpacerHeight = () => {
        const winH = window.innerHeight;
        const h = footerEl ? footerEl.offsetHeight : 0;
        footerSpacer.style.height = `${Math.max(winH * 0.9, h)}px`;
      };

      const onScrollFooter = () => {
        const rect = footerSpacer.getBoundingClientRect();
        const winH = window.innerHeight;
        const height = rect.height || winH;
        const scrolledIntoView = winH - rect.top;
        targetProgress = Math.max(0, Math.min(1, scrolledIntoView / height));

        if (scrolledIntoView > -40) {
          footerWrap.classList.add('visible');
        } else {
          footerWrap.classList.remove('visible');
        }

        if (!footerRaf) footerRaf = requestAnimationFrame(animateFooter);
      };

      const animateFooter = () => {
        const diff = targetProgress - smoothProgress;
        if (Math.abs(diff) > 0.0005) {
          smoothProgress += diff * 0.14;
        } else {
          smoothProgress = targetProgress;
        }

        const p = smoothProgress;

        if (roundedWrap) {
          const curveHeight = (1 - p) * 8;
          roundedWrap.style.height = `${Math.max(0, curveHeight).toFixed(2)}vh`;
        }

        if (footerEl) {
          const transY = (1 - p) * 280;
          footerEl.style.transform = `translate3d(0, ${transY.toFixed(2)}px, 0)`;
        }

        if (footerH2) {
          const transY = (1 - p) * 60;
          footerH2.style.transform = `translate3d(0, ${transY.toFixed(2)}px, 0)`;
        }

        if (footerArrow) {
          const rot = (1 - p) * 15;
          footerArrow.style.transform = `rotate(${rot.toFixed(1)}deg)`;
        }

        if (btnFixed && secondRow) {
          const width = secondRow.offsetWidth;
          const transX = -Math.min(width * 0.35, 400) * (1 - Math.pow(p, 0.85));
          const transY = (1 - p) * 45;
          const rot = (1 - p) * -10;
          btnFixed.style.transform = `translate3d(calc(-50% + ${transX.toFixed(1)}px), calc(-50% + ${transY.toFixed(1)}px), 0) rotate(${rot.toFixed(1)}deg)`;
        }

        if (Math.abs(targetProgress - smoothProgress) > 0.0005) {
          footerRaf = requestAnimationFrame(animateFooter);
        } else {
          footerRaf = null;
        }
      };

      window.addEventListener('scroll', onScrollFooter, { passive: true });
      window.addEventListener('resize', () => {
        setSpacerHeight();
        onScrollFooter();
      });
      setSpacerHeight();
      onScrollFooter();

      cleanups.push(() => {
        window.removeEventListener('scroll', onScrollFooter);
        if (footerRaf) cancelAnimationFrame(footerRaf);
      });
    }

    return () => {
      if (observer) observer.disconnect();
      cleanups.forEach((fn) => fn());
    };
  }, [location.pathname]);
}
