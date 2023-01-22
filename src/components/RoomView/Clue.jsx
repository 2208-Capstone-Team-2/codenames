import React, { useState } from "react";
import { setCurrentClue } from "../../store/clueSlice";
import { useDispatch } from "react-redux";
import { database } from "../../utils/firebase";
import { ref, child, push, update, set } from "firebase/database";
import { useSelector } from "react-redux";
import pluralize from 'pluralize'
const Clue = () => {
  const [clueString, setClueString] = useState("");
  const [clueNumber, setClueNumber] = useState(null);
  const playerId = useSelector((state) => state.player.playerId);
  const roomId = useSelector((state) => state.player.roomId);
  //get all words in game
  const gameboard=useSelector((state)=>state.wordsInGame.wordsInGame);
  let arrayToCheck=[]
  //push all words in gameboard into an array
for (let i=0;i<gameboard.length;i++){
  arrayToCheck.push(gameboard[i].word.toUpperCase())
}
  let cluesRef = ref(database, "rooms/" + roomId + "/clues/");
  
  const dispatch = useDispatch();
  
  const handleClueChange = (event) => {
    //trim any extra space so users cannot submit "   clue" or '    ',
    //then convert all to uppercase to avoid case sensitive issue
    //then convert all to singular so users cannot use 'apples' or 'feet' to indicate 'apple','foot' 
    setClueString(pluralize.singular(event.target.value.trim().toUpperCase()));
  };

    //please also help me rephrase all these alert messages
  const handleNumberChange = (event) => {
  //this is to prevent users from submitting 'select a number'
  if(event.target.value.length>1){alert("please select a valid number")}
  else  setClueNumber(Number(event.target.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const regex= /[\s-]+/g
  if(clueString===""){return alert("you have to enter a clue")}
  else if(arrayToCheck.includes(clueString)){ return alert("this word is already on the gameboard, you cannot use it as your clue")}
    //here we make rules to only allow compound word that is a union of 3(and less) words so people won't type a whole sentence,
    // i.e "New York" or 'mother-in-law'
  else if(clueString.match(regex).length>2){return alert("you can only use a compound word that is made of less than 3 words") }
  else{    const clueData = {
    clueString,
    clueNumber,
    playerSubmitting: playerId,
  };
  const newClueKey = push(child(ref(database), "clues")).key;
  console.log(newClueKey);
  const updates = {};
  updates[newClueKey] = clueData;

  dispatch(setCurrentClue(clueData));
  return update(cluesRef, updates);}}

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
        <select onChange={(e) => {
            handleNumberChange(e);
          }}>
          <option>select a number</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
        </select>
        <button type="submit" onClick={handleSubmit}>
          submit
        </button>
      </form>
    </div>
  );
};

export default Clue;
