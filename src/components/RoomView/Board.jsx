import React, { useEffect } from 'react';
import Card from './Card.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getDatabase, ref, onValue } from 'firebase/database';
import { setWordsInGame } from '../../store/wordsInGameSlice';

const Board = () => {
  const words = useSelector((state) => state.wordsInGame);
  const roomId = useSelector((state) => state.player.roomId);
  const style = {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto auto auto',
    marginTop: '5%',
    gap: '2%',
    justifyContent: 'center',
    alightItems: 'center',
  };

  const database = getDatabase();
  const dispatch = useDispatch();

  let cardsRef = ref(database, `rooms/${roomId}/gameboard`);

  // On load...
  useEffect(() => {
    // Look to see if there are cards already loaded for the room
    onValue(cardsRef, (snapshot) => {
      // If there are cards in /room/roomId/cards
      if (snapshot.exists()) {
        //update our redux to reflect that
        const cardsFromSnapshot = snapshot.val();
        const values = Object.values(cardsFromSnapshot);
        dispatch(setWordsInGame(values));
      }
    });
  }, []);
  return (
    <div style={style}>
      {words.wordsInGame.map((singleWord) => {
        return (
          <div key={singleWord.id}>
            <Card singleWord={singleWord} />
            {/* maybe set this to visible after players select it?  */}
            <div style={{ display: 'none' }}>card result</div>
          </div>
        );
      })}
    </div>
  );
};

export default Board;
