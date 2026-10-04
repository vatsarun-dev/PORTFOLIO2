import React, { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { projects as defaultProjects } from '../../data/projects.js';
import './projectList.css';

const ProjectRow = ({ project, isActive, onActivate, onDeactivate }) => {
  const rowRef = useRef(null);
  const previewAnchorRef = useRef(null);
  const previewCardRef = useRef(null);
  const quickXRef = useRef(null);
  const quickYRef = useRef(null);
  const hasEverAnimatedRef = useRef(false);

  // Initialize GSAP quickTo for smooth 60fps micro-parallax
  useEffect(() => {
    if (!previewAnchorRef.current) return;

    quickXRef.current = gsap.quickTo(previewAnchorRef.current, 'x', {
      duration: 0.35,
      ease: 'power2.out'
    });
    quickYRef.current = gsap.quickTo(previewAnchorRef.current, 'y', {
      duration: 0.35,
      ease: 'power2.out'
    });

    return () => {
      quickXRef.current = null;
      quickYRef.current = null;
    };
  }, []);

  // Entrance & Exit animations triggered by active state changes
  useEffect(() => {
    const card = previewCardRef.current;
    if (!card) return;

    const targetRot = project.rotation ?? 2.5;

    if (isActive) {
      hasEverAnimatedRef.current = true;
      gsap.killTweensOf(card);

      // Make visible for animation
      gsap.set(card, { visibility: 'visible' });

      // Physical entrance animation:
      // Initial: opacity 0, translate3d(60px, 20px, 0), rotate(8deg), scale(0.85)
      // Animate to: opacity 1, translate3d(0, 0, 0), rotate(targetRot), scale(1)
      gsap.fromTo(
        card,
        {
          opacity: 0,
          x: 60,
          y: 20,
          rotation: 8,
          scale: 0.85
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          rotation: targetRot,
          scale: 1,
          duration: 0.55,
          ease: 'power3.out',
          overwrite: 'auto'
        }
      );
    } else if (hasEverAnimatedRef.current) {
      // Physical exit animation: slide slightly left and fade out
      gsap.killTweensOf(card);
      gsap.to(card, {
        opacity: 0,
        x: -35,
        y: -10,
        rotation: -targetRot * 1.4,
        scale: 0.9,
        duration: 0.38,
        ease: 'power2.inOut',
        overwrite: 'auto',
        onComplete: () => {
          gsap.set(card, { visibility: 'hidden' });
        }
      });

      // Reset parallax offset smoothly
      if (quickXRef.current) quickXRef.current(0);
      if (quickYRef.current) quickYRef.current(0);
    }
  }, [isActive, project.rotation]);

  // Subtle mouse reactivity (X: ±12px, Y: ±7px)
  const handleMouseMove = useCallback((e) => {
    if (!rowRef.current || !quickXRef.current || !quickYRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const relX = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to +1
    const relY = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1 to +1

    quickXRef.current(relX * 12);
    quickYRef.current(relY * 7);
  }, []);

  const handleMouseEnter = () => {
    onActivate(project.id);
  };

  const handleMouseLeave = () => {
    if (quickXRef.current) quickXRef.current(0);
    if (quickYRef.current) quickYRef.current(0);
    onDeactivate(project.id);
  };

  return (
    <li
      ref={rowRef}
      className={`work-item-row ${isActive ? 'is-active' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="stripe animate"></div>

      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="row work-item-link"
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        aria-label={`${project.title} - ${project.services}`}
      >
        <div className="flex-col title-col">
          <h4>
            <span>{project.title}</span>
          </h4>
        </div>

        <div className="flex-col animate meta-col">
          <p>{project.services}</p>
        </div>

        {/* Floating preview image (pinned to the right) */}
        <div
          ref={previewAnchorRef}
          className="project-preview-anchor"
          aria-hidden="true"
        >
          <div
            ref={previewCardRef}
            className="project-preview-card"
            style={{ visibility: 'hidden', opacity: 0 }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="project-preview-img"
              loading="lazy"
            />
          </div>
        </div>
      </a>
    </li>
  );
};

export const ProjectList = ({ items = defaultProjects }) => {
  const [activeId, setActiveId] = useState(null);

  const handleActivate = useCallback((id) => {
    setActiveId(id);
  }, []);

  const handleDeactivate = useCallback((id) => {
    setActiveId((prev) => (prev === id ? null : prev));
  }, []);

  const handleListMouseLeave = useCallback(() => {
    setActiveId(null);
  }, []);

  return (
    <div className="project-list-container" onMouseLeave={handleListMouseLeave}>
      <ul className={`work-items project-work-items ${activeId ? 'has-active' : ''}`}>
        {items.map((project) => (
          <ProjectRow
            key={project.id}
            project={project}
            isActive={activeId === project.id}
            onActivate={handleActivate}
            onDeactivate={handleDeactivate}
          />
        ))}
        <div className="stripe last animate"></div>
      </ul>
    </div>
  );
};

export default ProjectList;
