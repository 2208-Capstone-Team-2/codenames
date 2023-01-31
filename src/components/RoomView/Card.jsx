import React from 'react';
import { useSelector } from 'react-redux';
import './card.css';
import { ref, update, get, set, child, push } from 'firebase/database';
import { database } from '../../utils/firebase';
import axios from 'axios';
import { useState } from 'react';

const Card = ({ word }) => {
  const { playerId, roomId } = useSelector((state) => state.player);
  const { team1Id, teamOneOperatives } = useSelector((state) => state.teamOne);
  const { team2Id, teamTwoOperatives } = useSelector((state) => state.teamTwo);
  const teamOneRemainingCards = useSelector((state) => state.game.team1RemainingCards);
  const teamTwoRemainingCards = useSelector((state) => state.game.team2RemainingCards);
  const gameStatus = useSelector((state) => state.game.status);
  const assassinTeamId = useSelector((state) => state.assassinAndBystander.assassinTeamId);
  const bystanderTeamId = useSelector((state) => state.assassinAndBystander.bystanderTeamId);
  const [teamsCard, setTeamsCard] = useState(0);
  const guessesRemaining = useSelector((state) => state.game.guessesRemaining);

  // firebase room  & players reference
  let gameRef = ref(database, 'rooms/' + roomId + '/game/');
  let gameHistoryRef = ref(database, 'rooms/' + roomId + '/game/' + 'history');
  let singleCardRef = ref(database, `rooms/${roomId}/gameboard/${word.id}`);
  const teamOneOperativesIds = Object.values(teamOneOperatives).map((operative) => {
    return operative.playerId;
  });
  const teamTwoOperativesIds = Object.values(teamTwoOperatives).map((operative) => {
    return operative.playerId;
  });

  const submitAnswer = async (e) => {
    e.preventDefault();

    let wordId = Number(e.target.value);
    // update word to visible on BACKEND
    let cardToReveal = await axios.put(`/api/card/${wordId}`, { roomId });
    let revealedCard = cardToReveal.data;
    let cardBelongsTo = revealedCard.teamId;

    setTeamsCard(cardBelongsTo);

    //  if its team 1 ops turn and they are the one who clicked on the card...
    if (gameStatus === 'team1OpsTurn' && teamOneOperativesIds.includes(playerId)) {
      // update word to visible on FIREBASE
      get(singleCardRef).then((snapshot) => {
        const doesCardExist = snapshot.exists();
        if (doesCardExist) {
          update(singleCardRef, { isVisibleToAll: true, teamId: cardBelongsTo });
        } else {
          console.log('no card');
        }
      });

      if (cardBelongsTo === assassinTeamId) {
        const newGameHistory = 'Team 1 hits the assassin! team 1 lose.';
        const newHistoryKey = push(child(ref(database), 'history')).key;
        const updates = {};
        updates[newHistoryKey] = newGameHistory;
        update(gameHistoryRef, updates);
        update(singleCardRef, { isVisibleToAll: true, teamId: cardBelongsTo });
        /* below sets the cards to 0 and declares opposing team as winner in 
        roomview seems dishonest bc they dont actually have 0 remaining cards, 
        but it'll  trigger code that is doing what we want it to in roomview 
        instead of writing redundant logic*/
        update(gameRef, { gameStatus: 'complete', team2RemainingCards: 0 });
      }
      if (cardBelongsTo === bystanderTeamId) {
        const newGameHistory = 'Team 1 hits a bystander! Turn is over!';
        const newHistoryKey = push(child(ref(database), 'history')).key;
        const updates = {};
        updates[newHistoryKey] = newGameHistory;
        update(gameHistoryRef, updates);
        endTurn();
      }
      if (cardBelongsTo === team1Id) {
        const newGameHistory = `Good job Team 1! ${revealedCard.word.word} is the correct codename!`;
        const newHistoryKey = push(child(ref(database), 'history')).key;
        const updates = {};
        updates[newHistoryKey] = newGameHistory;
        update(gameHistoryRef, updates);
        update(gameRef, {
          team1RemainingCards: teamOneRemainingCards - 1,
        });
        set(child(gameRef, 'guessesRemaining'), guessesRemaining - 1);
      }
      if (cardBelongsTo === team2Id) {
        const newGameHistory = 'thats the other teams card! turn is over!';
        const newHistoryKey = push(child(ref(database), 'history')).key;
        const updates = {};
        updates[newHistoryKey] = newGameHistory;
        update(gameHistoryRef, updates);
        update(gameRef, { team2RemainingCards: teamTwoRemainingCards - 1 });
        endTurn();
      }
    } else if (gameStatus === 'team2OpsTurn' && teamTwoOperativesIds.includes(playerId)) {
      update(singleCardRef, { isVisibleToAll: true, teamId: cardBelongsTo });

      if (cardBelongsTo === assassinTeamId) {
        const newGameHistory = 'Team 2 hits the assassin! team 2 lose.';

        const newHistoryKey = push(child(ref(database), 'history')).key;

        const updates = {};
        updates[newHistoryKey] = newGameHistory;
        update(gameHistoryRef, updates);
        update(singleCardRef, { isVisibleToAll: true, teamId: cardBelongsTo });
        // team 1 wins if team 2 hits assassin. logic is triggered on roomview
        update(gameRef, { gameStatus: 'complete', team1RemainingCards: 0 });
      }
      if (cardBelongsTo === bystanderTeamId) {
        const newGameHistory = 'team 2 hits a bystander! Turn is over!';
        const newHistoryKey = push(child(ref(database), 'history')).key;
        const updates = {};
        updates[newHistoryKey] = newGameHistory;
        update(gameHistoryRef, updates);
        endTurn();
      }
      if (cardBelongsTo === team2Id) {
        const newGameHistory = `Good job Team 2! ${revealedCard.word.word} is the correct codename!`;
        const newHistoryKey = push(child(ref(database), 'history')).key;
        const updates = {};
        updates[newHistoryKey] = newGameHistory;
        update(gameHistoryRef, updates);
        update(gameRef, { team2RemainingCards: teamTwoRemainingCards - 1 });
        set(child(gameRef, 'guessesRemaining'), guessesRemaining - 1);
      }
      if (cardBelongsTo === team1Id) {
        const newGameHistory = 'thats the other teams card! turn is over!';
        const newHistoryKey = push(child(ref(database), 'history')).key;
        const updates = {};
        updates[newHistoryKey] = newGameHistory;
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

  return (
    <>
      {/* if card hasnt been revealed, show this beige version and submit answer on click */}
      {!word.isVisibleToAll && (
        <button className="notYetRevealed" value={word.id} onClick={submitAnswer}>
          {word.word}
        </button>
      )}
      {/* if it is visible, show the color for the team, and make it not clickable 
      (buttons made them more visually appealing for the time being but we can edit css obviously) */}
      {word.isVisibleToAll && word.teamId === team1Id && <button className="redRevealed">{word.word}</button>}
      {word.isVisibleToAll && word.teamId === team2Id && <button className="blueRevealed">{word.word}</button>}
      {word.isVisibleToAll && word.teamId === bystanderTeamId && <button className="beigeRevealed">{word.word}</button>}
      {word.isVisibleToAll && word.teamId === assassinTeamId && <button className="blackRevealed">{word.word}</button>}
    </>
  );
};

export default Card;
