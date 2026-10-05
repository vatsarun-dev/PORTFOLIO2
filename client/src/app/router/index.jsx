import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { PageLoader } from '../../shared/components/PageLoader/PageLoader';
import { RouteErrorBoundary } from '../../shared/components/ErrorBoundary/RouteErrorBoundary';

import HomePage from '../../features/home/pages/HomePage';

// Route-level code splitting with React.lazy
const WorkPage = lazy(() => import('../../features/projects/pages/WorkPage'));
const AboutPage = lazy(() => import('../../features/about/pages/AboutPage'));
const ContactPage = lazy(() => import('../../features/contact/pages/ContactPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'index.html',
        element: <HomePage />,
      },
      {
        path: 'projects',
        element: (
          <Suspense fallback={<PageLoader />}>
            <WorkPage />
          </Suspense>
        ),
      },
      {
        path: 'projects.html',
        element: (
          <Suspense fallback={<PageLoader />}>
            <WorkPage />
          </Suspense>
        ),
      },
      {
        path: 'work',
        element: (
          <Suspense fallback={<PageLoader />}>
            <WorkPage />
          </Suspense>
        ),
      },
      {
        path: 'work.html',
        element: (
          <Suspense fallback={<PageLoader />}>
            <WorkPage />
          </Suspense>
        ),
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: 'about.html',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: 'contact',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ContactPage />
          </Suspense>
        ),
      },
      {
        path: 'contact.html',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ContactPage />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: <HomePage />,
      },
    ],
  },
]);

export default router;
