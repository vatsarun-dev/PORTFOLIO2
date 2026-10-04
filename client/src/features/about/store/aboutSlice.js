import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_ABOUT_DATA } from '../services/aboutService';

const initialState = {
  data: INITIAL_ABOUT_DATA,
};

export const aboutSlice = createSlice({
  name: 'about',
  initialState,
  reducers: {
    updateAboutData: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },
  },
});

export const { updateAboutData } = aboutSlice.actions;

export const selectAboutData = (state) => state.about.data;
export const selectAboutBio = (state) => state.about.data.about;
export const selectAboutServices = (state) => state.about.data.services;
export const selectAboutEducation = (state) => state.about.data.education;
export const selectAboutAchievements = (state) => state.about.data.achievements;
export const selectAboutCertifications = (state) => state.about.data.certifications;
export const selectAboutSkills = (state) => state.about.data.skills;

export default aboutSlice.reducer;
