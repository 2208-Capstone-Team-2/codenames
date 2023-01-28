import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentClue: {},
};

export const clueSlice = createSlice({
  name: 'clues',
  initialState,
  reducers: {
    setCurrentClue: (state, action) => {
      state.currentClue = action.payload;
    },
  },
});

export const { setCurrentClue } = clueSlice.actions;
export default clueSlice.reducer;
