import { createSlice } from '@reduxjs/toolkit';
import { CardObj } from '../utils/interfaces';

interface InitialStateType {
  wordsInGame: CardObj[];
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
    revealCard: (state, action) => {
      let found = state.wordsInGame.find(card => card.id === action.payload.wordId);
      let teamId = action.payload.teamId
     if (found) {
      found.isVisibleToAll = true
      found.teamId = teamId
     } 
    },
  },
});

export const { setWordsInGame, revealCard } = wordsInGameSlice.actions;
export default wordsInGameSlice.reducer;
