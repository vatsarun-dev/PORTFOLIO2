import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_PROJECTS } from '../services/projectService';
import { filterProjectsByCategory, calculateProjectCategoryCounts } from '../utils/projectFilters';

const initialState = {
  items: INITIAL_PROJECTS,
  selectedFilter: 'all',
  viewMode: 'columns',
};

export const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.selectedFilter = action.payload;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    setProjects: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setFilter, setViewMode, setProjects } = projectSlice.actions;

// Selectors
export const selectProjects = (state) => state.projects.items;
export const selectProjectFilter = (state) => state.projects.selectedFilter;
export const selectProjectViewMode = (state) => state.projects.viewMode;

export const selectFilteredProjects = (state) => {
  return filterProjectsByCategory(state.projects.items, state.projects.selectedFilter);
};

export const selectProjectCounts = (state) => {
  return calculateProjectCategoryCounts(state.projects.items);
};

export default projectSlice.reducer;
