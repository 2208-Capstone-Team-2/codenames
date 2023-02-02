import { createSlice } from '@reduxjs/toolkit';
import { PlayerType } from '../utils/interfaces';

const playerInitialState: PlayerType = {
  playerId: '',
  username: '',
  roomId: '',
  isHost: false,
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
  },
});

// export the playerinterface for allPlayers to use

export const { setUsername, setRoomId, setPlayerId, setIsHost } = playerSlice.actions;
export default playerSlice.reducer;
