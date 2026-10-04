import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const HeroCanvas = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scene, camera, renderer, group, particles, wireMesh, innerCore;
    let animId = null;
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 600;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 320;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    group = new THREE.Group();
    scene.add(group);

    // 1. Outer Wireframe Polyhedron (Icosahedron / Tech Sphere)
    const geomOuter = new THREE.IcosahedronGeometry(90, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x455ce9,
      wireframe: true,
      transparent: true,
      opacity: 0.28
    });
    wireMesh = new THREE.Mesh(geomOuter, wireMat);
    group.add(wireMesh);

    // 2. Inner Deep Obsidian Core
    const geomCore = new THREE.IcosahedronGeometry(65, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x141517,
      wireframe: false,
      transparent: true,
      opacity: 0.85
    });
    innerCore = new THREE.Mesh(geomCore, coreMat);
    group.add(innerCore);

    // Inner wireframe accent
    const innerWireMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.12
    });
    const innerWire = new THREE.Mesh(geomCore, innerWireMat);
    group.add(innerWire);

    // 3. Orbital Particle Cloud
    const particleCount = 220;
    const particleGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 100 + Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }

    particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x455ce9,
      size: 2.2,
      transparent: true,
      opacity: 0.65
    });

    particles = new THREE.Points(particleGeom, particleMat);
    group.add(particles);

    // Mouse movement handler
    const onMouseMove = (e) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      targetX = (e.clientX - halfW) * 0.0008;
      targetY = (e.clientY - halfH) * 0.0008;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Resize handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || 600;
      const h = container.clientHeight || 600;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Render loop
    const animate = () => {
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      group.rotation.y += 0.004 + mouseX * 0.5;
      group.rotation.x += 0.002 + mouseY * 0.5;
      group.rotation.z += 0.001;

      particles.rotation.y -= 0.002;
      particles.rotation.x -= 0.001;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geomOuter.dispose();
      wireMat.dispose();
      geomCore.dispose();
      coreMat.dispose();
      innerWireMat.dispose();
      particleGeom.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div className="hero-canvas-wrap" ref={containerRef} aria-hidden="true" />
  );
};
