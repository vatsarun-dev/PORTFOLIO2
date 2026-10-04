import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useLenisScroll } from './hooks/useLenisScroll.js';
import { usePageInteractions } from './hooks/usePageInteractions.js';
import { Loader } from './components/Loader/Loader.jsx';
import { Navigation } from './components/Navigation/Navigation.jsx';
import { MenuDrawer } from './components/Navigation/MenuDrawer.jsx';
import { Footer } from './components/Footer/Footer.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { WorkPage } from './pages/WorkPage.jsx';
import { AboutPage } from './pages/AboutPage.jsx';
import { ContactPage } from './pages/ContactPage.jsx';

export const App = () => {
  useLenisScroll();
  usePageInteractions();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    document.body.classList.toggle('nav-active', menuOpen);
    const hamburger = document.querySelector('.btn-hamburger');
    if (hamburger) hamburger.classList.toggle('active', menuOpen);
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const isContactPage = location.pathname.includes('contact');

  return (
    <>
      <div className="no-scroll-overlay"></div>
      <Loader />
      <main className="main no-touch">
        <Navigation onToggleMenu={toggleMenu} />
        <MenuDrawer onClose={closeMenu} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/index.html" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work.html" element={<WorkPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/about.html" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/contact.html" element={<ContactPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
        {!isContactPage && <Footer />}
      </main>
    </>
  );
};

export default App;
