import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CardObj, WordsWithTeamIdsObj } from '../../../utils/interfaces'; // For TS
//firebase:
import { database } from '../../../utils/firebase';
import { onValue, ref, off } from 'firebase/database';
//redux:
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/index.js';
import { setWordsInGame } from '../../../store/wordsInGameSlice';

function OnValueCardsRef() {
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const { playerId } = useSelector((state: RootState) => state.player);
  const { teamOneSpymaster } = useSelector((state: RootState) => state.teamOne);
  const { teamTwoSpymaster } = useSelector((state: RootState) => state.teamTwo);

  // Firebase Refs:
  const cardsRef = ref(database, `rooms/${roomId}/gameboard`);

  const playerIsSpymaster = teamOneSpymaster?.playerId === playerId || teamTwoSpymaster?.playerId === playerId;

  useEffect(() => {
    onValue(cardsRef, async (cardSnapshot) => {
      if (cardSnapshot.exists()) {
        if (playerIsSpymaster) {
          console.log('setting spy board...');
          off(cardsRef); // don't listen to this listener anymore.
          //get set of cards with team ids from backend and set spymaster words
          let wordsWithTeamIds = {} as WordsWithTeamIdsObj;
          let spyWords = await axios.get(`/api/card/get25/forRoom/${roomId}`);
          spyWords.data.forEach(
            (card: CardObj) =>
              (wordsWithTeamIds[card.id] = {
                id: card.id,
                isVisibleToAll: card.isVisibleToAll,
                wordString: card.word.word,
                word: card.word,
                wordId: card.wordId,
                boardId: card.boardId,
                teamId: card.teamId,
              }),
          );
          const values = Object.values(wordsWithTeamIds);
          dispatch(setWordsInGame(values));
        } else {
          console.log('setting operative board...');
          off(cardsRef); // don't listen to this listener anymore.
          //update our redux to reflect that
          const cardsFromSnapshot = cardSnapshot.val();
          const values = Object.values(cardsFromSnapshot);
          dispatch(setWordsInGame(values));
        }
      }
    });
  }, [playerId, teamOneSpymaster, teamTwoSpymaster]);
}

export default OnValueCardsRef;
