import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  spymasterWords: [],
  assassinTeamId: [],
  bystanderTeamId: [],
};

export const spymasterWordsSlice = createSlice({
  name: 'spymasterWords',
  initialState,
  reducers: {
    setSpymasterWords: (state, action) => {
      state.spymasterWords = action.payload;
    },
    setAssassinTeamId: (state, action) => {
      state.assassinTeamId = action.payload;
    },
    setBystanderTeamId: (state, action) => {
      state.bystanderTeamId = action.payload;
    },
  },
});

export const { setSpymasterWords, setAssassinTeamId, setBystanderTeamId } = spymasterWordsSlice.actions;
export default spymasterWordsSlice.reducer;
