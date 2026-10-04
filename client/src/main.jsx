import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { NavigationProvider } from './context/NavigationContext.jsx';
import App from './App.jsx';
import './styles.css';

const rootEl = document.getElementById('root');
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <BrowserRouter>
        <NavigationProvider>
          <App />
        </NavigationProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}
