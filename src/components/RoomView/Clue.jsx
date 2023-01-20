import React, { useState } from "react";
import { setCurrentClue } from "../../store/clueSlice";
import { useDispatch } from "react-redux";
import { database } from "../../utils/firebase";
import { ref, child, push, update, set } from "firebase/database";
import { useSelector } from "react-redux";

const Clue = () => {
  const [clueString, setClueString] = useState("");
  const [clueNumber, setClueNumber] = useState(null);
  const playerId = useSelector((state) => state.player.playerId);
  const roomId = useSelector((state) => state.player.roomId);
  let cluesRef = ref(database, "rooms/" + roomId + "/clues/");

  // const [team, setTeam] = useState("");
  const dispatch = useDispatch();

  const handleClueChange = (event) => {
    setClueString(event.target.value);
  };

  const handleNumberChange = (event) => {
    setClueNumber(Number(event.target.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // send axios request to check that clue is valid (no words on board)
    // cluenumber cannot exceed cards remaining
    // if clue is valid: dispatch it to redux
    // send clue to firebase
    const clueData = {
      clueString,
      clueNumber,
      playerSubmitting: playerId,
    };

    // Get a key for a new clue.
    const newClueKey = push(child(ref(database), "clues")).key;

    console.log(newClueKey);
    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates[newClueKey] = clueData;

    dispatch(setCurrentClue(clueData));
    return update(cluesRef, updates);
  };

  return (
    <div className="MessageInput">
      <form>
        <input
          type="text"
          placeholder="Clue..."
          onChange={(e) => {
            handleClueChange(e);
          }}
        />
        <input
          type="number"
          id="hour"
          min="1"
          max="24"
          onChange={(e) => {
            handleNumberChange(e);
          }}
        />
        <button type="submit" onClick={handleSubmit}>
          submit
        </button>
      </form>
    </div>
  );
};

export default Clue;
