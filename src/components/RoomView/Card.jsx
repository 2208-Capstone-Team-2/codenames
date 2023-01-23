import React from 'react';
import { useSelector } from 'react-redux';
import './card.css';
import { ref, update, get } from 'firebase/database';
import { database } from '../../utils/firebase';

const Card = ({ singleWord, value }) => {
  const { playerId, roomId } = useSelector((state) => state.player);
  const { teamOneOperatives } = useSelector((state) => state.teamOne);
  const { teamTwoOperatives } = useSelector((state) => state.teamTwo);
  const teamOneRemainingCards = useSelector((state) => state.game.team1RemainingCards);
  const teamTwoRemainingCards = useSelector((state) => state.game.team2RemainingCards);
  let gameStatus = useSelector((state) => state.game.status);

  // firebase room  & players reference
  let gameRef = ref(database, 'rooms/' + roomId + '/game/');
  let singleCardRef = ref(database, `rooms/${roomId}/gameboard/${singleWord.id}`);

  const teamOneOperativesIds = Object.values(teamOneOperatives).map((operative) => {
    return operative.playerId;
  });
  const teamTwoOperativesIds = Object.values(teamTwoOperatives).map((operative) => {
    return operative.playerId;
  });

  const submitAnswer = async (e) => {
    e.preventDefault();

    // axios.get -- get which team the card belongs to
    // check against the team ids in redux store
    // validate guess in below logic

    // let {data} = await axios.post('/api/answerKey/cardId', auth stuff)
    // let cardBelongsTo = data.teamId
    // reveal card color and disable clicking the card

    // values:
    // 0 = assassin
    // 1 = team 1
    // 2 = team 2
    // 3 = bystander

    let cardBelongsTo = e.target.value;

    //  if its team 1 ops turn and they are the one who clicked on the card...
    if (gameStatus === 'team1OpsTurn' && teamOneOperativesIds.includes(playerId)) {
      get(singleCardRef).then((snapshot) => {
        const doesCardExist = snapshot.exists();
        if (doesCardExist) {
          update(singleCardRef, { isVisibleToAll: true });
          console.log(snapshot.val());
        } else {
          console.log('no card');
        }
      });

      if (cardBelongsTo === '0') {
        console.log('you hit the assassin! you lose.');
        // set winner = other team
        // do other celebratory stuff
        // show reset game button
      }
      if (cardBelongsTo === '3') {
        console.log('you hit a bystander!');
        endTurn();
      }
      if (cardBelongsTo === '1') {
        console.log('thats correct!');
        await update(gameRef, {
          team1RemainingCards: teamOneRemainingCards - 1,
        });
        // decrement from guesses remaining from spymasters clue
        // if guesses remaining === 0, endTurn()
      }
      if (cardBelongsTo === '2') {
        console.log('thats the other teams card! turn is over');
        update(gameRef, { team2RemainingCards: teamTwoRemainingCards - 1 });
        endTurn();
      }
    } else if (gameStatus === 'team2OpsTurn' && teamTwoOperativesIds.includes(playerId)) {
      // instead of 'revealing', set 'isvisibletoall' to true
      update(singleCardRef, { isVisibleToAll: true });

      // reveal card
      if (cardBelongsTo === '0') {
        console.log('you hit the assassin! you lose.');
        // set winner = other team
        // do other celebratory stuff
        // show reset game button
      }
      if (cardBelongsTo === '3') {
        console.log('you hit a bystander!');
        endTurn();
      }
      if (cardBelongsTo === '2') {
        console.log('thats correct!');
        update(gameRef, { team2RemainingCards: teamTwoRemainingCards - 1 });
        // decrement from guesses remaining from spymasters clue
        // if guesses remaining === 0, endTurn()
      }
      if (cardBelongsTo === '1') {
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
      {!singleWord.isVisibleToAll && (
        <button className="notYetRevealed" value={value} onClick={submitAnswer}>
          {singleWord.word}
        </button>
      )}
      {/* if it is visible, show the color for the team, and make it not clickable 
      (buttons made them more visually appealing for the time being but we can edit css obviously) */}
      {singleWord.isVisibleToAll && value === 1 && <button className="redRevealed">{singleWord.word}</button>}
      {singleWord.isVisibleToAll && value === 2 && <button className="blueRevealed">{singleWord.word}</button>}
      {singleWord.isVisibleToAll && value === 3 && <button className="beigeRevealed">{singleWord.word}</button>}
      {singleWord.isVisibleToAll && value === 0 && <button className="blackRevealed">{singleWord.word}</button>}
    </>
  );
};

export default Card;
