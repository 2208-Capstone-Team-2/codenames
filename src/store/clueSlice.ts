import { createSlice } from '@reduxjs/toolkit';
import { ClueType } from '../utils/interfaces';

interface InitialStateType {
  currentClue: ClueType;
}

const initialState: InitialStateType = {
  currentClue: {
    clueString: '',
    clueNumber: null,
    teamSubmitted: null
    //changed to team submitted so
    //it is easier to figure out 
    //which team the clue belongs to
    
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
