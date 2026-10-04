import { combineReducers } from '@reduxjs/toolkit';
import { homeReducer } from '../../features/home';
import { projectReducer } from '../../features/projects';
import { aboutReducer } from '../../features/about';
import { contactReducer } from '../../features/contact';

export const rootReducer = combineReducers({
  home: homeReducer,
  projects: projectReducer,
  about: aboutReducer,
  contact: contactReducer,
});

export default rootReducer;
