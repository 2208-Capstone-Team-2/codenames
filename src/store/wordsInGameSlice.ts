import { createSlice } from '@reduxjs/toolkit';

// Todo: make more specific?
interface initialStateType {
  wordsInGame: [];
}

const initialState: initialStateType = {
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
