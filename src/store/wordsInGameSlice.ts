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
      const id = action.payload;
      console.log('payload', action.payload)
      console.log('card id', id)
      const cardToFlip = state.wordsInGame.find((card) => card.id === id) 
      if (cardToFlip) cardToFlip.isVisibleToAll = true;
    }
  },
});

export const { setWordsInGame, revealCard } = wordsInGameSlice.actions;
export default wordsInGameSlice.reducer;
