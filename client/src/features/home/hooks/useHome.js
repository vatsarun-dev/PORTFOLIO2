import { useSelector, useDispatch } from 'react-redux';
import {
  selectWelcomeDone,
  selectIsHeroInteractive,
  setWelcomeSequenceDone,
} from '../store/homeSlice';
import { homeService } from '../services/homeService';

export const useHome = () => {
  const dispatch = useDispatch();
  const welcomeDone = useSelector(selectWelcomeDone);
  const isHeroInteractive = useSelector(selectIsHeroInteractive);
  const heroData = homeService.getHeroData();
  const recentProjects = homeService.getRecentProjects();

  const markWelcomeDone = () => {
    dispatch(setWelcomeSequenceDone(true));
  };

  return {
    welcomeDone,
    isHeroInteractive,
    heroData,
    recentProjects,
    markWelcomeDone,
  };
};

export default useHome;
