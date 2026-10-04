export { WorkPage, default as WorkPageDefault } from './pages/WorkPage';
export { ProjectList } from './components/ProjectList/ProjectList';
export { ShowcaseCard, ShowcaseGrid } from './components/ShowcaseCard/ShowcaseCard';
export { ProjectFilters } from './components/ProjectFilters';
export { ProjectArchiveBtn } from './components/ProjectArchiveBtn';
export { useProjects } from './hooks/useProjects';
export { projectService, INITIAL_PROJECTS } from './services/projectService';
export {
  projectSlice,
  setFilter,
  setViewMode,
  setProjects,
  selectProjects,
  selectProjectFilter,
  selectProjectViewMode,
  selectFilteredProjects,
  selectProjectCounts,
  default as projectReducer,
} from './store/projectSlice';
