import { useSelector, useDispatch } from 'react-redux';
import {
  selectProjects,
  selectProjectFilter,
  selectProjectViewMode,
  selectFilteredProjects,
  selectProjectCounts,
  setFilter,
  setViewMode,
} from '../store/projectSlice';

export const useProjects = () => {
  const dispatch = useDispatch();
  const allProjects = useSelector(selectProjects);
  const filter = useSelector(selectProjectFilter);
  const viewMode = useSelector(selectProjectViewMode);
  const filteredProjects = useSelector(selectFilteredProjects);
  const counts = useSelector(selectProjectCounts);

  const handleSetFilter = (newFilter) => {
    dispatch(setFilter(newFilter));
  };

  const handleSetViewMode = (newMode) => {
    dispatch(setViewMode(newMode));
  };

  return {
    allProjects,
    filter,
    viewMode,
    filteredProjects,
    counts,
    setFilter: handleSetFilter,
    setViewMode: handleSetViewMode,
  };
};

export default useProjects;
