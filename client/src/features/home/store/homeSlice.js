import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  welcomeSequenceDone: false,
  isHeroInteractive: true,
  featuredLimit: 4,
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setWelcomeSequenceDone: (state, action) => {
      state.welcomeSequenceDone = action.payload;
    },
    setHeroInteractive: (state, action) => {
      state.isHeroInteractive = action.payload;
    },
  },
});

export const { setWelcomeSequenceDone, setHeroInteractive } = homeSlice.actions;

export const selectWelcomeDone = (state) => state.home.welcomeSequenceDone;
export const selectIsHeroInteractive = (state) => state.home.isHeroInteractive;

export default homeSlice.reducer;
