import { createSlice } from '@reduxjs/toolkit';

interface currentClueType {
  clueString: string;
  clueNumber: number;
  playerSubmitting: string; // this is the player's ID (which is a string)
}

interface initialStateType {
  currentClue: currentClueType;
}

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
