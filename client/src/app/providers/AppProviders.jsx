import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';

/**
 * Top-level application providers.
 * Injects Redux Toolkit store and any future global providers.
 */
export const AppProviders = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default AppProviders;
