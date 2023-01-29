<<<<<<< HEAD
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ref, update } from 'firebase/database';
import { database } from '../../utils/firebase';
import Button from '@mui/material/Button';
=======
import axios from "axios";
import React, { useEffect, useState } from "react";
import { setWordsInGame } from "../../store/wordsInGameSlice";
import { useDispatch, useSelector } from "react-redux";
import { getDatabase, ref, update,onValue  } from "firebase/database";
>>>>>>> 6a2080f (send data to firebase and set up redux store)

const SetupGame = () => {
  const [wordpacks, setWordpacks] = useState([]);
  const [selectedWordPackId, setSelectedWordPackId] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
<<<<<<< HEAD
  const roomId = useSelector((state) => state.player.roomId);

  let gameRef = ref(database, 'rooms/' + roomId + '/game/');

  //----------------fetch all packs for users to select from-----------------//
=======
  const database = getDatabase();
  const roomId = useSelector((state) => state.player.roomId);
  const dispatch=useDispatch()
//   //----------------fet all packs for users to select from-----------------//
>>>>>>> 6a2080f (send data to firebase and set up redux store)
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

  const handleWordPackSelection = (event) => {
    const idInteractedWith = event.target.value;

    //if event.target.value is already in the array, we delete the already existed one in the array and return
    if (selectedWordPackId.includes(idInteractedWith)) {
      // This creates a new array where each element is NOT the id interacted with.
      const filtered = selectedWordPackId.filter((element) => element !== idInteractedWith);
      setSelectedWordPackId(filtered);
    }
    // if idInteractedWithis not in the array, we add it in
    else {
      setSelectedWordPackId([...selectedWordPackId, idInteractedWith]);
    }
  };

  //-------------get the res.send data from the backend and set it up in the store
  const submitHandler = async (event) => {
    event.preventDefault();
<<<<<<< HEAD
=======
axios.post("/api/25words", {selectedWordPackId})
 .then(response =>{return response})
 .then((result)=>{
update(ref(database, 'rooms/' + roomId), {
    words:result.data
  })
let createStore=ref(database, "rooms/" + roomId);
  onValue(createStore, (snapshot) => {
    if (snapshot.exists()) {
      const room = snapshot.val();
      const values = Object.values(room.words);
      console.log(values)
      dispatch(setWordsInGame(values));
      console.log("new words in game")
    } else {
      console.log("no words yet");
    }
  });
})
>>>>>>> 6a2080f (send data to firebase and set up redux store)

    const response = await axios.post(`/api/card/make25/forRoom/${roomId}`, { selectedWordPackId });
    // console.log({ response });
    const updates = {};
    await response.data.forEach(
      (card) =>
        (updates[card.id] = {
          id: card.id,
          isVisibleToAll: card.isVisibleToAll,
          word: card.word.word,
          wordId: card.wordId,
          boardId: card.boardId,
        }),
    );
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
      <div>
        <>
          Please select a pack of words
          <form onSubmit={submitHandler}>
            {wordpacks.map((wordpack) => (
              <div key={wordpack.id}>
                <input type="checkbox" onChange={handleWordPackSelection} id={wordpack.id} value={wordpack.id} />
                <label htmlFor={wordpack.name}> {wordpack.name} Word Pack</label>
              </div>
            ))}
            <Button
              variant="contained"
              type="submit"
              disabled={selectedWordPackId.length === 0 ? true : false}
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
