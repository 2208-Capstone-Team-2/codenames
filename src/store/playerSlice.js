import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  playerId: '',
  username: '',
  isHost: false,
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlayerId: (state, action) => {
      state.playerId = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setIsHost: (state, action) => {
      state.isHost = action.payload;
    },
  },
});

export const { setUsername, setPlayerId, setIsHost } = playerSlice.actions;
export default playerSlice.reducer;
