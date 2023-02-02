import { createSlice } from '@reduxjs/toolkit';

interface currentClueType {
  clueString: string;
  clueNumber: number;
  playerSubmitting: string; // this is the player's ID (which is a string)
}

interface initialStateType {
  currentClue: currentClueType;
  clueHistory: currentClueType[];
}

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
