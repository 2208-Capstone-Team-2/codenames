import { createSlice } from '@reduxjs/toolkit';
import { PlayerType } from '../utils/interfaces';

const playerInitialState: PlayerType = {
  playerId: '',
  username: '',
  roomId: '',
  isHost: false,
  teamId: null,
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
    setTeamIdOnPlayer: (state, action) => {
      console.log('setting teamid on player!');
      console.log(action.payload)
      state.teamId = action.payload;
      // dispatch(setTeamIdOnPlayer(player[0].teamId))
    },
  },
});

// export the playerinterface for allPlayers to use

export const { setUsername, setRoomId, setPlayerId, setIsHost, setTeamIdOnPlayer } = playerSlice.actions; 
export default playerSlice.reducer;
