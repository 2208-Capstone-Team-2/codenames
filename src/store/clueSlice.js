import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentClue: {},
  clueHistory: [],
  guessesRemaining: null,
};

export const clueSlice = createSlice({
  name: 'clues',
  initialState,
  reducers: {
    setCurrentClue: (state, action) => {
      state.currentClue = action.payload;
    },
    setGuessesRemaining: (state, action) => {
      state.guessesRemaining = action.payload;
    },
    setClueHistory: (state, action) => {
      state.clueHistory = action.payload;
    },
  },
});

export const { setCurrentClue, setClueHistory, setGuessesRemaining } = clueSlice.actions;
export default clueSlice.reducer;
