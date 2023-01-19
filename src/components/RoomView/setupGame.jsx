import axios from "axios";
import React, { useEffect, useState } from "react";
import { setWordsInGame } from "../../store/wordsInGameSlice";
import { useDispatch, useSelector } from "react-redux";
import { ref, update, onValue } from "firebase/database";
import { database } from "../../utils/firebase";

function SetupGame() {
  const [wordpacks, setWordpacks] = useState([]);
  const [selectedWordPackId, setSelectedWordPackId] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const roomId = useSelector((state) => state.player.roomId);
  const words = useSelector((state) => state.wordsInGame);

  const dispatch = useDispatch();
  //   //----------------fet all packs for users to select from-----------------//
  const fetchWordPacks = async () => {
    setIsLoading(true);
    const { data } = await axios.get("/api/wordpack");
    setWordpacks(data);

    setIsLoading(false);
  };
  useEffect(() => {
    fetchWordPacks();
  }, []);

  //------------------functions to handle selection---------------------//

  const handleWordPackSelection = (event) => {
    //if event.target.value is already in the array, we delete the already existed one in the array and return
    if (selectedWordPackId.indexOf(event.target.value) > -1) {
      return selectedWordPackId.splice(
        selectedWordPackId.indexOf(event.target.value),
        1
      );
    }
    // if event.target.value is not in the array, we add it in
    else selectedWordPackId.indexOf(event.target.value) < 0;
    {
      setSelectedWordPackId([...selectedWordPackId, event.target.value]);
    }
  };

  //-------------get the res.send data from the backend and set it up in the store
  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .post("/api/25words", { selectedWordPackId })
      .then((response) => {
        return response;
      })
      .then((result) => {
        update(ref(database, "rooms/" + roomId), {
          gameboard: result.data,
        });

        let roomRef = ref(database, "rooms/" + roomId);
        onValue(roomRef, (snapshot) => {
          if (snapshot.exists()) {
            const room = snapshot.val();
            const values = Object.values(room.gameboard);
            dispatch(setWordsInGame(values));
            console.log("new words in game");
          } else {
            console.log("no words yet");
          }
        });
      });
  };
  if (isLoading) return <p>Loading...</p>;
  else
    return (
      <div>
        Please select a pack of words
        <form onSubmit={submitHandler}>
          {wordpacks.map((wordpack) => (
            <div key={wordpack.id}>
              <input
                type="checkbox"
                onChange={handleWordPackSelection}
                id={wordpack.id}
                value={wordpack.id}
              />
              <label htmlFor={wordpack.name}> {wordpack.name} Word Pack</label>
            </div>
          ))}

          <button
            type="submit"
            disabled={selectedWordPackId.length === 0 ? true : false}
          >
            Create Board
          </button>
        </form>
      </div>
    );
}

export default SetupGame;
