import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useLenisScroll } from '../shared/hooks/useLenisScroll';
import { usePageInteractions } from '../shared/hooks/usePageInteractions';
import { NavigationProvider } from '../shared/context/NavigationContext';
import { Loader } from '../shared/components/Loader/Loader';
import { SplashCursor } from '../shared/components/SplashCursor';
import { Navigation } from '../shared/components/Navigation/Navigation';
import { MenuDrawer } from '../shared/components/Navigation/MenuDrawer';
import { Footer } from '../shared/components/Footer/Footer';

const AppContent = () => {
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
      <SplashCursor />
      <main className="main no-touch">
        <Navigation onToggleMenu={toggleMenu} />
        <MenuDrawer onClose={closeMenu} />
        <Outlet />
        {!isContactPage && <Footer />}
      </main>
    </>
  );
};

export const App = () => {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
};

export default App;
