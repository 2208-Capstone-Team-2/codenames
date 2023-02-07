import { createSlice } from '@reduxjs/toolkit';
import { PlayerType } from '../utils/interfaces';

const playerInitialState: PlayerType = {
  playerId: '',
  username: '',
  roomId: '',
  isHost: false,
  isSpectator: true
};

export const playerSlice = createSlice({
  name: 'player',
  initialState: playerInitialState,
  reducers: {
    setPlayerId: (state, action) => {
      state.playerId = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setRoomId: (state, action) => {
      state.roomId = action.payload;
    },
    setIsHost: (state, action) => {
      state.isHost = action.payload;
    },
    setIsSpectator: (state, action) => {
      state.isSpectator = action.payload;
    },
  },
});

// export the playerinterface for allPlayers to use

export const { setUsername, setRoomId, setPlayerId, setIsHost, setIsSpectator } = playerSlice.actions;
export default playerSlice.reducer;
