import { createSlice } from '@reduxjs/toolkit';
import { ClueType } from '../utils/interfaces';

interface CurrentClueType {
  currentClue: ClueType;
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
