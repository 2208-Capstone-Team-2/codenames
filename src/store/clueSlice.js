import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentClue: {},
  clueHistory: [],
};

export const clueSlice = createSlice({
  name: 'clues',
  initialState,
  reducers: {
    setCurrentClue: (state, action) => {
      state.currentClue = action.payload;
    },
    setClueHistory: (state, action) => {
      state.clueHistory = action.payload;
    },
  },
});

export const { setCurrentClue, setClueHistory } = clueSlice.actions;
export default clueSlice.reducer;
