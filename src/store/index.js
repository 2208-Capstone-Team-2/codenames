import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './playerSlice';
import allPlayersReducer from './allPlayersSlice';
import wordsInGameReducer from './wordsInGameSlice';
import gameReducer from './gameSlice';
import teamOneReducer from './teamOneSlice';
import teamTwoReducer from './teamTwoSlice';
const store = configureStore({
  reducer: {
    player: playerReducer,
    allPlayers: allPlayersReducer,
    wordsInGame: wordsInGameReducer,
    game: gameReducer,
    teamOne: teamOneReducer,
    teamTwo: teamTwoReducer,
  },
});

export default store;
