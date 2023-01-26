import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'ready',
  team1RemainingCards: 9,
  team2RemainingCards: 8,
  winner: '',
  loser: '',
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setTeam1RemainingCards: (state, action) => {
      state.team1RemainingCards = action.payload;
    },
    setTeam2RemainingCards: (state, action) => {
      state.team2RemainingCards = action.payload;
    },
    setWinner: (state, action) => {
      state.winner = action.payload;
    },
    setLoser: (state, action) => {
      state.loser = action.payload;
    },
  },
});

export const { setStatus, setTeam1RemainingCards, setTeam2RemainingCards, setWinner, setLoser } = gameSlice.actions;
export default gameSlice.reducer;
