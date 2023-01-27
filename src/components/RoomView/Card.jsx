import React from 'react';
import { useSelector } from 'react-redux';
import './card.css';
import { ref, update, get, set } from 'firebase/database';
import { database } from '../../utils/firebase';
import axios from 'axios';
import { useState } from 'react';
import { setGuessesRemaining } from '../../store/clueSlice';
import { useDispatch } from 'react-redux';
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
  const guessesRemaining = useSelector((state) => state.clues.guessesRemaining);
  // firebase room  & players reference
  let gameRef = ref(database, 'rooms/' + roomId + '/game/');
  let singleCardRef = ref(database, `rooms/${roomId}/gameboard/${word.id}`);
  let guessesRemainingRef = ref(database, 'rooms/' + roomId + '/guessesRemaining');

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
        console.log('you hit the assassin! you lose.');
        // set winner = other team
        // do other celebratory stuff
        // show reset game button
      }
      if (cardBelongsTo === bystanderTeamId) {
        console.log('you hit a bystander!');
        endTurn();
      }
      if (cardBelongsTo === team1Id) {
        console.log('thats correct!');
        update(gameRef, {
          team1RemainingCards: teamOneRemainingCards - 1,
        });
        set(guessesRemainingRef, guessesRemaining - 1);

        // if guesses remaining === 0, endTurn()
      }
      if (cardBelongsTo === team2Id) {
        console.log('thats the other teams card! turn is over');
        update(gameRef, { team2RemainingCards: teamTwoRemainingCards - 1 });
        endTurn();
      }
    } else if (gameStatus === 'team2OpsTurn' && teamTwoOperativesIds.includes(playerId)) {
      update(singleCardRef, { isVisibleToAll: true, teamId: cardBelongsTo });

      if (cardBelongsTo === assassinTeamId) {
        console.log('you hit the assassin! you lose.');
        // set winner = other team
        // do other celebratory stuff
        // show reset game button
      }
      if (cardBelongsTo === bystanderTeamId) {
        console.log('you hit a bystander!');
        endTurn();
      }
      if (cardBelongsTo === team2Id) {
        console.log('thats correct!');
        update(gameRef, { team2RemainingCards: teamTwoRemainingCards - 1 });
        set(guessesRemainingRef, guessesRemaining - 1);

        // if guesses remaining === 0, endTurn()
      }
      if (cardBelongsTo === team1Id) {
        console.log('thats the other teams card! turn is over');
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
        update(gameRef, { gameStatus: nextStatus });
      }
      if (gameStatus === 'team2OpsTurn') {
        nextStatus = 'team1SpyTurn';
        update(gameRef, { gameStatus: nextStatus });
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
