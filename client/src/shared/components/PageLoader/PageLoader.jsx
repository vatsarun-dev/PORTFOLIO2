import React from 'react';

/**
 * Reusable PageLoader fallback component for Suspense route-level code splitting.
 * Styled cleanly to match the application's sleek dark theme without layout shift.
 */
export const PageLoader = () => {
  return (
    <div
      className="page-loader-suspense"
      style={{
        minHeight: '80vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.25rem',
        background: 'transparent',
      }}
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div
        className="page-loader-spinner"
        style={{
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          border: '2.5px solid rgba(255, 255, 255, 0.12)',
          borderTopColor: '#455ce9',
          animation: 'pageLoaderSpin 0.75s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        }}
      />
      <span
        style={{
          fontFamily: 'Neue Montreal, sans-serif',
          fontSize: '0.85rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'rgba(255, 255, 255, 0.45)',
        }}
      >
        Loading
      </span>
      <style>{`
        @keyframes pageLoaderSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default PageLoader;
