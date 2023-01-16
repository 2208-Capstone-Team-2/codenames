import axios from "axios";
import React, { useEffect, useState } from "react";
import { setWordsInGame } from "../../store/wordsInGameSlice";
import { useDispatch, useSelector } from "react-redux";
import Board from "./Board";
function SetupGame() {
  const [wordpacks, setWordpacks] = useState([]);
  const [selectedWordPackId, setSelectedWordPackId] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const words = useSelector((state) => state.wordsInGame);
  const dispatch=useDispatch()
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
    if(selectedWordPackId.indexOf(event.target.value)>-1){return selectedWordPackId.splice(selectedWordPackId.indexOf(event.target.value),1)
    }
    if(selectedWordPackId.indexOf(event.target.value)<0)
{     setSelectedWordPackId([...selectedWordPackId,event.target.value]);}}
  const submitHandler = (event) => {
    event.preventDefault();
axios.post("/api/25words", {selectedWordPackId})
 .then(response =>{return response})
 .then((result)=>{
  dispatch(setWordsInGame(result.data))
})

}
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
                value={wordpack.id} />
              <label htmlFor={wordpack.name}> {wordpack.name} Word Pack</label>
            </div>
          ))}

          <button
            type="submit"
          >
            Create Board
          </button>
      
        </form>
      </div>
      
    );
  

}

export default SetupGame;