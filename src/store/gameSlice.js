import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roomId: '',
  status: 'ready',
  team1RemainingCards: 9,
  team2RemainingCards: 8,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setRoomId: (state, action) => {
      state.roomId = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setTeam1RemainingCards: (state, action) => {
      state.team1RemainingCards = action.payload;
    },
    setTeam2RemainingCards: (state, action) => {
      state.team2RemainingCards = action.payload;
    },
  },
});

export const { setRoomId, setStatus, setTeam1RemainingCards, setTeam2RemainingCards } = gameSlice.actions;
export default gameSlice.reducer;
