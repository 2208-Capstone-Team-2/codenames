import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ref, update } from 'firebase/database';
import { database } from '../../utils/firebase';
import Button from '@mui/material/Button';
import { RootState } from '../../store';

interface WordPackType {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;

}
const SetupGame = () => {
  const [wordpacks, setWordpacks] = useState<WordPackType[]>([]);
  const [selectedWordPackIds, setSelectedWordPackIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const roomId = useSelector((state: RootState) => state.player.roomId);

  let gameRef = ref(database, 'rooms/' + roomId + '/game/');
  //----------------fetch all packs for users to select from-----------------//
  const fetchWordPacks = async () => {
    setIsLoading(true);
    const { data } = await axios.get('/api/wordpack');
    setWordpacks(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchWordPacks();
  }, []);

  //------------------functions to handle selection---------------------//

  const handleWordPackSelection = (event: React.ChangeEvent<HTMLInputElement>) => {

    const idInteractedWith = event.target.value;
    //if event.target.value is already in the array, we delete the already existed one in the array and return
    if (selectedWordPackIds.includes(idInteractedWith)) {
      // This creates a new array where each element is NOT the id interacted with.
      const filtered = selectedWordPackIds.filter((element) => element !== idInteractedWith);
      setSelectedWordPackIds(filtered);
    }
    // if idInteractedWithis not in the array, we add it in
    else {
      setSelectedWordPackIds([...selectedWordPackIds, idInteractedWith]);
    }
  };

  //-------------get the res.send data from the backend and set it up in the store
  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('hello')
    console.log({ selectedWordPackIds })
    const { data } = await axios.post(`/api/card/make25/forRoom/${roomId}`, { selectedWordPackIds });
    const updates: any = {};
    data.forEach(
      (card: any) =>
      (updates[card.id] = {
        id: card.id,
        isVisibleToAll: card.isVisibleToAll,
        wordString: card.word.word,
        wordId: card.wordId,
        boardId: card.boardId,
        teamId: null,
      }),
    );
    // updates looks like this:
    // updates = {
    //   1: {id: 1, isVisibleToAll: false, ....}, 
    //   2: {id: 1, isVisibleToAll: false, ....}
    //   etc
    //  }

    update(ref(database, 'rooms/' + roomId), {
      gameboard: updates,
    });
  };

  const startGame = async () => {
    console.log('startingGame');
    // gamestatus default value in firebase is 'not playing'.
    // when startGame is clicked, firebase gamestatus changes to 'team1SpyTurn'
    update(gameRef, { gameStatus: 'team1SpyTurn' });
  };

  if (isLoading) return <p>Loading...</p>;
  else
    return (
      <div className="setUpGame">
        <>
          Please select a pack of words
          <form onSubmit={submitHandler}>
            {wordpacks.map((wordpack) => (
              <div key={wordpack.id}>
                <input type="checkbox" onChange={handleWordPackSelection} value={wordpack.id} />
                <label htmlFor={wordpack.name}> {wordpack.name} Word Pack</label>
              </div>
            ))}
            <Button
              variant="contained"
              type="submit"
              disabled={selectedWordPackIds.length === 0 ? true : false}
              onClick={startGame}
            >
              Start game
            </Button>
          </form>
        </>
      </div>
    );
};

export default SetupGame;
