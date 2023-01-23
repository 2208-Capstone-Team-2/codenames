import React, { useEffect, useState } from "react";
import { setClueHistory, setCurrentClue } from "../../store/clueSlice";
import { useDispatch,useSelector } from "react-redux";
import { database } from "../../utils/firebase";
import { ref, onValue, push, update, set } from "firebase/database";
const ClueHistory = () => {
    const clueHistory=useSelector((state)=>state.clues.clueHistory)

    return(<div>
        <h3>Game History</h3>
{clueHistory.map((singleClue,index)=>{return <p key={index}>The clue is {singleClue.clueString} and you have {singleClue.clueNumber} guess(es)
    </p>})}
    </div>)
};

export default ClueHistory;
