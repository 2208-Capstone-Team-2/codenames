import { createSlice } from '@reduxjs/toolkit';
import { PlayerType } from '../utils/interfaces';
interface AllPlayersType {
  allPlayers: PlayerType[];
}

const initialState: AllPlayersType = {
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
