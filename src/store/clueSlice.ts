import { createSlice } from '@reduxjs/toolkit';
import { ClueType } from '../utils/interfaces';

interface InitialStateType {
  currentClue: ClueType;
}

const initialState: InitialStateType = {
  currentClue: {
    clueString: '',
    clueNumber: null,
    playerSubmitting: '',
  },
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
