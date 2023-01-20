import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allPlayers: [],
};

export const allPlayersSlice = createSlice({
  name: 'allPlayers',
  initialState,
  reducers: {
    setAllPlayers: (state, action) => {
      state.allPlayers = action.payload;
    },
  },
});

export const { setAllPlayers } = allPlayersSlice.actions;
export default allPlayersSlice.reducer;
