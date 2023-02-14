import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CardObj, WordsWithTeamIdsObj } from '../../../utils/interfaces'; // For TS

//firebase:
import { database } from '../../../utils/firebase';
import { onValue, get, ref } from 'firebase/database';
//redux:
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/index.js';
import { setWordsInGame } from '../../../store/wordsInGameSlice';

function OnValueCardsRef() {
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

  useEffect(() => {
    // Look to see if there are cards already loaded for the room

    onValue(cardsRef, async (cardSnapshot) => {
      // for some reason, i'm having trouble accessing the redux teams
      //  data even though it exists on firebase and redux
      // tried a few diff ways and this is what i could get to work. bulky :(
      if (cardSnapshot.exists()) {
        let isSpectator = true;

        console.log('first?');
        get(teamOneSpymasterRef).then(async (snapshot) => {
          if (snapshot.exists()) {
            let spymaster = snapshot.val();
            if (spymaster.playerId === playerId) {
              isSpectator = false;
              console.log('setting spy board...');
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
        console.log('2nd?');

        get(teamTwoSpymasterRef).then(async (snapshot) => {
          if (snapshot.exists()) {
            let spymaster = snapshot.val();
            if (spymaster.playerId === playerId) {
              isSpectator = false;
              console.log('setting spy board...');
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
        console.log('3rd?');

        get(teamOneOperativesRef).then((snapshot) => {
          if (snapshot.exists()) {
            let operatives = snapshot.val();
            let operativesIds = Object.keys(operatives);
            if (operativesIds.includes(playerId)) {
              isSpectator = false;
              console.log('setting opertive board...');
              //update our redux to reflect that
              const cardsFromSnapshot = cardSnapshot.val();
              const values = Object.values(cardsFromSnapshot);
              dispatch(setWordsInGame(values));
            }
          }
        });
        console.log('4th?');

        get(teamTwoOperativesRef).then((snapshot) => {
          if (snapshot.exists()) {
            let operatives = snapshot.val();
            let operativesIds = Object.keys(operatives);
            if (operativesIds.includes(playerId)) {
              isSpectator = false;

              console.log('setting operative board...');
              //update our redux to reflect that
              const cardsFromSnapshot = cardSnapshot.val();
              const values = Object.values(cardsFromSnapshot);
              dispatch(setWordsInGame(values));
            }
          }
        });
        get(nestedPlayerRef).then((snapshot) => {
          if (snapshot.exists()) {
            if (isSpectator) {
              console.log('setting spectator board...');
              const cardsFromSnapshot = cardSnapshot.val();
              const values = Object.values(cardsFromSnapshot);
              dispatch(setWordsInGame(values));
            }
          }
        });
      }
    });
  }, [playerId]);
}

export default OnValueCardsRef;
