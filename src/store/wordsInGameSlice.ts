import { createSlice } from '@reduxjs/toolkit';
import { CardObj } from '../utils/interfaces';
import { current } from '@reduxjs/toolkit'

interface InitialStateType {
  wordsInGame: CardObj[];
  gameboardHasLoaded: boolean,
}

const initialState: InitialStateType = {
  wordsInGame: [],
  gameboardHasLoaded: false,
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
      console.log({found})
     if (found) {
      found.isVisibleToAll = true
      found.teamId = teamId
       console.log('item changed')
     } else {
      console.log('no change')
     }
    },
    setGameboardHasLoaded: (state, action) => {
      state.gameboardHasLoaded = action.payload;
    }
  },
});

export const { setWordsInGame, revealCard, setGameboardHasLoaded } = wordsInGameSlice.actions;
export default wordsInGameSlice.reducer;
