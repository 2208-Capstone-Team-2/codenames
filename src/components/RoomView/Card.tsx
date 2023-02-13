import React from 'react';
import { useSelector } from 'react-redux';
import { ref, update, get, set, child, push } from 'firebase/database';
import { database } from '../../utils/firebase';
import axios from 'axios';
import { RootState } from '../../store';
import { Operative, CardObj, SingleHistoryObject } from '../../utils/interfaces';
import { MouseEvent } from 'react';
import allCardStyles from './cardStyles';
import ReactCardFlip from 'react-card-flip';

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

  const submitAnswer = async (e: MouseEvent) => {
    console.log('clicked!');
    e.preventDefault();
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
        /* below sets the cards to 0 and declares opposing team as winner in 
        roomview seems dishonest bc they dont actually have 0 remaining cards, 
        but it'll  trigger code that is doing what we want it to in roomview 
        instead of writing redundant logic*/
        update(gameRef, { gameStatus: 'complete', team2RemainingCards: 0 });
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
        update(gameRef, { gameStatus: 'complete', team1RemainingCards: 0 });
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

  // changing turns depending on who clicks on the end turn button.
  // only operatives should see this button when its their 'turn'
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

  let cardStyles = {};
  if (word.teamId === team1Id) {
    console.log('giving red revealed styles');
    cardStyles = allCardStyles.redCardStyles;
  }
  if (word.teamId === team2Id) {
    console.log('giving blue revealed styles');
    cardStyles = allCardStyles.blueCardStyles;
  }
  if (word.teamId === bystanderTeamId) {
    console.log('giving beige revealed styles');
    cardStyles = allCardStyles.beigeCardStyles;
  }
  if (word.teamId === assassinTeamId) {
    console.log('giving black revealed styles');
    cardStyles = allCardStyles.blackCardStyles;
  }
  if (!word.teamId) {
    console.log('team id is undef most likely');
    cardStyles = allCardStyles.unknownCardStyles;
  }

  return (
    <div onClick={submitAnswer}>
      <ReactCardFlip isFlipped={word.isVisibleToAll} flipDirection="vertical" cardStyles={cardStyles}>
        <div> {word.wordString} </div>
        <div> back of card!!</div>
      </ReactCardFlip>
    </div>
  );
};

export default Card;
