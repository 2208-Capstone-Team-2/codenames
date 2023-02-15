import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CardObj, WordsWithTeamIdsObj } from '../../../utils/interfaces'; // For TS
//firebase:
import { database } from '../../../utils/firebase';
import { onValue, get, ref, off } from 'firebase/database';
//redux:
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/index.js';
import { setWordsInGame } from '../../../store/wordsInGameSlice';

function boardSetting() {
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const { playerId } = useSelector((state: RootState) => state.player);

  // Firebase Refs:
  const cardsRef = ref(database, `rooms/${roomId}/gameboard`);
  const teamOneSpymasterRef = ref(database, `rooms/${roomId}/team-1/spymaster/`);
  const teamOneOperativesRef = ref(database, `rooms/${roomId}/team-1/operatives/`);
  const teamTwoOperativesRef = ref(database, `rooms/${roomId}/team-2/operatives/`);
  const teamTwoSpymasterRef = ref(database, `rooms/${roomId}/team-2/spymaster/`);
  const nestedPlayerRef = ref(database, `rooms/${roomId}/players/${playerId}/`);

  if (playerId) {
    const unSubscribeAllCardsListener = onValue(cardsRef, async (cardSnapshot) => {
      if (cardSnapshot.exists()) {
        get(teamOneSpymasterRef).then(async (snapshot) => {
          if (snapshot.exists()) {
            let spymaster = snapshot.val();
            if (spymaster.playerId === playerId) {
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
            }
          }
        });
        get(teamTwoSpymasterRef).then(async (snapshot) => {
          if (snapshot.exists()) {
            let spymaster = snapshot.val();
            if (spymaster.playerId === playerId) {
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
            }
          }
        });
        get(teamOneOperativesRef).then((snapshot) => {
          if (snapshot.exists()) {
            let operatives = snapshot.val();
            let operativesIds = Object.keys(operatives);
            if (operativesIds.includes(playerId)) {
              console.log('setting opertive board...');
              off(cardsRef); // don't listen to this listener anymore.

              //update our redux to reflect that
              const cardsFromSnapshot = cardSnapshot.val();
              const values = Object.values(cardsFromSnapshot);
              dispatch(setWordsInGame(values));
            }
          }
        });
        get(teamTwoOperativesRef).then((snapshot) => {
          if (snapshot.exists()) {
            let operatives = snapshot.val();
            let operativesIds = Object.keys(operatives);
            if (operativesIds.includes(playerId)) {
              console.log('setting operative board...');
              off(cardsRef); // don't listen to this listener anymore.

              //update our redux to reflect that
              const cardsFromSnapshot = cardSnapshot.val();
              const values = Object.values(cardsFromSnapshot);
              dispatch(setWordsInGame(values));
            }
          }
        });
        get(nestedPlayerRef).then((snapshot) => {
          if (snapshot.exists()) {
            console.log('setting spectator board...');
            off(cardsRef); // don't listen to this listener anymore.

            const cardsFromSnapshot = cardSnapshot.val();
            const values = Object.values(cardsFromSnapshot);
            dispatch(setWordsInGame(values));
          }
        });
      }
    });
    return unSubscribeAllCardsListener;
  }
}

export default boardSetting;
