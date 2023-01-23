import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  spymasterWords: [],
};

export const spymasterWordsSlice = createSlice({
  name: 'spymasterWords',
  initialState,
  reducers: {
    setSpymasterWords: (state, action) => {
      state.spymasterWords = action.payload;
    },
  },
});

export const { setSpymasterWords } = spymasterWordsSlice.actions;
export default spymasterWordsSlice.reducer;
