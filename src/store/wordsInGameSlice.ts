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
      const id = action.payload;
      const found = current(state.wordsInGame).find(card => {return card.id === id});
      
      // console.log(current(state.wordsInGame))
      console.log({found})
      console.log('found?')
      // const newWords = [...state.wordsInGame]; 
      // newWords[index].isVisibleToAll = true
      // console.log({newWords})
      // state.wordsInGame = newWords
      // const cardToFlip = state.wordsInGame.find((card) => card.id === id) 
      // console.log({cardToFlip})
      // if (cardToFlip) cardToFlip.isVisibleToAll = true;

    },
    setGameboardHasLoaded: (state, action) => {
      state.gameboardHasLoaded = action.payload;
    }
  },
});

export const { setWordsInGame, revealCard, setGameboardHasLoaded } = wordsInGameSlice.actions;
export default wordsInGameSlice.reducer;
