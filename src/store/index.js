import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './playerSlice';
import allPlayersReducer from './allPlayersSlice';
import wordsInGameReducer from './wordsInGameSlice';
import teamOneReducer from './teamOneSlice';
import teamTwoReducer from './teamTwoSlice';
import clueReducer from './clueSlice';
import gameReducer from './gameSlice';
import assassinAndBystanderReducer from './assassinAndBystanderSlice';

const store = configureStore({
  reducer: {
    player: playerReducer,
    allPlayers: allPlayersReducer,
    wordsInGame: wordsInGameReducer,
    game: gameReducer,
    teamOne: teamOneReducer,
    teamTwo: teamTwoReducer,
    clues: clueReducer,
    assassinAndBystander: assassinAndBystanderReducer,
  },
});

export default store;
