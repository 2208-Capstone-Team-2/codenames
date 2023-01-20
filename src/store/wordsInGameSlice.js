import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
