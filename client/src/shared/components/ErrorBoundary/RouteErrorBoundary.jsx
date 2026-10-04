import React from 'react';
import { useRouteError, useNavigate } from 'react-router-dom';

/**
 * Route-level Error Boundary for React Router Data Router.
 * Gracefully displays runtime or navigation errors and provides seamless recovery.
 */
export const RouteErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  console.error('[RouteErrorBoundary] Route encounter:', error);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1c1d20',
        color: '#ffffff',
        fontFamily: 'Neue Montreal, sans-serif',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <span
        style={{
          fontSize: '0.85rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#455ce9',
          marginBottom: '0.5rem',
          display: 'block',
        }}
      >
        Navigation Notice
      </span>
      <h1
        style={{
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 450,
          marginBottom: '1rem',
          color: '#ffffff',
        }}
      >
        Page Encountered an Issue
      </h1>
      <p
        style={{
          maxWidth: '500px',
          opacity: 0.65,
          marginBottom: '2rem',
          fontSize: '1rem',
          lineHeight: 1.6,
        }}
      >
        {error?.statusText ||
          error?.message ||
          'The requested route could not be loaded properly.'}
      </p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          type="button"
          onClick={() => navigate('/')}
          style={{
            cursor: 'pointer',
            backgroundColor: '#455ce9',
            color: '#ffffff',
            border: 'none',
            borderRadius: '2rem',
            padding: '0.85rem 1.75rem',
            fontSize: '0.95rem',
            fontFamily: 'inherit',
            fontWeight: 500,
            transition: 'background-color 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#334bd3')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#455ce9')}
        >
          Return Home
        </button>
        <button
          type="button"
          onClick={() => window.location.reload()}
          style={{
            cursor: 'pointer',
            backgroundColor: 'transparent',
            color: '#ffffff',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '2rem',
            padding: '0.85rem 1.75rem',
            fontSize: '0.95rem',
            fontFamily: 'inherit',
            fontWeight: 500,
            transition: 'border-color 0.2s ease',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)')
          }
        >
          Reload Page
        </button>
      </div>
    </div>
  );
};

export default RouteErrorBoundary;
