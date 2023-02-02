import { createSlice } from '@reduxjs/toolkit';
// Import the player object to use its interface
import { playerInitialStateType, playerInitialState } from './playerSlice';

interface initialStateType {
  // allPlayers: [];
  //[index: number]: [typeof playerInitialState];
  allPlayers: playerInitialStateType[];
}

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
