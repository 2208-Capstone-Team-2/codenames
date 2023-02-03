import { createSlice } from '@reduxjs/toolkit';
import { Card } from '../utils/interfaces';

interface InitialStateType {
  wordsInGame: Card[];
}

const initialState: InitialStateType = {
  wordsInGame: [],
};

export const wordsInGameSlice = createSlice({
  name: 'wordsInGame',
  initialState,
  reducers: {
    setWordsInGame: (state, action) => {
      state.wordsInGame = action.payload;
    },
  },
});

export const { setWordsInGame } = wordsInGameSlice.actions;
export default wordsInGameSlice.reducer;
