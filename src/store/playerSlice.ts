import { createSlice } from '@reduxjs/toolkit';

interface playerInitialStateType {
  playerId: string;
  username: string;
  roomId: string;
  isHost: boolean;
}

const playerInitialState: playerInitialStateType = {
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
export { playerInitialStateType, playerInitialState };

export const { setUsername, setRoomId, setPlayerId, setIsHost } = playerSlice.actions;
export default playerSlice.reducer;
