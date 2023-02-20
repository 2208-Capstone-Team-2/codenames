import React from 'react';
import { useSelector } from 'react-redux';
import { ref, update, get, set, child, push, onValue } from 'firebase/database';
import { database } from '../../../utils/firebase';
import axios from 'axios';
import { RootState } from '../../../store';
import { Operative, CardObj, SingleHistoryObject } from '../../../utils/interfaces';
import { MouseEvent } from 'react';
import { revealCard } from '../../../store/wordsInGameSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ReactCardFlip from 'react-card-flip';
import allCardStyles from './cardStyles';
import { useMediaQuery } from '@mui/material';

const Card = (word: CardObj) => {
  const { playerId, roomId } = useSelector((state: RootState) => state.player);
  const { team1Id, teamOneOperatives } = useSelector((state: RootState) => state.teamOne);
  const { team2Id, teamTwoOperatives } = useSelector((state: RootState) => state.teamTwo);
  const teamOneRemainingCards = useSelector((state: RootState) => state.game.team1RemainingCards);
  const teamTwoRemainingCards = useSelector((state: RootState) => state.game.team2RemainingCards);
  const gameStatus = useSelector((state: RootState) => state.game.status);
  const assassinTeamId = useSelector((state: RootState) => state.assassinAndBystander.assassinTeamId);
  const bystanderTeamId = useSelector((state: RootState) => state.assassinAndBystander.bystanderTeamId);
  const guessesRemaining = useSelector((state: RootState) => state.game.guessesRemaining);

  // firebase room  & players reference
  let gameRef = ref(database, 'rooms/' + roomId + '/game/');
  let gameHistoryRef = ref(database, 'rooms/' + roomId + '/game/' + 'history');
  let singleCardRef = ref(database, `rooms/${roomId}/gameboard/${word.id}`);
  const teamOneOperativesIds = Object.values(teamOneOperatives).map((operative: Operative) => {
    return operative.playerId;
  });
  const teamTwoOperativesIds = Object.values(teamTwoOperatives).map((operative: Operative) => {
    return operative.playerId;
  });

  const dispatch = useDispatch();

  const submitAnswer = async (e: MouseEvent) => {
    e.preventDefault();
    if (word.isVisibleToAll) return; // Don't let player submit answer for an already revealed card
    let wordId = word.id;
    // update word to visible on BACKEND
    let cardToReveal = await axios.put(`/api/card/${wordId}`, { roomId });
    let revealedCard = cardToReveal.data;
    let cardBelongsTo = revealedCard.teamId;

    //  if its team 1 ops turn and they are the one who clicked on the card...
    if (gameStatus === 'team1OpsTurn' && teamOneOperativesIds.includes(playerId)) {
      // update word to visible on FIREBASE
      get(singleCardRef).then((snapshot) => {
        const doesCardExist: boolean = snapshot.exists();
        if (doesCardExist) update(singleCardRef, { isVisibleToAll: true, teamId: cardBelongsTo });
      });

      if (cardBelongsTo === assassinTeamId) {
        const newGameHistory: string = 'Team 1 hits the assassin! team 1 lose.';
        const newHistoryKey = push(child(ref(database), 'history')).key;
        const updates = {} as SingleHistoryObject;
        updates[`${newHistoryKey}`] = newGameHistory;
        update(gameHistoryRef, updates);
        update(singleCardRef, { isVisibleToAll: true, teamId: cardBelongsTo });
        update(gameRef, { gameStatus: 'complete' });
        set(child(gameRef, 'winner'), 'team-2');
        set(child(gameRef, 'loser'), 'team-1');
      }
      if (cardBelongsTo === bystanderTeamId) {
        const newGameHistory: string = 'Team 1 hits a bystander! Turn is over!';
        const newHistoryKey = push(child(ref(database), 'history')).key;
        const updates = {} as SingleHistoryObject;
        updates[`${newHistoryKey}`] = newGameHistory;
        update(gameHistoryRef, updates);
        endTurn();
      }
      if (cardBelongsTo === team1Id) {
        const newGameHistory: string = `Good job Team 1! ${revealedCard.word.word} is the correct codename!`;
        const newHistoryKey = push(child(ref(database), 'history')).key;
        const updates = {} as SingleHistoryObject;
        updates[`${newHistoryKey}`] = newGameHistory;
        update(gameHistoryRef, updates);
        update(gameRef, {
          team1RemainingCards: teamOneRemainingCards - 1,
        });
        set(child(gameRef, 'guessesRemaining'), guessesRemaining - 1);
      }
      if (cardBelongsTo === team2Id) {
        const newGameHistory: string = 'thats the other teams card! turn is over!';
        const newHistoryKey = push(child(ref(database), 'history')).key;
        const updates = {} as SingleHistoryObject;
        updates[`${newHistoryKey}`] = newGameHistory;
        update(gameHistoryRef, updates);
        update(gameRef, { team2RemainingCards: teamTwoRemainingCards - 1 });
        endTurn();
      }
    } else if (gameStatus === 'team2OpsTurn' && teamTwoOperativesIds.includes(playerId)) {
      update(singleCardRef, { isVisibleToAll: true, teamId: cardBelongsTo });

      if (cardBelongsTo === assassinTeamId) {
        const newGameHistory: string = 'Team 2 hits the assassin! team 2 lose.';

        const newHistoryKey = push(child(ref(database), 'history')).key;

        const updates = {} as SingleHistoryObject;
        updates[`${newHistoryKey}`] = newGameHistory;
        update(gameHistoryRef, updates);
        update(singleCardRef, { isVisibleToAll: true, teamId: cardBelongsTo });
        // team 1 wins if team 2 hits assassin. logic is triggered on roomview
        update(gameRef, { gameStatus: 'complete' });
        set(child(gameRef, 'winner'), 'team-1');
        set(child(gameRef, 'loser'), 'team-2');
      }
      if (cardBelongsTo === bystanderTeamId) {
        const newGameHistory: string = 'team 2 hits a bystander! Turn is over!';
        const newHistoryKey = push(child(ref(database), 'history')).key;
        const updates = {} as SingleHistoryObject;
        updates[`${newHistoryKey}`] = newGameHistory;
        update(gameHistoryRef, updates);
        endTurn();
      }
      if (cardBelongsTo === team2Id) {
        const newGameHistory: string = `Good job Team 2! ${revealedCard.word.word} is the correct codename!`;
        const newHistoryKey = push(child(ref(database), 'history')).key;
        const updates = {} as SingleHistoryObject;
        updates[`${newHistoryKey}`] = newGameHistory;
        update(gameHistoryRef, updates);
        update(gameRef, { team2RemainingCards: teamTwoRemainingCards - 1 });
        set(child(gameRef, 'guessesRemaining'), guessesRemaining - 1);
      }
      if (cardBelongsTo === team1Id) {
        const newGameHistory: string = 'thats the other teams card! turn is over!';
        const newHistoryKey = push(child(ref(database), 'history')).key;
        const updates = {} as SingleHistoryObject;
        updates[`${newHistoryKey}`] = newGameHistory;
        update(gameHistoryRef, updates);
        update(gameRef, { team1RemainingCards: teamOneRemainingCards - 1 });
        endTurn();
      }
    } else {
      console.log('its not my turn');
    }
  };

  const endTurn = () => {
    console.log('ending turn');
    let nextStatus;
    // if cards remain on both sides, swap to the next teams turn
    if (teamOneRemainingCards && teamTwoRemainingCards) {
      if (gameStatus === 'team1OpsTurn') {
        nextStatus = 'team2SpyTurn';
        update(gameRef, { gameStatus: nextStatus, guessesRemaining: 0 });
      }
      if (gameStatus === 'team2OpsTurn') {
        nextStatus = 'team1SpyTurn';
        update(gameRef, { gameStatus: nextStatus, guessesRemaining: 0 });
      }
    }
  };

  useEffect(() => {
    onValue(singleCardRef, (snapshot) => {
      if (snapshot.exists()) {
        let revealed = snapshot.val().isVisibleToAll;
        let wordId = snapshot.val().id;
        let teamId = snapshot.val().teamId;
        if (revealed) {
          dispatch(revealCard({ wordId, teamId }));
        }
      }
    });
  }, []);

  // Decide on the styling based on these comparisons
  let cardStyles: any = {}; // Todo: give this an actual interface
  if (word.teamId === team1Id) cardStyles = allCardStyles.redCardStyles;
  if (word.teamId === team2Id) cardStyles = allCardStyles.blueCardStyles;
  if (word.teamId === bystanderTeamId) cardStyles = allCardStyles.beigeCardStyles;
  if (word.teamId === assassinTeamId) cardStyles = allCardStyles.blackCardStyles;
  if (!word.teamId) cardStyles = allCardStyles.unknownCardStyles;

  // Use mediaquery to adjust card height and width - 600px is our 'small screen' breakpoint
  const isSmallScreen = useMediaQuery('(max-width:600px');
  const isTabletScreen = useMediaQuery('(min-width: 601px) and (max-width: 1400px)');

  if (isSmallScreen) {
    // What you want for <600px screen styling on card front and back props goes here.
    cardStyles.front.width = '48pt';
    cardStyles.front.height = '38.4pt';
    cardStyles.back.width = '48pt';
    cardStyles.back.height = '38.4pt';
    cardStyles.front.border = 'solid 1px black';
    cardStyles.front.fontSize = '10px';
  }
  if (isTabletScreen) {
    // here covers screen size from 601-1400.
    cardStyles.front.width = '84pt';
    cardStyles.front.height = '67.2pt';
    cardStyles.back.width = '84pt';
    cardStyles.back.height = '67.2pt';
    cardStyles.front.border = 'solid 1px black';
    cardStyles.front.fontSize = '12px';
  }
  if (!isSmallScreen && !isTabletScreen) {
    // What you want for >600px screen styling on card front and back props goes here.
    cardStyles.front.width = '120pt';
    cardStyles.front.height = '96pt';
    cardStyles.back.width = '120pt';
    cardStyles.back.height = '96pt';
  }

  return (
    <div onClick={submitAnswer}>
      <ReactCardFlip isFlipped={word.isVisibleToAll} cardStyles={cardStyles}>
        <div> {word.wordString} </div>
        <div> back of card!!</div>
      </ReactCardFlip>
    </div>
  );
};

export default Card;
